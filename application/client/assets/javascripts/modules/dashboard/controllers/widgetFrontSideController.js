angular.module('Dashboard').
	controller('WidgetFrontSideController', ['$scope', function($scope){
		var $local = $scope.WidgetFrontSide = {}

		$scope.toString = function() {
			return 'WidgetFrontSide';
		}
	}])