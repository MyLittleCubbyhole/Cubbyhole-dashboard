angular.module('Dashboard').
    provider('ExportProvider', function(){

        this.$get = ['ClassService', '$window', function(ClassService, $window) {

            var Export = function(options, context) {
                var self = this;

                self.kpis = [{}];
            };

            Export.prototype.save = function() {

            };

            Export.prototype.toString = function() {
                return 'Export';
            };

            return Export;
        }]
    })