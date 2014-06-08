angular.module('Dashboard').
    controller('ExportController', ['$scope', 'QUERY_BUILDER', 'OPERATORS', 'OPERATORS_NAME', function($scope, QUERY_BUILDER, OPERATORS, OPERATORS_NAME){
        var $local = $scope.Export = {};

        $local.tab = '';

        $local.kpis = {};
        $local.selectedKpis = [];

        $local.operators = OPERATORS;
        $local.operatorsName = OPERATORS_NAME;

        $local.filters = [{operator: 'AND', name: 'Filter 1'}];
        $local.currentFilter = 0;

        $local.exportUrl = {};
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

        $local.showExportDetails = function(fileType) {
            $local.exportUrl = '/api/export/' + fileType;
        };

        $local.addCondition = function(index) {
            if(!$local.filters[index].conditions)
                $local.filters[index].conditions = [];
            $local.filters[index].conditions.push({
                kpi: QUERY_BUILDER['count.user'],
                operator: '>',
                value: [0, 0]
            });
        };

        $local.removeFilter = function(index) {
            if(index == $local.currentFilter)
                $local.currentFilter = index - 1;

            $local.filters.splice(index, 1);
        }

        $local.addKpi = function(kpiIndex) {
            options = { name: QUERY_BUILDER['count.user'].index};
            $local.selectedKpis[kpiIndex] = {
                kpi: QUERY_BUILDER['count.user'],
                options: options
            };
            $local.selectedKpis.push({});
        };

        $local.addKpi(0);

        $local.changeKpi = function(kpiIndex, kpi) {
            $local.selectedKpis[kpiIndex] = {};
            $local.selectedKpis[kpiIndex].kpi = kpi;
            $local.selectedKpis[kpiIndex].options = {};
        };
        $local.removeKpi = function(kpiIndex) {
            $local.selectedKpis.splice(kpiIndex, 1);
        };

        $local._formatFilters = function() {
            for(var i = 0; i < $local.filters.length; i++)
                if($local.filters[i].conditions)
                    for(var j = 0; j < $local.filters[i].conditions.length; j++) {
                        var lengthMax = 0;
                        if($local.filters[i].conditions[j].operator == 'BETWEEN' || $local.filters[i].conditions[j].operator == 'NOT BETWEEN') {
                            lengthMax = 2;
                            if($local.filters[i].conditions[j].value[0] == '' || $local.filters[i].conditions[j].value[1] == '')
                                if($local.filters[i].conditions[j].value[0] != '')
                                    $local.filters[i].conditions[j].value[1] = $local.filters[i].conditions[j].value[0];
                                else if($local.filters[i].conditions[j].value[1] != '')
                                    $local.filters[i].conditions[j].value[0] = $local.filters[i].conditions[j].value[1];
                                else {
                                    $local.filters[i].conditions[j].value[0] = '0';
                                    $local.filters[i].conditions[j].value[1] = '0';
                                }
                        }
                        else if($local.filters[i].conditions[j].operator == 'IN' || $local.filters[i].conditions[j].operator == 'NOT IN') {
                            for(var k = $local.filters[i].conditions[j].value.length - 1; k >= 0 ; k--)
                                if($local.filters[i].conditions[j].value[k] == '')
                                    $local.filters[i].conditions[j].value.splice(k, 1);

                            if($local.filters[i].conditions[j].value.length == 0)
                                $local.filters[i].conditions[j].value.push('0');

                            if($local.filters[i].conditions[j].value.length < 2) {
                                if($local.filters[i].conditions[j].value[0] != '')
                                    $local.filters[i].conditions[j].value[1] = $local.filters[i].conditions[j].value[0];
                                else if($local.filters[i][i].value[1] != '')
                                    $local.filters[i].conditions[j].value[0] = $local.filters[i].conditions[j].value[1];
                            }
                        }
                        else
                            lengthMax = 1;

                        if(lengthMax != 0)
                            while($local.filters[i].conditions[j].value.length > lengthMax)
                                    $local.filters[i].conditions[j].value.splice($local.filters[i].conditions[j].value.length - 1, 1);

                        if($local.filters[i].conditions[j].value.length == 1 && $local.filters[i].conditions[j].value[0] == '')
                            $local.filters[i].conditions[j].value[0] = '0';
                    }
        }

        $local._save = function() {
            var configuration = {filters: []}
            ,   options;
            configuration.metrics = [];
            configuration.segments = [];

            for(var i = 0; i < $local.selectedKpis.length; i++)
                if($local.selectedKpis[i].kpi) {
                    options = $local.selectedKpis[i].options;
                    options.name = $local.selectedKpis[i].kpi.index;
                    if($local.selectedKpis[i].kpi.type == "metric")
                        configuration.metrics.push(options);
                    else if($local.selectedKpis[i].kpi.type == "segment")
                        configuration.segments.push(options);
                }

            $local._formatFilters();

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
                        })
                }
            }

            for(var i = configuration.filters.length - 1; i >= 0 ; i--)
                if(!configuration.filters[i].conditions || !configuration.filters[i].conditions.length)
                    configuration.filters.splice(i, 1);

            return configuration;

        };

        $local.save = function() {
            $local.configuration = $local._save();
            angular.element('form input').val(JSON.stringify($local.configuration));

            console.log($local.configuration);

            $scope.$broadcast('start_post_download');
        };

        $scope.toString = function() {
            return 'Export';
        };
    }])