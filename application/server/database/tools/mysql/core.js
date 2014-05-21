var MysqlTools = {
		request: {}
	},
	config = require(global.paths.server + '/config/core').get();


// select count(*) from user;

// select count(*) 
// from user u
// inner join subscribe s
// on s.userid = u.id
// inner join plan p
// on p.id = s.planid
// where p.price = 0

// select count(*) 
// from user u
// inner join subscribe s
// on s.userid = u.id
// inner join plan p
// on p.id = s.planid
// where p.price > 0

// select p.id,  count(*)
// from user u
// inner join subscribe s
// on s.userid = u.id
// inner join plan p
// on p.id = s.planid
// group by p.id

// select YEAR(inscriptionDate), MONTH(inscriptionDate), count(*) 
// from user
// group by YEAR(inscriptionDate), MONTH(inscriptionDate)

// select YEAR(inscriptionDate), MONTH(inscriptionDate), count(*) 
// from user u
// inner join subscribe s
// on u.id = s.userid
// inner join plan p
// on p.id = s.planid
// where u.id in (
// 	select u.id 
// 	from user u
// 	inner join subscribe s
// 	on u.id = s.userid
// 	inner join plan p
// 	on p.id = s.planid
// 	where ( (MONTH(NOW()) -1) >= MONTH(s.datestart) and (MONTH(NOW()) -1) <= MONTH(s.dateend) )
// 	and p.price > 0
// ) 
// and NOW() between s.datestart and s.dateend
// and p.price > 0
// group by YEAR(u.inscriptionDate), MONTH(u.inscriptionDate)


// select DATEDIFF( MIN(s.datestart) , u.inscriptiondate )
// from user u
// inner join subscribe s
// on u.id = s.userid
// inner join plan p
// on p.id = s.planid
// where p.price > 0

// select u.country, count(*) 
// from user u
// group by u.country

// select AVG(u.storage) as `AVG_STORAGE`
// from user u
// inner join subscribe s
// on u.id = s.userid
// inner join plan p
// on p.id = s.planid

// select YEAR(d.day), MONTH(d.day), DAY(d.day), AVG(d.quotaused) as `QUOTA_STORAGE`
// from subscribe s
// inner join plan p
// on p.id = s.planid
// inner join daily_quota d
// on s.id = d.subscribeid
// group by YEAR(d.day), MONTH(d.day), DAY(d.day)



