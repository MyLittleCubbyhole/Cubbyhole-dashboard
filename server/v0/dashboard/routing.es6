/*Parent class cloning*/

	var Routing = require('kanto-patterns').routing.clone(__dirname);

/*Attributes definitions*/

	Routing._prefix = '/api/dashboards';
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
		router.get('/', this.deps.auth.filters.token.verifyToken, this.deps.auth.filters.token.isAdmin, this.controllers.dashboard.get.all);
		router.get('/:id', this.deps.auth.filters.token.verifyToken, this.deps.auth.filters.token.isAdmin, this.controllers.dashboard.get.byId);

		router.post('/', this.deps.auth.filters.token.verifyToken, this.deps.auth.filters.token.isAdmin, this.controllers.dashboard.post.create);

		router.put('/:id', this.deps.auth.filters.token.verifyToken, this.deps.auth.filters.token.isAdmin, this.controllers.dashboard.put.update);

		router.delete('/:id', this.deps.auth.filters.token.verifyToken, this.deps.auth.filters.token.isAdmin, this.controllers.dashboard.delete.byId);
	}