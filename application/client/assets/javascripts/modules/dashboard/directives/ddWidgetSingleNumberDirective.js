angular.module('Dashboard').
	directive('ddWidgetSingleNumber', ['WidgetSingleNumberProvider', function(WidgetSingleNumberProvider){
		return {
			scope: true,
			replace: false,
			require: 'ddWidgetSingleNumber',
			restrict: 'A',
			templateUrl: '/templates/widgets/widgetSingleNumber',
			controller: ['$scope', '$attrs', function($scope, $attrs) {
				var $local = $scope._ddWidgetSingleNumber = {}
				,	self = this;

				$local.widget = {};

				self.edit = false;
				self.id  = parseInt($attrs.widgetId, 10);

				$scope.toString = function() {
					return '_ddWidgetSingleNumber';
				}
			}],
			link: function($scope, $node, attributes, self) {
				var $local = $scope._ddWidgetSingleNumber;

                $local.edit = function() {
                    self.edit = !self.edit;
                    $node.css('z-index', ( self.edit ? ++$scope._dashydash.zIndex : 2 ) );
                }

				$local.widget = new WidgetSingleNumberProvider($scope._dashydash.widgets[self.id], {scope: $scope, node: $node});
				$local.widget.load()
			}
		};
	}]);