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
		graph: '<dd-widget-graph></dd-widget-graph>',
		singlenumber: '<dd-widget-singlenumber></dd-widget-singlenumber>'
	});