angular.module('Navigation').
    controller('NavigationController', ['$scope', '$window', '$location', 'UserFactory', function($scope, $window, $location, UserFactory){
        var $local = $scope.Navigation = {};

        /**
         * navigate to the selected path
         * @param  {string} path path to go
         */
        $local.goto = function(path) {
            path += (path == '/dashboard' && UserFactory($scope).get()) ? "?token=" + UserFactory($scope).get().token : "";

            $window.location = path;
        };

        /**
         * check if the pathname is the current path
         * @param  {string}  pathname path name
         */
        $local.isSelected = function(pathname) {
            return $window.location.pathname == pathname;
        }

        if($window.location.pathname == '/home' && $location.$$path.length>0)
            $local.goto('/home#' + $location.$$path.substring(1), '#bloc-container')

        $scope.toString = function() {
            return 'Navigation';
        }
    }])