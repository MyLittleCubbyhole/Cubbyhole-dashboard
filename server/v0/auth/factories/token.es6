/*Parent class cloning*/

	var MysqlFactory = require('kanto-patterns-mysql').mysqlFactory.clone();

/*Attributes definitions*/

	MysqlFactory._name = 'Token';
	MysqlFactory._table = 'token';

/*Model definition*/

	MysqlFactory.model.type = '';
	MysqlFactory.model.expirationDate = new Date();
	MysqlFactory.model.origin = '';
	MysqlFactory.model.userId = null;
	MysqlFactory.model.fileId = null;

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	MysqlFactory.get.byIdWithUser = getByIdWithUser;
	MysqlFactory.delete.byId = deleteById;

	MysqlFactory.create = createToken;

module.exports = MysqlFactory;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function getByIdWithUser(id) {
		return MysqlFactory.query('SELECT * FROM `token` t JOIN `user` u ON t.`userid` = u.`id` WHERE t.`id` = ' + parseInt(id, 10) + ';');
	}

	function createToken(token) {
		var query = 'INSERT INTO `token` (`id`, `expirationdate`, `type`, `origin`, `userid`, `fileid`) \
			VALUES ("' + token.id + '", \
			"' + token.expirationDate + '",\
			"' + token.type + '",\
			"' + token.origin + '",\
			' + (token.userId ? parseInt(token.userId, 10) : null) + ',\
			"' + (token.fileId || null) + '")';

		return MysqlFactory.query(query);
	}

	function deleteById(id) {
		MysqlFactory.query('DELETE FROM `token` WHERE `id`="'+ id + '";');
	}