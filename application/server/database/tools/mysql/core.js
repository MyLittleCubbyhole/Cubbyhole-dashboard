var MysqlTools = { query: {} }
,	_ = require('lodash')
,	queryBuilder = require(global.paths.server + '/config/core').get()['query-builder'];


MysqlTools.query.generate = function(options) {
	var request = 'SELECT '
	,	tables = []
	,	name = '';

	if(!options.metrics || !options.segments)
		throw 'invalid configuration';

	options.operator = options.operator || 'AND';

	for(var i = 0; i < options.metrics.length; i++) {
		name = options.metrics[i].name;
		if(i > 0)
			request += ',';
		request += queryBuilder['kpi_definition'][name].apply + ' as ' + queryBuilder['kpi_definition'][name].alias + ' ';
		tables = _.union(tables, queryBuilder['kpi_definition'][name].tables);
	}

	if(options.metrics.length > 0 && options.segments.length > 0)
		request += ',';

	for(var i = 0; i < options.segments.length; i++) {
		name = options.segments[i].name;
		if(i > 0)
			request += ',';
		request += queryBuilder['kpi_definition'][name].apply + ' as ' + queryBuilder['kpi_definition'][name].alias + ' ';
		tables = _.union(tables, queryBuilder['kpi_definition'][name].tables);
	}

	var where = []
	,	having = []
	,	filter = ""
	,	value = "";
	if(options.filters)
	for(var i = 0; i<options.filters.length; i++) {
		name = options.filters[i].name;

		switch(options.filters[i].operator.toLowerCase()) {
			case 'BETWEEN': 
			case 'NOT BETWEEN': 
				value = options.filters[i].value.join(' AND ');
			break;
			case 'IN':
			case 'NOT IN': 
				value = '(' + options.filters[i].value.join(',') + ')';
			break;
			default: 
				value = options.filters[i].value;
			break;
		}


		if(queryBuilder['kpi_definition'][name].group)
			having.push(queryBuilder['kpi_definition'][name].alias + ' ' + options.filters[i].operator + ' ' + value);
		else
			where.push(queryBuilder['kpi_definition'][name].apply + ' ' + options.filters[i].operator + ' "' + value);

		tables = _.union(tables, queryBuilder['kpi_definition'][name].tables);
	}

	if(tables.length>0)
		request += MysqlTools.query.makeJoin(tables);

	if(where.length > 0)
		request += 'WHERE ' + where.join(' ' + options.operator + ' ') + ' ';

	if(options.metrics.length > 0 && options.segments.length > 0) {
		request += 'GROUP BY ';	
		for(var i = 0; i < options.segments.length; i++) {
			if(i > 0)
				request += ',';
			name = options.segments[i].name;
			request +=  queryBuilder['kpi_definition'][name].apply + ' ';
		}
	}

	if(having.length > 0)
		request += 'HAVING ' + having.join(' ' + options.operator + ' ') + ' ';

	if(options.order)
		request += 'ORDER BY ' + queryBuilder['kpi_definition'][options.order].apply;

	return request;
}

MysqlTools.query.makeJoin = function(tables) {
	var tables_done = {}
	,	tableDefinition = queryBuilder['table_definition'][tables.pop()]
	,	joinTableDefinition = {}
	,	joinTable = ''
	,	request = 'FROM ' + tableDefinition.name + ' ' + tableDefinition.alias + ' '
	,	witness = false
	,	dependencyDefinition = null;

	while(tables.length>0) {
		joinTable = tables.pop();
		joinTableDefinition = queryBuilder['table_definition'][joinTable];

		if(tableDefinition.join[joinTableDefinition.name].dependency) {
			dependencyDefinition = queryBuilder['table_definition'][tableDefinition.join[joinTableDefinition.name].dependency];
			if(!tables_done[dependencyDefinition.name]) {
				request += 'INNER JOIN ' + dependencyDefinition.name + ' ' + dependencyDefinition.alias + ' ';
				tables_done[dependencyDefinition.name] = {};
			}
			if(!tables_done[dependencyDefinition.name][tableDefinition.name]) {
				request += 'ON ' + dependencyDefinition.alias + '.' + dependencyDefinition.join[tableDefinition.name].on[0] + ' = ' + tableDefinition.alias + '.' + dependencyDefinition.join[tableDefinition.name].on[1] + ' ';
				tables_done[dependencyDefinition.name][tableDefinition.name] = true;
			}			
			if(!tables_done[joinTableDefinition.name]) {
				request += 'INNER JOIN ' + joinTableDefinition.name + ' ' + joinTableDefinition.alias + ' ';
				tables_done[joinTableDefinition.name] = {};
			}
			if(!tables_done[joinTableDefinition.name][tableDefinition.name]) {
				request += 'ON ' + dependencyDefinition.alias + '.' + dependencyDefinition.join[joinTableDefinition.name].on[0] + ' = ' + joinTableDefinition.alias + '.' + dependencyDefinition.join[joinTableDefinition.name].on[1] + ' ';
				tables_done[joinTableDefinition.name][tableDefinition.name] = true;
			}

		}
		else {
			if(!tables_done[joinTableDefinition.name]) {
				request += 'INNER JOIN ' + joinTableDefinition.name + ' ' + joinTableDefinition.alias + ' ';
				tables_done[joinTableDefinition.name] = {};
			}
			if(!tables_done[joinTableDefinition.name][tableDefinition.name]) {
				request += 'ON ' + tableDefinition.alias + '.' + tableDefinition.join[joinTableDefinition.name].on[0] + ' = ' + joinTableDefinition.alias + '.' + tableDefinition.join[joinTableDefinition.name].on[1] + ' ';
				tables_done[joinTableDefinition.name][tableDefinition.name] = true;
			}

		}


	}

	return request;
}

MysqlTools.query.compare = function(base, compare) {}

MysqlTools.format = function(widget) {

	var definition = {};
	definition.id = widget.id;
	definition.config = JSON.parse(widget.config);
	definition.title = widget.title;
	definition.backgroundcolor = widget.backgroundcolor;
	definition.fontcolor = widget.fontcolor;
	definition.size = {};
	definition.size.height = widget.height;
	definition.size.width = widget.width;
	definition.position = {};
	definition.position.x = widget.positionx;
	definition.position.y = widget.positiony;
	definition.type = widget.type;
	definition.dashboardid = widget.dashboardid;

	return definition;
}

module.exports = MysqlTools;