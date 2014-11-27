angular.module('Dashboard').
    controller('DashboardController', ['$scope', '$location', '$routeParams', 'DashboardFactory', function($scope, $location, $routeParams, DashboardFactory){
        var $local = $scope.Dashboard = {}

        $local.dashboards = [];
        $local.currentDashboard = {};
        $local.lockRouteChange = false;

        $local.exportModalVisible = false;
        $local.exportModalLocked = false;

        /**
         * LISTENER - Hide the export popup when triggered
         */
        $scope.$on('hide', function() {
            if(!$local.exportModalLocked) {
                $local.exportModalVisible = false;
                $scope.$broadcast('hide_export_modal');
            }
        });

        /**
         * initialize the dashboard list and the current dashboard
         * in order to use them in the managed view
         * @param  {Function} callback
         */
        function getDashboards(callback) {
            DashboardFactory($scope).all(function(data) {
                for(var i = 0; i < data.length; i++)
                    $local.dashboards.push(data[i]);

                $local.currentDashboard = $local.dashboards[0];
                callback.call(this);
            })
        }

        /**
         * LISTENER - triggered when a route angular is setted
         * - if the routing doesnt contains the dashboard id, the angular view is reloaded
         * - else juste set the current user and load the angular view
         */
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

        /**
         * delete the selected dashboard and all his widgets
         * @param  {Object} $event Angular Event
         */
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

        /**
         * display the export modal
         */
        $local.showExportModal = function() {
            $scope.Overlay.activated = true;
            $local.exportModalVisible = true;
        }

        $scope.toString = function() {
            return 'Dashboard';
        }
    }])