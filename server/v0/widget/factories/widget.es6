/*Parent class cloning*/

	var MysqlFactory = require('kanto-patterns-mysql').mysqlFactory.clone();

/*Attributes definitions*/

	MysqlFactory._name = 'Widget';
	MysqlFactory._table = 'widget';

/*Model definition*/

	MysqlFactory.model.config = '';
	MysqlFactory.model.title = '';
	MysqlFactory.model.backgroundColor = '';
	MysqlFactory.model.fontColor = '';
	MysqlFactory.model.height = 0;
	MysqlFactory.model.width = 0;
	MysqlFactory.model.positionX = 0;
	MysqlFactory.model.positionY = 0;
	MysqlFactory.model.type = '';
	MysqlFactory.model.dashboardId = null;

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	MysqlFactory.get.byIdAndDashboardId = getByIdAndDashboardId;
	MysqlFactory.get.byDashboardId = getByDashboardId;

	MysqlFactory.create = createWidget;

	MysqlFactory.update = updateWidget;
	MysqlFactory.update.position = updatePosition;

	MysqlFactory.delete.byDashboardId = deleteByDashboardId;

module.exports = MysqlFactory;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function getByIdAndDashboardId(id, dashboardId) {
		return MysqlFactory.query('SELECT * FROM `widget` where `dashboardId` = '+ parseInt(dashboardId, 10) +' and `id` = '+ parseInt(id, 10) + ';');
	}

	function getByDashboardId(dashboardId) {
		return MysqlFactory.query('SELECT * FROM `widget` where `dashboardId` = '+ parseInt(dashboardId, 10) + ';');
	}


	function createWidget(widget) {
		var query = 'INSERT INTO `widget` (`config`, `title`, `backgroundColor`, `fontColor`, \
				`height`, `width`, `positionX`, `positionY`, `type`, `dashboardId`) \
				VALUES (\'' + JSON.stringify(widget.config) + '\', \
				"' + widget.title + '", \
				"' + widget.backgroundColor + '", \
				"' + widget.fontColor + '", \
				' + parseInt(widget.height, 10) + ', \
				' + parseInt(widget.width, 10) + ', \
				' + parseInt(widget.positionX, 10) + ', \
				' + parseInt(widget.positionY, 10) + ', \
				"' + widget.type + '", \
				' + parseInt(widget.dashboardId, 10) + ');';

		return MysqlFactory.query(query);
	}

	function updateWidget(widget) {
		var query = 'UPDATE `widget` set \
				`config` = \'' + JSON.stringify(widget.config) + '\', \
				`title` = "' + widget.title + '", \
				`backgroundColor` = "' + widget.backgroundColor + '", \
				`fontColor` = "' + widget.fontColor + '", \
				`height` = ' + parseInt(widget.height, 10) + ', \
				`width` = ' + parseInt(widget.width, 10) + ', \
				`positionX` = ' + parseInt(widget.positionX, 10) + ', \
				`positionY` = ' + parseInt(widget.positionY, 10) + ' \
				 WHERE `dashboardId` = ' + parseInt(widget.dashboardId, 10) + ' \
				 AND `id` = ' + parseInt(widget.id, 10) + ';';

		return MysqlFactory.query(query);
	}

	function updatePosition(widget) {
		var query = 'UPDATE `widget` set \
				`height` =' + parseInt(widget.height, 10) + ', \
				`width` =' + parseInt(widget.width, 10) + ', \
				`positionX` =' + parseInt(widget.x, 10) + ', \
				`positionY` =' + parseInt(widget.y, 10) + ' \
				 WHERE `dashboardId` = ' + parseInt(widget.dashboardId, 10) + ' \
				 AND `id` = ' + parseInt(widget.id, 10) + ';';

		return MysqlFactory.query(query);
	}

	function deleteByDashboardId(dashboardId) {
		return MysqlFactory.query('DELETE FROM `widget` WHERE `dashboardId` = ' + parseInt(dashboardId, 10) + ';');
	}