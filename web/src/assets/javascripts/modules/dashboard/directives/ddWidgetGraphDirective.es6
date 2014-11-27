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
                ,   self = this;

                $local.widget = {};
                $local.id  = parseInt($attrs.widgetId, 10);

                self.edit = false;

                $scope.toString = function() {
                    return '_ddWidgetGraph';
                };
            }],
            link: function($scope, $node, attributes, self) {
                var $local = $scope._ddWidgetGraph;

                $local.edit = function() {
                    self.edit = !self.edit;
                    $node.css('z-index', ( self.edit ? ++$scope._dashydash.zIndex : 2 ) );
                };

                $local.widget = new WidgetGraphProvider($scope._dashydash.widgets[$local.id], {scope: $scope, node: $node});
                $local.widget.load();
            }
        };
    }]);