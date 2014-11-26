/*Parent class cloning*/

	var Controller = require('kanto-patterns').controller.clone();

/*Factories requiring*/

	var DashboardFactory = require(__dirname + '/../factories/dashboard');

/*Attributes definitions*/

	Controller._name = 'Dashboard';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Controller.get.all = getAll;
	Controller.get.byId = getById;

	Controller.post.create = createDashboard;

	Controller.put.update = updateDashboard;

	Controller.delete.byId = deleteById;

module.exports = Controller;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function getAll(request, response) {
		DashboardFactory.get.all()
			.then((dashboards) => response.json(dashboards))
			.catch((error) => response.json(error));
	}

	function getById(request, response) {
		var id = request.params.id;
		DashboardFactory.get.byId(id)
			.then((dashboards) => {
				if(dashboards.length !== 0)
					response.json(dashboards[0]);
				else
					response.json('Dashboard not found');
			})
			.catch((error) => response.json(error));
	}

	function createDashboard(request, response) {
		var body = request.body,
		    dashboard = {
			    title: body.title,
			    icon: body.icon
		    };

		Controller.isDefined({ 'title': dashboard.title, 'icon': dashboard.icon })
			.then(() => DashboardFactory.create(dashboard))
			.then((dashboardCreated) => {
				dashboard.id = dashboardCreated.insertId;
				response.json({'information': (dashboard.id ? 'dashboard created' : 'An error has occurred - Dashboard not created'), 'dashboard': dashboard });
			})
			.catch((keyNotDefined) => {
				var error = '';
				switch(keyNotDefined) {
					case 'title':
						error = 'Property \'title\' is undefined';
						break;
					case 'icon':
						error = 'Property \'icon\' is undefined';
						break;
					default:
						Controller.error(keyNotDefined);
						error = keyNotDefined;
						break;
				}
				response.json({information: error});
			});

	}

	function updateDashboard(request, response) {
		var body = request.body,
		    dashboard = {
			    id: request.params.id,
			    title: body.title,
			    icon: body.icon
		    };

		Controller.isDefined({ 'title': dashboard.title, 'icon': dashboard.icon })
			.then(() => DashboardFactory.update(dashboard))
			.then((dashboardUpdated) => {
				response.json({'information': (dashboardUpdated ? 'dashboard updated' : 'An error has occurred - Dashboard not updated'), 'dashboard': dashboard });
			})
			.catch((keyNotDefined) => {
				var error = '';
				switch(keyNotDefined) {
					case 'title':
						error = 'Property \'title\' is undefined';
						break;
					case 'icon':
						error = 'Property \'icon\' is undefined';
						break;
					default:
						Controller.error(keyNotDefined);
						error = keyNotDefined;
						break;
				}
				response.json({information: error});
			});

	}

	function deleteById(request, response) {
		var id = request.params.id;
		DashboardFactory.delete.byId(id)
			.then(() => response.json({'information': 'dashboard deleted'}))
			.catch((error) => response.json({'information': 'An error has occured - ' + error}));
	}