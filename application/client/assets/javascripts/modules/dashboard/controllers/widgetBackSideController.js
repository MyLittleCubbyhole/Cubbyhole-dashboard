angular.module('Dashboard').
	controller('WidgetBackSideController', ['$scope', function($scope){
		var $local = $scope.WidgetBackSide = {}
		,	widgetScopeName = $scope.$parent.toString()
		,	$widgetScope = $scope[widgetScopeName];

		$local.delete = function() {
			$widgetScope.widget.delete();
		}

		$scope.toString = function() {
			return 'WidgetBackSide';
		}
	}])