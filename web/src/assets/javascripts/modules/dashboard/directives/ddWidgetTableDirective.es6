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
                ,   self = this;

                $local.widget = {};
                $local.id  = parseInt($attrs.widgetId, 10);

                self.edit = false;

                $scope.toString = function() {
                    return '_ddWidgetTable';
                };
            }],
            link: function($scope, $node, attributes, self) {
                var $local = $scope._ddWidgetTable;

                $local.edit = function() {
                    self.edit = !self.edit;
                    $node.css('z-index', ( self.edit ? ++$scope._dashydash.zIndex : 2 ) );
                };

                $local.widget = new WidgetTableProvider($scope._dashydash.widgets[$local.id], {scope: $scope, node: $node});
                $local.widget.load();
            }
        };
    }]);