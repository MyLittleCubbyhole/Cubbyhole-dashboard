angular.module('Dashboard').
    constant('QUERY_BUILDER', {
        "special.firstpayment" : { "format":"number", "category":"other", "index": "special.firstpayment", "type": "segment", "alias": "first_payment_day", "formattedAlias": "First payment day"},
        "count.user": { "format":"number", "category":"user", "index": "count.user", "type": "metric", "alias": "count_user", "formattedAlias": "Count users"},
        "count.plan": { "format":"number", "category":"plan", "index": "count.plan", "type": "metric", "alias": "count_plan", "formattedAlias": "Count plans"},
        "count.payment": { "format":"number", "category":"payment", "index": "count.payment", "type": "metric", "alias": "count_payment", "formattedAlias": "Count payments"},
        "object.plan": { "format":"number", "category":"plan", "index": "object.plan", "type": "segment", "alias": "plan_id", "formattedAlias": "Plan id"},
        "object.payment": { "format":"number", "category":"payment", "index": "object.payment", "type": "segment", "alias": "payment_id", "formattedAlias": "Payment id"},
        "object.dailyquota": { "format":"number", "category":"dailyquota", "index": "object.dailyquota", "type": "segment", "alias": "dailyquota_id", "formattedAlias": "Daily quota id"},
        "user.age": { "format":"number", "category":"user", "index": "user.age", "type": "segment", "alias": "age", "formattedAlias": "Age"},
        "user.age.avg": { "format":"number", "category":"user", "index": "user.age.avg", "type": "metric", "alias": "average_age", "formattedAlias": "Average age"},
        "user.birthdate": { "format":"date", "category":"user", "index": "user.birthdate", "type": "segment", "alias": "birthdate", "formattedAlias": "Birthdate"},
        "user.birthdate.year.number": { "format":"number", "category":"user", "index": "user.birthdate.year.number", "type": "segment", "alias": "birthyear_number", "formattedAlias": "Birth year"},
        "user.birthdate.month": { "format":"monthyear", "category":"user", "index": "user.birthdate.month", "type": "segment", "alias": "birthmonth", "formattedAlias": "Birth month (date)"},
        "user.birthdate.month.number": { "format":"month", "category":"user", "index": "user.birthdate.month.number", "type": "segment", "alias": "birthmonth_number", "formattedAlias": "Birth month"},
        "user.birthdate.day.number": { "format":"number", "category":"user", "index": "user.birthdate.day.number", "type": "segment", "alias": "birthday_number", "formattedAlias": "Birth day"},
        "user.inscriptiondate": { "format":"date", "category":"user", "index": "user.inscriptiondate", "type": "segment", "alias": "inscriptiondate", "formattedAlias": "Inscription date"},
        "user.inscriptiondate.year.number": { "format":"number", "category":"user", "index": "user.inscriptiondate.year.number", "type": "segment", "alias": "inscriptionyear_number", "formattedAlias": "Inscription year"},
        "user.inscriptiondate.month": { "format":"monthyear", "category":"user", "index": "user.inscriptiondate.month", "type": "segment", "alias": "inscriptionmonth", "formattedAlias": "Inscription month (date)"},
        "user.inscriptiondate.month.number": { "format":"month", "category":"user", "index": "user.inscriptiondate.month.number", "type": "segment", "alias": "inscriptionmonth_number", "formattedAlias": "Inscription month"},
        "user.inscriptiondate.day.number": { "format":"number", "category":"user", "index": "user.inscriptiondate.day.number", "type": "segment", "alias": "inscriptionday_number", "formattedAlias": "Inscription day"},
        "user.country": { "format":"string", "category":"user", "index": "user.country", "type": "segment", "alias": "country", "formattedAlias": "Country"},
        "user.countrycode": { "format":"string", "category":"user", "index": "user.countrycode", "type": "segment", "alias": "countrycode", "formattedAlias": "Country code"},
        "user.role": { "format":"string", "category":"user", "index": "user.role", "type": "segment", "alias": "role", "formattedAlias": "Role"},
        "user.storage": { "format":"bytes", "category":"user", "index": "user.storage", "type": "metric", "alias": "user_storage", "formattedAlias": "User storage"},
        "user.storage.avg": { "format":"bytes", "category":"user", "index": "user.storage.avg", "type": "metric", "alias": "average_user_storage", "formattedAlias": "Average user storage"},
        "user.storage.daily.avg": { "format":"bytes", "category":"user", "index": "user.storage.daily.avg", "type": "metric", "alias": "average_daily_user_storage", "formattedAlias": "Average user storage (Daily)"},
        "plan.name": { "format":"string", "category":"plan", "index": "plan.name", "type": "segment", "alias": "plan_name", "formattedAlias": "Plan name"},
        "plan.storage": { "format":"bytes", "category":"plan", "index": "plan.storage", "type": "segment", "alias": "plan_storage", "formattedAlias": "Plan storage"},
        "plan.storage.avg": { "format":"bytes", "category":"plan", "index": "plan.storage.avg", "type": "metric", "alias": "average_plan_storage", "formattedAlias": "Average plan storage"},
        "plan.uploadbandwidth": { "format":"bytes", "category":"plan", "index": "plan.uploadbandwidth", "type": "metric", "alias": "uploadbandwidth", "formattedAlias": "Upload bandwidth"},
        "plan.uploadbandwidth.avg": { "format":"bytes", "category":"plan", "index": "plan.uploadbandwidth.avg", "type": "metric", "alias": "average_uploadbandwidth", "formattedAlias": "Average upload bandwidth"},
        "plan.downloadbandwidth": { "format":"bytes", "category":"plan", "index": "plan.downloadbandwidth", "type": "metric", "alias": "downloadbandwidth", "formattedAlias": "Download bandwidth"},
        "plan.downloadbandwidth.avg": { "format":"bytes", "category":"plan", "index": "plan.downloadbandwidth.avg", "type": "metric", "alias": "average_downloadbandwidth", "formattedAlias": "Average download bandwidth"},
        "plan.quota": { "format":"bytes", "category":"plan", "index": "plan.quota", "type": "segment", "alias": "plan_quota", "formattedAlias": "Plan quota"},
        "plan.quota.avg": { "format":"bytes", "category":"plan", "index": "plan.quota.avg", "type": "metric", "alias": "average_plan_quota", "formattedAlias": "Average plan quota"},
        "plan.price": { "format":"money", "category":"plan", "index": "plan.price", "type": "segment", "alias": "plan_price", "formattedAlias": "Plan price"},
        "plan.price.avg": { "format":"money", "category":"plan", "index": "plan.price.avg", "type": "metric", "alias": "average_plan_price", "formattedAlias": "Average plan price"},
        "payment.amount": { "format":"money", "category":"payment", "index": "payment.amount", "type": "segment", "alias": "payment", "formattedAlias": "Payment amout"},
        "payment.amount.avg": { "format":"money", "category":"payment", "index": "payment.amount.avg", "type": "metric", "alias": "average_payment", "formattedAlias": "Average payment amout"},
        "payment.duration": { "format":"number", "category":"payment", "index": "payment.duration", "type": "segment", "alias": "payment_duration", "formattedAlias": "Payment duration"},
        "payment.duration.avg": { "format":"number", "category":"payment", "index": "payment.duration.avg", "type": "metric", "alias": "average_payment_duration", "formattedAlias": "Average payment duration"},
        "payment.date": { "format":"date", "category":"payment", "index": "payment.date", "type": "segment", "alias": "payment_date", "formattedAlias": "Payment date"},
        "payment.date.year.number": { "format":"number", "category":"payment", "index": "payment.date.year.number", "type": "segment", "alias": "payment_year_number", "formattedAlias": "Payment year"},
        "payment.date.month": { "format":"monthyear", "category":"payment", "index": "payment.date.month", "type": "segment", "alias": "payment_month", "formattedAlias": "Payment month (date)"},
        "payment.date.month.number": { "format":"month", "category":"payment", "index": "payment.date.month.number", "type": "segment", "alias": "payment_month_number", "formattedAlias": "Payment month"},
        "payment.date.day.number": { "format":"number", "category":"payment", "index": "payment.date.day.number", "type": "segment", "alias": "payment_day_number", "formattedAlias": "Payment day"},
        "dailyquota.quota": { "format":"bytes", "category":"dailyquota", "index": "dailyquota.quota", "type": "metric", "alias": "quota_used", "formattedAlias": "Quota used"},
        "dailyquota.quota.avg": { "format":"bytes", "category":"dailyquota", "index": "dailyquota.quota.avg", "type": "metric", "alias": "average_quota_used", "formattedAlias": "Average quota used"},
        "dailyquota.date": { "format":"date", "category":"dailyquota", "index": "dailyquota.date", "type": "segment", "alias": "quota_date", "formattedAlias": "Quota date"},
        "dailyquota.date.year.number": { "format":"number", "category":"dailyquota", "index": "dailyquota.date.year.number", "type": "segment", "alias": "quota_year_number", "formattedAlias": "Quota year"},
        "dailyquota.date.month": { "format":"monthyear", "category":"dailyquota", "index": "dailyquota.date.month", "type": "segment", "alias": "quota_month", "formattedAlias": "Quota month (date)"},
        "dailyquota.date.month.number": { "format":"month", "category":"dailyquota", "index": "dailyquota.date.month.number", "type": "segment", "alias": "quota_month_number", "formattedAlias": "Quota month"},
        "dailyquota.date.day.number": { "format":"number", "category":"dailyquota", "index": "dailyquota.date.day.number", "type": "segment", "alias": "quota_day_number", "formattedAlias": "Quota day"},
        "subscribe.datestart": { "format":"date", "category":"subscribe", "index": "subscribe.datestart", "type": "segment", "alias": "subscribe_datestart", "formattedAlias": "Subscribe start date"},
        "subscribe.datestart.year.number": { "format":"number", "category":"subscribe", "index": "subscribe.datestart.year.number", "type": "segment", "alias": "subscribe_datestart_year_number", "formattedAlias": "Subscribe start year"},
        "subscribe.datestart.month": { "format":"monthyear", "category":"subscribe", "index": "subscribe.datestart.month", "type": "segment", "alias": "subscribe_datestart_month", "formattedAlias": "Subscribe start month (date)"},
        "subscribe.datestart.month.number": { "format":"month", "category":"subscribe", "index": "subscribe.datestart.month.number", "type": "segment", "alias": "subscribe_datestart_month_number", "formattedAlias": "Subscribe start month"},
        "subscribe.datestart.day.number": { "format":"number", "category":"subscribe", "index": "subscribe.datestart.day.number", "type": "segment", "alias": "subscribe_datestart_day_number", "formattedAlias": "Subscribe start day"},
        "subscribe.dateend": { "format":"date", "category":"subscribe", "index": "subscribe.dateend", "type": "segment", "alias": "subscribe_dateend", "formattedAlias": "Subscribe end date"},
        "subscribe.dateend.year": { "format":"number", "category":"subscribe", "index": "subscribe.dateend.year", "type": "segment", "alias": "subscribe_dateend_year", "formattedAlias": "Subscribe end year"},
        "subscribe.dateend.month": { "format":"monthyear", "category":"subscribe", "index": "subscribe.dateend.month", "type": "segment", "alias": "subscribe_dateend_month", "formattedAlias": "Subscribe end month (date)"},
        "subscribe.dateend.month.number": { "format":"month", "category":"subscribe", "index": "subscribe.dateend.month.number", "type": "segment", "alias": "subscribe_dateend_month_number", "formattedAlias": "Subscribe end month"},
        "subscribe.dateend.day.number": { "format":"number", "category":"subscribe", "index": "subscribe.dateend.day.number", "type": "segment", "alias": "subscribe_dateend_day_number", "formattedAlias": "Subscribe end day"},
        "subscribe.paused": { "format":"boolean", "category":"subscribe", "index": "subscribe.paused", "type": "segment", "alias": "subscribe_paused", "formattedAlias": "Subscribe paused"},
        "subscribe.renew": { "format":"boolean", "category":"subscribe", "index": "subscribe.renew", "type": "segment", "alias": "subscribe_renew", "formattedAlias": "Subscribe renew"},
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