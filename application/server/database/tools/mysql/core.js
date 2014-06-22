// PillowTAG : Export ne marche pas. Choix de 3 data et 2 filtres (avec un countrycode = XX dans chacun). 2 virgulles en trop à la fin des COALESCE, avant le from
// PillowTAG : Export ne marche pas. Le deuxième filtre n'est pas pris en compte dans la comparaison, on se retrouve avec une valeur undefined
// PillowTAG : OR non pris en compte sur les filtres d'un widget. Toujours en valeur AND.

var MysqlTools = { query: {} }
,	Mysql = require(global.paths.server + '/database/mysql/core')
,	crypto = require('crypto')
,	_ = require('lodash')
,	fs = require('fs')
,	queryBuilder = require(global.paths.server + '/config/core').get()['query-builder'];

function encrypt(string, salt) {
    var hash = crypto.createHash('sha512');

    hash.update(string);
    hash.update(salt);

    return hash.digest('base64');
};

MysqlTools.generateRandomBytes = function(numberOfBytes, callback) {
    crypto.randomBytes(numberOfBytes, function(exception, bytes) {
        if(exception)
            throw exception;

        callback(bytes.toString('base64'));
    });
}

MysqlTools.generatePassword = function(password, callback){
    var data = {};

    if(!password || password.length<8)
        console.warn('invalid password - password length must be greater than 8');

    MysqlTools.generateRandomBytes(256, function(salt) {
        data.salt = salt;

        data.password = encrypt(password, data.salt);

        callback.call(this, data);
    });
}

MysqlTools.checkPassword = function(userPassword, bddPassword, salt){
    var encryptedPassword = encrypt(userPassword, salt);
    return encryptedPassword === bddPassword;
}

