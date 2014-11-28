/*Parent class cloning*/

	var Controller = require('kanto-patterns').controller.clone();

/*Factories requiring*/
	var TokenFactory = require(__dirname + '/../factories/token');

/*Services requiring*/
	var UserService = require(__dirname + '/../services/user');

/*Attributes definitions*/

	Controller._name = 'Auth';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Controller.logout = logout;
	Controller.post.login = login;

module.exports = Controller;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function logout(request, response) {
		var query = request.query;
		Controller.isDefined({ 'query': query })
			.then(() => TokenFactory.delete.byId(encodeURIComponent(query.token)))
			.then((result) => {
				if(result.affectedRows)
					response.status(200).end();
				else
					throw Error('No token deleted');
			})
			.catch(() => response.status(500).end());
	}

	function login(request, response) {
		var body = request.body;

		Controller.isDefined({ 'email': body.email, 'password': body.password })
			//.then(() => UserService.connect(body.email, body.password, request.header('User-Agent')))
			.then(() => {
				return {
					id: 2,
					photo: '',
					storage: 12548484,
					firstname: 'Julien',
					lastname: 'Torrielli',
					inscriptionDate: new Date(),
					birthdate: new Date(),
					email: '94153@supinfo.com',
					country: 'France',
					countryCode: 'FR',
					activated: true,
					token: '1234',
					roleId: 2
				};
			})
			.then((user) => {
				delete(user.password);
				delete(user.salt);
				response.json({'user': user});
			})
			.catch((keyNotDefined) => {
				var error = '';
				switch(keyNotDefined) {
					case 'email':
						error = 'Property \'email\' is undefined';
						break;
					case 'password':
						error = 'Property \'password\' is undefined';
						break;
					default:
						Controller.error(keyNotDefined);
						error = keyNotDefined;
						break;
				}
				response.json({information: error});
			});
	}