angular.module('Dashboard').
    directive('flip', function(WidgetGraphProvider){
        return {
            scope: true,
            restrict: 'A',
            require: 'flip',
            controller: ['$scope', '$attrs', function($scope, $attrs) {
                var $local = $scope._flip = {}
                ,   self = this;

                $local.active = angular.noop;
            }],
            link: function($scope, $node, attributes) {
                var $local = $scope._flip;

                $local._active = false;

                $scope.$on('stop_edit', function() {
                    $local._active = false;
                });

            }
        };
    });