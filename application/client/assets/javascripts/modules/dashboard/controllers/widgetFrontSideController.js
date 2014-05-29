angular.module('Dashboard').
	controller('WidgetFrontSideController', ['$scope', function($scope){
		var $local = $scope.WidgetFrontSide = {}
		,	editmode = false;

		$local.flip = function() {
			editmode = !editmode;
			
		}

		$scope.toString = function() {
			return 'WidgetFrontSide';
		}
	}])