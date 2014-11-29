/*Parent class cloning*/

	var Filter = require('kanto-patterns').filter.clone();

/*Services requiring*/

	var TokenService = require(__dirname + '/../services/token');

/*Attributes definitions*/

	Filter._name = 'Token';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Filter.verifyToken = verifyToken;
	Filter.isAdmin = isAdmin;
	Filter.redirect = redirect;

module.exports = Filter;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function verifyToken(request, response, next) {
		TokenService.verifyToken(request.query.token)
			.then((result) => {
				request.userId = result.userId;
				request.userName = result.userName;
				next();
			})
			.catch(() => {
				response.status(401);
				response.write('You must be authentified to request the API');
				response.end();
			});
	}

	function isAdmin(request, response, next) {
		TokenService.isAdminToken(request.userId)
			.then(() => next())
			.catch(() => {
				response.status(401);
				response.write('You must be authentified as an administrator to make this request');
				response.end();
			});
	}

	function redirect(request, response, next) {
		TokenService.verifyToken(request.query.token)
			.then((result) => {
				request.userId = result.userId;
				request.userName = result.userName;
				return TokenService.isAdminToken(request.userId);
			})
			.then(() => next())
			.catch(() => {
				response.redirect('/home');
			});
	}
