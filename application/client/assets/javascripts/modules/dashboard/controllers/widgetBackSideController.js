angular.module('Dashboard').
    controller('WidgetBackSideController', ['$scope', 'QUERY_BUILDER', 'OPERATORS', 'OPERATORS_NAME', '$timeout',  function($scope, QUERY_BUILDER, OPERATORS, OPERATORS_NAME, $timeout){
        var $local = $scope.WidgetBackSide = {}
        ,   widgetScopeName = $scope.$parent.toString()
        ,   $widgetScope = $scope[widgetScopeName];

        $local.operators = OPERATORS;
        $local.operatorsName = OPERATORS_NAME;
        $local.tab = '';
        $local.kpis = {};
        $local.segments = {};
        $local.metrics = {};

        if($scope._flip)
            /**
             * override the active function of the flip directive
             * manage back widget activation and the first tab initializing
             */
            $scope._flip.active = function() {
                $local.tab = 'data';
                $scope._flip._active = !$scope._flip._active;
            };

        var kpi;
        for(var i in QUERY_BUILDER) {

            kpi = {
                alias: QUERY_BUILDER[i].alias,
                formattedAlias: QUERY_BUILDER[i].formattedAlias,
                index: QUERY_BUILDER[i].index,
                type: QUERY_BUILDER[i].type,
                format: QUERY_BUILDER[i].format
            }

            if(!$local.kpis[QUERY_BUILDER[i].category])
                $local.kpis[QUERY_BUILDER[i].category] = [];

            $local.kpis[QUERY_BUILDER[i].category].push(kpi);

            if(QUERY_BUILDER[i].type == 'segment' || QUERY_BUILDER[i].type == 'meta') {
                if(!$local.segments[QUERY_BUILDER[i].category])
                    $local.segments[QUERY_BUILDER[i].category] = [];
                $local.segments[QUERY_BUILDER[i].category].push(kpi);
            }

            if(QUERY_BUILDER[i].type == 'metric' || QUERY_BUILDER[i].type == 'meta') {
                if(!$local.metrics[QUERY_BUILDER[i].category])
                    $local.metrics[QUERY_BUILDER[i].category] = [];
                $local.metrics[QUERY_BUILDER[i].category].push(kpi);
            }
        }

        /**
         * save the new widget configuration and disable the flip
         */
        $local.save = function() {
            $scope._flip._active = !$scope._flip._active;
            $local.tab = '';
            $timeout(function() { $widgetScope.edit() }, 250);
            $widgetScope.widget.save();
            $scope._dashydash.serialize();
        }

        /**
         * resize the current widget and update the dashydash widget definition
         * @param  {Object} size            widget size
         * @param  {Boolean} resizeKpisArray manage the amount of kpis selectable
         */
        $local.resize = function(size, resizeKpisArray) {
            resizeKpisArray = resizeKpisArray || false;
            size = size || {};
            $widgetScope.widget.resize(size);

            _.extend($scope._dashydash.widgets[$widgetScope.id].size, size);

            if(resizeKpisArray) {
                var nbToRemove = $widgetScope.widget.kpis.length - (size.width * 2 + 1)
                ,   indexToRemove = $widgetScope.widget.kpis.length - 1;
                for(var i = 0; i < nbToRemove; i++) {
                    if($widgetScope.widget.kpis[indexToRemove].kpi)
                        $local.removeKpi(indexToRemove, true);
                    $widgetScope.widget.kpis.splice(indexToRemove, 1);
                    indexToRemove--;
                }
                while($widgetScope.widget.kpis.length < size.width * 2 + 1)
                    $widgetScope.widget.kpis.push({});
            }
        }

        /**
         * delete a widget
         */
        $local.delete = function() {
            $widgetScope.widget.delete();
        }

        /**
         * add a new filter to the current widget
         */
        $local.addFilter = function() {
            $widgetScope.widget.filters[0].conditions.push({
                kpi: QUERY_BUILDER['count.user'],
                operator: '>',
                value: ['0', '0']
            })
        }

        /**
         * format the value in order to display it in the managed view
         * @param  {integer} filterIndex filter index
         * @param  {integer} valueIndex  value index
         * @return {string}             formatted string
         */
        $local.getValueToShow = function(filterIndex, valueIndex) {
            var value = $widgetScope.widget.filters[0].conditions[filterIndex].value[valueIndex];
            var valueToShow = value;
            if(typeof value == 'object') {
                valueToShow = value.name;
                if(value.apply != '')
                    valueToShow += (value.apply == 'SUB' ? '-' : '+') + value.value + 'DAYS';
            }
            return valueToShow;
        }

        /**
         * date type case => use the sql now function
         * @param  {integer} filterIndex filter index
         * @param  {integer} valueIndex  value index
         */
        $local.switchDateNow = function(filterIndex, valueIndex) {
            if($widgetScope.widget.filters[0].conditions[filterIndex] && $widgetScope.widget.filters[0].conditions[filterIndex].value[valueIndex] !== undefined) {
                if(typeof $widgetScope.widget.filters[0].conditions[filterIndex].value[valueIndex] == 'object')
                    $widgetScope.widget.filters[0].conditions[filterIndex].value[valueIndex] = '0';
                else
                    $widgetScope.widget.filters[0].conditions[filterIndex].value[valueIndex] = {
                        name: 'NOW',
                        apply: '',
                        value: '0'
                    };
            }
        }

        /**
         * date type case => use sql date sub and date add
         * @param  {integer} filterIndex filter index
         * @param  {integer} valueIndex  value index
         * @param  {string} type  method
         */
        $local.switchDateAdd = function(filterIndex, valueIndex, type) {
            if($widgetScope.widget.filters[0].conditions[filterIndex].value[valueIndex].name) {
                if($widgetScope.widget.filters[0].conditions[filterIndex].value[valueIndex].apply == type)
                    $widgetScope.widget.filters[0].conditions[filterIndex].value[valueIndex].apply = '';
                else
                    if(type == 'SUB')
                        $widgetScope.widget.filters[0].conditions[filterIndex].value[valueIndex].apply = 'SUB';
                    else
                        $widgetScope.widget.filters[0].conditions[filterIndex].value[valueIndex].apply = 'ADD';
            }
        }
        $local.transformDateValues = function(filterIndex, kpi) {
            for(var i = 0; i < $widgetScope.widget.filters[0].conditions[filterIndex].value.length; i++)
                if(typeof $widgetScope.widget.filters[0].conditions[filterIndex].value[i] == 'object' && kpi.format != 'date')
                    $widgetScope.widget.filters[0].conditions[filterIndex].value[i] = '0';
        }
        $local.addMetric = function(options) {
            options = angular.extend({ name: QUERY_BUILDER['count.user'].index}, options);
            $widgetScope.widget.metrics.push({
                kpi: QUERY_BUILDER['count.user'],
                options: options
            })
        }
        $local.addSegment = function(options) {
            options = angular.extend({ name: QUERY_BUILDER['user.country'].index}, options);
            $widgetScope.widget.segments.push({
                kpi: QUERY_BUILDER['user.country'],
                options: options
            })
        }
        $local.addKpi = function(kpiIndex) {
            options = { name: QUERY_BUILDER['count.user'].index};
            $widgetScope.widget.kpis[kpiIndex] = {
                kpi: QUERY_BUILDER['count.user'],
                options: options
            }
            $local.addMetric();
        }
        $local.changeKpi = function(kpiIndex, kpi) {
            if(kpi.type == "metric")
                $widgetScope.widget.metrics.push({
                    kpi: kpi,
                    options: {}
                })
            if(kpi.type == "segment")
                $widgetScope.widget.segments.push({
                    kpi: kpi,
                    options: {}
                })

            $local.removeKpi(kpiIndex, false);
            $widgetScope.widget.kpis[kpiIndex].kpi = kpi;
        }
        $local.removeKpi = function(kpiIndex, clean) {
            clean = clean || false;
            for(var i = $widgetScope.widget.metrics.length - 1; i >= 0 ; i--)
                if($widgetScope.widget.metrics[i].kpi.index == $widgetScope.widget.kpis[kpiIndex].kpi.index) {
                    $widgetScope.widget.metrics.splice(i, 1);
                    break;
                }
            for(var i = $widgetScope.widget.segments.length - 1; i >= 0 ; i--)
                if($widgetScope.widget.segments[i].kpi.index == $widgetScope.widget.kpis[kpiIndex].kpi.index) {
                    $widgetScope.widget.segments.splice(i, 1);
                    break;
                }

            if(clean) $widgetScope.widget.kpis[kpiIndex] = {};
        }

        $scope.toString = function() {
            return 'WidgetBackSide';
        }
    }])