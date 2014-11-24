var userProvider = require(global.paths.server + '/database/mysql/tables/user')
,   tokenProvider = require(global.paths.server + '/database/mysql/tables/token')
,   mysqlTools = require(global.paths.server + '/database/tools/mysql/core')
,   moment = require('moment')
,   user = { get : {}, post : {}, put : {}, delete : {} };

/********************************[  GET   ]********************************/

user.get.logout = function(request, response) {
    var query  = request.query;
    if(query.token) {
        var token = encodeURIComponent(query.token);
        tokenProvider.delete.byId(token, function(error, data) {
            if(data && data.affectedRows && data.affectedRows >= 1)
                response.writeHead(200);
            else
                response.writeHead(500);

            response.end();
        });
    }
    else {
        response.writeHead(500);
        response.end();
    }

};

/********************************[  POST  ]********************************/

user.post.authenticate = function(request, response) {
    var params = request.params
    ,   body = request.body
    ,   witness = true;

    witness = body.email && body.password ? witness : false;

    if(!witness)
        response.send({'information': 'An error has occurred - missing information', 'email' : body.email, 'password' : body.password });
    else
        userProvider.connect(body.email, body.password, function(error, dataUser) {
            if(dataUser && dataUser[0]) {
                if(dataUser[0].roleid == 2) {
                    mysqlTools.generateRandomBytes(32, function(tokenId) {
                        tokenId = encodeURIComponent(tokenId);
                        var token = {
                            id: tokenId,
                            expirationDate: moment().add('days', 1).format('YYYY-MM-DD HH:mm:ss'),
                            type: 'AUTHENTICATION',
                            origin: request.header("User-Agent"),
                            userId: dataUser[0].id
                        };
                        tokenProvider.create.token(token, function(error, dataToken) {
                            if(!error) {
                                dataUser[0].token = tokenId;
                                delete(dataUser[0].password);
                                delete(dataUser[0].salt);
                                response.send({'user' : dataUser[0]});
                            } else
                                response.send({'information' : 'An error has occurred - ' + error});
                        });
                    });
                } else
                    response.send({'information' : 'An error has occurred - you are not allowed to log in'});
            } else
                response.send({'information' : 'An error has occurred - bad credentials'});
        });

}

/********************************[  PUT   ]********************************/

/********************************[ DELETE ]********************************/


module.exports = user;