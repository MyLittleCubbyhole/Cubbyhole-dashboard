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

            /**
             * OVERRIDE
             */
            Widget.prototype.init = function(data) {
                var self = this
                ,   $node = self.node.find('.widget-front-body')
                ,   series = {}
                ,   segment = []
                ,   absName = ''
                ,   segmentName = ''
                ,   segmentType = ''
                ,   axis = []
                ,   axisType = ''
                ,   index = '';

                if(!data || data.length == 0)
                    return true;

                self.chartOptions = {};
                self.chartOptions.series = [];

                self.chartOptions.yAxis = {};
                self.chartOptions.title = {
                    text: self.title,
                    align: 'left'
                };

                if(self.stacked)
                self.chartOptions.plotOptions = {
                    column: { stacking: 'normal' },
                    area: { stacking: 'normal' },
                    line: { stacking: 'normal' }
                };

                for(var i = 0; i<self.segments.length; i++) {
                    index = self.segments[i].kpi.alias;
                    series = { data: [] };

                    for(var j = 0; j<data.length; j++)
                        series.data.push(data[j][index]);

                    if(self.segments[i].options.axis === 'abs' || self.segments.length == 1) {
                        axisType = self.segments[i].kpi.format;
                        absName = index;
                        self.chartOptions.xAxis = { ordinal: false };
                        self.chartOptions.xAxis.labels = {};

                        switch(self.segments[i].kpi.format) {
                            case 'string':
                                self.chartOptions.xAxis.categories = _.uniq(series.data, false);
                                axis = self.chartOptions.xAxis.categories;
                            break;
                            case 'date':

                                self.chartOptions.xAxis.type = 'datetime';
                                self.chartOptions.xAxis.labels.formatter = function() {
                                   return moment(this.value).format('MMMM Do YYYY');
                                };
                                for(var j = 0; j< series.data.length; j++) {
                                    axis.push( new Date( series.data[j] ).getTime() );
                                }
                                axis = _.uniq(axis, false);
                            break;
                            case 'monthyear':
                                self.chartOptions.xAxis.type = 'datetime';
                                self.chartOptions.xAxis.labels.formatter = function() {
                                   return moment(this.value).format('MMMM YYYY');
                                };
                                for(var j = 0; j< series.data.length; j++) {
                                    axis.push( new Date( series.data[j] ).getTime() );
                                }
                                axis = _.uniq(axis, false);
                            break;
                            case 'month':
                                self.chartOptions.xAxis.labels.formatter = function() {
                                   return moment().month(this.value - 1).format('MMMM');
                                };
                                axis = _.uniq(series.data, false);
                            break;
                            case 'boolean':
                                self.chartOptions.xAxis.labels.formatter = function() {
                                   return this.value == 1 ? 'oui' : 'non';
                                };
                                axis = _.uniq(series.data, false);
                            break;
                            case 'bytes':
                                self.chartOptions.xAxis.labels.formatter = function() {
                                   return numeral(this.value).format('0.0b');
                                };
                                self.chartOptions.xAxis.categories = _.uniq(series.data, false);
                                axis = self.chartOptions.xAxis.categories;
                            break;
                            case 'money':
                                self.chartOptions.xAxis.labels.formatter = function() {
                                   return numeral(this.value).format('$0,0[.]00');
                                };
                                self.chartOptions.xAxis.categories = _.uniq(series.data, false);
                                axis = self.chartOptions.xAxis.categories;
                            break;
                            default:
                                axis = _.uniq(series.data, false);
                            break;
                        }

                        self.chartOptions.tooltip = {};
                        self.chartOptions.tooltip.formatter = function() {
                            var formated = '<b>';
                            switch(axisType) {
                                case 'date':
                                    formated += moment(self.getFormatedValue(this.x, axisType)).format('MMMM Do YYYY');
                                break;
                                case 'monthyear':
                                    formated += moment(self.getFormatedValue(this.x, axisType)).format('MMMM YYYY');
                                break;
                                case 'month':
                                    formated += moment().month(this.x - 1).format('MMMM');
                                break;
                                default:
                                    formated += self.getFormatedValue(this.x, axisType);
                                break;
                            }
                            formated += '</b>';
                            formated += '<br/>'+ this.point.series.name +': '+ self.getFormatedValue(this.point.y, this.series.userOptions.serieType);

                            return formated;
                        };

                        self.chartOptions.xAxis.labels.rotation = -45;
                    }
                    else {
                        segmentName = index;
                        segmentType = self.segments[i].kpi.format;
                        segment = _.uniq(series.data, false);
                    }

                }

                var value = '';

                if(!!segment && segment.length > 0)
                    for(var i = 0; i<segment.length; i++) {
                        index = segment[i];
                        alias = self.metrics[0].kpi.alias;

                        series = {
                            type: self.metrics[0].options.shape || 'line',
                            name: segment[i],
                            marker: { enabled: false },
                            data: [],
                            stack: !!segmentName,
                            serieType: self.metrics[0].kpi.format
                        };
                        switch(segmentType) {
                            case 'date':
                                series.name = moment( new Date(segment[i]).getTime() ).format('MMMM Do YYYY');
                            break;
                            case 'monthyear':
                                series.name = moment( new Date(segment[i]).getTime() ).format('MMMM YYYY');
                            break;
                            case 'month':
                                series.name = moment().month(segment[i] - 1).format('MMMM');
                            break;
                            default:
                                series.name = self.getFormatedValue(segment[i], segmentType);
                            break;
                        }

                        switch(self.metrics[0].kpi.format) {
                            case 'bytes':
                                self.chartOptions.yAxis.labels = {};
                                self.chartOptions.yAxis.labels.formatter = function() {
                                   return numeral(this.value).format('0.0b');
                                };
                            break;
                        }

                        switch(self.metrics[0].options.shape) {
                            case 'area':
                                series.zIndex = 0;
                            break;
                            case 'column':
                                series.zIndex = 1;
                            break;
                            case 'line':
                            default:
                                series.zIndex = 3;
                            break;
                        }

                        var witness = false
                        ,   axisValue;

                        for(var j = 0; j<axis.length; j++) {
                            witness = false;
                            for(var k = 0; k<data.length; k++) {
                                value = self.getFormatedValue(data[k][absName], axisType);
                                if(value === axis[j] && data[k][segmentName] === index) {
                                    witness = true;
                                    series.data.push([axis[j], data[k][alias]]);
                                }
                            }

                            if(!witness) {

                                value = self.getFormatedValue(axis[j], axisType);
                                series.data.push([value, 0]);
                            }
                        }

                        self.chartOptions.series.push(series);
                    }
                else {

                    self.chartOptions.yAxis = [];
                    for(var i = 0; i<self.metrics.length; i++) {
                        index = self.metrics[i].kpi.index;
                        index = self.metrics[i].kpi.alias;
                        series = {
                            type: self.metrics[i].options.shape || 'line',
                            name: self.metrics[i].kpi.formattedAlias,
                            marker: { enabled: false },
                            data: [],
                            yAxis: i,
                            serieType: self.metrics[i].kpi.format
                        };

                        switch(self.metrics[i].options.shape) {
                            case 'area':
                                series.zIndex = 0;
                            break;
                            case 'column':
                                series.zIndex = 1;
                            break;
                            case 'line':
                            default:
                                series.zIndex = 3;
                            break;
                        }

                        var witness = false;
                        for(var j = 0; j<axis.length; j++) {
                            witness = false;
                            for(var k = 0; k<data.length; k++) {
                                value = self.getFormatedValue(data[k][absName], axisType);

                                if(value === axis[j]) {
                                    witness = true;
                                    series.data.push([axis[j], data[k][index]]);
                                }
                            }

                            if(!witness) {
                                value = self.getFormatedValue(axis[j], axisType);
                                series.data.push([value, 0]);
                            }
                        }

                        var yaxis = {
                            title: {
                                text: self.metrics[i].kpi.formattedAlias
                            },
                            opposite: i>0
                        };

                        switch(self.metrics[i].kpi.format) {
                            case 'bytes':
                                yaxis.labels = {};
                                yaxis.labels.formatter = function() {
                                   return numeral(this.value).format('0.0b');
                                };
                            break;
                        }
                        self.chartOptions.yAxis.push(yaxis);

                        self.chartOptions.series.push(series);
                    }
                }
                self.refresh();
            };

            /**
             * OVERRIDE
             */
            Widget.prototype.save = function() {
                var self = this
                ,   definition = {}
                ,   configuration = this._save();

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
            };

            /**
             * OVERRIDE
             */
            Widget.prototype.refresh = function() {
                var self = this;
                self.node.find('.widget-front-body').highcharts(self.chartOptions);
            };

            Widget.prototype.toString = function() {
                return 'Widget Graph';
            };

            return Widget;
        }];
    });