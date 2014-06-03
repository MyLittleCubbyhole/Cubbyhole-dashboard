angular.module('Dashboard').
	constant('QUERY_BUILDER', {
		"special.firstpayment" : {  "category":"other", "index": "special.firstpayment", "type": "segment", "alias": "first_payment_day", "datatype" : "number" },
		"count.user": { "category":"user", "index": "count.user", "type": "metric", "alias": "count_user", "datatype" : "number" },
		"count.plan": { "category":"plan", "index": "count.plan", "type": "metric", "alias": "count_plan", "datatype" : "number" },
		"count.payment": { "category":"payment", "index": "count.payment", "type": "metric", "alias": "count_payment", "datatype" : "number" },
		"object.plan": { "category":"plan", "index": "object.plan", "type": "segment", "alias": "plan_id", "datatype" : "number" },
		"object.payment": { "category":"payment", "index": "object.payment", "type": "segment", "alias": "payment_id", "datatype" : "number" },
		"object.dailyquota": { "category":"dailyquota", "index": "object.dailyquota", "type": "segment", "alias": "dailyquota_id", "datatype" : "number" },
		"user.age": { "category":"user", "index": "user.age", "type": "segment", "alias": "age", "datatype" : "number" },
		"user.age.avg": { "category":"user", "index": "user.age.avg", "type": "metric", "alias": "average_age", "datatype" : "number" },
		"user.birthdate": { "category":"user", "index": "user.birthdate", "type": "segment", "alias": "birthdate", "datatype" : "date" },
		"user.birthdate.year": { "category":"user", "index": "user.birthdate.year", "type": "segment", "alias": "birthyear", "datatype" : "number" },
		"user.birthdate.month": { "category":"user", "index": "user.birthdate.month", "type": "segment", "alias": "birthmonth", "datatype" : "number" },
		"user.birthdate.day": { "category":"user", "index": "user.birthdate.day", "type": "segment", "alias": "birthday", "datatype" : "number" },
		"user.inscriptiondate": { "category":"user", "index": "user.inscriptiondate", "type": "segment", "alias": "inscriptiondate", "datatype" : "date" },
		"user.inscriptiondate.year": { "category":"user", "index": "user.inscriptiondate.year", "type": "segment", "alias": "inscriptionyear", "datatype" : "number" },
		"user.inscriptiondate.month": { "category":"user", "index": "user.inscriptiondate.month", "type": "segment", "alias": "inscriptionmonth", "datatype" : "number" },
		"user.inscriptiondate.day": { "category":"user", "index": "user.inscriptiondate.day", "type": "segment", "alias": "inscriptionday", "datatype" : "number" },
		"user.country": { "category":"user", "index": "user.country", "type": "segment", "alias": "country", "datatype" : "string" },
		"user.countrycode": { "category":"user", "index": "user.countrycode", "type": "segment", "alias": "countrycode", "datatype" : "string" },
		"user.role": { "category":"user", "index": "user.role", "type": "segment", "alias": "role", "datatype" : "string" },
		"user.storage": { "category":"user", "index": "user.storage", "type": "metric", "alias": "user_storage", "datatype" : "number" },
		"user.storage.avg": { "category":"user", "index": "user.storage.avg", "type": "metric", "alias": "average_user_storage", "datatype" : "number" },
		"plan.name": { "category":"plan", "index": "plan.name", "type": "segment", "alias": "plan_name", "datatype" : "string" },
		"plan.storage": { "category":"plan", "index": "plan.storage", "type": "segment", "alias": "plan_storage", "datatype" : "number" },
		"plan.storage.avg": { "category":"plan", "index": "plan.storage.avg", "type": "metric", "alias": "average_plan_storage", "datatype" : "number" },
		"plan.upladbandwidth": { "category":"plan", "index": "plan.upladbandwidth", "type": "metric", "alias": "upladbandwidth", "datatype" : "number" },
		"plan.upladbandwidth.avg": { "category":"plan", "index": "plan.upladbandwidth.avg", "type": "metric", "alias": "average_upladbandwidth", "datatype" : "number" },
		"plan.downloadbandwidth": { "category":"plan", "index": "plan.downloadbandwidth", "type": "metric", "alias": "downloadbandwidth", "datatype" : "number" },
		"plan.downloadbandwidth.avg": { "category":"plan", "index": "plan.downloadbandwidth.avg", "type": "metric", "alias": "average_downloadbandwidth", "datatype" : "number" },
		"plan.quota": { "category":"plan", "index": "plan.quota", "type": "segment", "alias": "plan_quota", "datatype" : "number" },
		"plan.quota.avg": { "category":"plan", "index": "plan.quota.avg", "type": "metric", "alias": "average_plan_quota", "datatype" : "number" },
		"plan.price": { "category":"plan", "index": "plan.price", "type": "segment", "alias": "plan_price", "datatype" : "number" },
		"plan.price.avg": { "category":"plan", "index": "plan.price.avg", "type": "metric", "alias": "average_plan_price", "datatype" : "number" },
		"payment.amount": { "category":"payment", "index": "payment.amount", "type": "metric", "alias": "payment", "datatype" : "number" },
		"payment.amount.avg": { "category":"payment", "index": "payment.amount.avg", "type": "segment", "alias": "average_payment", "datatype" : "number" },
		"payment.duration": { "category":"payment", "index": "payment.duration", "type": "segment", "alias": "payment_duration", "datatype" : "number" },
		"payment.duration.avg": { "category":"payment", "index": "payment.duration.avg", "type": "metric", "alias": "average_payment_duration", "datatype" : "number" },
		"payment.date": { "category":"payment", "index": "payment.date", "type": "segment", "alias": "payment_date", "datatype" : "date" },
		"payment.date.year": { "category":"payment", "index": "payment.date.year", "type": "segment", "alias": "payment_year", "datatype" : "number" },
		"payment.date.month": { "category":"payment", "index": "payment.date.month", "type": "segment", "alias": "payment_month", "datatype" : "number" },
		"payment.date.day": { "category":"payment", "index": "payment.date.day", "type": "segment", "alias": "payment_day", "datatype" : "number" },
		"dailyquota.quota": { "category":"dailyquota", "index": "dailyquota.quota", "type": "metric", "alias": "quota_used", "datatype" : "number" },
		"dailyquota.quota.avg": { "category":"dailyquota", "index": "dailyquota.quota.avg", "type": "metric", "alias": "average_quota_used", "datatype" : "number" },
		"dailyquota.date": { "category":"dailyquota", "index": "dailyquota.date", "type": "segment", "alias": "quota_date", "datatype" : "date" },
		"dailyquota.date.year": { "category":"dailyquota", "index": "dailyquota.date.year", "type": "segment", "alias": "quota_year", "datatype" : "number" },
		"dailyquota.date.month": { "category":"dailyquota", "index": "dailyquota.date.month", "type": "segment", "alias": "quota_month", "datatype" : "number" },
		"dailyquota.date.day": { "category":"dailyquota", "index": "dailyquota.date.day", "type": "segment", "alias": "quota_day", "datatype" : "number" },
		"subscribe.datestart": { "category":"subscribe", "index": "subscribe.datestart", "type": "segment", "alias": "subscribe_datestart", "datatype" : "date" },
		"subscribe.datestart.year": {  "category":"subscribe", "index": "subscribe.datestart.year", "type": "segment", "alias": "subscribe_datestart_year", "datatype" : "number" },
		"subscribe.datestart.month": {  "category":"subscribe", "index": "subscribe.datestart.month", "type": "segment", "alias": "subscribe_datestart_month", "datatype" : "number" },
		"subscribe.datestart.day": {  "category":"subscribe", "index": "subscribe.datestart.day", "type": "segment", "alias": "subscribe_datestart_day", "datatype" : "number" },
		"subscribe.dateend": {  "category":"subscribe", "index": "subscribe.dateend", "type": "segment", "alias": "subscribe_dateend", "datatype" : "date" },
		"subscribe.dateend.year": {  "category":"subscribe", "index": "subscribe.dateend.year", "type": "segment", "alias": "subscribe_dateend_year", "datatype" : "number" },
		"subscribe.dateend.month": {  "category":"subscribe", "index": "subscribe.dateend.month", "type": "segment", "alias": "subscribe_dateend_month", "datatype" : "number" },
		"subscribe.dateend.day": {  "category":"subscribe", "index": "subscribe.dateend.day", "type": "segment", "alias": "subscribe_dateend_day", "datatype" : "number" },
		"subscribe.paused": {  "category":"subscribe", "index": "subscribe.paused", "type": "segment", "alias": "subscribe_paused", "datatype" : "number" },
		"subscribe.renew": {  "category":"subscribe", "index": "subscribe.renew", "type": "segment", "alias": "subscribe_renew", "datatype" : "number" },
	}).
	constant('OPERATORS_NAME', {
		">": "GREATER THAN",
		">=": "GREATER OR EQUAL",
		"<": "LOWER THAN",
		"<=": "LOWER OR EQUAL",
		"=": "EQUAL",
		"!=": "NOT EQUAL",
		"BETWEEN": "BETWEEN",
		"NOT BETWEEN": "NOT BETWEEN",
		"IN": "IN",
		"NOT IN": "NOT IN"
	}).
	constant('OPERATORS', [
		{
			"op": ">",
			"name": "GREATER THAN",
			"inflections": [
				{
					"op": ">=",
					"name": "GREATER OR EQUAL"
				}
			]
		},
		{
			"op": "<",
			"name": "LOWER THAN",
			"inflections": [
				{
					"op": "<=",
					"name": "LOWER OR EQUAL"
				}
			]
		},
		{
			"op": "=",
			"name": "EQUAL",
			"inflections": [
				{
					"op": "!=",
					"name": "NOT EQUAL"
				}
			]
		},
		{
			"op": "BETWEEN",
			"name": "BETWEEN",
			"inflections": [
				{
					"op": "NOT BETWEEN",
					"name": "NOT BETWEEN"
				}
			]
		},
		{
			"op": "IN",
			"name": "IN",
			"inflections": [
				{
					"op": "NOT IN",
					"name": "NOT IN"
				}
			]
		}
	])