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
				
				$http({	method: 'POST', url: '/dashboards/' + dashboardId + '/widgets', data: definition }).
					success(function(widgetDefinition) { callback.call(this, widgetDefinition); }).
					error(function() { console.error('an error occured during the widget creation'); });
			};

			prototype.remove = function() {};
			prototype.get = function() {};
			prototype.all = function() {};

			return prototype;
		};
	}]);