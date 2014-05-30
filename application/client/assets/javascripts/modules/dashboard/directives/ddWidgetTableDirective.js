angular.module('Dashboard').
	directive('ddWidgetTable', ['WidgetTableProvider', function(WidgetTableProvider){
		return {
			scope: true,
			replace: false,
			require: 'ddWidgetTable',
			restrict: 'A',
			templateUrl: '/templates/widgets/widgetTable',
			controller: ['$scope', '$attrs', function($scope, $attrs) {
				var $local = $scope._ddWidgetTable = {}
				,	self = this;

				$local.widget = {};

				self.id  = parseInt($attrs.widgetId, 10);

				$scope.toString = function() {
					return '_ddWidgetTable';
				}
			}],
			link: function($scope, $node, attributes, self) {
				var $local = $scope._ddWidgetTable;

				$local.widget = new WidgetTableProvider($scope._dashydash.widgets[self.id], {scope: $scope, node: $node});
				$local.widget.load()
			}
		};
	}]);