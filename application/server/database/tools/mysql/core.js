var MysqlTools = { query: {} }
,	crypto = require('crypto')
,	_ = require('lodash')
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

	queries.push({request: request, tables: tables});

	var where = []
	,	having = []
	,	filter = ""
	,	value = "";
	if(!!options.filters)
		for(var i = 0; i<options.filters.length; i++) {

			if(i>0)
				queries.push({request: request, tables: tables});


			for(var j = 0; j<options.filters[i].length; j++) {


				name = options.filters[i][j].name;

				switch(options.filters[i][j].operator.toUpperCase()) {
					case 'BETWEEN':
					case 'NOT BETWEEN':
						value = options.filters[i][j].value.join(' AND ');
					break;
					case 'IN':
					case 'NOT IN':
						value = '(' + options.filters[i][j].value.join(',') + ')';
					break;
					default:
						value = options.filters[i][j].value;
					break;
				}


				if(queryBuilder['kpi_definition'][name].group) {
					if(!queries[i].having)
						queries[i].having = [];
					queries[i].having.push(queryBuilder['kpi_definition'][name].apply + ' ' + options.filters[i][j].operator + ' ' + value);
				}
				else {
					if(!queries[i].where)
						queries[i].where = [];
					queries[i].where.push(queryBuilder['kpi_definition'][name].apply + ' ' + options.filters[i][j].operator + ' "' + value + '"');
				}

				queries[i].tables = _.union(tables, queryBuilder['kpi_definition'][name].tables);
			}
		}

	for(var i = 0; i<queries.length; i++)
		if(!!queries[i].tables && queries[i].tables.length>0)
			queries[i].request += MysqlTools.query.makeJoin(queries[i].tables);

	var unionQuery = ''
	,	havingQuery = ''
	,	orderbyQuery =  ''
	,	limit = ''
	,	groupbyQuery = '';

	union = options.operator == 'OR' && having.length > 0 && where.length > 0;

	if(union)
		for(var i = 0; i<queries.length; i++)
			queries[i].union = queries[i].request;

	for(var i = 0; i<queries.length; i++)
		if(!!queries[i].where && queries[i].where.length > 0)
			queries[i].request += 'WHERE ' + queries[i].where.join(' ' + options.operator + ' ') + ' ';

	if(options.metrics.length > 0 && options.segments.length > 0) {
		groupbyQuery += 'GROUP BY ';
		for(var i = 0; i < options.segments.length; i++) {
			if(i > 0)
				groupbyQuery += ',';
			name = options.segments[i].name;
			groupbyQuery +=  queryBuilder['kpi_definition'][name].apply + ' ';
		}

		for(var i = 0; i<queries.length; i++) {
			if(union)
				queries[i].union += groupbyQuery;
			queries[i].request += groupbyQuery;
		}
	}

	for(var i = 0; i<queries.length; i++)
		if(!!queries[i].having && queries[i].having.length > 0) {
			havingQuery = 'HAVING ' + queries[i].having.join(' ' + options.operator + ' ') + ' ';

				if(union)
					queries[i].union += havingQuery;
				else
					queries[i].request += havingQuery;
		}

	if(!!options.sort && !!options.sort.name) {
		orderbyQuery = 'ORDER BY ' + queryBuilder['kpi_definition'][options.sort.name].apply + ' ' + ( options.sort.order ? options.sort.order : 'ASC' );

		for(var i = 0; i<queries.length; i++) {
			if(!union)
				queries[i].union += orderbyQuery;
			queries[i].request += orderbyQuery;
		}
	}

	if(typeof options.limit != 'undefined') {
		limit = ' LIMIT ' + options.limit;

		for(var i = 0; i<queries.length; i++) {
			if(!union)
				queries[i].union += limit;
			queries[i].request += limit;
		}
	}

	for(var i = 0; i<queries.length; i++)
			queries[i] = queries[i].request + (union ? ' UNION ' + queries[i].union : '' );
	console.log(queries[0])
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

MysqlTools.query.compare = function(baseconfig, compareconfig) {}

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