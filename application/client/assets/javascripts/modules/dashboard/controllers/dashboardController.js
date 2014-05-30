angular.module('Dashboard').
	controller('DashboardController', ['$scope', 'DashboardFactory', function($scope, DashboardFactory){
		var $local = $scope.Dashboard = {}

		$local.dashboards = {};
		$local.currentDashboard = {};

		DashboardFactory($scope).all(function(data) {
			for(var i = 0; i<data.length; i++)
				$local.dashboards[data[i].id] = data[i];

			$local.currentDashboard = $local.dashboards[data[0].id];
		})

		$scope.toString = function() {
			return 'Dashboard';
		}
	}])