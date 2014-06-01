var fs = require('fs')
,	_ = require('lodash')
,	navigation 	= { get: {}, post: {}, put: {}, delete: {}, redirect: {} }
,   config = require(global.paths.server + '/config/core').get()
,	options	= {
		environment: global.environment,
		angular: {}, headers: {}, fonts: {}, content: {}, footer: {},
		javascripts: {
			libraries: '../partials/ejs/javascripts/libraries.ejs',
			features: '../partials/ejs/javascripts/features.ejs',
			core: ''
		}
	};


/********************************[    GET   ]********************************/

navigation.get.index = function(request, response) {
    options.angular = { module: 'Home', controller: 'HomeController' };
    options.headers = { title: 'Cub\'BI', description: 'Cub\'BI - Home' };
    options.javascripts.core = '../partials/ejs/javascripts/core/home.ejs';
    response.render('home', options);
}

navigation.get.dashboard = function(request, response) {
	options.angular = { module: 'Dashboard', controller: 'DashboardController' };
	options.headers = { title: 'Dashboard', description: 'Cub\'BI - Dashboard' };
	options.javascripts.core = '../partials/ejs/javascripts/core/dashboard.ejs';
	response.render('dashboard', options);
}

navigation.get.partial = function(request, response) {
	var path = 'partials/ejs/' + request.params[0] + '.ejs';
	var fullpath = global.paths.views + '/' + path;
	path = fs.existsSync(fullpath) ? path : '404.ejs';
	response.render(path);
}

navigation.get.template = function(request, response) {
	var path = 'partials/angular/' + request.params[0] + '.ejs';
	var fullpath = global.paths.views + '/' + path;
	path = fs.existsSync(fullpath) ? path : '404.ejs';
    var options = {}

	response.render(path, options);
}

/********************************[   POST   ]********************************/

/********************************[   PUT    ]********************************/
/********************************[  DELETE  ]********************************/


navigation.redirect.home = function(request, response) {
	response.redirect('/home');
}


module.exports = navigation;