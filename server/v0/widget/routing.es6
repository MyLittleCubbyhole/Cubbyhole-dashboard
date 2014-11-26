/*Parent class cloning*/

	var Routing = require('kanto-patterns').routing.clone(__dirname);

/*Attributes definitions*/

	Routing._prefix = '/api/dashboards/';
	Routing._versioning = true;

/*Overridden methods declarations*/

	Routing.init = init;
	Routing.declare = declare;

module.exports = Routing;

/*Overridden methods definitions*/

	function init() {
		this.loadDepsFilters('auth');
	}

	function declare(router) {
		router.get('/:dashboardId/widgets', this.deps.auth.filters.token.verifyToken, this.deps.auth.filters.token.isAdmin, this.controllers.widget.get.byDashboardId);
		router.get('/:dashboardId/widgets/:id', this.deps.auth.filters.token.verifyToken, this.deps.auth.filters.token.isAdmin, this.controllers.widget.get.byId);
		router.get('/:dashboardId/widgets/:id/data', this.deps.auth.filters.token.verifyToken, this.deps.auth.filters.token.isAdmin, this.controllers.widget.get.data);

		router.post('/:dashboardId/widgets', this.deps.auth.filters.token.verifyToken, this.deps.auth.filters.token.isAdmin, this.controllers.widget.post.create);

		router.put('/:dashboardId/widgets/position', this.deps.auth.filters.token.verifyToken, this.deps.auth.filters.token.isAdmin, this.controllers.widget.put.updatePosition).priority(10);
		router.put('/:dashboardId/widgets/:id', this.deps.auth.filters.token.verifyToken, this.deps.auth.filters.token.isAdmin, this.controllers.widget.put.update).priority(20);

		router.delete('/:dashboardId/widgets/:id', this.deps.auth.filters.token.verifyToken, this.deps.auth.filters.token.isAdmin, this.controllers.widget.delete.byId);
	}