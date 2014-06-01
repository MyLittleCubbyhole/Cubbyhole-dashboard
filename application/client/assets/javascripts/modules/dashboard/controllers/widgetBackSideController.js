angular.module('Dashboard').
	controller('WidgetBackSideController', ['$scope', 'QUERY_BUILDER', 'OPERATORS',  function($scope, QUERY_BUILDER, OPERATORS){
		var $local = $scope.WidgetBackSide = {}
		,	widgetScopeName = $scope.$parent.toString()
		,	$widgetScope = $scope[widgetScopeName];

		$local.operators = OPERATORS;
		$local.tab = 'data';
		$local.kpis = {};
		$local.segments = {};
		$local.metrics = {};

		var kpi;
		for(var i in QUERY_BUILDER) {

			kpi = {
				alias: QUERY_BUILDER[i].alias,
				index: QUERY_BUILDER[i].index,
				datatype: QUERY_BUILDER[i].datatype
			}

			if(!$local.kpis[QUERY_BUILDER[i].category])
				$local.kpis[QUERY_BUILDER[i].category] = [];

			$local.kpis[QUERY_BUILDER[i].category].push(kpi);

			if(QUERY_BUILDER[i].type == 'segment' || QUERY_BUILDER[i].type == 'meta') {
				if(!$local.segments[QUERY_BUILDER[i].category])
					$local.segments[QUERY_BUILDER[i].category] = [];
				$local.segments[QUERY_BUILDER[i].category].push(kpi);
			}

			if(QUERY_BUILDER[i].type == 'metric' || QUERY_BUILDER[i].type == 'meta') {
				if(!$local.metrics[QUERY_BUILDER[i].category])
					$local.metrics[QUERY_BUILDER[i].category] = [];
				$local.metrics[QUERY_BUILDER[i].category].push(kpi);
			}

		}

		$local.save = function() {
			$scope._flip.active = !$scope._flip.active;
			$widgetScope.edit()
			$widgetScope.widget.save();
			$scope._dashydash.serialize();
		}

		$local.resize = function(size) {
			size = size || {};
			$widgetScope.widget.resize(size);
		}

		$local.delete = function() {
			$widgetScope.widget.delete();
		}

		$local.addFilter = function() {
			$widgetScope.widget.filters.push({
				kpi: QUERY_BUILDER['count.user'],
				operator: '>',
				value: [0]
			})
		}
		$local.addMetric = function(options) {
			options = angular.extend({ name: QUERY_BUILDER['user.country'].index}, options);
			$widgetScope.widget.metrics.push({
				kpi: QUERY_BUILDER['count.user'],
				options: options
			})
		}
		$local.addSegment = function(options) {
			options = angular.extend({ name: QUERY_BUILDER['user.country'].index}, options);
			$widgetScope.widget.segments.push({
				kpi: QUERY_BUILDER['user.country'],
				options: options
			})
		}

		$scope.toString = function() {
			return 'WidgetBackSide';
		}
	}])