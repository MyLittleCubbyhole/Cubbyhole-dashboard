/*Parent class cloning*/

	var MysqlFactory = require('kanto-patterns-mysql').mysqlFactory.clone();

/*Attributes definitions*/

	MysqlFactory._name = 'Dashboard';
	MysqlFactory._table = 'dashboard';

/*Model definition*/

	MysqlFactory.model.title = '';
	MysqlFactory.model.icon = '';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	MysqlFactory.create = createDashboard;
	MysqlFactory.update = updateDashboard;

module.exports = MysqlFactory;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/


	function createDashboard(dashboard) {
		var query = 'INSERT INTO `dashboard` (`title`, `icon`) \
			VALUES ("' + dashboard.title + '", \
			"' + dashboard.icon + '");';

		return MysqlFactory.query(query);
	}

	function updateDashboard(dashboard) {
		var query = 'UPDATE `dashboard` set ' +
			'`title` = "' + dashboard.title + '", \
			`icon` = "' + dashboard.icon + '" \
			WHERE `id` = ' + parseInt(dashboard.id, 10) + ';';

		return MysqlFactory.query(query);
	}