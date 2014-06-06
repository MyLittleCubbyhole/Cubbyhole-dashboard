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
                ,   datatype
                ,   index
                ,   row;
                self.kpis = [];
                self.head = [];

                for(var i = 0; i < self.metrics.length; i++) {
                    self.head.push(self.metrics[i].kpi.formattedAlias);
                    self.kpis.push(self.metrics[i]);
                }
                for(var i = 0; i < self.segments.length; i++) {
                    self.head.push(self.segments[i].kpi.formattedAlias);
                    self.kpis.push(self.segments[i]);
                }

                while(self.kpis.length < self.size.width * 2 + 1)
                    self.kpis.push({});


                self.body = [];
                for(var i = 0; i < data.length; i++) {
                    row = [];

                    for(var j = 0; j < self.metrics.length; j++) {
                        index = self.metrics[j].kpi.alias;
                        datatype = self.metrics[j].kpi.format;
                        switch(datatype) {
                            case 'date':
                                row.push( moment( new Date(data[i][index]) ).format("MMM Do YYYY") );
                            break;
                            case 'bytes':
                                row.push(self.getFormatedValue(data[i][index], datatype));
                            break;
                            case 'money':
                                row.push(self.getFormatedValue(data[i][index], datatype));
                            break;
                            default:
                                row.push( data[i][index] );
                            break;
                        }

                    }
                    for(var j = 0; j < self.segments.length; j++) {
                        index = self.segments[j].kpi.alias;
                        datatype = self.segments[j].kpi.format;
                        switch(datatype) {
                            case 'date':
                                row.push( moment( new Date(data[i][index]) ).format("MMM Do YYYY") );
                            break;
                            case 'bytes':
                                row.push(self.getFormatedValue(data[i][index], datatype));
                            break;
                            case 'money':
                                row.push(self.getFormatedValue(data[i][index], datatype));
                            break;
                            default:
                                row.push( data[i][index] );
                            break;
                        }
                    }

                    self.body.push(row);
                }

            };

            Widget.prototype._save = function() {
                var configuration = {}
                ,   options
                ,   self = this;
                configuration.sort = self.sort;
                configuration.limit = self.limit;
                configuration.operator = self.operator;
                configuration.metrics = [];
                configuration.segments = [];
                configuration.filters = [[]];

                for(var i = 0; i < self.kpis.length; i++)
                    if(self.kpis[i].kpi) {
                        options = self.kpis[i].options;
                        options.name = self.kpis[i].kpi.index;
                        if(self.kpis[i].kpi.type == "metric")
                            configuration.metrics.push(options);
                        else if(self.kpis[i].kpi.type == "segment")
                            configuration.segments.push(options);
                    }

                self._formatFilters();

                for(var i = 0; i<self.filters[0].length; i++) {
                    configuration.filters[0].push({
                        name: self.filters[0][i].kpi.index,
                        operator: self.filters[0][i].operator,
                        value: self.filters[0][i].value
                    })
                }

                return configuration;
            };

            Widget.prototype.refresh = function() {}

            Widget.prototype.toString = function() {
                return 'Widget Table';
            };

            return Widget
        }]
    })