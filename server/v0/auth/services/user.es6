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

	function _connectFlow(user, password, origin) {
		return Security.verify(user.password, password, user.salt)
			.then(() => {
				if(!user.activated)
					throw Error('bad credentials');

				return user;
			})
			.then(() => {
				if(user.roleId !== 2)
					throw Error('not allowed to log in');

				var tokenId = Security.aesEncryption(new Date().getTime(), 'Lorem ipsum Non laboris id nulla magna do consequat ut Duis aliquip tempor magna ut ullamco');
				tokenId = encodeURIComponent(tokenId);
				var token = {
					id: tokenId,
					expirationDate: moment().add('days', 1).format('YYYY-MM-DD HH:mm:ss'),
					type: 'AUTHENTICATION',
					origin: origin,
					userId: user.id
				};
				return TokenFactory.create(token);
			})
			.then((token) => {
				user.token = token.id;
				return user;
			})
			.catch(() => {
				throw Error('bad credentials');
			});
	}

/*Public methods definitions*/

	function connect(email, password, origin) {
		return new Promise((resolve, reject) => {
			UserFactory.get.byEmail(email)
				.then((users) =>  {
					if(users.length === 0)
						reject('User does not exist');
					return this._connectFlow(users[0], password, origin);
				})
				.then((user) => resolve(user));
		});
	}

	function connectById(id, password, origin) {
		return new Promise((resolve, reject) => {
			UserFactory.get.byId(id)
				.then((users) => {
					if(users.length === 0)
						reject('User does not exist');
					return this._connectFlow(users[0], password, origin);
				})
				.then((user) => resolve(user));
		});
	}

