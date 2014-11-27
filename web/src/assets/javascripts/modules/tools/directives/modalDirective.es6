angular.module('Tools').
    directive('modal', [function() {
        return {
            scope: true,
            controller: function($scope) {
                var $local = $scope._modal = {}
                ,   self = this;

                $local.close = function() {
                    $scope.Overlay.clickout();
                }

                $scope.toString = function() {
                    return '_modal';
                }
            },
            require: 'modal',
            restrict: 'A',
            link: function($scope, $node, attributes, self) {
                var $local = $scope._modal;

                $local.node = $node;
                $node.appendTo(angular.element('body'));
            }
        };
    }]);