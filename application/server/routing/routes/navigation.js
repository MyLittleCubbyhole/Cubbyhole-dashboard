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

/********************************[   POST   ]********************************/
/********************************[   PUT    ]********************************/
/********************************[  DELETE  ]********************************/


module.exports = navigation;