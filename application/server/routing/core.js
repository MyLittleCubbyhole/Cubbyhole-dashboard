var filters = require(global.paths.server + '/routing/filters/core')
,	navigation = require(global.paths.server + '/routing/routes/navigation')
,   dashboard = require(global.paths.server + '/routing/rest/dashboard')
,	user = require(global.paths.server + '/routing/rest/user')
,	widget = require(global.paths.server + '/routing/rest/widget')
,	routing = {};

routing.init = function(app) {

    app.get('/', navigation.redirect.home);
    app.get('/home', navigation.get.index);
    app.get('/dashboard', filters.redirectInterceptor, navigation.get.dashboard);

    app.get('/api/dashboards', filters.tokenInterceptor, filters.adminInterceptor, dashboard.get.all);
    app.get('/api/dashboards/:id', filters.tokenInterceptor, filters.adminInterceptor, dashboard.get.byId);

    app.get('/api/dashboards/:id/widgets', filters.tokenInterceptor, filters.adminInterceptor, widget.get.byDashboardId);
    app.get('/api/dashboards/:dashboardid/widgets/:id', filters.tokenInterceptor, filters.adminInterceptor, widget.get.byId);
    app.get('/api/dashboards/:dashboardid/widgets/:id/data', filters.tokenInterceptor, filters.adminInterceptor, widget.get.data);

    app.get('/api/logout', user.get.logout);

    app.post('/api/dashboards/', filters.tokenInterceptor, filters.adminInterceptor, dashboard.post.create);
    app.post('/api/dashboards/:id/widgets', filters.tokenInterceptor, filters.adminInterceptor, widget.post.create);

    app.post('/api/auth', user.post.authenticate);

    app.post('/api/export', user.post.export);

    app.put('/api/dashboards/:id', filters.tokenInterceptor, filters.adminInterceptor, dashboard.put.update);
    app.put('/api/dashboards/:id/widgets/position', filters.tokenInterceptor, filters.adminInterceptor, widget.put.updatePosition);
    app.put('/api/dashboards/:dashboardid/widgets/:id', filters.tokenInterceptor, filters.adminInterceptor, widget.put.update);

    app.delete('/api/dashboards/:id', filters.tokenInterceptor, filters.adminInterceptor, dashboard.delete.byId);
    app.delete('/api/dashboards/:dashboardid/widgets/:id', filters.tokenInterceptor, filters.adminInterceptor, widget.delete.byId);

    app.get(/partials\/(.+)/, navigation.get.partial);
    app.get(/templates\/(.+)/, navigation.get.template);
}



module.exports = routing;