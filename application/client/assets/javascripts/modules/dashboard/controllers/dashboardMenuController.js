angular.module('Dashboard').
    controller('DashboardMenuController', ['$scope', '$location', 'DASHBOARD_ICONS', function($scope, $location, DASHBOARD_ICONS){
        var $local = $scope.DashboardMenu = {}

        $local.icons = DASHBOARD_ICONS;

        $local.location = function(location) {
            $scope.Dashboard.lockRouteChange = false;
            $location.path('/' + location);
        };

        $scope.toString = function() {
            return 'DashboardMenu';
        }
    }])