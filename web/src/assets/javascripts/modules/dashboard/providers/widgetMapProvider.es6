angular.module('Dashboard').
    provider('WidgetMapProvider', function(){

        this.$get = ['ClassService', 'WidgetProvider', '$window', 'COUNTRIES', function(ClassService, WidgetProvider, $window, COUNTRIES) {

            var Widget = function(options, context) {
                var self = this;
                WidgetProvider.call(this, options, context);
                self.chartOptions = {};
                self.series = [];
            };

            ClassService.extend(WidgetProvider, Widget);

            /**
             * OVERRIDE
             */
            Widget.prototype.init = function(data) {
                var self = this
                ,   series = {}
                ,   metricName = self.metrics[0].kpi.alias
                ,   segmentName = self.segments[0].kpi.alias
                ,   axisType = self.metrics[0].kpi.format;
                self.chartOptions = {};
                self.series = new Array();

                self.chartOptions.title = {
                    text: self.title,
                    align: 'left'
                };

                self.chartOptions.plotOptions = {
                    map: {
                        allowPointSelect: false,
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                };

                self.chartOptions.mapNavigation = {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                };

                var maxValue = 0;
                for(var i = 0; i < data.length; i++)
                    if(data[i][metricName] > maxValue)
                        maxValue = data[i][metricName];

                self.chartOptions.colorAxis = {
                    min: 0,
                    max: maxValue,
                    minColor: '#FFFFFF',
                    labels: {
                        formatter: function() {
                            return this.value !== 0 ? self.getFormatedValue(this.value, axisType, true) : 0;
                        }
                    }
                };

                self.chartOptions.legend = {
                    borderWidth: 0,
                    title: {
                        text: self.metrics[0].kpi.formattedAlias
                    }
                };

                self.chartOptions.tooltip = {};
                self.chartOptions.tooltip.formatter = function() {
                    var formated = '<b>'+ this.key +'</b>';
                    formated += '<br/>'+ this.point.series.name +': '+ (this.point.value != 0 ? self.getFormatedValue(this.point.value, axisType) : 0);

                    return formated;
                };

                var serie = {
                    data : [],
                    mapData: Highcharts.maps.world,
                    joinBy: 'code',
                    name: self.metrics[0].kpi.formattedAlias,
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    }
                };

                var dataTemp = [];
                for(var i = 0; i<data.length; i++)
                    dataTemp.push({'value': data[i][metricName], 'code': data[i]['countrycode'], 'name': data[i]['country']});

	            var dataFinal = dataTemp.slice(0);
                for(var i = 0; i < COUNTRIES.length; i++) {
                    var witness = false;
                    for(var j = 0; j < dataTemp.length; j++)
                        if(COUNTRIES[i].code === dataTemp[j].code) {
                            witness = true;
                            break;
                        }

                    if(!witness)
                        dataFinal.push(COUNTRIES[i]);
                }

                serie.data = dataFinal;
                self.series.push(serie);

                this.refresh();
            };

            /**
             * OVERRIDE
             */
            Widget.prototype.refresh = function() {
                var self = this;

                self.chartOptions.series = self.series;
                self.node.find('.widget-front-body').highcharts('Map', self.chartOptions);
            };

            Widget.prototype.toString = function() {
                return 'Widget Map';
            };

            return Widget;
        }];
    });