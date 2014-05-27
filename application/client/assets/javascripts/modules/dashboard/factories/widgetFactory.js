angular.module('Dashboard').
	factory('WidgetFactory', ['$http', function($http){

		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};
		
			prototype.create = function(dashboardId, definition, callback) {
				
				$http({	method: 'POST', url: '/api/dashboards/' + dashboardId + '/widgets', data: definition }).
					success(function(widgetDefinition) { callback.call(this, widgetDefinition); }).
					error(function() { console.error('an error occured during the widget creation'); });
			};

			prototype.remove = function(dashboardId, widgetId, callback) {

				$http({	method: 'DELETE', url: '/api/dashboards/' + dashboardId + '/widgets/' + widgetId}).
					success(function() { callback.call(this); }).
					error(function() { console.error('an error occured during the widget deletion'); });

			};

			prototype.get = function(dashboardId, widgetId, callback) {

				$http({	method: 'GET', url: '/api/dashboards/' + dashboardId + '/widgets/' + widgetId }).
					success(function(widgets) { callback.call(this, widgets); }).
					error(function() { console.error('an error occured during the widget recuperation'); });
			};
			
			prototype.getByDashboardId = function(dashboardId, callback) {
				
				$http({	method: 'GET', url: '/api/dashboards/' + dashboardId + '/widgets' }).
					success(function(widgets) { callback.call(this, widgets); }).
					error(function() { console.error('an error occured during the widget recuperation'); });
			};

			prototype.getData = function(dashboardId, widgetId, callback) {

				$http({	method: 'GET', url: '/api/dashboards/' + dashboardId + '/widgets/' + widgetId + '/data' }).
					success(function(data) { callback.call(this, data); }).
					error(function() { console.error('an error occured during the data recuperation'); });
			};
			

			return prototype;
		};
	}]);