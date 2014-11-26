/*Parent class cloning*/

	var Service = require('kanto-patterns').service.clone();

/*Factory requiring*/

	var WidgetFactory = (__dirname + '/../factories/widget');

/*Services requiring*/

	var _  = require('lodash'),
    queryBuilder = global.parameters['query-builder'];

/*Attributes definitions*/

	Service._name = 'QueryBuilder';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Service.generate = generate;
	Service.makeJoin = makeJoin;
	Service.compare = compare;


module.exports = Service;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function generate(options) {
		var queries = [],
		    request = 'SELECT ',
		    tables = [],
		    name = '',
		    names = {};

		if(!options.metrics || !options.segments)
			throw Error('invalid configuration');

		options.operator = options.operator || 'AND';

		for(let i = 0; i < options.metrics.length; i++) {
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

		for(let i = 0; i < options.segments.length; i++) {
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

		var value = '';
		if(!!options.filters) {
			for(let i = 0; i < options.filters.length; i++) {

				if(i > 0)
					queries.push({request: request, tables: tables, unionOrderer: ''});

				for(var j = 0; j < options.filters[i].conditions.length; j++) {

					name = options.filters[i].conditions[j].name;

					switch(options.filters[i].conditions[j].operator.toUpperCase()) {
						case 'BETWEEN':
						case 'NOT BETWEEN':
							for(let val in options.filters[i].conditions[j].value) {
								let valueTemp = '';
								if(typeof options.filters[i].conditions[j].value[val] !== 'object')
									valueTemp = '"' + options.filters[i].conditions[j].value[val].toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + '"';
								else {
									valueTemp = 'NOW()';
									switch(options.filters[i].conditions[j].value[val].apply) {
										case 'ADD':
											valueTemp = 'DATE_ADD(NOW(), INTERVAL ' + options.filters[i].conditions[j].value[val].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + ' DAY)';
											break;
										case 'SUB':
											valueTemp = 'DATE_SUB(NOW(), INTERVAL ' + options.filters[i].conditions[j].value[val].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + ' DAY)';
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
								let valueTemp = '';

								if(typeof options.filters[i].conditions[j].value[val] !== 'object')
									valueTemp = '"' + options.filters[i].conditions[j].value[val].toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + '"';
								else {
									valueTemp = 'NOW()';
									switch(options.filters[i].conditions[j].value[val].apply) {
										case 'ADD':
											valueTemp = 'DATE_ADD(NOW(), INTERVAL ' + options.filters[i].conditions[j].value[val].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + ' DAY)';
											break;
										case 'SUB':
											valueTemp = 'DATE_SUB(NOW(), INTERVAL ' + options.filters[i].conditions[j].value[val].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + ' DAY)';
											break;
									}
								}

								value += valueTemp;
								if(val < options.filters[i].conditions[j].value.length - 1)
									value += ',';
							}
							value += ')';
							break;
						default:
							if(typeof options.filters[i].conditions[j].value[0] !== 'object')
								value = '"' + options.filters[i].conditions[j].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + '"';
							else {
								value = 'NOW()';
								switch(options.filters[i].conditions[j].value[0].apply) {
									case 'ADD':
										value = 'DATE_ADD(NOW(), INTERVAL ' + options.filters[i].conditions[j].value[0].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + ' DAY)';
										break;
									case 'SUB':
										value = 'DATE_SUB(NOW(), INTERVAL ' + options.filters[i].conditions[j].value[0].value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + ' DAY)';
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
		}

		for(let i = 0; i < queries.length; i++) {
			if(!!queries[i].tables && queries[i].tables.length > 0)
				queries[i].request += Service.makeJoin(queries[i].tables);
		}

		var havingQuery = '',
		    orderbyQuery = '',
		    limit = '',
		    queryOperator = 'AND',
		    groupbyQuery = '';


		for(let i = 0; i < queries.length; i++) {
			queryOperator = options.filters[i] && options.filters[i].operator === 'OR' ? 'AND' : 'OR';
			queries[i].union = queryOperator === 'OR' && !!queries[i].having && queries[i].having.length > 0 && queries[i].where && queries[i].where.length > 0;
			if(queries[i].union)
				queries[i].unionQuery = queries[i].request;
		}

		for(let i = 0; i < queries.length; i++) {
			if(!!queries[i].where && queries[i].where.length > 0)
				queries[i].request += 'WHERE ' + queries[i].where.join(' ' + options.filters[i].operator + ' ') + ' ';
		}

		if(options.metrics.length > 0 && options.segments.length > 0) {
			groupbyQuery += 'GROUP BY ';
			for(let i = 0; i < options.segments.length; i++) {
				if(i > 0)
					groupbyQuery += ',';
				name = options.segments[i].name;
				groupbyQuery += queryBuilder['kpi_definition'][name].apply + ' ';
			}

			for(let i = 0; i < queries.length; i++) {
				if(queries[i].unionQuery)
					queries[i].unionQuery += groupbyQuery;
				queries[i].request += groupbyQuery;
			}
		}

		for(let i = 0; i < queries.length; i++) {
			if(!!queries[i].having && queries[i].having.length > 0) {
				havingQuery = 'HAVING ' + queries[i].having.join(' ' + options.filters[i].operator + ' ') + ' ';

				if(queries[i].unionQuery)
					queries[i].unionQuery += havingQuery;
				else
					queries[i].request += havingQuery;
			}
		}

		if(!!options.sort && !!options.sort.name) {

			orderbyQuery = 'ORDER BY ' + queryBuilder['kpi_definition'][options.sort.name].apply + ' ' + ( options.sort.order ? options.sort.order : 'ASC' );
			for(let i = 0; i < queries.length; i++) {
				if(queries[i].union)
					queries[i].unionOrderer = ' ORDER BY ' + queryBuilder['kpi_definition'][options.sort.name].alias + ' ' + ( options.sort.order ? options.sort.order : 'ASC' );
				else
					queries[i].request += orderbyQuery;
			}

		}

		if(typeof options.limit !== 'undefined') {
			limit = ' LIMIT ' + options.limit;

			for(let i = 0; i < queries.length; i++) {
				if(!queries[i].union)
					queries[i].unionQuery += limit;
				queries[i].request += limit;
			}
		}

		for(let i = 0; i < queries.length; i++) {
			queries[i] = queries[i].request + (queries[i].union ? ' UNION ' + queries[i].unionQuery + queries[i].unionOrderer : '' );
		}

		return queries.length > 1 ? queries : queries[0];
	}

	function makeJoin(tables) {
		var tablesDone = {},
		    tableDefinition = queryBuilder['table_definition'][tables.pop()],
		    joinTableDefinition = {},
		    joinTable = '',
		    request = 'FROM ' + tableDefinition.name + ' ' + tableDefinition.alias + ' ',
		    dependencyDefinition = null;

		while(tables.length > 0) {
			joinTable = tables.pop();
			joinTableDefinition = queryBuilder['table_definition'][joinTable];

			if(tableDefinition.join[joinTableDefinition.name].dependency) {
				dependencyDefinition = queryBuilder['table_definition'][tableDefinition.join[joinTableDefinition.name].dependency];
				if(!tablesDone[dependencyDefinition.name]) {
					request += 'INNER JOIN ' + dependencyDefinition.name + ' ' + dependencyDefinition.alias + ' ';
					tablesDone[dependencyDefinition.name] = {};
				}
				if(!tablesDone[dependencyDefinition.name][tableDefinition.name]) {
					request += 'ON ' + dependencyDefinition.alias + '.' + dependencyDefinition.join[tableDefinition.name].on[0] + ' = ' + tableDefinition.alias + '.' + dependencyDefinition.join[tableDefinition.name].on[1] + ' ';
					tablesDone[dependencyDefinition.name][tableDefinition.name] = true;
				}
				if(!tablesDone[joinTableDefinition.name]) {
					request += 'INNER JOIN ' + joinTableDefinition.name + ' ' + joinTableDefinition.alias + ' ';
					tablesDone[joinTableDefinition.name] = {};
				}
				if(!tablesDone[joinTableDefinition.name][tableDefinition.name]) {
					request += 'ON ' + dependencyDefinition.alias + '.' + dependencyDefinition.join[joinTableDefinition.name].on[0] + ' = ' + joinTableDefinition.alias + '.' + dependencyDefinition.join[joinTableDefinition.name].on[1] + ' ';
					tablesDone[joinTableDefinition.name][tableDefinition.name] = true;
				}

			}
			else {
				if(!tablesDone[joinTableDefinition.name]) {
					request += 'INNER JOIN ' + joinTableDefinition.name + ' ' + joinTableDefinition.alias + ' ';
					tablesDone[joinTableDefinition.name] = {};
				}
				if(!tablesDone[joinTableDefinition.name][tableDefinition.name]) {
					request += 'ON ' + tableDefinition.alias + '.' + tableDefinition.join[joinTableDefinition.name].on[0] + ' = ' + joinTableDefinition.alias + '.' + tableDefinition.join[joinTableDefinition.name].on[1] + ' ';
					tablesDone[joinTableDefinition.name][tableDefinition.name] = true;
				}

			}


		}
		return request;
	}

	function compare(options) {
		var queries = Service.generate(options),
		    query = 'SELECT ',
		    currentAlias,
		    head = [],
		    alias = [],
		    names = [],
		    name;

		if(typeof queries === 'string')
			queries = [queries];

		if(!options.filters || options.filters.length <= 0) {
			options.filters = [];
			options.filters[0] = {name: (options.filters[0] && options.filters[0].name ? options.filters[0].name : 'BASE')};
		}

		for(var aliasIndex = 0; aliasIndex < options.filters.length; aliasIndex++) {
			names = [];
			currentAlias = options.filters[aliasIndex].name || aliasIndex;
			currentAlias = currentAlias.toString().replace(' ', '');
			alias.push(currentAlias);

			if(aliasIndex > 0)
				query += ',';

			for(let i = 0; i < options.metrics.length; i++) {
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

			for(let i = 0; i < options.segments.length; i++) {
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

		for(aliasIndex = 0; aliasIndex < options.filters.length; aliasIndex++) {

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

		for(let i = 0; i < head.length; i++) {
			if(i > 0)
				comparison += ', ';
			comparison += '`' + head[i] + '`';
		}

		if(head.length > 0 && aliasIndex > 1)
			comparison += ', ';

		for(aliasIndex = 1; aliasIndex < options.filters.length; aliasIndex++) {

			if(aliasIndex > 1)
				comparison += ', ';

			var metricIndex = (options.metrics.length + options.segments.length) * aliasIndex;

			for(let i = 0; i < options.metrics.length; i++) {
				if(i > 0)
					comparison += ', ';
				comparison += '`' + head[metricIndex + i] + '` - `' + head[i] + '` as "' + alias[0] + '-' + head[metricIndex + i] + '_evol' + '"';
			}

			if(options.metrics.length > 0 && options.segments.length > 0)
				comparison += ',';

			var segmentIndex = metricIndex + options.metrics.length;

			for(let i = 0; i < options.segments.length; i++) {
				if(i > 0)
					comparison += ', ';
				comparison += '`' + head[segmentIndex + i] + '` - `' + head[i + options.metrics.length] + '` as "' + alias[0] + '-' + head[segmentIndex + i] + '_evol' + '"';
			}

		}

		query = comparison + ' FROM (' + query + ') as comparison';

		return query;
		/*return WidgetFactory.query(query)
			.then((result) => {
				return {
					head: head,
					data: result
				};
			});*/
	}