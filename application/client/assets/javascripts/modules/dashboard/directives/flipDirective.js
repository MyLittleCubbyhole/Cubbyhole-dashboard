angular.module('Dashboard').
    directive('flip', function(WidgetGraphProvider){
        return {
            scope: true,
            restrict: 'A',
            link: function($scope, $node, attributes) {
                var $local = $scope._flip = {}

                $local.active = false;

                $scope.$on('stop_edit', function() {
                    $local.active = false;
                })

                $scope.toString = function() {
                    return '_flip';
                }
            }
        };
    });