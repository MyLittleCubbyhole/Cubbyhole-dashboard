angular.module('Tools').
    directive('ngAutoFocus', function(){
        return {
            scope: {},
            restrict: 'A',
            link: function($scope, $node) {
                $node.focus();
            }
        };
    });