angular.module('Dashboard').
	provider('WidgetPieProvider', function(){

		this.$get = ['ClassService', 'WidgetProvider', '$window', function(ClassService, WidgetProvider, $window) {

			var Widget = function(options, context) {
				var self = this;
				WidgetProvider.call(this, options, context);
				self.chartOptions = {};
			};

			ClassService.extend(WidgetProvider, Widget);

			Widget.prototype.init = function(data) {

				var self = this
				,	series = {}
				,	metricName = self.metrics[0].kpi.alias
				,	segmentName = self.segments[0].kpi.alias;
				self.chartOptions = {};
				self.chartOptions.series = [];

				self.chartOptions.plotOptions = {
					pie: {
						allowPointSelect: false,
						cursor: 'pointer',
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				}

				var serie = {
					type: 'pie',
					name: metricName,
					data: []
				}

				for(var j = 0; j<data.length; j++)
					serie.data.push([data[j][segmentName], data[j][metricName]]);

				self.chartOptions.series.push(serie);

				this.refresh();
			};

			Widget.prototype.refresh = function() {
				var self = this;
				self.chartOptions.title = {
					text: self.title,
					align: 'left'
				};
				this.node.find('.widget-front-body').highcharts(this.chartOptions);
			}

			Widget.prototype.toString = function() {
				return 'Widget Pie';
			};

			return Widget
		}]
	})