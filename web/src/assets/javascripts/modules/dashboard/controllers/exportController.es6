angular.module('Dashboard').
    controller('ExportController', ['$scope', 'QUERY_BUILDER', 'OPERATORS', 'OPERATORS_NAME', 'CaptureService', function($scope, QUERY_BUILDER, OPERATORS, OPERATORS_NAME, CaptureService){
        var $local = $scope.Export = {};

        $local.tab = '';

        $local.kpis = {};
        $local.selectedKpis = [];

        $local.operators = OPERATORS;
        $local.operatorsName = OPERATORS_NAME;

        $local.filters = [{operator: 'AND', name: 'Filter 1'}];
        $local.currentFilter = 0;

        $local.exportUrl = {};
        $local.inProgress = false;
        $local.configuration = {};

        var kpi;
        for(var i in QUERY_BUILDER) {

            kpi = {
                alias: QUERY_BUILDER[i].alias,
                formattedAlias: QUERY_BUILDER[i].formattedAlias,
                index: QUERY_BUILDER[i].index,
                type: QUERY_BUILDER[i].type,
                format: QUERY_BUILDER[i].format
            };

            if(!$local.kpis[QUERY_BUILDER[i].category])
                $local.kpis[QUERY_BUILDER[i].category] = [];

            $local.kpis[QUERY_BUILDER[i].category].push(kpi);
        }

        if($scope._flip)
            $scope._flip.active = function() {
                $local.tab = 'data';
                $scope._flip._active = !$scope._flip._active;
            };

        /**
         * LISTNER - Hide the export modal when called
         */
        $scope.$on('hide_export_modal', function() {
            if($scope._flip)
                $scope._flip._active = false;
        });

        /**
         * set the export url 
         * @param  {string} fileType
         */
        $local.showExportDetails = function(fileType) {
            $local.exportUrl = '/api/export/' + fileType;
        };

        /**
         * add a condition to the selected export filter
         * @param {integer} index index of the targeted filter
         */
        $local.addCondition = function(index) {
            if(!$local.filters[index].conditions)
                $local.filters[index].conditions = [];
            $local.filters[index].conditions.push({
                kpi: QUERY_BUILDER['count.user'],
                operator: '>',
                value: ['0', '0']
            });
        };

        /**
         * format the value in order to display it in the managed view
         * @param  {integer} filterIndex filter index
         * @param  {integer} valueIndex  value index
         * @return {string}             formatted string
         */
        $local.getValueToShow = function(filterIndex, valueIndex) {
            var value = $local.filters[$local.currentFilter].conditions[filterIndex].value[valueIndex];
            var valueToShow = value;
            if(typeof value === 'object') {
                valueToShow = value.name;
                if(value.apply !== '')
                    valueToShow += (value.apply === 'SUB' ? '-' : '+') + value.value + 'DAYS';
            }
            return valueToShow;
        };

        /**
         * manage the formatting value string to object - object to string
         * Date case
         * @param  {integer} filterIndex filter index
         * @param  {integer} valueIndex  value index
         */
        $local.switchDateNow = function(filterIndex, valueIndex) {
            if($local.filters[$local.currentFilter].conditions[filterIndex] && $local.filters[$local.currentFilter].conditions[filterIndex].value[valueIndex] !== undefined) {
                if(typeof $local.filters[$local.currentFilter].conditions[filterIndex].value[valueIndex] === 'object')
                    $local.filters[$local.currentFilter].conditions[filterIndex].value[valueIndex] = '0';
                else
                    $local.filters[$local.currentFilter].conditions[filterIndex].value[valueIndex] = {
                        name: 'NOW',
                        apply: '',
                        value: '0'
                    };
            }
        };


        /**
         * manage the day manipulation in case of complexe value
         * Date case 
         * @param  {integer} filterIndex filter index
         * @param  {integer} valueIndex  value index
         * @param  {string} type        manipulation type {ADD | SUB}
         */
        $local.switchDateAdd = function(filterIndex, valueIndex, type) {
            if($local.filters[$local.currentFilter].conditions[filterIndex].value[valueIndex].name) {
                if($local.filters[$local.currentFilter].conditions[filterIndex].value[valueIndex].apply === type)
                    $local.filters[$local.currentFilter].conditions[filterIndex].value[valueIndex].apply = '';
                else
                    if(type === 'SUB')
                        $local.filters[$local.currentFilter].conditions[filterIndex].value[valueIndex].apply = 'SUB';
                    else
                        $local.filters[$local.currentFilter].conditions[filterIndex].value[valueIndex].apply = 'ADD';
            }
        };

        /**
         * initialize the object value into 0 when a native kpi is selected
         * @param  {integer} filterIndex filter index
         * @param  {Object} kpi         Kpi
         */
        $local.transformDateValues = function(filterIndex, kpi) {
            for(var i = 0; i < $local.filters[$local.currentFilter].conditions[filterIndex].value.length; i++)
                if(typeof $local.filters[$local.currentFilter].conditions[filterIndex].value[i] === 'object' && kpi.format !== 'date')
                    $local.filters[$local.currentFilter].conditions[filterIndex].value[i] = '0';
        };

        /**
         * remove a filter
         * @param  {integer} index index
         */
        $local.removeFilter = function(index) {
            if(index === $local.currentFilter)
                $local.currentFilter = index - 1;

            $local.filters.splice(index, 1);
        };

        /**
         * [addKpi description]
         * @param {[type]} kpiIndex [description]
         */
        $local.addKpi = function(kpiIndex) {
	        var options = {name: QUERY_BUILDER['count.user'].index};
            $local.selectedKpis[kpiIndex] = {
                kpi: QUERY_BUILDER['count.user'],
                options: options
            };
            $local.selectedKpis.push({});
        };

        $local.addKpi(0);

        /**
         * select a new kpi
         * @param  {integer} kpiIndex kpi index
         * @param  {integer} kpi      Kpi
         */
        $local.changeKpi = function(kpiIndex, kpi) {
            $local.selectedKpis[kpiIndex] = {};
            $local.selectedKpis[kpiIndex].kpi = kpi;
            $local.selectedKpis[kpiIndex].options = {};
        };

        /**
         * remove a Kpi
         * @param  {integer} kpiIndex Kpi index
         */
        $local.removeKpi = function(kpiIndex) {
            $local.selectedKpis.splice(kpiIndex, 1);
        };

        /**
         * manage the filter condition values
         * format in case of between on in operator to an array of value 
         */
        $local.formatFilters = function() {
            for(var i = 0; i < $local.filters.length; i++)
                if($local.filters[i].conditions)
                    for(var j = 0; j < $local.filters[i].conditions.length; j++) {
                        var lengthMax = 0;
                        if($local.filters[i].conditions[j].operator === 'BETWEEN' || $local.filters[i].conditions[j].operator === 'NOT BETWEEN') {
                            lengthMax = 2;
                            if($local.filters[i].conditions[j].value[0] === '' || $local.filters[i].conditions[j].value[1] === '')
                                if($local.filters[i].conditions[j].value[0] !== '')
                                    $local.filters[i].conditions[j].value[1] = $local.filters[i].conditions[j].value[0];
                                else if($local.filters[i].conditions[j].value[1] !== '')
                                    $local.filters[i].conditions[j].value[0] = $local.filters[i].conditions[j].value[1];
                                else {
                                    $local.filters[i].conditions[j].value[0] = '0';
                                    $local.filters[i].conditions[j].value[1] = '0';
                                }
                        }
                        else if($local.filters[i].conditions[j].operator === 'IN' || $local.filters[i].conditions[j].operator === 'NOT IN') {
                            for(var k = $local.filters[i].conditions[j].value.length - 1; k >= 0 ; k--)
                                if($local.filters[i].conditions[j].value[k] === '')
                                    $local.filters[i].conditions[j].value.splice(k, 1);

                            if($local.filters[i].conditions[j].value.length === 0)
                                $local.filters[i].conditions[j].value.push('0');

                            if($local.filters[i].conditions[j].value.length < 2) {
                                if($local.filters[i].conditions[j].value[0] !== '')
                                    $local.filters[i].conditions[j].value[1] = $local.filters[i].conditions[j].value[0];
                                else if($local.filters[i][i].value[1] !== '')
                                    $local.filters[i].conditions[j].value[0] = $local.filters[i].conditions[j].value[1];
                            }
                        }
                        else
                            lengthMax = 1;

                        if(lengthMax !== 0)
                            while($local.filters[i].conditions[j].value.length > lengthMax)
                                    $local.filters[i].conditions[j].value.splice($local.filters[i].conditions[j].value.length - 1, 1);

                        if($local.filters[i].conditions[j].value.length === 1 && $local.filters[i].conditions[j].value[0] === '')
                            $local.filters[i].conditions[j].value[0] = '0';
                    }
        };

        /**
         * save the export configuration in to order to send it later
         */
        $local.save = function() {
            var configuration = {filters: []}
            ,   options;
            configuration.metrics = [];
            configuration.segments = [];

            for(var i = 0; i < $local.selectedKpis.length; i++)
                if($local.selectedKpis[i].kpi) {
                    options = $local.selectedKpis[i].options;
                    options.name = $local.selectedKpis[i].kpi.index;
                    if($local.selectedKpis[i].kpi.type === 'metric')
                        configuration.metrics.push(options);
                    else if($local.selectedKpis[i].kpi.type === 'segment')
                        configuration.segments.push(options);
                }

            $local.formatFilters();

            for(var i = 0; i < $local.filters.length; i++) {
                configuration.filters.push({});
                if($local.filters[i] && $local.filters[i].conditions && $local.filters[i].conditions.length > 0) {
                    configuration.filters[i].conditions = [];
                    configuration.filters[i].operator = $local.filters[i].operator;
                    configuration.filters[i].name = $local.filters[i].name;

                    for(var j = 0; j < $local.filters[i].conditions.length; j++)
                        configuration.filters[i].conditions.push({
                            name: $local.filters[i].conditions[j].kpi.index,
                            operator: $local.filters[i].conditions[j].operator,
                            value: $local.filters[i].conditions[j].value
                        });
                }
            }

            for(var i = configuration.filters.length - 1; i >= 0 ; i--)
                if(!configuration.filters[i].conditions || !configuration.filters[i].conditions.length)
                    configuration.filters.splice(i, 1);

            $local.configuration = configuration;
            angular.element('form input').val(JSON.stringify($local.configuration));

            $scope.$broadcast('start_post_download');
        };

        /**
         * call the capturing service and generate a screen shot of the current dashboard
         */
        $local.capture = function() {
            var $board = angular.element('.dd-board');
            $scope.Dashboard.exportModalLocked = true;
            $local.inProgress = true;
            $scope.Overlay.locked = true;
            CaptureService($board, $scope.Dashboard.currentDashboard.title, function() {
                $scope._flip._active = false;
                setTimeout(function() {
                    $scope.Overlay.locked = false;
                    $scope.Dashboard.exportModalLocked = false;
                    $local.inProgress = false;
                }, 2000);
            });
        };

        $scope.toString = function() {
            return 'Export';
        };
    }]);