var config = {
	"query-builder": {
		"kpi_definition": {
			"special.firstpayment": {
				"name": "id",
				"tables": ["user", "subscribe"],
				"apply": "DATEDIFF( MIN(s.datestart) , u.inscriptiondate )",
				"dependency": false,
				"alias": "first_payment",
				"group": false
			},
			"count.user": {
				"name": "count",
				"tables": ["user"],
				"apply": "count(*)",
				"dependency": false,
				"alias": "count_user",
				"group": true
			},
			"count.plan": {
				"name": "count",
				"tables": ["plan"],
				"apply": "count(*)",
				"dependency": false,
				"alias": "count_plan",
				"group": true
			},
			"count.payment": {
				"name": "count",
				"tables": ["payment"],
				"apply": "count(*)",
				"dependency": false,
				"alias": "count_payment",
				"group": true
			},
			"object.plan": {
				"name": "id",
				"tables": ["plan"],
				"apply": "p.id",
				"dependency": "plan.name",
				"alias": "plan_id",
				"group": false
			},
			"object.payment": {
				"name": "id",
				"tables": ["payment"],
				"apply": "pa.id",
				"dependency": false,
				"alias": "payment_id",
				"group": false
			},
			"object.dailyquota": {
				"name": "id",
				"tables": ["daily_quota"],
				"apply": "d.id",
				"dependency": false,
				"alias": "dailyquota_id",
				"group": false
			},
			"user.age": {
				"name": "age",
				"tables": ["user"],
				"apply": "YEAR(NOW()) - YEAR(u.birthdate)",
				"dependency": false,
				"alias": "age",
				"group": false
			},
			"user.birthdate": {
				"name": "birthdate",
				"tables": ["user"],
				"apply": "u.birthdate",
				"dependency": false,
				"alias": "birthdate",
				"group": false
			},
			"user.birthyear": {
				"name": "birthyear",
				"tables": ["user"],
				"apply": "YEAR(u.birthdate)",
				"dependency": false,
				"alias": "birthyear",
				"group": false
			},
			"user.birthmonth": {
				"name": "birthmonth",
				"tables": ["user"],
				"apply": "MONTH(u.birthdate)",
				"dependency": false,
				"alias": "birthmonth",
				"group": false
			},
			"user.birthday": {
				"name": "birthday",
				"tables": ["user"],
				"apply": "DAY(u.birthdate)",
				"dependency": false,
				"alias": "birthday",
				"group": false
			},
			"user.inscriptiondate": {
				"name": "inscriptiondate",
				"tables": ["user"],
				"apply": "u.inscriptiondate",
				"dependency": false,
				"alias": "inscriptiondate",
				"group": false
			},
			"user.inscriptionyear": {
				"name": "inscriptiondate",
				"tables": ["user"],
				"apply": "YEAR(u.inscriptiondate)",
				"dependency": false,
				"alias": "inscriptionyear",
				"group": false
			},
			"user.inscriptionmonth": {
				"name": "inscriptiondate",
				"tables": ["user"],
				"apply": "MONTH(u.inscriptiondate)",
				"dependency": false,
				"alias": "inscriptionmonth",
				"group": false
			},
			"user.inscriptionday": {
				"name": "inscriptiondate",
				"tables": ["user"],
				"apply": "DAY(u.inscriptiondate)",
				"dependency": false,
				"alias": "inscriptionday",
				"group": false
			},
			"user.country": {
				"name": "country",
				"tables": ["user"],
				"apply": "u.country",
				"dependency": false,
				"alias": "country",
				"group": false
			},
			"user.role": {
				"name": "role",
				"tables": ["user"],
				"apply": "u.role",
				"dependency": false,
				"alias": "role",
				"group": false
			},
			"user.storage": {
				"name": "storage",
				"tables": ["user"],
				"apply": "SUM(u.storage)",
				"dependency": false,
				"alias": "user_storage",
				"group": true
			},
			"user.storage.avg": {
				"name": "storage",
				"tables": ["user"],
				"apply": "AVG(u.storage)",
				"dependency": false,
				"alias": "average_user_storage",
				"group": true
			},
			"plan.name": {
				"name": "name",
				"tables": ["plan"],
				"apply": "p.name",
				"dependency": false,
				"alias": "plan_name",
				"group": false
			},
			"plan.storage": {
				"name": "storage",
				"tables": ["plan"],
				"apply": "p.storage",
				"dependency": false,
				"alias": "plan_storage",
				"group": false
			},
			"plan.storage.avg": {
				"name": "storage",
				"tables": ["plan"],
				"apply": "AVG(p.storage)",
				"dependency": false,
				"alias": "average_plan_storage",
				"group": true
			},
			"plan.upladbandwidth": {
				"name": "upladbandwidth",
				"tables": ["plan"],
				"apply": "SUM(p.upladbandwidth)",
				"dependency": false,
				"alias": "upladbandwidth",
				"group": true
			},
			"plan.upladbandwidth.avg": {
				"name": "upladbandwidth",
				"tables": ["plan"],
				"apply": "AVG(p.upladbandwidth)",
				"dependency": false,
				"alias": "average_upladbandwidth",
				"group": true
			},
			"plan.downloadbandwidth": {
				"name": "downloadbandwidth",
				"tables": ["plan"],
				"apply": "SUM(p.downloadbandwidth)",
				"dependency": false,
				"alias": "downloadbandwidth",
				"group": true
			},
			"plan.downloadbandwidth.avg": {
				"name": "downloadbandwidth",
				"tables": ["plan"],
				"apply": "AVG(p.downloadbandwidth)",
				"dependency": false,
				"alias": "average_downloadbandwidth",
				"group": true
			},
			"plan.quota": {
				"name": "quota",
				"tables": ["plan"],
				"apply": "p.quota",
				"dependency": false,
				"alias": "plan_quota",
				"group": false
			},
			"plan.quota.avg": {
				"name": "quota",
				"tables": ["plan"],
				"apply": "AVG(p.quota)",
				"dependency": false,
				"alias": "average_plan_quota",
				"group": true
			},
			"plan.price": {
				"name": "price",
				"tables": ["plan"],
				"apply": "p.price",
				"dependency": false,
				"alias": "plan_price",
				"group": false
			},
			"plan.price.avg": {
				"name": "price",
				"tables": ["plan"],
				"apply": "AVG(p.price)",
				"dependency": false,
				"alias": "average_plan_price",
				"group": true
			},
			"payment.amount": {
				"name": "amount",
				"tables": ["payment"],
				"apply": "SUM(pa.amount)",
				"dependency": false,
				"alias": "payment",
				"group": true
			},
			"payment.amount.avg": {
				"name": "amount",
				"tables": ["payment"],
				"apply": "AVG(pa.amount)",
				"dependency": false,
				"alias": "average_payment",
				"group": true
			},
			"payment.duration": {
				"name": "duration",
				"tables": ["payment"],
				"apply": "pa.duration",
				"dependency": false,
				"alias": "payment_duration",
				"group": false
			},
			"payment.duration.avg": {
				"name": "duration",
				"tables": ["payment"],
				"apply": "AVG(pa.duration)",
				"dependency": false,
				"alias": "average_payment_duration",
				"group": true
			},
			"payment.date": {
				"name": "date",
				"tables": ["payment"],
				"apply": "pa.date",
				"dependency": false,
				"alias": "payment_date",
				"group": false
			},
			"payment.year": {
				"name": "date",
				"tables": ["payment"],
				"apply": "YEAR(pa.date)",
				"dependency": false,
				"alias": "payment_year",
				"group": false
			},
			"payment.month": {
				"name": "date",
				"tables": ["payment"],
				"apply": "MONTH(pa.date)",
				"dependency": false,
				"alias": "payment_month",
				"group": false
			},
			"payment.day": {
				"name": "date",
				"tables": ["payment"],
				"apply": "DAY(pa.date)",
				"dependency": false,
				"alias": "payment_day",
				"group": false
			},
			"dailyquota.quota": {
				"name": "quotaused",
				"tables": ["daily_quota"],
				"apply": "SUM(d.quotaused)",
				"dependency": false,
				"alias": "quota_used",
				"group": true
			},
			"dailyquota.quota.avg": {
				"name": "quotaused",
				"tables": ["daily_quota"],
				"apply": "AVG(d.quotaused)",
				"dependency": false,
				"alias": "average_quota_used",
				"group": true
			},
			"dailyquota.date": {
				"name": "day",
				"tables": ["daily_quota"],
				"apply": "d.day",
				"dependency": false,
				"alias": "quota_date",
				"group": false
			},
			"dailyquota.year": {
				"name": "day",
				"tables": ["daily_quota"],
				"apply": "YEAR(d.day)",
				"dependency": false,
				"alias": "quota_year",
				"group": false
			},
			"dailyquota.month": {
				"name": "day",
				"tables": ["daily_quota"],
				"apply": "MONTH(d.day)",
				"dependency": false,
				"alias": "quota_month",
				"group": false
			},
			"dailyquota.day": {
				"name": "day",
				"tables": ["daily_quota"],
				"apply": "DAY(d.day)",
				"dependency": false,
				"alias": "quota_day",
				"group": false
			},
			"subscribe.datestart": {
				"name": "datestart",
				"tables": ["subscribe"],
				"apply": "s.datestart",
				"dependency": false,
				"alias": "subscribe_datestart",
				"group": false
			},
			"subscribe.dateend": {
				"name": "dateend",
				"tables": ["subscribe"],
				"apply": "s.dateend",
				"dependency": false,
				"alias": "subscribe_dateend",
				"group": false
			},
			"subscribe.paused": {
				"name": "paused",
				"tables": ["subscribe"],
				"apply": "s.paused",
				"dependency": false,
				"alias": "subscribe_paused",
				"group": false
			}
		},
		"table_definition": {
			"plan": {
				"name": "plan",
				"alias": "p",
				"join": {
					"user": {
						"dependency": "subscribe"
					},
					"subscribe": {
						"dependency": false,
						"on": ["id", "planid"]
					},
					"daily_quota": {
						"dependency": "subscribe"
					},
					"payment": {
						"dependency": "subscribe"
					}
				}
			},
			"user": {
				"name": "user",
				"alias": "u",
				"join": {
					"plan": {
						"dependency": "subscribe"
					},
					"subscribe": {
						"dependency": false,
						"on": ["id", "userid"]
					},
					"daily_quota": {
						"dependency": "subscribe"
					},
					"payment": {
						"dependency": "subscribe"
					}
				}
			},
			"daily_quota": {
				"name": "daily_quota",
				"alias": "d",
				"join": {
					"plan": {
						"dependency": "subscribe"
					},
					"subscribe": {
						"dependency": false,
						"on": ["subscribeid", "id"]
					},
					"user": {
						"dependency": "subscribe"
					},
					"payment": {
						"dependency": "subscribe"
					}
				}
			},
			"subscribe": {
				"name": "subscribe",
				"alias": "s",
				"join": {
					"plan": {
						"dependency": false,
						"on": ["planid", "id"]
					},
					"daily_quota": {
						"dependency": false,
						"on": ["id", "subscribeid"]
					},
					"user": {
						"dependency": false,
						"on": ["userid", "id"]
					},
					"payment": {
						"dependency": false,
						"on": ["id", "subscribeid"]
					}
				}
			},
			"payment": {
				"name": "payment",
				"alias": "pa",
				"join": {
					"subscribe": {
						"dependency": "subscribe",
						"on": ["subscribeid", "id"]
					},
					"plan": {
						"dependency": "subscribe"
					},
					"daily_quota": {
						"dependency": "subscribe"
					},
					"user": {
						"dependency": "subscribe"
					}
				}
			}
		}
	}
}


