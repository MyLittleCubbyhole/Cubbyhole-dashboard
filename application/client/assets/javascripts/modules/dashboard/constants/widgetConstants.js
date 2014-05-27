angular.module('Dashboard').
	constant('WIDGET_DEFAULT_DEFINITION', {
		title: 'new widget',
		size: { width: 1, height: 1 },
		position: { x: 1, y: 1 },
		backgroundcolor: 'white',
		fontcolor: 'black',
		type: 'singlenumber'
	}).
	constant('WIDGET_TEMPLATES', {
		graph: '<section dd-widget-graph class="dd-widget"></section>',
		singlenumber: '<section dd-widget-singlenumber class="dd-widget"></section>'
	}).
	constant('WIDGET_GRAPH_TYPES', ['area','line','column']);