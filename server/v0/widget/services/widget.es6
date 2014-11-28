/*Parent class cloning*/

	var Service = require('kanto-patterns').service.clone();

/*Factory requiring*/

	var WidgetFactory = require(__dirname + '/../factories/widget');

/*Services requiring*/

	var QueryBuilder = require(__dirname + '/../../queryBuilder/services/queryBuilder');

/*Attributes definitions*/

	Service._name = 'Widget';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Service.getData = getData;
	Service.format = format;

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

	function format(widget) {
		var definition = {};
		definition.id = widget.id;
		definition.config = JSON.parse(widget.config);
		definition.title = widget.title;
		definition.backgroundColor = widget.backgroundColor;
		definition.fontColor = widget.fontColor;
		definition.size = {};
		definition.size.height = widget.height;
		definition.size.width = widget.width;
		definition.position = {};
		definition.position.x = widget.positionX;
		definition.position.y = widget.positionY;
		definition.type = widget.type;
		definition.dashboardId = widget.dashboardId;

		return definition;
	}