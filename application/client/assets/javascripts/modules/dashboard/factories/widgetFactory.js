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
					success(function(widgetDefinition) { callback && callback.call(this, widgetDefinition); }).
					error(function() { console.error('an error occured during the widget creation'); });
			};

			prototype.remove = function(dashboardId, widgetId, callback) {

				$http({	method: 'DELETE', url: '/api/dashboards/' + dashboardId + '/widgets/' + widgetId}).
					success(function() { callback && callback.call(this); }).
					error(function() { console.error('an error occured during the widget deletion'); });

			};

			prototype.get = function(dashboardId, widgetId, callback) {

				$http({	method: 'GET', url: '/api/dashboards/' + dashboardId + '/widgets/' + widgetId }).
					success(function(widgets) { callback && callback.call(this, widgets); }).
					error(function() { console.error('an error occured during the widget recuperation'); });
			};
			
			prototype.getByDashboardId = function(dashboardId, callback) {
				
				$http({	method: 'GET', url: '/api/dashboards/' + dashboardId + '/widgets' }).
					success(function(widgets) { callback && callback.call(this, widgets); }).
					error(function() { console.error('an error occured during the widget recuperation'); });
			};

			prototype.getData = function(dashboardId, widgetId, callback) {

				$http({	method: 'GET', url: '/api/dashboards/' + dashboardId + '/widgets/' + widgetId + '/data' }).
					success(function(data) { callback && callback.call(this, data); }).
					error(function() { console.error('an error occured during the data recuperation'); });
			};

			prototype.updatePosition = function(dashboardId, serialization, callback) {

				$http({method: 'PUT', url: '/api/dashboards/' + dashboardId + '/widgets/position', data: JSON.stringify(serialization)}).
					success(function(data) { callback && callback.call(this); }).
					error(function() { console.error('an error occured when trying to save widgets position'); })
			}

			prototype.update = function(definition, callback) {

				$http({method: 'PUT', url: '/api/dashboards/' + definition.dashboardid + '/widgets/' + definition.id, data: JSON.stringify(definition)}).
					success(function(data) { callback && callback.call(this); }).
					error(function() { console.error('an error occured when trying to update widget'); })
			}
			

			return prototype;
		};
	}]);