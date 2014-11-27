angular.module('Dashboard').
    directive('ddWidgetMap', ['WidgetMapProvider', function(WidgetMapProvider){
        return {
            scope: true,
            replace: false,
            require: 'ddWidgetMap',
            restrict: 'A',
            templateUrl: '/templates/widgets/widgetMap',
            controller: ['$scope', '$attrs', function($scope, $attrs) {
                var $local = $scope._ddWidgetMap = {}
                ,   self = this;

                $local.widget = {};
                $local.id  = parseInt($attrs.widgetId, 10);
                self.edit = false;


                $scope.toString = function() {
                    return '_ddWidgetMap';
                }
            }],
            link: function($scope, $node, attributes, self) {
                var $local = $scope._ddWidgetMap;

                $local.edit = function() {
                    self.edit = !self.edit;
                    $node.css('z-index', ( self.edit ? ++$scope._dashydash.zIndex : 2 ) );
                }

                $local.widget = new WidgetMapProvider($scope._dashydash.widgets[$local.id], {scope: $scope, node: $node});
                $local.widget.load();
            }
        };
    }]);