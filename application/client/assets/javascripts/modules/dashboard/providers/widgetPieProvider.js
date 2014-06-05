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
                ,   series = {}
                ,   metricName = self.metrics[0].kpi.alias
                ,   segmentName = self.segments[0].kpi.alias
                ,   axisType = self.segments[0].kpi.format;
                self.chartOptions = {};
                self.chartOptions.series = [];

                self.chartOptions.title = {
                    text: self.title,
                    align: 'left'
                };

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
                    name: self.metrics[0].kpi.formattedAlias,
                    data: [],
                    serieType: self.metrics[0].kpi.format
                }

                self.chartOptions.tooltip = {};
                self.chartOptions.tooltip.formatter = function() {
                    var formated = '<b>'+ this.key +'</b>';
                    formated += '<br/>'+ this.point.series.name +': '+ self.getFormatedValue(this.point.y, this.series.userOptions.serieType);

                    return formated;
                };

                for(var j = 0; j<data.length; j++) {
                    var dataName = data[j][segmentName].toString();
                    switch(axisType) {
                        case 'date':
                            dataName = moment( new Date(dataName).getTime() ).format('MMMM Do YYYY');
                        break;
                        case 'bytes':
                            dataName = numeral(dataName).format('0.0b');
                        break;
                    }

                    serie.data.push([dataName, data[j][metricName]]);
                }

                self.chartOptions.series.push(serie);

                this.refresh();
            };

            Widget.prototype.refresh = function() {
                var self = this;
                this.node.find('.widget-front-body').highcharts(this.chartOptions);
            }

            Widget.prototype.toString = function() {
                return 'Widget Pie';
            };

            return Widget
        }]
    })