// select u.country, count(*)
// from user u
// group by u.country


var widgetConfig = {
	"query": {
		"metrics": [{
			"name": "dailyquota.quota.avg"
		}],
		"segments": [{
			"name": "user.inscriptionyear"
		}, {
			"name": "user.inscriptionmonth"
		}, {
			"name": "user.inscriptionday"
		}],
		"operator": "AND",
		"filters": [
			// {
			// 	"name": "user.country",
			// 	"operator": "=",
			// 	"value": "France"
			// },
			// {
			// 	"name": "count.user",
			// 	"operator": ">",
			// 	"value": "1"
			// },
			// {
			// 	"name": "count.user",
			// 	"operator": "<",
			// 	"value": "3"
			// }
			{
				"name": "plan.price",
				"operator": ">=",
				"value": 0
			}
		]
	}
	//some properties
}


function makeQuery(options) {
	var request = "SELECT ",
		tables = [],
		name = "";

	for (var i = 0; i < options.metrics.length; i++) {
		name = options.metrics[i].name;
		request += config['query-builder']['kpi_definition'][name].apply + ' as ' + config['query-builder']['kpi_definition'][name].alias + ' ';
		tables = _.union(tables, config['query-builder']['kpi_definition'][name].tables);
		request += ',';
	}
	for (var i = 0; i < options.segments.length; i++) {
		if (i > 0)
			request += ',';
		name = options.segments[i].name;
		request += config['query-builder']['kpi_definition'][name].apply + ' as ' + config['query-builder']['kpi_definition'][name].alias + ' ';
		tables = _.union(tables, config['query-builder']['kpi_definition'][name].tables);
	}

	var where = []
	var having = []
	var filter = "";
	for (var i = 0; i < options.filters.length; i++) {
		name = options.filters[i].name;

		if (config['query-builder']['kpi_definition'][name].group)
			having.push(config['query-builder']['kpi_definition'][name].alias + ' ' + options.filters[i].operator + ' "' + options.filters[i].value + '"');
		else
			where.push(config['query-builder']['kpi_definition'][name].apply + ' ' + options.filters[i].operator + ' "' + options.filters[i].value + '"');

		tables = _.union(tables, config['query-builder']['kpi_definition'][name].tables);
	}

	if (tables.length > 0)
		request += makeJoin(tables);

	if (where.length > 0)
		request += 'WHERE ' + where.join(' ' + options.operator + ' ') + ' ';

	if (options.metrics.length > 0) {
		request += 'GROUP BY ';
		for (var i = 0; i < options.segments.length; i++) {
			if (i > 0)
				request += ',';
			name = options.segments[i].name;
			request += config['query-builder']['kpi_definition'][name].apply + ' ';
		}
	}

	if (having.length > 0)
		request += 'HAVING ' + having.join(' ' + options.operator + ' ') + ' ';

	return request;
}