MysqlTools.query.generate = function(options) {
	var queries = []
	,	request = 'SELECT '
	,	tables = []
	,	union = false
	,	name = ''
	,	names = {};

	if(!options.metrics || !options.segments)
		throw 'invalid configuration';

	options.operator = options.operator || 'AND';

	for(var i = 0; i < options.metrics.length; i++) {
		name = options.metrics[i].name;
		if(!!names[name])
			continue;

		names[name] = true;
		if(i > 0)
			request += ',';
		request += queryBuilder['kpi_definition'][name].apply + ' as ' + queryBuilder['kpi_definition'][name].alias + ' ';
		tables = _.union(tables, queryBuilder['kpi_definition'][name].tables);
	}

	if(options.metrics.length > 0 && options.segments.length > 0)
		request += ',';

	for(var i = 0; i < options.segments.length; i++) {
		name = options.segments[i].name;
		if(!!names[name])
			continue;

		names[name] = true;
		if(i > 0)
			request += ',';
		request += queryBuilder['kpi_definition'][name].apply + ' as ' + queryBuilder['kpi_definition'][name].alias + ' ';
		tables = _.union(tables, queryBuilder['kpi_definition'][name].tables);
	}

	queries.push({request: request, tables: tables, unionOrderer: ''});

	var filter = ""
	,	value = "";
	if(!!options.filters)
		for(var i = 0; i<options.filters.length; i++) {

			if(i>0)
				queries.push({request: request, tables: tables, unionOrderer: ''});


			for(var j = 0; j<options.filters[i].conditions.length; j++) {

				name = options.filters[i].conditions[j].name;

				switch(options.filters[i].conditions[j].operator.toUpperCase()) {
					case 'BETWEEN':
					case 'NOT BETWEEN':
						for(var val in options.filters[i].conditions[j].value) {
							var valueTemp = '';
							if(typeof options.filters[i].conditions[j].value[val] != 'object')
								valueTemp = '"' + options.filters[i].conditions[j].value[val].toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + '"';
							else {
								valueTemp = 'NOW()';
								switch(options.filters[i].conditions[j].value[val].apply) {
									case 'ADD':
										valueTemp = 'DATE_ADD(NOW(), INTERVAL '+ options.filters[i].conditions[j].value[val].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') +' DAY)';
									break;
									case 'SUB':
										valueTemp = 'DATE_SUB(NOW(), INTERVAL '+ options.filters[i].conditions[j].value[val].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') +' DAY)';
									break;
								}
							}
							value += valueTemp;
							if(val < options.filters[i].conditions[j].value.length - 1)
								value += ' AND ';
						}
					break;
					case 'IN':
					case 'NOT IN':
						value = '(';
						for(var val in options.filters[i].conditions[j].value) {
							var valueTemp = '';

							if(typeof options.filters[i].conditions[j].value[val] != 'object')
								valueTemp = '"' + options.filters[i].conditions[j].value[val].toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + '"';
							else {
								valueTemp = 'NOW()';
								switch(options.filters[i].conditions[j].value[val].apply) {
									case 'ADD':
										valueTemp = 'DATE_ADD(NOW(), INTERVAL '+ options.filters[i].conditions[j].value[val].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') +' DAY)';
									break;
									case 'SUB':
										valueTemp = 'DATE_SUB(NOW(), INTERVAL '+ options.filters[i].conditions[j].value[val].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') +' DAY)';
									break;
								}
							}

							value += valueTemp;
							if(val < options.filters[i].conditions[j].value.length - 1)
								value +=  ',';
						}
						value += ')';
					break;
					default:
						if(typeof options.filters[i].conditions[j].value[0] != 'object')
							value = '"' + options.filters[i].conditions[j].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + '"';
						else {
							value = 'NOW()';
							switch(options.filters[i].conditions[j].value[0].apply) {
								case 'ADD':
									value = 'DATE_ADD(NOW(), INTERVAL '+ options.filters[i].conditions[j].value[0].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') +' DAY)';
								break;
								case 'SUB':
									value = 'DATE_SUB(NOW(), INTERVAL '+ options.filters[i].conditions[j].value[0].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') +' DAY)';
								break;
							}
						}
					break;
				}

				if(queryBuilder['kpi_definition'][name].group) {
					if(!queries[i].having)
						queries[i].having = [];
					queries[i].having.push(queryBuilder['kpi_definition'][name].apply + ' ' + options.filters[i].conditions[j].operator + ' ' + value);
				}
				else {
					if(!queries[i].where)
						queries[i].where = [];
					queries[i].where.push(queryBuilder['kpi_definition'][name].apply + ' ' + options.filters[i].conditions[j].operator + ' ' + value);
				}

				queries[i].tables = _.union(tables, queryBuilder['kpi_definition'][name].tables);
			}
		}

	for(var i = 0; i<queries.length; i++)
		if(!!queries[i].tables && queries[i].tables.length>0)
			queries[i].request += MysqlTools.query.makeJoin(queries[i].tables);

	var havingQuery = ''
	,	orderbyQuery =  ''
	,	limit = ''
	,	queryOperator = 'AND'
	,	groupbyQuery = '';


	for(var i = 0; i<queries.length; i++) {
		queryOperator =  options.filters[i] && options.filters[i].operator == 'OR' ? 'AND': 'OR';
		queries[i].union = queryOperator == 'OR' && !!queries[i].having && queries[i].having.length > 0 && queries[i].where && queries[i].where.length > 0;
		if(queries[i].union)
			queries[i].unionQuery = queries[i].request;
	}

	for(var i = 0; i<queries.length; i++)
		if(!!queries[i].where && queries[i].where.length > 0)
			queries[i].request += 'WHERE ' + queries[i].where.join(' ' + options.filters[i].operator + ' ') + ' ';

	if(options.metrics.length > 0 && options.segments.length > 0) {
		groupbyQuery += 'GROUP BY ';
		for(var i = 0; i < options.segments.length; i++) {
			if(i > 0)
				groupbyQuery += ',';
			name = options.segments[i].name;
			groupbyQuery +=  queryBuilder['kpi_definition'][name].apply + ' ';
		}

		for(var i = 0; i<queries.length; i++) {
			if(queries[i].unionQuery)
				queries[i].unionQuery += groupbyQuery;
			queries[i].request += groupbyQuery;
		}
	}

	for(var i = 0; i<queries.length; i++)
		if(!!queries[i].having && queries[i].having.length > 0) {
			havingQuery = 'HAVING ' + queries[i].having.join(' ' + options.filters[i].operator + ' ') + ' ';

				if(queries[i].unionQuery)
					queries[i].unionQuery += havingQuery;
				else
					queries[i].request += havingQuery;
		}

	if(!!options.sort && !!options.sort.name) {

		orderbyQuery = 'ORDER BY ' + queryBuilder['kpi_definition'][options.sort.name].apply + ' ' + ( options.sort.order ? options.sort.order : 'ASC' );
		for(var i = 0; i<queries.length; i++) {
			if(queries[i].union)
				queries[i].unionOrderer = ' ORDER BY ' + queryBuilder['kpi_definition'][options.sort.name].alias + ' ' + ( options.sort.order ? options.sort.order : 'ASC' );
			else
				queries[i].request += orderbyQuery;
		}

	}

	if(typeof options.limit != 'undefined') {
		limit = ' LIMIT ' + options.limit;

		for(var i = 0; i<queries.length; i++) {
			if(!queries[i].union)
				queries[i].unionQuery += limit;
			queries[i].request += limit;
		}
	}

	for(var i = 0; i<queries.length; i++)
		queries[i] = queries[i].request + (queries[i].union ? ' UNION ' + queries[i].unionQuery + queries[i].unionOrderer : '' );

	// console.log(queries)
	return queries.length > 1 ? queries : queries[0];
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

