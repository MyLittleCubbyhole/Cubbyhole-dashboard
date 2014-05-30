var Mysql = require(global.paths.server + '/database/mysql/core')
,	MysqlTools = require(global.paths.server + '/database/tools/mysql/core')
,	provider = { get: {}, create: {}, delete: {}, update: {} };

/********************************[  GET   ]********************************/

provider.get.all = function(callback) {
	Mysql.query('select * from `widget`;', callback);
}

provider.get.byId = function(id, dashboardid, callback) {
	Mysql.query('select * from `widget` where `dashboardid` = '+ parseInt(dashboardid, 10) +' and `id` = '+ parseInt(id, 10) +';', callback);
}

provider.get.byDashboardId = function(id, callback) {
	Mysql.query('select * from `widget` where `dashboardid` = '+ parseInt(id, 10) +';', callback);
}

provider.get.data = function(id, dashboardid, callback) {

	provider.get.byId(id, dashboardid, function(error, widget){
		if(!error && widget && widget.length>0) {
			var mysqlQuery = MysqlTools.query.generate(JSON.parse(widget[0].config));
			Mysql.query(mysqlQuery, callback);
		}
		else
			callback.call(this, error);

	});
}

/********************************[  CREATE   ]********************************/


provider.create.widget = function(widget, callback) {
	var query = 'insert into `widget` (`config`, `title`, `backgroundcolor`, `fontcolor`, `height`, `width`, `positionx`, `positiony`, `type`, `dashboardid`) values (';
	query += "'" + JSON.stringify(widget.config) + "'" + ',"' + widget.title + '","' + widget.backgroundcolor + '","' + widget.fontcolor + '",' + parseInt(widget.height, 10) + ',' + parseInt(widget.width, 10) + ',' + parseInt(widget.positionx, 10) + ', ' + parseInt(widget.positiony, 10) + ', "' + widget.type + '", "' + widget.dashboardid + '")';

	Mysql.query(query, callback);

}

/********************************[  DELETE   ]********************************/

provider.delete.byId = function(id, dashboardid, callback) {
	Mysql.query('delete from `widget` where `dashboardid` = '+ parseInt(dashboardid, 10) +' and `id`='+ parseInt(id, 10) + ';', callback);
}

provider.delete.byDashboardId = function(id, callback) {
	Mysql.query('delete from `widget` where `dashboardid`='+ parseInt(id, 10) + ';', callback);
}

/********************************[  UPDATE   ]********************************/

provider.update.widget = function(widget, callback) {
	var query = 'update `widget` set `config` = "' + JSON.stringify(widget.config) + '",';
	query += '`title` = "' + widget.title + '",';
	query += '`backgroundcolor` = "' + widget.backgroundcolor + '",';
	query += '`fontcolor` = "' + widget.fontcolor + '",';
	query += '`height` = ' + parseInt(widget.height, 10) + ',';
	query += '`width` = ' + parseInt(widget.width, 10) + ',';
	query += '`positionx` = ' + parseInt(widget.x, 10) + ',';
	query += '`positiony` = ' + parseInt(widget.y, 10) + ',';
	query += '`type` = "' + widget.type + '"';
	query += 'where `dashboardid` = "' + widget.dashboardid + '" and id = ' + widget.id + ';';
	Mysql.query(query, callback);
}

provider.update.position = function(widget, callback) {
	var query = 'update `widget` set ';
	query += '`height` = ' + parseInt(widget.height, 10) + ',';
	query += '`width` = ' + parseInt(widget.width, 10) + ',';
	query += '`positionx` = ' + parseInt(widget.x, 10) + ',';
	query += '`positiony` = ' + parseInt(widget.y, 10) + ' ';
	query += 'where `dashboardid` = ' + widget.dashboardid + ' and id = ' + widget.id + ';';
	Mysql.query(query, callback);
}

module.exports = provider;