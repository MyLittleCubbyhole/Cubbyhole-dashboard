/*Parent class cloning*/

	var Manager = require('kanto-patterns').manager.clone();

/*Factory requiring*/

	var TokenFactory = require(__dirname + '/../factories/token');

/*Attributes definitions*/

	Manager._name = 'Token';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

Manager.get.byIdWithUser = getByIdWithUser;

module.exports = Manager;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function getByIdWithUser(id) {
		return TokenFactory.query('SELECT * FROM `token` t JOIN `user` u ON t.`userid` = u.`id` WHERE t.`id` = ' + parseInt(id, 10) + ';');
	}