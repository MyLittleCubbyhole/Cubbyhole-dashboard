angular.module('Dashboard').
	provider('WidgetGraphProvider', function(){

		this.$get = ['ClassService', 'WidgetProvider', '$window', function(ClassService, WidgetProvider, $window) {

			var Widget = function(options, context) {
				var self = this;
				WidgetProvider.call(this, options, context);

				self.chartOptions = {};
			};

			ClassService.extend(WidgetProvider, Widget);

			Widget.prototype.init = function(data) {
				var self = this
				,	$node = self.node.find('.widget-front-body')
				,	series = {}
				,	index = '';

				self.chartOptions.title = {
					text: self.title,
					align: 'left'
				};

				self.chartOptions.series = [];
				self.chartOptions.yAxis = [];

				for(var i = 0; i<self.metrics.length; i++) {
					index = self.metrics[i].kpi.alias;

					series = {
						type: self.metrics[i].options.shape,
						name: index,						
						marker: { enabled: false },
						data: [],
						yAxis: i
					};

					switch(self.metrics[i].options.shape) {
						case 'area': 
							series.zIndex = 0;
						break;
						case 'column': 
							series.zIndex = 1;
						break;
						case 'line': 
							series.zIndex = 2;
						break;
					}

					for(var j = 0; j<data.length; j++)
						series.data.push(data[j][index]);

					self.chartOptions.yAxis.push({
						title: {
							text: index
						},
						opposite: i>0
					})

					self.chartOptions.series.push(series)
				}
				for(var i = 0; i<self.segments.length; i++) {
					index = self.segments[i].kpi.alias;
					series = { data: [] };

					for(var j = 0; j<data.length; j++)
						series.data.push(data[j][index]);

					if(self.segments[i].kpi.datatype == 'string')
						self.chartOptions.xAxis = { categories: series.data };
				}
				console.log(self.chartOptions)
				this.refresh();
			};

			Widget.prototype.refresh = function() {
				this.node.find('.widget-front-body').highcharts(this.chartOptions);
			}

			Widget.prototype.toString = function() {
				return 'Widget Graph';
			};

			return Widget
		}]
	})