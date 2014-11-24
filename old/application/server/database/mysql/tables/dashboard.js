var Mysql = require(global.paths.server + '/database/mysql/core')
,	widgetProvider = require(global.paths.server + '/database/mysql/tables/widget')
,	provider = { get: {}, create: {}, delete: {}, update: {} };

/********************************[  GET   ]********************************/

provider.get.all = function(callback) {
	Mysql.query('select * from `dashboard`;', callback);
}

provider.get.byId = function(id, callback) {
	Mysql.query('select * from `dashboard` where `id` = '+ parseInt(id, 10) +';', callback);
}

/********************************[  CREATE   ]********************************/


provider.create.dashboard = function(dashboard, callback) {
	var query = 'insert into `dashboard` (`title`, `icon`) values ("' + dashboard.title + '","' + dashboard.icon + '");';
	Mysql.query(query, callback);
}

/********************************[  DELETE   ]********************************/

provider.delete.byId = function(id, callback) {
	Mysql.query('delete from `dashboard` where `id`='+ parseInt(id, 10) + ';', function(error) {
		!error && widgetProvider.delete.byDashboardId(id, callback);
	});

}

/********************************[  UPDATE   ]********************************/

provider.update.dashboard = function(dashboard, callback) {
	var query = 'update `dashboard` set `title` = "' + dashboard.title + '", `icon` = "' + dashboard.icon + '" where id = ' + dashboard.id + ';';
	Mysql.query(query, callback);
}


module.exports = provider;