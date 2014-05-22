var Mysql = require(global.paths.server + '/database/mysql/core')
,	provider = { get: {}, create: {}, delete: {}, update: {} };

/********************************[  GET   ]********************************/

provider.get.all = function(callback) {
	Mysql.query('select * from `widget`;', callback);
}

provider.get.byId = function(id, callback) {
	Mysql.query('select * from `widget` where `id` = '+ parseInt(id, 10) +';', callback);
}

/********************************[  CREATE   ]********************************/


provider.create.widget = function(widget, callback) {
	var query = 'insert into `widget` (`config`, `title`, `backgroundcolor`, `fontcolor`, `height`, `width`, `positionx`, `positiony`, `type`, `dashboardid`) values (';
	query += '"' + JSON.stringify(widget.config) + '","' + widget.title + '","' + widget.backgroundcolor + '","' + widget.fontcolor + '",' + parseInt(widget.height, 10) + ',' + parseInt(widget.width, 10) + ',' + parseInt(widget.x, 10) + ', ' + parseInt(widget.y, 10) + ', "' + widget.type + '", "' + widget.dashboardid + '")';
	Mysql.query(query, callback);

}

/********************************[  DELETE   ]********************************/

provider.delete.byId = function(id, callback) {
	Mysql.query('delete from `widget` where `id`='+ parseInt(id, 10) + ';', callback);
}

/********************************[  UPDATE   ]********************************/



module.exports = provider;