angular.module('Dashboard').
    config(['API_URL', '$locationProvider', '$routeProvider', '$httpProvider', '$sceDelegateProvider', function(API_URL, $location, $routeProvider, $httpProvider, $sceDelegateProvider) {

        $routeProvider
        .when('/add', {
            template: '<section id="dashboard-container" dashydash="{}"></section>'
        })
        .when('/:id', {
            template: '<section id="dashboard-container" dashydash="Dashboard.currentDashboard"></section>'
        })
        .otherwise({ redirectTo: '/' });

        $location.html5Mode(false);

        $httpProvider.interceptors.push('AuthenticationFactory');

        $sceDelegateProvider.resourceUrlWhitelist([
           'self',
           API_URL + '**'
        ]);

    }]);