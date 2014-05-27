angular.module('Dashboard').
	controller('WidgetBackSideController', ['$scope', function($scope){
		var $local = $scope.WidgetBackSide = {}

		$scope.toString = function() {
			return 'WidgetBackSide';
		}
	}])