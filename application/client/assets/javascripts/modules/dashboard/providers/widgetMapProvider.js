angular.module('Dashboard').
    provider('WidgetMapProvider', function(){

        this.$get = ['ClassService', 'WidgetProvider', '$window', 'COUNTRIES', function(ClassService, WidgetProvider, $window, COUNTRIES) {

            var Widget = function(options, context) {
                var self = this;
                WidgetProvider.call(this, options, context);
                self.chartOptions = {};
            };

            ClassService.extend(WidgetProvider, Widget);

            Widget.prototype.init = function(data) {
                var self = this
                ,   series = {}
                ,   metricName = self.metrics[0].kpi.alias
                ,   segmentName = self.segments[0].kpi.alias;
                self.chartOptions.series = new Array();
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
                }

                self.chartOptions.mapNavigation = {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                };

                self.chartOptions.colorAxis = {
                };

                var serie = {
                    data : [],
                    mapData: Highcharts.geojson(Highcharts.maps['custom/world'], 'map'),
                    joinBy: ['iso-a2', 'code'],
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

                var dataFinal = {};
                //_.extend(dataFinal, COUNTRIES, dataTemp);

                //dataFinal = _.map(dataFinal, function(el) { return el; });

                serie.data = COUNTRIES;
                self.chartOptions.series.push(serie);

                console.log(self.chartOptions.series)

                this.refresh();
            };

            Widget.prototype.refresh = function() {
                this.node.find('.widget-front-body').highcharts("Map", this.chartOptions);
            }

            Widget.prototype.toString = function() {
                return 'Widget Map';
            };

            return Widget
        }]
    })