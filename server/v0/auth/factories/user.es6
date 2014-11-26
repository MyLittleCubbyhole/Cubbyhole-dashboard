/*Parent class cloning*/

	var MysqlFactory = require('kanto-patterns-mysql').mysqlFactory.clone();

/*Attributes definitions*/

	MysqlFactory._name = 'User';
	MysqlFactory._table = 'User';

/*Model definition*/

	MysqlFactory.model.password = '';
	MysqlFactory.model.salt = '';
	MysqlFactory.model.photo = '';
	MysqlFactory.model.storage = 0;
	MysqlFactory.model.firstname = '';
	MysqlFactory.model.lastname = '';
	MysqlFactory.model.inscriptionDate = new Date();
	MysqlFactory.model.birthdate = new Date();
	MysqlFactory.model.email = '';
	MysqlFactory.model.country = '';
	MysqlFactory.model.countryCode = '';
	MysqlFactory.model.activated = false;
	MysqlFactory.model.roleId = null;

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	MysqlFactory.get.byEmail = getByEmail;

module.exports = MysqlFactory;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function getByEmail(email) {
		return MysqlFactory.query('select * from `user` where `email`="'+ email + '";');
	}