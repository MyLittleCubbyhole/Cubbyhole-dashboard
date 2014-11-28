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

	MysqlFactory.create = createToken;

module.exports = MysqlFactory;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

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