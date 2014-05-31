angular.module('Dashboard').
    config(['$locationProvider', '$routeProvider', function($location, $routeProvider) {

        $routeProvider
        .when('/add', {
            template: '<section id="dashboard-container" dashydash="{}"></section>'
        })
        .when('/:id', {
            template: '<section id="dashboard-container" dashydash="Dashboard.currentDashboard"></section>'
        })
        .otherwise({ redirectTo: '/' });

        $location.html5Mode(false);

    }]);