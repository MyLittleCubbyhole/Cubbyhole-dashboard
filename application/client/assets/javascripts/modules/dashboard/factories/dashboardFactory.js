angular.module('Dashboard').
	factory('DashboardFactory', ['$http', function($http){

		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};
		
			prototype.create = function(dashboard, callback) {

				$http({	method: 'POST', url: '/api/dashboards', data: dashboard }).
					success(function(dashboards) { callback.call(this, dashboards); }).
					error(function() { console.error('an error occured during the dashboard creation'); });
			};
			prototype.remove = function(dashboardId, callback) {

				$http({	method: 'DELETE', url: '/api/dashboards/' + dashboardId }).
					success(function() { callback.call(this); }).
					error(function() { console.error('an error occured during the dashboard deletion'); });
			};

			prototype.get = function(dashboardId, callback) {

				$http({	method: 'GET', url: '/api/dashboards/' + dashboardId }).
					success(function(dashboard) { callback.call(this, dashboard); }).
					error(function() { console.error('an error occured during the dashboard recuperation'); });
			};

			prototype.all = function(callback) {

				$http({	method: 'GET', url: '/api/dashboards' }).
					success(function(dashboards) { callback.call(this, dashboards); }).
					error(function() { console.error('an error occured during the dashboards recuperation'); });
			};

			return prototype;
		};
	}]);