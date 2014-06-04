angular.module('Dashboard').
    controller('WidgetMenuController', ['$scope', 'WIDGET_TYPE', '$rootScope', function($scope, WIDGET_TYPE, $rootScope){
        var $local = $scope.WidgetMenu = {}

        $local.widgets = WIDGET_TYPE;

        $local.create = function(widget, width) {
            var definition = {
                size: {
                    width: width,
                    height: widget.height
                },
                config: widget.config,
                type: widget.type
            }

            $rootScope.$broadcast('create_widget', definition);
        }

        $scope.toString = function() {
            return 'WidgetMenu';
        }
    }])