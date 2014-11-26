/*Parent class cloning*/

	var Service = require('kanto-patterns').service.clone();

/*Factory requiring*/

	var WidgetFactory = require(__dirname + '/../factories/widget');

/*Services requiring*/

	var QueryBuilder = require(__dirname + '/../../queryBuilder/services/widget');

/*Attributes definitions*/

	Service._name = 'Widget';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Service.getData = getData;

module.exports = Service;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function getData(id, dashboardId) {
		return WidgetFactory.get.byIdAndDashboardId(id, dashboardId)
			.then((widgets) => {
				if(widgets.length === 0)
					throw Error('Widget not found');

				var mysqlQuery = QueryBuilder.generate(JSON.parse(widgets[0].config));
				return WidgetFactory.query(mysqlQuery);
			});
	}