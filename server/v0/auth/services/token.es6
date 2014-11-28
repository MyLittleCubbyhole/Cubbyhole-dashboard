/*Parent class cloning*/

	var Service = require('kanto-patterns').service.clone();

/*Services requiring*/

	var TokenFactory = require(__dirname + '/../factories/token'),
		TokenManager = require(__dirname + '/../managers/token'),
		UserFactory = require(__dirname + '/../factories/user');

/*Attributes definitions*/

	Service._name = 'Token';

/*Overridden methods declarations*/

/*Private methods declarations*/

	Service._verifyOrigin = _verifyOrigin;
	Service._isValidForAuthentication = _isValidForAuthentication;

/*Public methods declarations*/

	Service.verifyToken = verifyToken;
	Service.isAdminToken = isAdminToken;

module.exports = Service;

/*Overridden methods definitions*/

/*Private methods definitions*/

	function _verifyOrigin(origin) {
		return origin && origin.match(/CubbyHole/i);
	}

	function _isValidForAuthentication(id) {

		return TokenManager.get.byIdWithUser(id)
			.then((tokens) => {
				if(tokens.length === 0)
					throw Error('Token not found');

				var token = tokens[0],
				    expirationDate = new Date(token.expirationDate);

				if((!Service._verifyOrigin(token.origin) && expirationDate < new Date()) || token.type !== 'AUTHENTICATION') {
					TokenFactory.delete.byId(id);
					throw Error('Bad token');
				}

				return token;
			});
	}

/*Public methods definitions*/

	function verifyToken(token = 0) {

		token = encodeURIComponent(token);

		return Service._isValidForAuthentication(token).
			then((tokenFetched) => {
				if(tokenFetched.userId)
					return {
						userId: tokenFetched.userId,
						userName: tokenFetched.firstname + ' ' + tokenFetched.lastname
					};
				else
					throw Error('unauthorized token');
			});
	}

	function isAdminToken(userId = 0) {
		UserFactory.get.byId(userId)
			.then((users) => {
				if(users.length === 0 || users[0].roleId !== 2)
					throw Error('unauthorized user');
			});
	}