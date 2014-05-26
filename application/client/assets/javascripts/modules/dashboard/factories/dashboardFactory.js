angular.module('Dashboard').
	factory('DashboardFactory', function(){

		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};
		
			prototype.create = function() {};
			prototype.remove = function() {};
			prototype.get = function() {};
			prototype.all = function() {};

			return prototype;
		};
	});