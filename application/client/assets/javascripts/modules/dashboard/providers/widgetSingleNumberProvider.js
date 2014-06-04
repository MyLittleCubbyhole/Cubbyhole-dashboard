angular.module('Dashboard').
    provider('WidgetSingleNumberProvider', function(){

        this.$get = ['ClassService', 'WidgetProvider', '$window', function(ClassService, WidgetProvider, $window) {

            var Widget = function(options, context) {
                var self = this;
                WidgetProvider.call(this, options, context);
                self.value = 0;
            };

            ClassService.extend(WidgetProvider, Widget);

            Widget.prototype.init = function(data) {
                var self = this;
                self.value = data[0][self.metrics[0].kpi.alias];
                self.alias = self.metrics[0].kpi.formattedAlias;
            };

            Widget.prototype.refresh = function() {}

            Widget.prototype.toString = function() {
                return 'Widget Single Number';
            };

            return Widget
        }]
    })