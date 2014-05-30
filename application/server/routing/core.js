var filters = require(global.paths.server + '/routing/filters/core')
,	navigation = require(global.paths.server + '/routing/routes/navigation')
,	dashboard = require(global.paths.server + '/routing/rest/dashboard')
,	widget = require(global.paths.server + '/routing/rest/widget')
,	routing = {};

routing.init = function(app) {

    app.get('/', navigation.get.index);
    app.get('/dashboard', navigation.get.dashboard);

    app.get('/api/dashboards', dashboard.get.all);
    app.get('/api/dashboards/:id', dashboard.get.byId);

    app.get('/api/dashboards/:id/widgets', widget.get.byDashboardId);
    app.get('/api/dashboards/:dashboardid/widgets/:id', widget.get.byId);
    app.get('/api/dashboards/:dashboardid/widgets/:id/data', widget.get.data)

    app.post('/api/dashboards/', dashboard.post.create);
    app.post('/api/dashboards/:id/widgets', widget.post.create);

    app.put('/api/dashboards/:id', dashboard.put.update);
    app.put('/api/dashboards/:id/widgets/position', widget.put.updatePosition);

    app.delete('/api/dashboards/:id', dashboard.delete.byId);
    app.delete('/api/dashboards/:dashboardid/widgets/:id', widget.delete.byId);

    app.get(/partials\/(.+)/, navigation.get.partial);
    app.get(/templates\/(.+)/, navigation.get.template);
}



module.exports = routing;