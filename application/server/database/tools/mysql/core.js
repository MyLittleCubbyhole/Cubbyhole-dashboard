var MysqlTools = { query: {} }
,	_ = require('lodash')
,	queryBuilder = require(global.paths.server + '/config/core').get()['query-builder'];


MysqlTools.query.generate = function(queryConfig) {
	var request = 'SELECT '
	,	tables = []
	,	name = '';

	queryConfig.operator = queryConfig.operator || 'AND';

	for(var i = 0; i < queryConfig.metrics.length; i++) {
		name = queryConfig.metrics[i].name;
		if(i > 0)
			request += ',';
		request += queryBuilder['kpi_definition'][name].apply + ' as ' + queryBuilder['kpi_definition'][name].alias + ' ';
		tables = _.union(tables, queryBuilder['kpi_definition'][name].tables);
	}

	if(queryConfig.metrics.length > 0 && queryConfig.segments.length > 0)
		request += ',';

	for(var i = 0; i < queryConfig.segments.length; i++) {
		name = queryConfig.segments[i].name;
		if(i > 0)
			request += ',';
		request += queryBuilder['kpi_definition'][name].apply + ' as ' + queryBuilder['kpi_definition'][name].alias + ' ';
		tables = _.union(tables, queryBuilder['kpi_definition'][name].tables);
	}

	var where = []
	,	having = []
	,	filter = ""
	,	value = "";
	for(var i = 0; i<queryConfig.filters.length; i++) {
		name = queryConfig.filters[i].name;

		switch(queryConfig.filters[i].operator.toLowerCase()) {
			case 'BETWEEN': 
			case 'NOT BETWEEN': 
				value = queryConfig.filters[i].value.join(' AND ');
			break;
			case 'IN':
			case 'NOT IN': 
				value = '(' + queryConfig.filters[i].value.join(',') + ')';
			break;
			default: 
				value = queryConfig.filters[i].value;
			break;
		}


		if(queryBuilder['kpi_definition'][name].group)
			having.push(queryBuilder['kpi_definition'][name].alias + ' ' + queryConfig.filters[i].operator + ' ' + value);
		else
			where.push(queryBuilder['kpi_definition'][name].apply + ' ' + queryConfig.filters[i].operator + ' "' + value);

		tables = _.union(tables, queryBuilder['kpi_definition'][name].tables);
	}

	if(tables.length>0)
		request += MysqlTools.query.makeJoin(tables);

	if(where.length > 0)
		request += 'WHERE ' + where.join(' ' + queryConfig.operator + ' ') + ' ';

	if(queryConfig.metrics.length > 0 && queryConfig.segments.length > 0) {
		request += 'GROUP BY ';	
		for(var i = 0; i < queryConfig.segments.length; i++) {
			if(i > 0)
				request += ',';
			name = queryConfig.segments[i].name;
			request +=  queryBuilder['kpi_definition'][name].apply + ' ';
		}
	}

	if(having.length > 0)
		request += 'HAVING ' + having.join(' ' + queryConfig.operator + ' ') + ' ';

	return request;
}

MysqlTools.query.makeJoin = function(tables) {
	var tables_done = {}
	,	tableDefinition = config['query-builder']['table_definition'][tables.pop()]
	,	joinTableDefinition = {}
	,	joinTable = ''
	,	request = 'FROM ' + tableDefinition.name + ' ' + tableDefinition.alias + ' '
	,	witness = false
	,	dependencyDefinition = null;

	while(tables.length>0) {
		joinTable = tables.pop();
		joinTableDefinition = config['query-builder']['table_definition'][joinTable];

		if(tableDefinition.join[joinTableDefinition.name].dependency) {
			dependencyDefinition = config['query-builder']['table_definition'][tableDefinition.join[joinTableDefinition.name].dependency];
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

MysqlTools.query.compare = function(base, compare) {
	
}

module.exports = MysqlTools;