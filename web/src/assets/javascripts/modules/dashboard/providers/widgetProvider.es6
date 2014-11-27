angular.module('Dashboard').
    provider('WidgetProvider', function(){

        this.$get = ['WIDGET_DEFAULT_SETTINGS', 'QUERY_BUILDER', 'WidgetFactory', '$window', '$timeout', function(WIDGET_DEFAULT_SETTINGS, QUERY_BUILDER, WidgetFactory, $window, $timeout) {

            var Widget = function(options, context) {
                if(!options || !context)
                    return false;

                var self = this;
                self.inLoading = true;
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

                self.limit = self.options.config.limit || 0;

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

                self.filters.push({conditions: [], operator: 'AND'});

                if(self.options.config.filters)
                    if(self.options.config.filters[0] && self.options.config.filters[0].conditions) {
                        for(var i = 0; i<self.options.config.filters[0].conditions.length; i++) {
                            self.filters[0].operator = self.options.config.filters[0].operator || 'AND';
                            self.filters[0].conditions.push({
                                kpi: QUERY_BUILDER[self.options.config.filters[0].conditions[i].name],
                                operator: self.options.config.filters[0].conditions[i].operator,
                                value: self.options.config.filters[0].conditions[i].value
                            });
                            if(self.filters[0].conditions[self.filters[0].conditions.length - 1].value.length < 2)
                                self.filters[0].conditions[self.filters[0].conditions.length - 1].value.push('0');
                        }
                    }

                self.scope.$on('widget_refresh', function() { self.refresh(); });
            };

            /**
             * must be overriden
             * called after data loading
             * used to create the widget content
             */
            Widget.prototype.init = function() { throw 'init method must be overriden'; };

            /**
             * PRIVATE
             * format filter values in order to use them in the widget configuration
             */
            Widget.prototype._formatFilters = function() {
                var self = this;

                for(var i = 0; i<self.filters[0].conditions.length; i++) {
                    var lengthMax = 0;
                    if(self.filters[0].conditions[i].operator === 'BETWEEN' || self.filters[0].conditions[i].operator === 'NOT BETWEEN') {
                        lengthMax = 2;
                        if(self.filters[0].conditions[i].value[0] === '' || self.filters[0].conditions[i].value[1] === '')
                            if(self.filters[0].conditions[i].value[0] !== '')
                                self.filters[0].conditions[i].value[1] = self.filters[0].conditions[i].value[0];
                            else if(self.filters[0].conditions[i].value[1] !== '')
                                self.filters[0].conditions[i].value[0] = self.filters[0].conditions[i].value[1];
                            else {
                                self.filters[0].conditions[i].value[0] = '0';
                                self.filters[0].conditions[i].value[1] = '0';
                            }
                    }
                    else if(self.filters[0].conditions[i].operator === 'IN' || self.filters[0].conditions[i].operator === 'NOT IN') {
                        for(var j = self.filters[0].conditions[i].value.length - 1; j >= 0 ; j--)
                            if(self.filters[0].conditions[i].value[j] === '')
                                self.filters[0].conditions[i].value.splice(j, 1);

                        if(self.filters[0].conditions[i].value.length === 0)
                            self.filters[0].conditions[i].value.push('0');

                        if(self.filters[0].conditions[i].value.length < 2) {
                            if(self.filters[0].conditions[i].value[0] !== '')
                                self.filters[0].conditions[i].value[1] = self.filters[0].conditions[i].value[0];
                            else if(self.filters[0][i].value[1] !== '')
                                self.filters[0].conditions[i].value[0] = self.filters[0].conditions[i].value[1];
                        }
                    }
                    else
                        lengthMax = 1;

                    if(lengthMax !== 0)
                        while(self.filters[0].conditions[i].value.length > lengthMax)
                                self.filters[0].conditions[i].value.splice(self.filters[0].conditions[i].value.length - 1, 1);

                    if(self.filters[0].conditions[i].value.length === 1 && self.filters[0].conditions[i].value[0] === '')
                        self.filters[0].conditions[i].value[0] = '0';
                }
            }

            /**
             * PRIVATE
             * generate a widget configuration
             * @return {Object} widget data configuration
             */
            Widget.prototype._save = function() {
                var configuration = {}
                ,   options
                ,   self = this;
                configuration.sort = self.sort;
                configuration.operator = self.operator;
                configuration.metrics = [];
                configuration.segments = [];
                configuration.filters = [{}];

                if(self.limit)
                    configuration.limit = self.limit;

                for(var i = 0; i<self.metrics.length; i++) {
                    options = self.metrics[i].options;
                    options.name = self.metrics[i].kpi.index;
                    configuration.metrics.push(options);
                }

                for(var i = 0; i<self.segments.length; i++) {
                    options = self.segments[i].options;
                    options.name = self.segments[i].kpi.index;
                    configuration.segments.push(options);
                }

                self._formatFilters();

                if(self.filters[0] && self.filters[0].conditions.length > 0) {
                    configuration.filters[0].conditions = [];
                    configuration.filters[0].operator = self.filters[0].operator;
                } else
                    configuration.filters = [];

                for(var i = 0; i<self.filters[0].conditions.length; i++) {

                    configuration.filters[0].conditions.push({
                        name: self.filters[0].conditions[i].kpi.index,
                        operator: self.filters[0].conditions[i].operator,
                        value: self.filters[0].conditions[i].value
                    });
                }

                return configuration;

            };

            /**
             * update the current widget with the new configuration
             */
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

            };

            /**
             * get the datas linked to the current widget and call the init method
             */
            Widget.prototype.load = function() {
                var self = this;
                self.inLoading = true;
                WidgetFactory(self.scope).getData(self.dashboardId, self.id, function(data) {
                    self.init(data);
                    self.inLoading = false;
                });
            };

            /**
             * must be overriden
             */
            Widget.prototype.refresh = function() { };

            /**
             * delete the current widget
             */
            Widget.prototype.delete = function() {
                var self = this;

                WidgetFactory(self.scope).remove(self.dashboardId, self.id, function() {
                    self.scope.$emit('delete_widget', { id: self.id, node: self.node });
                });
            };

            /**
             * resize the current widget
             * @param  {Object}   size     {width: .., height: ..}
             * @param  {Function} callback 
             */
            Widget.prototype.resize = function(size, callback) {
                var self = this;
                callback = callback || angular.noop;
                angular.extend(self.size, size);

                self.scope.$emit('resize_widget', { node: self.node, size: self.size, callback: function() {
                    callback.call(self);
                }});
            };

            /**
             * format the value passed through paramters
             * @param  {MULTI} val   value
             * @param  {string} type  
             * @param  {integer} round decimal amount
             * @return {MULTI}       formatted value
             */
            Widget.prototype.getFormatedValue = function(val, type, round) {
                switch(type) {
                    case 'date':
                    case 'monthyear':
                        val = (new Date(val)).getTime();
                    break;
                    case 'bytes':
                        round = round || false;
                        val = round ? numeral(val).format('0b') : numeral(val).format('0.0b');
                    break;
                    case 'money':
                        val = numeral(val).format('$0,0[.]00');
                    break;
                    case 'boolean':
                        val = val == 1 ? 'oui' : 'non';
                    break;
                }

                return val;
            };

            Widget.prototype.toString = function() {
                return 'Widget';
            };

            return Widget;
        }];
    });