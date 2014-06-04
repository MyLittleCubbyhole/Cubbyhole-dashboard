angular.module('Dashboard').
	provider('WidgetGraphProvider', function(){

		this.$get = ['ClassService', 'WidgetProvider', 'WidgetFactory', '$window', function(ClassService, WidgetProvider, WidgetFactory, $window) {

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

				self.chartOptions = {};
				self.chartOptions.series = [];

				self.chartOptions.title = {
					text: self.title,
					align: 'left'
				};

    			if(self.stacked)
				self.chartOptions.plotOptions = {
					column: { stacking: 'normal' },
					area: { stacking: 'normal' },
					line: { stacking: 'normal' }
				}

				for(var i = 0; i<self.segments.length; i++) {
					index = self.segments[i].kpi.alias;
					series = { data: [] };

					for(var j = 0; j<data.length; j++)
						series.data.push(data[j][index]);

					if(self.segments[i].options.axis == 'abs' || self.segments.length == 1) {
						axisType = self.segments[i].kpi.datatype;
						absName = index;
						self.chartOptions.xAxis = {};
						self.chartOptions.xAxis.labels = {};
						switch(self.segments[i].kpi.datatype) {
							case 'string':
								axis = _.uniq(series.data, false);
								self.chartOptions.xAxis.categories = axis;
							break;
							case 'date':
								self.chartOptions.xAxis.type = 'datetime';
								self.chartOptions.xAxis.labels.format = '{value:%Y-%m-%d}';
								for(var j = 0; j< series.data.length; j++)
									axis.push( (new Date(series.data[j])).getTime() )
								axis = _.uniq(axis, false);
							break;
							case 'number':
								axis = _.uniq(series.data, false);
							break;
						}

						self.chartOptions.xAxis.labels.rotation = -45;
					}
					else {
						segmentName = index;
						segment = _.uniq(series.data, false);
					}

				}

				var value = '';

				if(!!segment && segment.length > 0)
					for(var i = 0; i<segment.length; i++) {
						index = segment[i];
						alias = self.metrics[0].kpi.alias;

						series = {
							type: self.metrics[0].options.shape,
							name: self.metrics[0].kpi.formattedAlias,
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
						// if(axis.length>0)
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
						// else
						// 	for(var j = 0; j<data.length; j++){
						// 		console.log('passage')
						// 		series.data.push(data[j][alias]);
						// 	}

						self.chartOptions.series.push(series)
					}
				else {

					self.chartOptions.yAxis = [];
					for(var i = 0; i<self.metrics.length; i++) {
						index = self.metrics[i].kpi.alias;

						series = {
							type: self.metrics[i].options.shape,
							name: self.metrics[i].kpi.formattedAlias,
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
								text: self.metrics[i].kpi.formattedAlias
							},
							opposite: i>0
						})

						self.chartOptions.series.push(series)
					}
				}


				this.refresh();
			};

			Widget.prototype.save = function() {
				var self = this
				,	definition = {}
				,	configuration = this._save();

				configuration.stacked = self.stacked;
				definition.title = self.title;
				definition.size = self.size;
				definition.position = self.position;
				definition.id = self.id;
				definition.backgroundcolor = self.backgroundColor;
				definition.fontcolor = self.fontColor;
				definition.dashboardid = self.dashboardId;
				definition.config = configuration;

				WidgetFactory(self.scope).update(definition, angular.noop);

				self.load();
			}

			Widget.prototype.refresh = function() {
				var self = this;
				this.node.find('.widget-front-body').highcharts(self.chartOptions);
			}

			Widget.prototype.toString = function() {
				return 'Widget Graph';
			};

			return Widget
		}]
	})