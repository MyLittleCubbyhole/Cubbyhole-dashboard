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
			height: 4,
			config: {"metrics":[{"name":"user.age.avg"}, {"name":"count.user"}],"segments":[{"name":"user.country"},{"name":"user.inscriptiondate"}], "order": "user.inscriptiondate"}
		},
		graph: {
			type: 'graph',
			name: 'Graph',
			icon: '/images/widget-icons/icochart.png',
			width: [1,2,3,4],
			height: 3,
			config: {"metrics":[{"name":"count.user", "shape": "column"}],"segments":[{"name":"user.country"},{"name":"user.inscriptiondate", "axis":"abs"}], "order": "user.inscriptiondate", "stacked": true}
		}
	}).
	constant('WIDGET_TEMPLATES', {
		graph: '<section dd-widget-graph class="dd-widget"></section>',
		singlenumber: '<section dd-widget-single-number class="dd-widget"></section>',
		pie: '<section dd-widget-pie class="dd-widget"></section>',
		table: '<section dd-widget-table class="dd-widget"></section>'
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