angular.module('Dashboard').
	provider('WidgetGraphProvider', function(){

		this.$get = ['ClassService', 'WidgetProvider', '$window', function(ClassService, WidgetProvider, $window) {

			var Widget = function(options, context) {
				var self = this;
				WidgetProvider.call(this, options, context);

				self.chartOptions = {};
				self.stacked = self.options.config.stacked || false;
			};

			ClassService.extend(WidgetProvider, Widget);

			Widget.prototype.init = function(data) {
				var self = this
				,	$node = self.node.find('.widget-front-body')
				,	series = {}
				,	segment = []
				,	absName = ''
				,	segmentName = ''
				,	axis = []
				,	axisType = ''
				,	index = '';

				if(!data || data.length == 0)
					return true;

				self.chartOptions.series = [];

    			if(self.stacked)
				self.chartOptions.plotOptions = {
					column: { stacking: 'normal' },
					area: { stacking: 'normal' }
				}

				for(var i = 0; i<self.segments.length; i++) {
					index = self.segments[i].kpi.alias;
					series = { data: [] };

					for(var j = 0; j<data.length; j++)
						series.data.push(data[j][index]);

					if(self.segments[i].options.axis == 'abs' || self.segments.length == 1) {
						axisType = self.segments[i].kpi.datatype;
						absName = index;
						switch(self.segments[i].kpi.datatype) {
							case 'string':
								self.chartOptions.xAxis = { categories: series.data };
							break;
							case 'date':
								self.chartOptions.xAxis = { type: 'datetime' };
								for(var i = 0; i< series.data.length; i++)
									axis.push( (new Date(series.data[i])).getTime() )
								axis = _.uniq(axis, false);
							break;
							case 'number':
								axis = series.data;
								axis = _.uniq(axis, false);
							break;
						}
					}
					else {
						segmentName = index;
						segment = _.uniq(series.data, false);
					}

				}

				var value = '';
				if(self.metrics.length > 1) {

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
						var witness = false;
						if(axis.length>0)
							for(var j = 0; j<axis.length; j++) {
								witness = false;
								for(var k = 0; k<data.length; k++) {
									value = axisType == 'date' ? (new Date(data[k][absName])).getTime() : data[k][absName];
									if(value == axis[j]) {
										witness = true;
										series.data.push([axis[j], data[k][index]]);
									}
								}
								if(!witness)
									series.data.push([axis[j], 0]);
							}
						else
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
				}
				else
					for(var i = 0; i<segment.length; i++) {
						index = segment[i];
						alias = self.metrics[0].kpi.alias;

						series = {
							type: self.metrics[0].options.shape,
							name: index,						
							marker: { enabled: false },
							data: [],
               				stack: segmentName
						};

						switch(self.metrics[0].options.shape) {
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

						var witness = false;
						if(axis.length>0)
							for(var j = 0; j<axis.length; j++) {
								witness = false;
								for(var k = 0; k<data.length; k++) {
									value = axisType == 'date' ? (new Date(data[k][absName])).getTime() : data[k][absName];
									if(value == axis[j] && data[k][segmentName] == index) {										
										witness = true;
										series.data.push([axis[j], data[k][alias]]);
									}
								}
								if(!witness)
									series.data.push([axis[j], 0]);
							}
						else
							for(var j = 0; j<data.length; j++)
								series.data.push(data[j][alias]);

						self.chartOptions.series.push(series)
					}


				this.refresh();
			};

			Widget.prototype.refresh = function() {
				var self = this;
				self.chartOptions.title = {
					text: self.title,
					align: 'left'
				};
				this.node.find('.widget-front-body').highcharts(self.chartOptions);
			}

			Widget.prototype.toString = function() {
				return 'Widget Graph';
			};

			return Widget
		}]
	})