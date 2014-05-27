angular.module('Dashboard').
	directive('ddWidgetGraph', ['WidgetProvider', function(WidgetProvider){
		return {
			scope: true,
			replace: true,
			require: 'ddWidgetGraph',
			restrict: 'E',
			template: '<section class="dd-widget">bouh</section>',
			controller: ['$scope', '$attrs', function($scope, $attrs) {
				var $local = $scope._ddWidgetGraph = {}
				,	self = this;
				
				self.id  = parseInt($attrs.widgetId, 10);

				$scope.toString = function() {
					return '_ddWidgetGraph';
				}
			}],
			link: function($scope, $node, attributes, self) {
				var $local = $scope._ddWidgetGraph;


				var t = new WidgetProvider($scope._dashydash.widgets[self.id], {scope: $scope, node: $node});
				t.load()
			}
		};
	}]);