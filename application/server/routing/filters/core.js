var filters = {}
,   tokenProvider = require(global.paths.server + '/database/mysql/tables/token')
,   userProvider = require(global.paths.server + '/database/mysql/tables/user');


function checkToken(request, callback) {
    var query = request.query
    ,   witness = false;

    var token = query.token || 0;
    token = encodeURIComponent(token);

    tokenProvider.isValidForAuthentication(token, function(error, data) {
        if(!error && data && data.userid)
            callback.call(this, null, {userId : data.userid, userName: data.firstname + ' ' + data.lastname});
        else
            callback.call(this, 'unauthorized token');
    });
}

function checkAdminToken(request, callback) {
    userProvider.get.byId(request.userId, function(error, user) {
        if(!error && user && user[0] && user[0].roleid == 2)
            callback.call(this, null);
        else
            callback.call(this, 'unauthorized user');
    });
}

filters.tokenInterceptor = function(request, response, next) {
    checkToken(request, function(error, data) {
        if(!error && data) {
            request.userId = data.userId;
            request.userName = data.userName;
            next();
        } else {
            response.writeHead(401);
            response.write('You must be authentified to request the API');
            response.end();
        }
    });
};

filters.adminInterceptor = function(request, response, next) {
    checkAdminToken(request, function(error) {
        if(!error)
            next();
        else {
            response.writeHead(401);
            response.write('You must be authentified as an administrator to make this request');
            response.end();
        }
    });
};

filters.redirectInterceptor = function(request, response, next) {
    checkToken(request, function(error, data) {
        if(!error && data) {
            request.userId = data.userId;
            request.userName = data.userName;
            checkAdminToken(request, function(error) {
                if(!error)
                    next();
                else
                    response.redirect('/home');
            });
        } else
            response.redirect('/home');
    });
};

module.exports = filters;