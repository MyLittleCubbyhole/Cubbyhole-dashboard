/*Parent class cloning*/

	var Controller = require('kanto-patterns').controller.clone();

/*Attributes definitions*/

	Controller._name = 'Navigation';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Controller.redirect = redirectHome;
	Controller.get.index = getIndex;
	Controller.get.dashboard = getDashboard;

module.exports = Controller;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function redirectHome(request, response) {
		response.redirect('/home');
	}

	function getIndex(request, response) {
		response.render('modules/home/home');
	}

	function getDashboard(request, response) {
		response.render('modules/dashboard/dashboard');
	}