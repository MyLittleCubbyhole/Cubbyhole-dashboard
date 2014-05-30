angular.module('Dashboard').
	controller('DashboardController', ['$scope', '$location', '$routeParams', 'DashboardFactory', function($scope, $location, $routeParams, DashboardFactory){
		var $local = $scope.Dashboard = {}

		$local.dashboards = [];
		$local.currentDashboard = {};

		$local.getDashboards = function(callback) {
			DashboardFactory($scope).all(function(data) {
				for(var i = 0; i < data.length; i++)
					$local.dashboards.push(data[i]);

				$local.currentDashboard = $local.dashboards[0];
				callback.call(this);
			})
		}

		$scope.$on('$routeChangeSuccess', function() {

			var next = function() {

				if($location.path() == '/add') {
					var dashboard = {
						id: 0,
						title: '',
						icon: 'icon-earth',
						editMode: true
					};
					$local.dashboards.push(dashboard);
					$local.currentDashboard = dashboard;
				} else {
					var idToFound = $routeParams.id || null;

					for(var i = 0; i < $local.dashboards.length; i++) {
						if(idToFound == $local.dashboards[i].id || idToFound == null) {
							$local.currentDashboard = $local.dashboards[i];
							break;
						}
					}

					if($local.currentDashboard && !idToFound)
						$location.path('/' + $local.currentDashboard.id);
				}

			};

			$local.currentDashboard = {};
			if($local.dashboards === null || $local.dashboards.length == 0)
				$local.getDashboards(function() { next(); });
			else
				next();

		})

		$scope.toString = function() {
			return 'Dashboard';
		}
	}])