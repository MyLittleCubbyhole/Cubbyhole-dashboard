var Mysql = require(global.paths.server + '/database/mysql/core')
,	tools = require(global.paths.server + '/database/tools/mysql/core')
,	provider = { get: {}, create: {}, delete: {}, update: {} };

/********************************[  GET   ]********************************/

provider.get.byId = function(id, callback) {
	Mysql.query('select * from `user` where `id` = '+ parseInt(id, 10) +';', callback);
}

provider.get.byEmail = function(email, callback) {
	var query = 'select * from `user` where `email`="'+ email + '";';
	Mysql.query(query, callback);
}

/********************************[  CREATE   ]********************************/

/********************************[  DELETE   ]********************************/

/********************************[  UPDATE   ]********************************/

/********************************[  OTHERS   ]********************************/

provider.connect = function(email, password, callback) {
	provider.get.byEmail(email, function(error, user) {
		var userResult = null;
		if(user[0]) {
			var goodPassword = user[0].password ? tools.checkPassword(password, user[0].password, user[0].salt) : false;
			userResult = (user[0].activated && goodPassword) ? user : null;
		}
		callback(error, userResult);
	});
}

provider.connectById = function(id, password, callback) {
	provider.get.byId(id, function(error, user) {
		if(user[0]) {
			var goodPassword = user[0].password ? tools.checkPassword(password, user[0].password, user[0].salt) : false;
			var userResult = (user[0].activated && goodPassword) ? user[0] : null;
		}
		callback(error, userResult);
	});
}

module.exports = provider;