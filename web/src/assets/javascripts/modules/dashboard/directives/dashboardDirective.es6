angular.module('Dashboard').
    directive('dashboard', ['DashboardFactory', function(DashboardFactory){
        return {
            scope: true,
            replace: false,
            require: 'dashboard',
            restrict: 'A',
            controller: ['$scope', '$attrs', function($scope, $attrs) {
                var $local = $scope._dashboard = {};

                /**
                 * manage the dashboard edit mode
                 */
                $local.edit = function() {
                    if($local.isSelected) {
                        $local.dashboard.editMode = true;
                        $local.oldTitle = $local.dashboard.title;
                        $local.oldIcon = $local.dashboard.icon;
                    }
                };

                /**
                 * return true if the current widget is selected
                 * @return {Boolean} isSelected
                 */
                $local.isSelected = function() {
                    return $scope.Dashboard.currentDashboard.id === $local.dashboard.id;
                };

                /**
                 * create or update a new dashboard
                 * managed in the dashboard left menu
                 * @param  {Object} $event Angular Event
                 */
                $local.validEdit = function($event) {
                    var keyCode = event ? event.keyCode : -1;
                    if(keyCode === 13 || keyCode === -1) {
                        $local.dashboard.editMode = false;
                        if($local.dashboard.title !== '' && $local.dashboard.title.indexOf('/') === -1 && $local.dashboard.title.indexOf('\\') === -1) {
                            if($local.dashboard.id === 0) {
                                DashboardFactory($scope).create($local.dashboard, function(data) {
                                    if(data && data.dashboard && data.dashboard.id) {
                                        $local.dashboard.id = data.dashboard.id;
                                        $scope.DashboardMenu.location(data.dashboard.id);
                                    }
                                    else {
                                        $scope.Dashboard.dashboards.pop();
                                        $scope.DashboardMenu.location($scope.Dashboard.dashboards[0].id);
                                    }
                                });
                            } else {
                                DashboardFactory($scope).update($local.dashboard, function(data) {
                                    if(!data || !data.dashboard || !data.dashboard.id) {
                                        $local.dashboard.title = $local.oldTitle;
                                        $local.dashboard.icon = $local.oldIcon;
                                    }
                                });
                            }
                        } else
                            $local.cancelEdit();
                    }
                };

                /**
                 * cancel the edition mode of the current dashboard
                 */
                $local.cancelEdit = function() {
                    $local.dashboard.editMode = false;
                    $local.dashboard.title = $local.oldTitle;
                    if($local.dashboard.id === 0) {
                        $scope.Dashboard.dashboards.pop();
                        $scope.DashboardMenu.location($scope.Dashboard.dashboards[0].id);
                    }
                };

                $scope.toString = function() {
                    return '_dashboard';
                };
            }],
            link: function($scope, $node, attributes, self) {
                var $local = $scope._dashboard;

                for(var i = 0; i < $scope.Dashboard.dashboards.length; i++) {
	                if($scope.Dashboard.dashboards[i].id == attributes.dashboardId) {
		                $local.dashboard = $scope.Dashboard.dashboards[i];
		                $local.oldTitle = $local.dashboard.title;
		                $local.oldIcon = $local.dashboard.icon;
		                break;
	                }
                }

                /**
                 * LISTENER - triggered when tu current dashboard is update or initialized
                 */
                $scope.$watch('Dashboard.currentDashboard', function() {
                    if(!$local.isSelected() && $local.dashboard.editMode) {
                        $local.dashboard.editMode = false;
                        $local.dashboard.title = $local.oldTitle;
                        $local.dashboard.icon = $local.oldIcon;
                    }
                    if(!$local.isSelected() && $local.dashboard.id === 0)
                        $scope.Dashboard.dashboards.pop();
                });

            }
        };
    }]);