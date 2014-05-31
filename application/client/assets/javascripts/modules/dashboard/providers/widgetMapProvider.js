angular.module('Dashboard').
    provider('WidgetMapProvider', function(){

        this.$get = ['ClassService', 'WidgetProvider', '$window', function(ClassService, WidgetProvider, $window) {

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
                self.chartOptions.series = [];
                self.chartOptions.title = {
                    text: self.title,
                    align: 'left'
                };

                /*self.chartOptions.plotOptions = {
                    map: {
                        allowPointSelect: false,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                }*/

                self.chartOptions.mapNavigation = {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                };

                var serie = {
                    data : [{"code": "FR", "name": "France", "value": 10}],
                    //mapData: Highcharts.geojson(Highcharts.maps['custom/world']),
                    joinBy: ['code'],
                    name: metricName,
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    tooltip: {
                        valueSuffix: '/km²'
                    }
                };

                console.log(data);

                for(var j = 0; j<data.length; j++)
                    serie.data.push({"value": data[j][metricName], "code": data[j]["countrycode"], "name": data[j]["country"]});

                self.chartOptions.series.push(serie);

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