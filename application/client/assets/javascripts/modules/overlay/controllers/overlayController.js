angular.module('Overlay').
	controller('OverlayController', ['$scope', function($scope){
		var $local = $scope.Overlay = {};

		$local.activated = false;
		$local.pusherOpen = false;

		$scope.$on('enable_overlay', function() { $local.activated = true; });

		$local.clickout = function() {
			$local.activated = false;
			$local.pusherOpen = false;
			$scope.$broadcast('hide');
		}

		$scope.toString = function() {
			return 'Overlay';
		}
	}])