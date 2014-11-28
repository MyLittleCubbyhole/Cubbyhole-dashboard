angular.module('Authentication').
    //manage all the client-server queries and add to them some params like token 
    factory('AuthenticationFactory', ['$window', '$q', '$templateCache', function($window, $q, $templateCache) {
        return {
            request: function(config) {

	            if(!$templateCache.get(config.url)) {
		            if(config.url.indexOf('token') === -1) {
			            config.url += config.url.indexOf('?') > -1 ? '&' : '?';

			            config.url += 'token=';

			            var user = localStorage.getItem('user');
			            if(!user)
				            user = sessionStorage.getItem('user');
			            if(user)
				            config.url += JSON.parse(user).token || '';
		            }
	            }

                return config || $q.when(config);
            },
            responseError: function(response) {
                return response || $q.when(response);
            }
        };
    }]);