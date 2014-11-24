var database = {}
,	MySQL = require('mysql')
,	config = require(global.paths.server + '/config/core').get()
,	db = { mysql: null };

database.init = function() {

	if(!db.mysql) {
		db.mysql = MySQL.createPool({
			host : config['mysql_auth'].host,
			port : config['mysql_auth'].port,
			database: config['mysql_auth'].database,
			user : config['mysql_auth'].user,
			password : config['mysql_auth'].password
		});
	}
};

database.get = function() { return db };

module.exports = database;