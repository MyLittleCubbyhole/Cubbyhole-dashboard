angular.module('Dashboard').
	provider('WidgetTableProvider', function(){

		this.$get = ['ClassService', 'WidgetProvider', '$window', function(ClassService, WidgetProvider, $window) {

			var Widget = function(options, context) {
				var self = this;
				WidgetProvider.call(this, options, context);
				self.value = 0;
				self.kpis = [];
			};

			ClassService.extend(WidgetProvider, Widget);

			Widget.prototype.init = function(data) {
				var self = this
				,	datatype
				,	index
				,	row;
				self.kpis = [];
				self.head = [];

				for(var i = 0; i < self.metrics.length; i++) {
					self.head.push(self.metrics[i].kpi.alias);
					self.kpis.push(self.metrics[i].kpi);
				}
				for(var i = 0; i < self.segments.length; i++) {
					self.head.push(self.segments[i].kpi.alias);
					self.kpis.push(self.segments[i].kpi);
				}

				self.kpis.push({});


				self.body = [];
				for(var i = 0; i < data.length; i++) {
					row = [];

					for(var j = 0; j < self.metrics.length; j++) {
						index = self.metrics[j].kpi.alias;
						datatype = self.metrics[j].kpi.datatype;
						switch(datatype) {
							case 'date':
								row.push( moment( new Date(data[i][index]) ).format("MMM Do YYYY") );
							break;
							default:
								row.push( data[i][index] );
							break;
						}

					}
					for(var j = 0; j < self.segments.length; j++) {
						index = self.segments[j].kpi.alias;
						datatype = self.segments[j].kpi.datatype;
						switch(datatype) {
							case 'date':
								row.push( moment( new Date(data[i][index]) ).format("MMM Do YYYY") );
							break;
							default:
								row.push( data[i][index] );
							break;
						}
					}

					self.body.push(row);
				}

			};

			Widget.prototype.refresh = function() {}

			Widget.prototype.toString = function() {
				return 'Widget Table';
			};

			return Widget
		}]
	})