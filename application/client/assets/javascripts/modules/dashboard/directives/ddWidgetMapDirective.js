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

                self.id  = parseInt($attrs.widgetId, 10);

                $scope.toString = function() {
                    return '_ddWidgetMap';
                }
            }],
            link: function($scope, $node, attributes, self) {
                var $local = $scope._ddWidgetMap;

                console.log($scope._dashydash.widgets[self.id])
                $local.widget = new WidgetMapProvider($scope._dashydash.widgets[self.id], {scope: $scope, node: $node});
                $local.widget.load();
            }
        };
    }]);