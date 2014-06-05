angular.module('Dashboard').
    provider('WidgetProvider', function(){

        this.$get = ['WIDGET_DEFAULT_SETTINGS', 'QUERY_BUILDER', 'WidgetFactory', '$window', function(WIDGET_DEFAULT_SETTINGS, QUERY_BUILDER, WidgetFactory, $window) {

            var Widget = function(options, context) {
                if(!options || !context)
                    return false;

                var self = this;
                self.options = {};
                _.merge(self.options, WIDGET_DEFAULT_SETTINGS, options);

                self.size = {
                    width: self.options.size.width,
                    height: self.options.size.height
                };
                self.position = {
                    x: self.options.position.x,
                    y: self.options.position.y
                };
                self.id = self.options.id;
                self.title = self.options.title;
                self.backgroundColor = self.options.backgroundcolor;
                self.fontColor = self.options.fontcolor;
                self.metrics = self.options.metrics;
                self.segments = self.options.segments;
                self.filters = self.options.filters;
                self.dashboardId = self.options.dashboardid;

                self.scope = context.scope;
                self.node = context.node;

                self.limit = self.options.config.limit;
                self.operator = self.options.config.operator || 'AND';

                self.sort = self.options.config.sort || {};

                if(self.options.config.metrics)
                for(var i = 0; i<self.options.config.metrics.length; i++)
                    self.metrics.push({
                        kpi: QUERY_BUILDER[self.options.config.metrics[i].name],
                        options: self.options.config.metrics[i]
                    });

                if(self.options.config.segments)
                for(var i = 0; i<self.options.config.segments.length; i++)
                    self.segments.push({
                        kpi: QUERY_BUILDER[self.options.config.segments[i].name],
                        options: self.options.config.segments[i]
                    });

                if(self.options.config.filters)
                for(var i = 0; i<self.options.config.filters.length; i++)
                    self.filters.push({
                        kpi: QUERY_BUILDER[self.options.config.filters[i].name],
                        operator: self.options.config.filters[i].operator,
                        value: self.options.config.filters[i].value
                    });

                self.scope.$on('widget_refresh', function() { self.refresh(); })
            };

            Widget.prototype.init = function() { throw 'init method must be overriden'; };

            Widget.prototype._formatFilters = function() {
                var self = this;

                for(var i = 0; i<self.filters.length; i++) {
                    var lengthMax = 0;
                    if(self.filters[i].operator == 'BETWEEN' || self.filters[i].operator == 'NOT BETWEEN') {
                        lengthMax = 2;
                        if(self.filters[i].value[0] == '' || self.filters[i].value[1] == '')
                            if(self.filters[i].value[0] != '')
                                self.filters[i].value[1] = self.filters[i].value[0];
                            else if(self.filters[i].value[1] != '')
                                self.filters[i].value[0] = self.filters[i].value[1];
                            else {
                                self.filters[i].value[0] = '0';
                                self.filters[i].value[1] = '0';
                            }
                    }
                    else if(self.filters[i].operator == 'IN' || self.filters[i].operator == 'NOT IN') {
                        for(var j = self.filters[i].value.length - 1; j >= 0 ; j--)
                            if(self.filters[i].value[j] == '')
                                self.filters[i].value.splice(j, 1);

                        if(self.filters[i].value.length == 0)
                            self.filters[i].value.push('0');

                        if(self.filters[i].value.length < 2) {
                            if(self.filters[i].value[0] != '')
                                self.filters[i].value[1] = self.filters[i].value[0];
                            else if(self.filters[i].value[1] != '')
                                self.filters[i].value[0] = self.filters[i].value[1];
                        }
                    }
                    else
                        lengthMax = 1;

                    if(lengthMax != 0)
                        while(self.filters[i].value.length > lengthMax)
                                self.filters[i].value.splice(self.filters[i].value.length - 1, 1);

                    if(self.filters[i].value.length == 1 && self.filters[i].value[0] == '')
                        self.filters[i].value[0] = '0';
                }
            }

            Widget.prototype._save = function() {
                var configuration = {}
                ,   options
                ,   self = this;
                configuration.sort = self.sort;
                configuration.operator = self.operator;
                configuration.metrics = [];
                configuration.segments = [];
                configuration.filters = [];

                for(var i = 0; i<self.metrics.length; i++) {
                    options = self.metrics[i].options;
                    options.name = self.metrics[i].kpi.index;
                    configuration.metrics.push(options)
                }

                for(var i = 0; i<self.segments.length; i++) {
                    options = self.segments[i].options;
                    options.name = self.segments[i].kpi.index;
                    configuration.segments.push(options)
                }

                self._formatFilters();

                for(var i = 0; i<self.filters.length; i++) {
                    configuration.filters.push({
                        name: self.filters[i].kpi.index,
                        operator: self.filters[i].operator,
                        value: self.filters[i].value
                    })
                }

                return configuration;

            };

            Widget.prototype.save = function() {
                var self = this
                ,   definition = {}
                ,   configuration = self._save();

                definition.title = self.title;
                definition.size = self.size;
                definition.position = self.position;
                definition.id = self.id;
                definition.backgroundcolor = self.backgroundColor;
                definition.fontcolor = self.fontColor;
                definition.dashboardid = self.dashboardId;
                definition.config = configuration;

                WidgetFactory(self.scope).update(definition, function() {
                    self.load();
                });

            }

            Widget.prototype.load = function() {
                var self = this;
                WidgetFactory(self.scope).getData(self.dashboardId, self.id, function(data) { self.init(data); })
            };

            Widget.prototype.refresh = function() { };

            Widget.prototype.delete = function() {
                var self = this;

                WidgetFactory(self.scope).remove(self.dashboardId, self.id, function() {
                    self.scope.$emit('delete_widget', { id: self.id, node: self.node });
                })
            };

            Widget.prototype.resize = function(size, callback) {
                var self = this;
                callback = callback || angular.noop;
                angular.extend(self.size, size);

                self.scope.$emit('resize_widget', { node: self.node, size: self.size, callback: function() {
                    callback.call(self);
                }});
            };

            Widget.prototype.getFormatedValue = function(val, type) {
                switch(type) {
                    case 'date':
                        val = (new Date(val)).getTime();
                    break;
                    case 'bytes':
                        val = numeral(val).format('0.0b');
                    break;
                }

                return val;
            }

            Widget.prototype.toString = function() {
                return 'Widget';
            };

            return Widget
        }]
    })