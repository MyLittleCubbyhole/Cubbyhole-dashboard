/*Parent class cloning*/

var Service = require('kanto-patterns').service.clone();

/*Factory requiring*/

var UserFactory = require(__dirname + '/../factories/user'),
	TokenFactory = require(__dirname + '/../factories/token');

/*Service requiring*/

var Security = require('kanto-tools-security'),
	moment = require('moment');

/*Attributes definitions*/

Service._name = 'User';

/*Overridden methods declarations*/

/*Private methods declarations*/

	Service._connectFlow = _connectFlow;

/*Public methods declarations*/

	Service.connect = connect;
	Service.connectById = connectById;

module.exports = Service;

/*Overridden methods definitions*/

/*Private methods definitions*/

	function _connectFlow(users, password, origin) {
		var userFetched;
		if(users.length === 0)
			throw Error('User does not exist');

		userFetched = users[0];
		return Security.verify(userFetched.password, password, userFetched.salt)
			.then(() => {
				if(!userFetched.activated)
					throw Error('bad credentials');

				return userFetched;
			})
			.then(() => {
				if(userFetched.roleId !== 2)
					throw Error('not allowed to log in');

				var tokenId = Security.aesEncryption(new Date().getTime(), 'Lorem ipsum Non laboris id nulla magna do consequat ut Duis aliquip tempor magna ut ullamco');
				tokenId = encodeURIComponent(tokenId);
				var token = {
					id: tokenId,
					expirationDate: moment().add('days', 1).format('YYYY-MM-DD HH:mm:ss'),
					type: 'AUTHENTICATION',
					origin: origin,
					userId: userFetched.id
				};
				return TokenFactory.create(token);
			})
			.then((token) => {
				userFetched.token = token.id;
				return userFetched;
			})
			.catch(() => {
				throw Error('bad credentials');
			});
	}

/*Public methods definitions*/

	function connect(email, password, origin) {
		return UserFactory.get.byEmail(email)
			.then((users) => this._connectFlow(users, password, origin));
	}

	function connectById(id, password, origin) {
		return UserFactory.get.byId(id)
			.then((users) => this._connectFlow(users, password, origin));
	}

