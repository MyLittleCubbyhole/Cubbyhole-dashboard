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
	var request = 'SELECT '
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

	var where = []
	,	having = []
	,	filter = ""
	,	value = "";
	if(options.filters)
	for(var i = 0; i<options.filters.length; i++) {
		name = options.filters[i].name;

		switch(options.filters[i].operator.toUpperCase()) {
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
			having.push(queryBuilder['kpi_definition'][name].apply + ' ' + options.filters[i].operator + ' ' + value);
		else
			where.push(queryBuilder['kpi_definition'][name].apply + ' ' + options.filters[i].operator + ' "' + value + '"');

		tables = _.union(tables, queryBuilder['kpi_definition'][name].tables);
	}


	if(tables.length>0)
		request += MysqlTools.query.makeJoin(tables);

	var unionQuery = ''
	,	havingQuery = ''
	,	orderbyQuery =  ''
	,	limit = ''
	,	groupbyQuery = '';

	union = options.operator == 'OR' && having.length > 0 && where.length > 0;

	if(union)
		unionQuery = request;
	
	if(where.length > 0)
		request += 'WHERE ' + where.join(' ' + options.operator + ' ') + ' ';

	if(options.metrics.length > 0 && options.segments.length > 0) {
		groupbyQuery += 'GROUP BY ';
		for(var i = 0; i < options.segments.length; i++) {
			if(i > 0)
				groupbyQuery += ',';
			name = options.segments[i].name;
			groupbyQuery +=  queryBuilder['kpi_definition'][name].apply + ' ';
		}

		request += havingQuery;
		if(!union)
			unionQuery += havingQuery;
	}

	if(having.length > 0) {
		havingQuery = 'HAVING ' + having.join(' ' + options.operator + ' ') + ' ';

		if(!union)
			request += havingQuery;
		else
			unionQuery += havingQuery;
	}

	if(!!options.sort && !!options.sort.name) {
		orderbyQuery = 'ORDER BY ' + queryBuilder['kpi_definition'][options.sort.name].apply + ' ' + ( options.sort.order ? options.sort.order : 'ASC' );

		request += orderbyQuery;
		if(!union)
			unionQuery += orderbyQuery;
	}

	if(typeof options.limit != 'undefined') {
		limit = ' LIMIT ' + options.limit;

		request += limit;
		if(!union)
			unionQuery += limit;
	}

	if(union)
		request += ' UNION ' + unionQuery;

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