MysqlTools.query.compare = function(options, callback) {
	var queries = MysqlTools.query.generate(options)
	,	datas = []
	,	query = 'SELECT '
	,	started = 0
	,	currentAlias
	,	head = []
	,	alias = []
	,	names = [];

	if(typeof queries == 'string')
		queries = [queries];

	if(!options.filters || options.filters.length <= 0)
		options.filters = { name: (options.filters[0] && options.filters[0].name ? options.filters[0].name : 'BASE') };

	for(var aliasIndex = 0; aliasIndex<options.filters.length; aliasIndex++) {
		names = [];
		currentAlias = options.filters[aliasIndex].name || aliasIndex;
		currentAlias = currentAlias.toString().replace(' ', '');
		alias.push( currentAlias );

		if(aliasIndex > 0)
			query += ','

		for(var i = 0; i < options.metrics.length; i++) {
			name = options.metrics[i].name;
			if(names[name])
				continue;

			names[name] = true;
			if(i > 0)
				query += ',';
			head.push(alias[aliasIndex] + '-' + queryBuilder['kpi_definition'][name].alias);
			query += 'COALESCE( query_' + aliasIndex + '.' + queryBuilder['kpi_definition'][name].alias + ', "-") as "' + alias[aliasIndex] + '-' + queryBuilder['kpi_definition'][name].alias + '" ';
		}

		if(options.metrics.length > 0 && options.segments.length > 0)
			query += ',';

		for(var i = 0; i < options.segments.length; i++) {
			name = options.segments[i].name;
			if(names[name])
				continue;

			names[name] = true;
			if(i > 0)
				query += ',';
			head.push(alias[aliasIndex] + '-' + queryBuilder['kpi_definition'][name].alias);
			query += 'COALESCE( query_' + aliasIndex + '.' + queryBuilder['kpi_definition'][name].alias + ', "-") as "' + alias[aliasIndex] + '-' + queryBuilder['kpi_definition'][name].alias + '" ';
		}

	}

	query += ' FROM ';

	var right = query;


	for(var aliasIndex = 0; aliasIndex<options.filters.length; aliasIndex++) {

		if(aliasIndex > 0) {
			query += ' LEFT JOIN ';
			right += ' RIGHT JOIN ';
		}

		query += '(' + queries[aliasIndex] + ') query_' + aliasIndex + ' ';
		right += '(' + queries[aliasIndex] + ') query_' + aliasIndex + ' ';


		if(aliasIndex > 0) {
			query += ' ON 1 = 1 ';
			right += ' ON 1 = 1 ';
		}
	}

	query += ' union ' + right;

	var comparison = 'SELECT ';

	for(var i = 0; i < head.length; i++) {
		if(i > 0)
			comparison += ', ';
		comparison += '`' + head[i] + '`';
	}

	if(head.length > 0 && aliasIndex > 1)
		comparison += ', ';

	for(var aliasIndex = 1; aliasIndex < options.filters.length; aliasIndex++) {

		if(aliasIndex > 1)
			comparison += ', ';

		var metricIndex = (options.metrics.length + options.segments.length) * aliasIndex;

		for(var i = 0; i < options.metrics.length; i++) {
			if(i > 0)
				comparison += ', ';
			comparison += '`' + head[metricIndex + i] + '` - `' + head[i] + '` as "' + alias[0] + '-' + head[metricIndex + i] + '_evol' + '"';
		}

		if(options.metrics.length > 0 && options.segments.length > 0)
			comparison += ',';

		var segmentIndex = metricIndex + options.metrics.length;

		for(var i = 0; i < options.segments.length; i++) {
			if(i > 0)
				comparison += ', ';
			comparison += '`' + head[segmentIndex + i] + '` - `' + head[i + options.metrics.length] + '` as "' + alias[0] + '-' + head[segmentIndex + i] + '_evol' + '"';
		}

	}

	query = comparison + ' FROM (' + query + ') as comparison';

	Mysql.query(query, function(error, data) {
		!!callback && callback(error, {head: head, data: data});
	})

}

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