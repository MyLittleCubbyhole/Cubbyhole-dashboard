/*Parent class cloning*/

	var Routing = require('kanto-patterns').routing.clone(__dirname);

/*Attributes definitions*/

	Routing._prefix = '/';
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
		router.get('/', this.controllers.navigation.redirect.home);
		router.get('/home', this.controllers.navigation.get.index);
		router.get('/dashboard', this.deps.auth.filters.token.redirect, this.controllers.navigation.get.dashboard);

		router.get(/partials\/(.+)/, this.controllers.navigation.get.partial);
		router.get(/templates\/(.+)/, this.controllers.navigation.get.template);
	}