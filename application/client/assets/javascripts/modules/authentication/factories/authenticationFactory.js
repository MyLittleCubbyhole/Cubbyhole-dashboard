angular.module('Authentication').
    factory('AuthenticationFactory', ['$window', '$q', function($window, $q) {
        return {
            request: function(config) {

                config.url += config.url.indexOf('?') > -1 ? '&' : '?';

                config.url += "token=";

                var user = localStorage.getItem('user');
                if(!user)
                    user = sessionStorage.getItem('user');
                if(user)
                    config.url += JSON.parse(user).token || "";

                return config || $q.when(config);
            },
            responseError: function(response) {
                if (response.status === 401) {
                    //$window.location = $window.location.protocol + "//" + $window.location.host + "/authentication#/login";
                }
                return response || $q.when(response);
            }
        };
    }]);