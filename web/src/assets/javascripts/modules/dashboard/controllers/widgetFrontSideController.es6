angular.module('Dashboard').
    controller('WidgetFrontSideController', ['$scope', function($scope){
        var $local = $scope.WidgetFrontSide = {},
            widgetScopeName = $scope.$parent.toString();

		$local.inLoading = false;

        /**
         * LISTENER - triggered when the widget is loaded
         * update the inLoading attribute in order to display or not the loader
         * @param  {Boolean} value inLoading status
         */
		$scope.$watch(widgetScopeName + '.widget.inLoading', function(value) {
			$local.inLoading = !!value;
		});

        $scope.toString = function() {
            return 'WidgetFrontSide';
        };
    }]);