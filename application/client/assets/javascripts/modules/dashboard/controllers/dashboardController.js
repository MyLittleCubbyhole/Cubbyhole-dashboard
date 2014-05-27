angular.module('Dashboard').
	controller('DashboardController', ['$scope', 'DashboardFactory', function($scope, DashboardFactory){
		var $local = $scope.Dashboard = {}

		$local.dashboards = [];
		$local.currentDashboard = {};

		DashboardFactory($scope).get(1, function(data) { $local.currentDashboard = data; })
		// DashboardFactory($scope).all(function(data) {console.log(data)})

		$scope.toString = function() {
			return 'Dashboard';
		}
	}])