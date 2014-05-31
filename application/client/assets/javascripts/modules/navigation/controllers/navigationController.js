angular.module('Navigation').
	controller('NavigationController', ['$scope', '$window', '$location', function($scope, $window, $location){
		var $local = $scope.Navigation = {};

		$local.goto = function(path) {
			$window.location = path;
		};

		$local.isSelected = function(pathname) {
			return $window.location.pathname == pathname;
		}

		if($window.location.pathname == '/home' && $location.$$path.length>0)
			$local.goto('/home#' + $location.$$path.substring(1), '#bloc-container')

		$scope.toString = function() {
			return 'Navigation';
		}
	}])