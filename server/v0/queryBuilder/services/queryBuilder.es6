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

	Service._addNeededTables = _addNeededTables;
	Service._makeJoin = _makeJoin;
	Service._addInnerJoin = _addInnerJoin;
	Service._addCondition = _addCondition;
	Service._addUnionQuery = _addUnionQuery;
	Service._addWhereQuery = _addWhereQuery;
	Service._addGroupByQuery = _addGroupByQuery;
	Service._addHavingQuery = _addHavingQuery;
	Service._addOrderByQuery = _addOrderByQuery;
	Service._addLimitQuery = _addLimitQuery;

/*Public methods declarations*/

	Service.generate = generate;
	Service.compare = compare;


module.exports = Service;

/*Overridden methods definitions*/

/*Private methods definitions*/

	function _addNeededTables(kpis, names, tables) {
		var name,
		    request = '',
		    resultTables;
		for(let i = 0; i < kpis.length; i++) {
			name = kpis[i].name;
			if(!!names[name])
				continue;

			names[name] = true;
			if(i > 0)
				request += ',';
			request += queryBuilder['kpi_definition'][name].apply + ' as ' + queryBuilder['kpi_definition'][name].alias + ' ';
			resultTables = _.union(tables, queryBuilder['kpi_definition'][name].tables);
			tables.splice(0);
			_.assign(tables, resultTables);
		}
		return request;
	}

	function _makeJoin(tables) {
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
				if(!tablesDone[dependencyDefinition.name])
					request += this._addInnerJoin(dependencyDefinition, tablesDone);
				if(!tablesDone[dependencyDefinition.name][tableDefinition.name]) {
					request += 'ON ' + dependencyDefinition.alias + '.' + dependencyDefinition.join[tableDefinition.name].on[0] + ' = ' + tableDefinition.alias + '.' + dependencyDefinition.join[tableDefinition.name].on[1] + ' ';
					tablesDone[dependencyDefinition.name][tableDefinition.name] = true;
				}
				if(!tablesDone[joinTableDefinition.name])
					request += this._addInnerJoin(joinTableDefinition, tablesDone);
				if(!tablesDone[joinTableDefinition.name][tableDefinition.name]) {
					request += 'ON ' + dependencyDefinition.alias + '.' + dependencyDefinition.join[joinTableDefinition.name].on[0] + ' = ' + joinTableDefinition.alias + '.' + dependencyDefinition.join[joinTableDefinition.name].on[1] + ' ';
					tablesDone[joinTableDefinition.name][tableDefinition.name] = true;
				}
			}
			else {
				if(!tablesDone[joinTableDefinition.name])
					request += this._addInnerJoin(joinTableDefinition, tablesDone);
				if(!tablesDone[joinTableDefinition.name][tableDefinition.name]) {
					request += 'ON ' + tableDefinition.alias + '.' + tableDefinition.join[joinTableDefinition.name].on[0] + ' = ' + joinTableDefinition.alias + '.' + tableDefinition.join[joinTableDefinition.name].on[1] + ' ';
					tablesDone[joinTableDefinition.name][tableDefinition.name] = true;
				}
			}
		}
		return request;
	}

	function _addInnerJoin(definition, tablesDone) {
		tablesDone[definition.name] = {};
		return 'INNER JOIN ' + definition.name + ' ' + definition.alias + ' ';
	}

	function _addCondition(optionValue) {
		var value;
		if(typeof optionValue !== 'object')
			value = '"' + optionValue.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + '"';
		else {
			value = 'NOW()';
			switch(optionValue.apply) {
				case 'ADD':
					value = 'DATE_ADD(NOW(), INTERVAL ' + optionValue.value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + ' DAY)';
					break;
				case 'SUB':
					value = 'DATE_SUB(NOW(), INTERVAL ' + optionValue.value.toString().replace(/[^\sa-zA-z0-9\_\-]/, '') + ' DAY)';
					break;
			}
		}
		return value;
	}

	function _addUnionQuery(options, queries) {
		var queryOperator;
		for(let i = 0; i < queries.length; i++) {
			queryOperator = options.filters[i] && options.filters[i].operator === 'OR' ? 'AND' : 'OR';
			queries[i].union = queryOperator === 'OR' && !!queries[i].having && queries[i].having.length > 0 && queries[i].where && queries[i].where.length > 0;
			if(queries[i].union)
				queries[i].unionQuery = queries[i].request;
		}
	}

	function _addWhereQuery(options, queries) {
		for(let i = 0; i < queries.length; i++) {
			if(!!queries[i].where && queries[i].where.length > 0)
				queries[i].request += 'WHERE ' + queries[i].where.join(' ' + options.filters[i].operator + ' ') + ' ';
		}
	}

	function _addGroupByQuery(options, queries) {
		if(options.metrics.length > 0 && options.segments.length > 0) {
			var groupbyQuery = 'GROUP BY ',
				name;
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
	}

	function _addHavingQuery(options, queries) {
		var havingQuery;
		for(let i = 0; i < queries.length; i++) {
			if(!!queries[i].having && queries[i].having.length > 0) {
				havingQuery = 'HAVING ' + queries[i].having.join(' ' + options.filters[i].operator + ' ') + ' ';

				if(queries[i].unionQuery)
					queries[i].unionQuery += havingQuery;
				else
					queries[i].request += havingQuery;
			}
		}
	}

	function _addOrderByQuery(options, queries) {
		if(!!options.sort && !!options.sort.name) {

			var orderbyQuery = 'ORDER BY ' + queryBuilder['kpi_definition'][options.sort.name].apply + ' ' + ( options.sort.order ? options.sort.order : 'ASC' );
			for(let i = 0; i < queries.length; i++) {
				if(queries[i].union)
					queries[i].unionOrderer = ' ORDER BY ' + queryBuilder['kpi_definition'][options.sort.name].alias + ' ' + ( options.sort.order ? options.sort.order : 'ASC' );
				else
					queries[i].request += orderbyQuery;
			}

		}
	}

	function _addLimitQuery(options, queries) {
		if(typeof options.limit !== 'undefined') {
			var limit = ' LIMIT ' + options.limit;

			for(let i = 0; i < queries.length; i++) {
				if(!queries[i].union)
					queries[i].unionQuery += limit;
				queries[i].request += limit;
			}
		}
	}

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

		request += this._addNeededTables(options.metrics, names, tables);

		if(options.metrics.length > 0 && options.segments.length > 0)
			request += ',';

		request += this._addNeededTables(options.segments, names, tables);

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
								value += this._addCondition(options.filters[i].conditions[j].value[val]);
								value += val < options.filters[i].conditions[j].value.length - 1 ? ' AND ' : '';
							}
							break;
						case 'IN':
						case 'NOT IN':
							value = '(';
							for(var val in options.filters[i].conditions[j].value) {
								value += this._addCondition(options.filters[i].conditions[j].value[val]);
								value += val < options.filters[i].conditions[j].value.length - 1 ? ',' : '';
							}
							value += ')';
							break;
						default:
							value = this._addCondition(options.filters[i].conditions[j].value[0]);
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
				queries[i].request += this._makeJoin(queries[i].tables);
		}


		this._addUnionQuery(options, queries);
		this._addWhereQuery(options, queries);
		this._addGroupByQuery(options, queries);
		this._addHavingQuery(options, queries);
		this._addOrderByQuery(options, queries);
		this._addLimitQuery(options, queries);


		for(let i = 0; i < queries.length; i++) {
			queries[i] = queries[i].request + (queries[i].union ? ' UNION ' + queries[i].unionQuery + queries[i].unionOrderer : '' );
		}

		return queries.length > 1 ? queries : queries[0];
	}

	function compare(options) {
		var queries = this.generate(options),
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

		return WidgetFactory.query(query)
			.then((result) => {
				return {
					head: head,
					data: result
				};
			});
	}