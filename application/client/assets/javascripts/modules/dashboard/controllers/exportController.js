angular.module('Dashboard').
    controller('ExportController', ['$scope', 'QUERY_BUILDER', 'OPERATORS', 'OPERATORS_NAME', function($scope, QUERY_BUILDER, OPERATORS, OPERATORS_NAME){
        var $local = $scope.Export = {};

        $local.tab = 'data';

        $local.kpis = {};
        $local.selectedKpis = [];

        $local.operators = OPERATORS;
        $local.operatorsName = OPERATORS_NAME;
        $local.operator = 'AND';

        $local.filters = [[], [], [], []];

        var kpi;
        for(var i in QUERY_BUILDER) {

            kpi = {
                alias: QUERY_BUILDER[i].alias,
                formattedAlias: QUERY_BUILDER[i].formattedAlias,
                index: QUERY_BUILDER[i].index,
                datatype: QUERY_BUILDER[i].datatype,
                type: QUERY_BUILDER[i].type,
                format: QUERY_BUILDER[i].format
            };

            if(!$local.kpis[QUERY_BUILDER[i].category])
                $local.kpis[QUERY_BUILDER[i].category] = [];

            $local.kpis[QUERY_BUILDER[i].category].push(kpi);
        }

        $local.addFilter = function() {
            $local.filters[0].push({
                kpi: QUERY_BUILDER['count.user'],
                operator: '>',
                value: [0, 0]
            });
        };

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
        };
        $local.removeKpi = function(kpiIndex) {
            $local.selectedKpis.splice(kpiIndex, 1);
        };

        $local.save = function() {

        };

        $scope.toString = function() {
            return 'Export';
        };
    }])