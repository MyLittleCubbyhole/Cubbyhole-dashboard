angular.module('Authentication').
	controller('AuthenticationController', function($scope){
		var $local = $scope.Authentication = {};

		$scope.toString = function() {
			return 'Authentication';
		}	
	})