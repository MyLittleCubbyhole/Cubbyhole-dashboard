angular.module('Dashboard').
    controller('ExportController', ['$scope', function($scope){
        var $local = $scope.Export = {}

        $scope.toString = function() {
            return 'Export';
        }
    }])