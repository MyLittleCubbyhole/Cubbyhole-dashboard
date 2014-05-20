angular.module('Dashboard').
	controller('DashboardController', function($scope){
		var $local = $scope.Dashboard = {};

		$scope.toString = function() {
			return 'Dashboard';
		}
	})