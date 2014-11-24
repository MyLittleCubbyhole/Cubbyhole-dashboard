angular.module('Home', ['Overlay', 'Authentication', 'Tools']);;angular.module('Home').
    controller('HomeController', ['$scope', '$location', function($scope, $location) {
        var $local = $scope.Home = {};

        $scope.toString = function() {
            return 'Home';
        }
    }])