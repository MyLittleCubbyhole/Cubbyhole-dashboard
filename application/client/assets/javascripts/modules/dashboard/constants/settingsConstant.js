angular.module('Dashboard').
	constant('DASHYDASH_SETTINGS', {
		margin: 2,
		height: 110,
		columns: {
			xl: 4,
			l: 4,
			sm: 4,
			xs: 1
		}
	}).constant('WIDGET_DEFAULT_SETTINGS', {
		title: 'new widget',
		size: { width: 1, height: 1 },
		position: { x: 1, y: 1 },
		backgroundcolor: 'white',
		fontcolor: 'black',
		type: 'singlenumber',
		filters: [],
		metrics: [],
		segments: [],
		operator: 'AND'
	});