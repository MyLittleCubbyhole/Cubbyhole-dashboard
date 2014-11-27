angular.module('Dashboard').
    controller('WidgetMenuController', ['$scope', 'WIDGET_TYPE', '$rootScope', function($scope, WIDGET_TYPE, $rootScope){
        var $local = $scope.WidgetMenu = {};

        $local.widgets = WIDGET_TYPE;

        /**
         * create a new widget and append it to the current dashboard
         * @param  {Object} widget Widget configuration
         * @param  {integer} width  base width
         */
        $local.create = function(widget, width) {
            var definition = {
                size: {
                    width: width,
                    height: widget.height
                },
                config: widget.config,
                type: widget.type
            };

            $rootScope.$broadcast('create_widget', definition);
        };

        $scope.toString = function() {
            return 'WidgetMenu';
        };
    }]);