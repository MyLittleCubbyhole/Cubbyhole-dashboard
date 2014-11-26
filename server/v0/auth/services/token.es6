/*Parent class cloning*/

	var Service = require('kanto-patterns').service.clone();

/*Services requiring*/

	var TokenFactory = require(__dirname + '/../factories/token');

/*Attributes definitions*/

	Service._name = 'Token';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Service.isValidForAuthentication = isValidForAuthentication;

module.exports = Service;

/*Overridden methods definitions*/

/*Private methods definitions*/

	function verifyOrigin(origin) {
		return origin && origin.match(/CubbyHole/i);
	}

/*Public methods definitions*/

	function isValidForAuthentication(id) {

		return TokenFactory.get.byIdWithUser(id)
			.then((tokens) => {
				if(tokens.length === 0)
					throw Error('Token not found');

				var token = tokens[0],
				    expirationDate = new Date(token.expirationDate);

				if((!verifyOrigin(token.origin) && expirationDate < new Date()) || token.type !== 'AUTHENTICATION') {
					TokenFactory.delete.byId(id);
					throw Error('Bad token');
				}

				return token;
			});
	}