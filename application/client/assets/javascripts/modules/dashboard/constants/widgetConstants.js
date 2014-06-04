angular.module('Dashboard').
    constant('WIDGET_DEFAULT_DEFINITION', {
        title: 'new widget',
        size: { width: 1, height: 1 },
        position: { x: 1, y: 1 },
        backgroundcolor: 'white',
        fontcolor: 'black',
        type: 'singlenumber'
    }).
    constant('WIDGET_TYPE', {
        pie: {
            type: 'pie',
            name: 'PIE',
            icon: '/images/widget-icons/icopie.png',
            width: [1],
            height: 3,
            config: {"metrics":[{"name":"count.user"}],"segments":[{"name":"user.country"}]}
        },
        singlenumber: {
            type: 'singlenumber',
            name: 'Single Number',
            icon: '/images/widget-icons/icosinglenumber.png',
            width: [1],
            height: 1,
            config: {"metrics":[{"name":"user.age.avg"}],"segments":[]}
        },
        table: {
            type: 'table',
            name: 'Table',
            icon: '/images/widget-icons/icotable.png',
            width: [1,2,3,4],
            height: 5,
            config: {"metrics":[{"name":"user.age.avg"}, {"name":"count.user"}],"segments":[{"name":"user.country"},{"name":"user.inscriptiondate"}], "order": "user.inscriptiondate", "limit": 10}
        },
        graph: {
            type: 'graph',
            name: 'Graph',
            icon: '/images/widget-icons/icochart.png',
            width: [1,2,3,4],
            height: 3,
            config: {"metrics":[{"name":"count.user", "shape": "column"}],"segments":[{"name":"user.country", "axis":"abs"},{"name":"user.inscriptiondate"}], "order": "user.inscriptiondate", "stacked": true}
        },
        map: {
            type: 'map',
            name: 'Map',
            icon: '/images/widget-icons/icomap.png',
            width: [1,2,3,4],
            height: 4,
            config: {"metrics":[{"name":"count.user"}],"segments":[{"name":"user.countrycode"},{"name":"user.country"}], "order": "user.countrycode"}
        }
    }).
    constant('WIDGET_TEMPLATES', {
        graph: '<section dd-widget-graph class="dd-widget"></section>',
        singlenumber: '<section dd-widget-single-number class="dd-widget"></section>',
        pie: '<section dd-widget-pie class="dd-widget"></section>',
        table: '<section dd-widget-table class="dd-widget"></section>',
        map: '<section dd-widget-map class="dd-widget"></section>'
    }).
    constant('WIDGET_GRAPH_TYPES', [
        {
            type: 'area',
            icon: '/images/widget-icons/tiny-icochart-area.png'
        },
        {
            type: 'line',
            icon: '/images/widget-icons/tiny-icochart-line.png'
        },
        {
            type: 'column',
            icon: '/images/widget-icons/tiny-icochart-bar.png'
        }
    ]);