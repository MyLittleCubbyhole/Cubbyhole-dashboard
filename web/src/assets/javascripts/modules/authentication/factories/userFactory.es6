angular.module('Authentication').
    factory('UserFactory', ['$window', '$http', 'AuthenticationFactory', function($window, $http, AuthenticationFactory){

        var _user = {};

        return function($scope) {

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {};

            /**
             * get the current loaded user
             * @return {Object} User
             */
            prototype.get = function() {
                return _user;
            };

            /**
             * set new informations to the current user
             * @param {Object} user User
             */
            prototype.set = function(user) {
                angular.extend(_user, user);
            };

            /**
             * Authenticate the user to the web Api
             * and set the loaded user to the local storage|session storage
             * in order to use it later
             * @param  {Object}   user       User
             * @param  {Boolean}   rememberMe manage the saving container - session or local
             * @param  {Function} callback  
             */
            prototype.login = function(user, rememberMe, callback) {
                $http.post('/api/auth', user).
                success(function(data, status, headers, config) {
                    if(data && data.user && data.user.token) {
                        prototype.set(data.user);
                        if(rememberMe)
                            localStorage.setItem('user', JSON.stringify(data.user));
                        else
                            sessionStorage.setItem('user', JSON.stringify(data.user));

                        callback.call(this, null);

                        $window.location = $window.location.protocol + '//' + $window.location.host + '/dashboard?token=' + data.user.token;
                    } else {
                        callback.call(this, 'authentication failed');
                    }
                }).
                error(function(data, status, headers, config) {
                    callback.call(this, 'authentication failed');
                    console.error(data);
                });
            };

            /**
             * disconnect the user and remove him from the storages
             */
            prototype.logout = function() {
                var user = prototype.get();
                if(user.token) {
                    $http.get(AuthenticationFactory.request({ url: '/api/logout' }).url).
                    success(function(data, status, headers, config) {
                        localStorage.removeItem('user');
                        sessionStorage.removeItem('user');
                        $window.location.reload();
                    }).
                    error(function(data, status, headers, config) {
                        localStorage.removeItem('user');
                        sessionStorage.removeItem('user');
                        $window.location.reload();
                        console.error(data);
                    });
                }
            };

            return prototype;
        };
    }]);