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

            Widget.prototype.init = function(data) {
                var self = this
                ,   series = {}
                ,   metricName = self.metrics[0].kpi.alias
                ,   segmentName = self.segments[0].kpi.alias;
                self.chartOptions = {};
                self.series = new Array();

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
                    minColor: '#FFFFFF'
                };

                var serie = {
                    data : [],
                    mapData: Highcharts.maps.world,
                    joinBy: 'code',
                    name: metricName,
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    }
                };

                var dataTemp = [];
                for(var i = 0; i<data.length; i++)
                    dataTemp.push({"value": data[i][metricName], "code": data[i]["countrycode"], "name": data[i]["country"]});

                dataFinal = [];
                for(var i = 0; i < COUNTRIES.length; i++)
                    for(var j = 0; j < dataTemp.length; j++)
                        if(COUNTRIES[i].code == dataTemp[j].code)
                            dataFinal.push(dataTemp[j])
                        else
                            dataFinal.push(COUNTRIES[i]);


                serie.data = dataFinal;
                self.series.push(serie);

                this.refresh();
            };

            Widget.prototype.refresh = function() {
                var self = this
                self.chartOptions.title = {
                    text: self.title,
                    align: 'left'
                };

                self.chartOptions.series = self.series;
                self.node.find('.widget-front-body').highcharts("Map", self.chartOptions);
            }

            Widget.prototype.toString = function() {
                return 'Widget Map';
            };

            return Widget
        }]
    })