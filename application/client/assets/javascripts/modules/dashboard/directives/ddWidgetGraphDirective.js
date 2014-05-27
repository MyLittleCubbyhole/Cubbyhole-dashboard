angular.module('Dashboard').
	directive('ddWidgetGraph', ['WidgetGraphProvider', function(WidgetGraphProvider){
		return {
			scope: true,
			replace: false,
			require: 'ddWidgetGraph',
			restrict: 'A',
			templateUrl: '/templates/widgets/widgetGraph',
			controller: ['$scope', '$attrs', function($scope, $attrs) {
				var $local = $scope._ddWidgetGraph = {}
				,	self = this;

				$local.widget = {};
				
				self.id  = parseInt($attrs.widgetId, 10);

				$scope.toString = function() {
					return '_ddWidgetGraph';
				}
			}],
			link: function($scope, $node, attributes, self) {
				var $local = $scope._ddWidgetGraph;


				$local.widget = new WidgetGraphProvider($scope._dashydash.widgets[self.id], {scope: $scope, node: $node});
				$local.widget.load()
			}
		};
	}]);