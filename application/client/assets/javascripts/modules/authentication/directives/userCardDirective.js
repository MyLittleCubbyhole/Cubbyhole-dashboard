angular.module('Authentication').
    directive('userCard', [function(){
        return {
            scope: true,
            replace: false,
            require: 'userCard',
            restrict: 'A',
            controller: ['$scope', '$attrs', function($scope, $attrs) {
                var $local = $scope._userCard = {}
                ,   self = this;

                $scope.toString = function() {
                    return '_userCard';
                }
            }],
            link: function($scope, $node, attributes, self) {
                var $local = $scope._userCard;

                $node.appendTo(angular.element('body'));
            }
        };
    }]);