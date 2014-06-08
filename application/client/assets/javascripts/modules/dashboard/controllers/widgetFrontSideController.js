angular.module('Dashboard').
    controller('WidgetFrontSideController', ['$scope', function($scope){
        var $local = $scope.WidgetFrontSide = {}
        ,   widgetScopeName = $scope.$parent.toString()
        ,   $widgetScope = $scope[widgetScopeName];

		$local.inLoading = false;

		$scope.$watch(widgetScopeName + '.widget.inLoading', function(value) {
			$local.inLoading = !!value;
		})

        $scope.toString = function() {
            return 'WidgetFrontSide';
        }
    }])