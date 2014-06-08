angular.module('Dashboard').
    constant('QUERY_BUILDER', {
        "special.firstpayment" : { "format":"number", "category":"other", "index": "special.firstpayment", "type": "segment", "alias": "first_payment_day", "formattedAlias": "First payment day", "datatype" : "number" },
        "count.user": { "format":"number", "category":"user", "index": "count.user", "type": "metric", "alias": "count_user", "formattedAlias": "Count users", "datatype" : "number" },
        "count.plan": { "format":"number", "category":"plan", "index": "count.plan", "type": "metric", "alias": "count_plan", "formattedAlias": "Count plans", "datatype" : "number" },
        "count.payment": { "format":"number", "category":"payment", "index": "count.payment", "type": "metric", "alias": "count_payment", "formattedAlias": "Count payments", "datatype" : "number" },
        "object.plan": { "format":"number", "category":"plan", "index": "object.plan", "type": "segment", "alias": "plan_id", "formattedAlias": "Plan id", "datatype" : "number" },
        "object.payment": { "format":"number", "category":"payment", "index": "object.payment", "type": "segment", "alias": "payment_id", "formattedAlias": "Payment id", "datatype" : "number" },
        "object.dailyquota": { "format":"number", "category":"dailyquota", "index": "object.dailyquota", "type": "segment", "alias": "dailyquota_id", "formattedAlias": "Daily quota id", "datatype" : "number" },
        "user.age": { "format":"number", "category":"user", "index": "user.age", "type": "segment", "alias": "age", "formattedAlias": "Age", "datatype" : "number" },
        "user.age.avg": { "format":"number", "category":"user", "index": "user.age.avg", "type": "metric", "alias": "average_age", "formattedAlias": "Average age", "datatype" : "number" },
        "user.birthdate": { "format":"date", "category":"user", "index": "user.birthdate", "type": "segment", "alias": "birthdate", "formattedAlias": "Birthdate", "datatype" : "date" },
        "user.birthdate.year": { "format":"number", "category":"user", "index": "user.birthdate.year", "type": "segment", "alias": "birthyear", "formattedAlias": "Birth year", "datatype" : "number" },
        "user.birthdate.month": { "format":"date", "category":"user", "index": "user.birthdate.month", "type": "segment", "alias": "birthmonth", "formattedAlias": "Birth month", "datatype" : "number" },
        "user.birthdate.day": { "format":"number", "category":"user", "index": "user.birthdate.day", "type": "segment", "alias": "birthday", "formattedAlias": "Birth day", "datatype" : "number" },
        "user.inscriptiondate": { "format":"date", "category":"user", "index": "user.inscriptiondate", "type": "segment", "alias": "inscriptiondate", "formattedAlias": "Inscription date", "datatype" : "date" },
        "user.inscriptiondate.year": { "format":"number", "category":"user", "index": "user.inscriptiondate.year", "type": "segment", "alias": "inscriptionyear", "formattedAlias": "Inscription year", "datatype" : "number" },
        "user.inscriptiondate.month": { "format":"date", "category":"user", "index": "user.inscriptiondate.month", "type": "segment", "alias": "inscriptionmonth", "formattedAlias": "Inscription month", "datatype" : "number" },
        "user.inscriptiondate.day": { "format":"number", "category":"user", "index": "user.inscriptiondate.day", "type": "segment", "alias": "inscriptionday", "formattedAlias": "Inscription day", "datatype" : "number" },
        "user.country": { "format":"string", "category":"user", "index": "user.country", "type": "segment", "alias": "country", "formattedAlias": "Country", "datatype" : "string" },
        "user.countrycode": { "format":"string", "category":"user", "index": "user.countrycode", "type": "segment", "alias": "countrycode", "formattedAlias": "Country code", "datatype" : "string" },
        "user.role": { "format":"string", "category":"user", "index": "user.role", "type": "segment", "alias": "role", "formattedAlias": "Role", "datatype" : "string" },
        "user.storage": { "format":"bytes", "category":"user", "index": "user.storage", "type": "metric", "alias": "user_storage", "formattedAlias": "User storage", "datatype" : "number" },
        "user.storage.avg": { "format":"bytes", "category":"user", "index": "user.storage.avg", "type": "metric", "alias": "average_user_storage", "formattedAlias": "Average user storage", "datatype" : "number" },
        "plan.name": { "format":"string", "category":"plan", "index": "plan.name", "type": "segment", "alias": "plan_name", "formattedAlias": "Plan name", "datatype" : "string" },
        "plan.storage": { "format":"bytes", "category":"plan", "index": "plan.storage", "type": "segment", "alias": "plan_storage", "formattedAlias": "Plan storage", "datatype" : "number" },
        "plan.storage.avg": { "format":"bytes", "category":"plan", "index": "plan.storage.avg", "type": "metric", "alias": "average_plan_storage", "formattedAlias": "Average plan storage", "datatype" : "number" },
        "plan.uploadbandwidth": { "format":"bytes", "category":"plan", "index": "plan.uploadbandwidth", "type": "metric", "alias": "uploadbandwidth", "formattedAlias": "Upload bandwidth", "datatype" : "number" },
        "plan.uploadbandwidth.avg": { "format":"bytes", "category":"plan", "index": "plan.uploadbandwidth.avg", "type": "metric", "alias": "average_uploadbandwidth", "formattedAlias": "Average upload bandwidth", "datatype" : "number" },
        "plan.downloadbandwidth": { "format":"bytes", "category":"plan", "index": "plan.downloadbandwidth", "type": "metric", "alias": "downloadbandwidth", "formattedAlias": "Download bandwidth", "datatype" : "number" },
        "plan.downloadbandwidth.avg": { "format":"bytes", "category":"plan", "index": "plan.downloadbandwidth.avg", "type": "metric", "alias": "average_downloadbandwidth", "formattedAlias": "Average download bandwidth", "datatype" : "number" },
        "plan.quota": { "format":"bytes", "category":"plan", "index": "plan.quota", "type": "segment", "alias": "plan_quota", "formattedAlias": "Plan quota", "datatype" : "number" },
        "plan.quota.avg": { "format":"bytes", "category":"plan", "index": "plan.quota.avg", "type": "metric", "alias": "average_plan_quota", "formattedAlias": "Average plan quota", "datatype" : "number" },
        "plan.price": { "format":"money", "category":"plan", "index": "plan.price", "type": "segment", "alias": "plan_price", "formattedAlias": "Plan price", "datatype" : "number" },
        "plan.price.avg": { "format":"money", "category":"plan", "index": "plan.price.avg", "type": "metric", "alias": "average_plan_price", "formattedAlias": "Average plan price", "datatype" : "number" },
        "payment.amount": { "format":"money", "category":"payment", "index": "payment.amount", "type": "metric", "alias": "payment", "formattedAlias": "Payment amout", "datatype" : "number" },
        "payment.amount.avg": { "format":"money", "category":"payment", "index": "payment.amount.avg", "type": "segment", "alias": "average_payment", "formattedAlias": "Average payment amout", "datatype" : "number" },
        "payment.duration": { "format":"number", "category":"payment", "index": "payment.duration", "type": "segment", "alias": "payment_duration", "formattedAlias": "Payment duration", "datatype" : "number" },
        "payment.duration.avg": { "format":"number", "category":"payment", "index": "payment.duration.avg", "type": "metric", "alias": "average_payment_duration", "formattedAlias": "Average payment duration", "datatype" : "number" },
        "payment.date": { "format":"date", "category":"payment", "index": "payment.date", "type": "segment", "alias": "payment_date", "formattedAlias": "Payment date", "datatype" : "date" },
        "payment.date.year": { "format":"number", "category":"payment", "index": "payment.date.year", "type": "segment", "alias": "payment_year", "formattedAlias": "Payment year", "datatype" : "number" },
        "payment.date.month": { "format":"date", "category":"payment", "index": "payment.date.month", "type": "segment", "alias": "payment_month", "formattedAlias": "Payment month", "datatype" : "number" },
        "payment.date.day": { "format":"number", "category":"payment", "index": "payment.date.day", "type": "segment", "alias": "payment_day", "formattedAlias": "Payment day", "datatype" : "number" },
        "dailyquota.quota": { "format":"bytes", "category":"dailyquota", "index": "dailyquota.quota", "type": "metric", "alias": "quota_used", "formattedAlias": "Quota used", "datatype" : "number" },
        "dailyquota.quota.avg": { "format":"bytes", "category":"dailyquota", "index": "dailyquota.quota.avg", "type": "metric", "alias": "average_quota_used", "formattedAlias": "Average quota used", "datatype" : "number" },
        "dailyquota.date": { "format":"date", "category":"dailyquota", "index": "dailyquota.date", "type": "segment", "alias": "quota_date", "formattedAlias": "Quota date", "datatype" : "date" },
        "dailyquota.date.year": { "format":"number", "category":"dailyquota", "index": "dailyquota.date.year", "type": "segment", "alias": "quota_year", "formattedAlias": "Quota year", "datatype" : "number" },
        "dailyquota.date.month": { "format":"date", "category":"dailyquota", "index": "dailyquota.date.month", "type": "segment", "alias": "quota_month", "formattedAlias": "Quota month", "datatype" : "number" },
        "dailyquota.date.day": { "format":"number", "category":"dailyquota", "index": "dailyquota.date.day", "type": "segment", "alias": "quota_day", "formattedAlias": "Quota day", "datatype" : "number" },
        "subscribe.datestart": { "format":"date", "category":"subscribe", "index": "subscribe.datestart", "type": "segment", "alias": "subscribe_datestart", "formattedAlias": "Subscribe start date", "datatype" : "date" },
        "subscribe.datestart.year": { "format":"number", "category":"subscribe", "index": "subscribe.datestart.year", "type": "segment", "alias": "subscribe_datestart_year", "formattedAlias": "Subscribe start year", "datatype" : "number" },
        "subscribe.datestart.month": { "format":"date", "category":"subscribe", "index": "subscribe.datestart.month", "type": "segment", "alias": "subscribe_datestart_month", "formattedAlias": "Subscribe start month", "datatype" : "number" },
        "subscribe.datestart.day": { "format":"number", "category":"subscribe", "index": "subscribe.datestart.day", "type": "segment", "alias": "subscribe_datestart_day", "formattedAlias": "Subscribe start day", "datatype" : "number" },
        "subscribe.dateend": { "format":"date", "category":"subscribe", "index": "subscribe.dateend", "type": "segment", "alias": "subscribe_dateend", "formattedAlias": "Subscribe end date", "datatype" : "date" },
        "subscribe.dateend.year": { "format":"number", "category":"subscribe", "index": "subscribe.dateend.year", "type": "segment", "alias": "subscribe_dateend_year", "formattedAlias": "Subscribe end year", "datatype" : "number" },
        "subscribe.dateend.month": { "format":"date", "category":"subscribe", "index": "subscribe.dateend.month", "type": "segment", "alias": "subscribe_dateend_month", "formattedAlias": "Subscribe end month", "datatype" : "number" },
        "subscribe.dateend.day": { "format":"number", "category":"subscribe", "index": "subscribe.dateend.day", "type": "segment", "alias": "subscribe_dateend_day", "formattedAlias": "Subscribe end day", "datatype" : "number" },
        "subscribe.paused": { "format":"boolean", "category":"subscribe", "index": "subscribe.paused", "type": "segment", "alias": "subscribe_paused", "formattedAlias": "Subscribe paused", "datatype" : "number" },
        "subscribe.renew": { "format":"boolean", "category":"subscribe", "index": "subscribe.renew", "type": "segment", "alias": "subscribe_renew", "formattedAlias": "Subscribe renew", "datatype" : "number" },
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