/*Parent class cloning*/

	var Controller = require('kanto-patterns').controller.clone();

/*Factory requiring*/

	var WidgetFactory = require(__dirname + '/../factories/widget');

/*Service requiring*/

	var WidgetService = require(__dirname + '/../services/widget');

/*Attributes definitions*/

	Controller._name = 'Widget';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Controller.get.byId = getById;
	Controller.get.byDashboardId = getByDashboardId;
	Controller.get.data = getData;

	Controller.post.create = createWidget;

	Controller.put.updatePosition = updatePosition;
	Controller.put.update = updateWidget;

	Controller.delete.byId = deleteById;

module.exports = Controller;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function getById(request, response) {
		var id = request.params.id,
		    dashboardId = request.params.dashboardId;
		WidgetFactory.get.byIdAndDashboardId(id, dashboardId)
			.then((widgets) => {
				if(widgets.length === 0)
					throw Error('Widget not found');

				var widget = WidgetService.format(widgets[0]);
				response.json(widget);
			})
			.catch((error) => response.json(error));
	}

	function getByDashboardId(request, response) {
		var dashboardId = request.params.id;
		WidgetFactory.get.byDashboardId(dashboardId)
			.then((widgets) => {
				if(widgets.length === 0)
					throw Error('No widget found');

				for(var i = 0; i < widgets.length; i++)
					widgets[i] = WidgetService.format(widgets[i]);

				response.json(widgets);
			})
			.catch((error) => {
				response.json(error);
			});
	}

	function getData(request, response) {
		var id = request.params.id,
		    dashboardId = request.params.dashboardId;
		WidgetService.getData(id, dashboardId)
			.then((widgetData) => response.json(widgetData))
			.catch((error) => response.json(error));
	}

	function createWidget(request, response) {
		var body = request.body,
		    options = {
			    title: body.title,
			    config: body.config,
			    backgroundColor: body.backgroundColor,
			    fontColor: body.fontColor,
			    width: body.size.width,
			    height: body.size.height,
			    positionX: body.position.x,
			    positionY: body.position.y,
			    type: body.type,
			    dashboardId: request.params.dashboardId
		    };
		WidgetFactory.create(options)
			.then((insertedObject) => WidgetFactory.get.byId(insertedObject.insertId, options.dashboardId))
			.then((widgets) => {
				if(widgets.length === 0)
					throw Error('Widget not created');

				var widget = WidgetService.format(widgets[0]);
				response.json(widget);
			})
			.catch((error) => response.json(error));
	}

	function updatePosition(request, response) {
		var dashboardId = request.params.dashboardId,
		    body = request.body;

		for(var i = 0; i < body.length; i++) {
			WidgetFactory.update.position({
				id: body[i].id,
				x: body[i].col,
				y: body[i].row,
				width: body[i].width,
				height: body[i].height,
				dashboardId: dashboardId
			})
				.then(() => response.json({'information': 'Position updated' }))
				.catch((error) => response.json({'information': 'An error has occurred - ' + error }));

		}
	}

	function updateWidget(request, response) {
		var body = request.body,
		    options = {
			    id: body.id,
			    title: body.title,
			    config: body.config,
			    backgroundColor: body.backgroundColor,
			    fontColor: body.fontColor,
			    width: body.size.width,
			    height: body.size.height,
			    positionX: body.position.x,
			    positionY: body.position.y,
			    dashboardId: body.dashboardId
		    };
		WidgetFactory.update(options)
			.then(() => response.json({'information': 'Widget saved' }))
			.catch((error) => response.json({'information': 'An error has occurred - ' + error }));
	}

	function deleteById(request, response) {
		var id = request.params.id,
		    dashboardId = request.params.dashboardId;
		WidgetFactory.delete.byId(id, dashboardId)
		.then(() => response.json({'information': 'widget deleted'}))
		.catch(() => response.json({'information': 'An error has occurred - ' + error}));
	}