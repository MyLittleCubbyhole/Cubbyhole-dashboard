angular.module('Dashboard').
	controller('DashboardController', ['$scope', '$location', '$routeParams', 'DashboardFactory', function($scope, $location, $routeParams, DashboardFactory){
		var $local = $scope.Dashboard = {}

		$local.dashboards = {};
		$local.currentDashboard = {};

		$local.getDashboards = function(callback) {
			DashboardFactory($scope).all(function(data) {
				for(var i = 0; i<data.length; i++)
					$local.dashboards[data[i].id] = data[i];

				$local.currentDashboard = $local.dashboards[data[0].id];
				callback.call(this);
			})
		}

		$scope.$on('$routeChangeSuccess', function() {

			var next = function() {

				var firstDashboard = null;
				for(var dashboard in $local.dashboards) {
					firstDashboard = $local.dashboards[dashboard];
					break;
				}

				var dashboardFound = false;
				if($routeParams.id) {
					var dashboard = $local.dashboards[$routeParams.id];
					if(dashboard) {
						$local.currentDashboard = dashboard;
						dashboardFound = true;
					}
				}

				if(!dashboardFound) {
					$local.currentDashboard = firstDashboard;
					$location.path('/' + firstDashboard);
				}

			}

			$local.currentDashboard = {};
			if($local.dashboards === null || !$local.dashboards.length)
				$local.getDashboards(function() { next(); });
			else
				next();

		})

		$scope.toString = function() {
			return 'Dashboard';
		}
	}])