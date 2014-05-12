angular.module('CubbyHole', ['FileManager', 'Authentication', 'restangular', 'Breadcrumb']);
;angular.module('CubbyHole').
	config(['apiUrl', 'RestangularProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', function(apiUrl, restangular, $location, $httpProvider, $sceDelegateProvider) {

		restangular.setBaseUrl(apiUrl);
		$location.html5Mode(false);

        $httpProvider.interceptors.push('AuthenticationFactory');

        $sceDelegateProvider.resourceUrlWhitelist([
           'self',
           apiUrl + '**'
        ]);
    }]);;angular.module('CubbyHole').
	controller('CubbyHoleController', ['$scope', function($scope) {
		var $local = $scope.CubbyHole = {};


		$scope.toString = function() {
			return 'CubbyHole';
		}
	}]);