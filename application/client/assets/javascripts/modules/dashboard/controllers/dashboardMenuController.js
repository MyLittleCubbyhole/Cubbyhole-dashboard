angular.module('Dashboard').
    controller('DashboardMenuController', ['$scope', '$location', function($scope, $location){
        var $local = $scope.DashboardMenu = {}

        $local.location = function(location) {
            $location.path('/' + location);
        };

        $scope.toString = function() {
            return 'DashboardMenu';
        }
    }])