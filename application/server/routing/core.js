var filters = require(global.paths.server + '/routing/filters/core')
,	navigation = require(global.paths.server + '/routing/routes/navigation')
,	routing = {};

routing.init = function(app) {

    app.get('/', navigation.get.index);
    app.get('/dashboard', navigation.get.dashboard);
}



module.exports = routing;