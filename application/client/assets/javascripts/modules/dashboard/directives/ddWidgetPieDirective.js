angular.module('Dashboard').
	directive('ddWidgetPie', ['WidgetPieProvider', function(WidgetPieProvider){
		return {
			scope: true,
			replace: false,
			require: 'ddWidgetPie',
			restrict: 'A',
			templateUrl: '/templates/widgets/widgetPie',
			controller: ['$scope', '$attrs', function($scope, $attrs) {
				var $local = $scope._ddWidgetPie = {}
				,	self = this;

				$local.widget = {};

				self.edit = false;
				self.id  = parseInt($attrs.widgetId, 10);

				$scope.toString = function() {
					return '_ddWidgetPie';
				}
			}],
			link: function($scope, $node, attributes, self) {
				var $local = $scope._ddWidgetPie;

                $local.edit = function() {
                    self.edit = !self.edit;
                    $node.css('z-index', ( self.edit ? ++$scope._dashydash.zIndex : 2 ) );
                }

				$local.widget = new WidgetPieProvider($scope._dashydash.widgets[self.id], {scope: $scope, node: $node});
				$local.widget.load()
			}
		};
	}]);