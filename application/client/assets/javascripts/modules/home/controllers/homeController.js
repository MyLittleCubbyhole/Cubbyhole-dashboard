angular.module('Home').
	controller('HomeController', function($scope){
		var $local = $scope.Home = {};

		$scope.toString = function() {
			return 'Home';
		}
	})