function makeJoin(tables) {
	var tables_done = {},
		tableDefinition = config['query-builder']['table_definition'][tables.pop()],
		joinTableDefinition = {},
		joinTable = '',
		request = 'FROM ' + tableDefinition.name + ' ' + tableDefinition.alias + ' ',
		witness = false,
		dependencyDefinition = null;

	while (tables.length > 0) {
		joinTable = tables.pop();
		joinTableDefinition = config['query-builder']['table_definition'][joinTable];

		if (tableDefinition.join[joinTableDefinition.name].dependency) {
			dependencyDefinition = config['query-builder']['table_definition'][tableDefinition.join[joinTableDefinition.name].dependency];
			if (!tables_done[dependencyDefinition.name]) {
				request += 'INNER JOIN ' + dependencyDefinition.name + ' ' + dependencyDefinition.alias + ' ';
				tables_done[dependencyDefinition.name] = {};
			}
			if (!tables_done[dependencyDefinition.name][tableDefinition.name]) {
				request += 'ON ' + dependencyDefinition.alias + '.' + dependencyDefinition.join[tableDefinition.name].on[0] + ' = ' + tableDefinition.alias + '.' + dependencyDefinition.join[tableDefinition.name].on[1] + ' ';
				tables_done[dependencyDefinition.name][tableDefinition.name] = true;
			}
			if (!tables_done[joinTableDefinition.name]) {
				request += 'INNER JOIN ' + joinTableDefinition.name + ' ' + joinTableDefinition.alias + ' ';
				tables_done[joinTableDefinition.name] = {};
			}
			if (!tables_done[joinTableDefinition.name][tableDefinition.name]) {
				request += 'ON ' + dependencyDefinition.alias + '.' + dependencyDefinition.join[joinTableDefinition.name].on[0] + ' = ' + joinTableDefinition.alias + '.' + dependencyDefinition.join[joinTableDefinition.name].on[1] + ' ';
				tables_done[joinTableDefinition.name][tableDefinition.name] = true;
			}

		} else {
			if (!tables_done[joinTableDefinition.name]) {
				request += 'INNER JOIN ' + joinTableDefinition.name + ' ' + joinTableDefinition.alias + ' ';
				tables_done[joinTableDefinition.name] = {};
			}
			if (!tables_done[joinTableDefinition.name][tableDefinition.name]) {
				request += 'ON ' + tableDefinition.alias + '.' + tableDefinition.join[joinTableDefinition.name].on[0] + ' = ' + joinTableDefinition.alias + '.' + tableDefinition.join[joinTableDefinition.name].on[1] + ' ';
				tables_done[joinTableDefinition.name][tableDefinition.name] = true;
			}

		}


	}

	return request;
}



module.exports = MysqlTools;