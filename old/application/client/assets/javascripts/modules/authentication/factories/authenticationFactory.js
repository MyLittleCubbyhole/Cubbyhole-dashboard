angular.module('Authentication').
    //manage all the client-server queries and add to them some params like token 
    factory('AuthenticationFactory', ['$window', '$q', function($window, $q) {
        return {
            request: function(config) {

                if(config.url.indexOf('token') == -1) {
                    config.url += config.url.indexOf('?') > -1 ? '&' : '?';

                    config.url += "token=";

                    var user = localStorage.getItem('user');
                    if(!user)
                        user = sessionStorage.getItem('user');
                    if(user)
                        config.url += JSON.parse(user).token || "";
                }

                return config || $q.when(config);
            },
            responseError: function(response) {
                if (response.status === 401) {}
                return response || $q.when(response);
            }
        };
    }]);