angular.module('Dashboard').
	provider('WidgetProvider', function(){

		this.$get = ['WIDGET_DEFAULT_SETTINGS', 'QUERY_BUILDER', 'WidgetFactory', '$window', function(WIDGET_DEFAULT_SETTINGS, QUERY_BUILDER, WidgetFactory, $window) {

			var Widget = function(options, context) {
				if(!options || !context)
					return false;

				var self = this;
				self.options = {};
				_.merge(self.options, WIDGET_DEFAULT_SETTINGS, options);

				self.size = {
					width: self.options.size.width,
					height: self.options.size.height
				};
				self.position = {
					x: self.options.position.x,
					y: self.options.position.y
				};
				self.id = self.options.id;
				self.title = self.options.title;
				self.backgroundColor = self.options.backgroundcolor;
				self.fontColor = self.options.fontcolor;
				self.metrics = self.options.metrics;
				self.segments = self.options.segments;
				self.filters = self.options.filters;
				self.dashboardId = self.options.dashboardid;

				self.scope = context.scope;
				self.node = context.node;

				self.operator = self.options.config.operator || 'AND';

				if(self.options.config.metrics)
				for(var i = 0; i<self.options.config.metrics.length; i++)
					self.metrics.push({
						kpi: QUERY_BUILDER[self.options.config.metrics[i].name],
						options: self.options.config.metrics[i]
					});

				if(self.options.config.segments)
				for(var i = 0; i<self.options.config.segments.length; i++)
					self.segments.push({
						kpi: QUERY_BUILDER[self.options.config.segments[i].name],
						options: self.options.config.segments[i]
					});

				if(self.options.config.filters)
				for(var i = 0; i<self.options.config.filters.length; i++)
					self.filters.push({
						kpi: QUERY_BUILDER[self.options.config.filters[i].name],
						operator: self.options.config.filters[i].operator,
						value: self.options.config.filters[i].value
					});

				self.scope.$on('widget_refresh', function() { self.refresh(); })
			};

			Widget.prototype.init = function() { throw 'init method must be overriden'; };

			Widget.prototype.load = function() {
				var self = this;
				WidgetFactory(self.scope).getData(self.dashboardId, self.id, function(data) { self.init(data); })
			};

			Widget.prototype.refresh = function() { };

			Widget.prototype.toString = function() {
				return 'Widget';
			};

			return Widget
		}]
	})