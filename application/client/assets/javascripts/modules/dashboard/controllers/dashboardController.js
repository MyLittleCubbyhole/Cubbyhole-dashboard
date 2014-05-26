angular.module('Dashboard').
	controller('DashboardController', function($scope){
		var $local = $scope.Dashboard = {}

		$local.dashboards = [];
		$local.currentDashboard = {};

		$scope.toString = function() {
			return 'Dashboard';
		}
	})