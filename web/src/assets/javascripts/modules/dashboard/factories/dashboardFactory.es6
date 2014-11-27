angular.module('Dashboard').
    factory('DashboardFactory', ['$http', function($http){

        return function($scope, context) {
            context = context || {};

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {}
            ,   $node = context.node || {}
            ,   $local = context.local || {}
            ,   controller = context.controller || {};

            /**
             * call the api in order to create a new dashboard
             * @param  {Object}   dashboard { name:.., icon:..}
             * @param  {Function} callback 
             */
            prototype.create = function(dashboard, callback) {

                $http({ method: 'POST', url: '/api/dashboards/', data: dashboard }).
                    success(function(dashboards) { callback.call(this, dashboards); }).
                    error(function() { callback.call(this, null); console.error('an error occured during the dashboard creation'); });
            };

            /**
             * call the api in order to update the selected dashboard
             * @param  {Object}   dashboard { name: .., icon: ..}
             * @param  {Function} callback 
             */
            prototype.update = function(dashboard, callback) {

                $http({ method: 'PUT', url: '/api/dashboards/' + dashboard.id, data: dashboard }).
                    success(function(dashboards) { callback.call(this, dashboards); }).
                    error(function() { callback.call(this, null); console.error('an error occured during the dashboard update'); });
            };

            /**
             * remove the dashboard from the database
             * @param  {integer}   dashboardId 
             * @param  {Function} callback    
             */
            prototype.remove = function(dashboardId, callback) {

                $http({ method: 'DELETE', url: '/api/dashboards/' + dashboardId }).
                    success(function(data) { callback.call(this, data); }).
                    error(function() { callback.call(this, null); console.error('an error occured during the dashboard deletion'); });
            };

            /**
             * retrieve a dashboard from the database
             * @param  {integer}   dashboardId dashboard id
             * @param  {Function} callback    
             */
            prototype.get = function(dashboardId, callback) {

                $http({ method: 'GET', url: '/api/dashboards/' + dashboardId }).
                    success(function(dashboard) { callback.call(this, dashboard); }).
                    error(function() { callback.call(this, null); console.error('an error occured during the dashboard recuperation'); });
            };

            /**
             * retrieve all the dashboards
             * @param  {Function} callback 
             */
            prototype.all = function(callback) {

                $http({ method: 'GET', url: '/api/dashboards' }).
                    success(function(dashboards) { callback.call(this, dashboards); }).
                    error(function() { callback.call(this, null); console.error('an error occured during the dashboards recuperation'); });
            };

            return prototype;
        };
    }]);