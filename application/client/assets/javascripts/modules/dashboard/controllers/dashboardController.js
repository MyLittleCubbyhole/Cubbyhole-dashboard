angular.module('Dashboard').
	controller('DashboardController', ['$scope', '$location', '$routeParams', 'DashboardFactory', 'CaptureService', function($scope, $location, $routeParams, DashboardFactory, CaptureService){
		var $local = $scope.Dashboard = {}

		$local.dashboards = [];
		$local.currentDashboard = {};
		$local.lockRouteChange = false;

		function getDashboards(callback) {
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
				}
				else {
					var idToFound = $routeParams.id || null;

					for(var i = 0; i < $local.dashboards.length; i++)
						if(idToFound == $local.dashboards[i].id || idToFound == null) {
							$local.currentDashboard = $local.dashboards[i];
							break;
						}

					if($local.currentDashboard && !idToFound)
						$location.path('/' + $local.currentDashboard.id);
				}

			};

			if(!$local.lockRouteChange) {
				$local.lockRouteChange = true;
				$local.currentDashboard = {};
				if($local.dashboards === null || $local.dashboards.length == 0)
					getDashboards(next);
				else
					next();
			}

		});

		$local.delete = function($event) {
			if($event) {
				$event.stopPropagation();
				$event.preventDefault();
			}
			DashboardFactory($scope).remove($local.currentDashboard.id, function(data) {
				if(data.information && data.information.indexOf('error') == -1) {

					var index = $local.dashboards.indexOf($local.currentDashboard);
					if(index > -1)
						$local.dashboards.splice(index, 1);

					$local.currentDashboard = $local.dashboards[0];
				}
			})
		}

		$local.capture = function() {
			var $board = angular.element('.dd-board');
			CaptureService($board, $local.currentDashboard.title);
		}

		$scope.toString = function() {
			return 'Dashboard';
		}
	}])