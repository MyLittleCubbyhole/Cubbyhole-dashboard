angular.module('Dashboard').
    controller('DashboardMenuController', ['$scope', '$location', function($scope, $location){
        var $local = $scope.DashboardMenu = {}

        $local.icons = [
            "icon-earth",
            "icon-pin",
            "icon-bolt",
            "icon-layers",
            "icon-group",
            "icon-info",
            "icon-star",
            "icon-heart",
            "icon-sunny",
            "icon-pacman",
            "icon-rocket",
            "icon-moneybag",
            "icon-diamond",
            "icon-locked",
            "icon-spaceinvaders"
        ];

        $local.location = function(location) {
            $scope.Dashboard.lockRouteChange = false;
            $location.path('/' + location);
        };

        $scope.toString = function() {
            return 'DashboardMenu';
        }
    }])