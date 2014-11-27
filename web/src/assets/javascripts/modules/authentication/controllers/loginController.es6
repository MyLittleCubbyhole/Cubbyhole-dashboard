angular.module('Authentication').
    controller('LoginController', ['$scope', '$location', 'UserFactory', function($scope, $location, UserFactory) {
        var $local = $scope.Login = {};

        $local.isFormSubmited = false;

        $local.user = {};

        $local.rememberMe = true;

        $local.errorLogin = false;

        /**
         * called when submitting form
         * call the authenticate method from the authentication factory
         * and save the current user in the chossen storage
         * @param  {Boolean} isValid form validity
         */
        $local.authenticate = function(isValid) {
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            $local.isFormSubmited = true;
            if(isValid) {
                UserFactory($scope).login($local.user, $local.rememberMe, function(error) {
                    if(error)
                        $local.errorLogin = true;
                    else
                       $local.errorLogin = false;
                });
            }
        };

        $scope.toString = function() {
            return 'Login';
        };
    }]);