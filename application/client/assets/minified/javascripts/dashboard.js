angular.module('Dashboard', ['Overlay', 'Authentication', 'Tools', 'ngRoute']);;angular.module('Dashboard').
    config(['API_URL', '$locationProvider', '$routeProvider', '$httpProvider', '$sceDelegateProvider', function(API_URL, $location, $routeProvider, $httpProvider, $sceDelegateProvider) {

        $routeProvider
        .when('/add', {
            template: '<section id="dashboard-container" dashydash="{}"></section>'
        })
        .when('/:id', {
            template: '<section id="dashboard-container" dashydash="Dashboard.currentDashboard"></section>'
        })
        .otherwise({ redirectTo: '/' });

        $location.html5Mode(false);

        $httpProvider.interceptors.push('AuthenticationFactory');

        $sceDelegateProvider.resourceUrlWhitelist([
           'self',
           API_URL + '**'
        ]);

    }]);;angular.module('Dashboard').constant('COUNTRIES', [{"code":"AF","value":0,"name":"Afghanistan"},{"code":"AL","value":0,"name":"Albania"},{"code":"DZ","value":0,"name":"Algeria"},{"code":"AS","value":0,"name":"American Samoa"},{"code":"AD","value":0,"name":"Andorra"},{"code":"AO","value":0,"name":"Angola"},{"code":"AI","value":0,"name":"Antigua and Barbuda"},{"code":"AR","value":0,"name":"Argentina"},{"code":"AM","value":0,"name":"Armenia"},{"code":"AW","value":0,"name":"Aruba"},{"code":"AU","value":0,"name":"Australia"},{"code":"AT","value":0,"name":"Austria"},{"code":"AZ","value":0,"name":"Azerbaijan"},{"code":"BS","value":0,"name":"Bahamas, The"},{"code":"BH","value":0,"name":"Bahrain"},{"code":"BD","value":0,"name":"Bangladesh"},{"code":"BB","value":0,"name":"Barbados"},{"code":"BY","value":0,"name":"Belarus"},{"code":"BE","value":0,"name":"Belgium"},{"code":"BZ","value":0,"name":"Belize"},{"code":"BJ","value":0,"name":"Benin"},{"code":"BM","value":0,"name":"Bermuda"},{"code":"BT","value":0,"name":"Bhutan"},{"code":"BO","value":0,"name":"Bolivia"},{"code":"BA","value":0,"name":"Bosnia and Herzegovina"},{"code":"BW","value":0,"name":"Botswana"},{"code":"BR","value":0,"name":"Brazil"},{"code":"BN","value":0,"name":"Brunei Darussalam"},{"code":"BG","value":0,"name":"Bulgaria"},{"code":"BF","value":0,"name":"Burkina Faso"},{"code":"BI","value":0,"name":"Burundi"},{"code":"KH","value":0,"name":"Cambodia"},{"code":"CM","value":0,"name":"Cameroon"},{"code":"CA","value":0,"name":"Canada"},{"code":"CV","value":0,"name":"Cape Verde"},{"code":"KY","value":0,"name":"Cayman Islands"},{"code":"CF","value":0,"name":"Central African Republic"},{"code":"TD","value":0,"name":"Chad"},{"code":"CL","value":0,"name":"Chile"},{"code":"CN","value":0,"name":"China"},{"code":"CO","value":0,"name":"Colombia"},{"code":"KM","value":0,"name":"Comoros"},{"code":"CD","value":0,"name":"Congo, Dem. Rep."},{"code":"CG","value":0,"name":"Congo, Rep."},{"code":"CR","value":0,"name":"Costa Rica"},{"code":"CI","value":0,"name":"Cote d'Ivoire"},{"code":"HR","value":0,"name":"Croatia"},{"code":"CU","value":0,"name":"Cuba"},{"code":"CW","value":0,"name":"Curacao"},{"code":"CY","value":0,"name":"Cyprus"},{"code":"CZ","value":0,"name":"Czech Republic"},{"code":"DK","value":0,"name":"Denmark"},{"code":"DJ","value":0,"name":"Djibouti"},{"code":"DM","value":0,"name":"Dominica"},{"code":"DO","value":0,"name":"Dominican Republic"},{"code":"EC","value":0,"name":"Ecuador"},{"code":"EG","value":0,"name":"Egypt, Arab Rep."},{"code":"SV","value":0,"name":"El Salvador"},{"code":"GQ","value":0,"name":"Equatorial Guinea"},{"code":"ER","value":0,"name":"Eritrea"},{"code":"EE","value":0,"name":"Estonia"},{"code":"ET","value":0,"name":"Ethiopia"},{"code":"FO","value":0,"name":"Faeroe Islands"},{"code":"FJ","value":0,"name":"Fiji"},{"code":"FI","value":0,"name":"Finland"},{"code":"FR","value":0,"name":"France"},{"code":"PF","value":0,"name":"French Polynesia"},{"code":"GA","value":0,"name":"Gabon"},{"code":"GM","value":0,"name":"Gambia, The"},{"code":"GE","value":0,"name":"Georgia"},{"code":"DE","value":0,"name":"Germany"},{"code":"GH","value":0,"name":"Ghana"},{"code":"GR","value":0,"name":"Greece"},{"code":"GL","value":0,"name":"Greenland"},{"code":"GD","value":0,"name":"Grenada"},{"code":"GU","value":0,"name":"Guam"},{"code":"GT","value":0,"name":"Guatemala"},{"code":"GN","value":0,"name":"Guinea"},{"code":"GW","value":0,"name":"Guinea-Bissau"},{"code":"GY","value":0,"name":"Guyana"},{"code":"HT","value":0,"name":"Haiti"},{"code":"HN","value":0,"name":"Honduras"},{"code":"HK","value":0,"name":"Hong Kong SAR, China"},{"code":"HU","value":0,"name":"Hungary"},{"code":"IS","value":0,"name":"Iceland"},{"code":"IN","value":0,"name":"India"},{"code":"ID","value":0,"name":"Indonesia"},{"code":"IR","value":0,"name":"Iran, Islamic Rep."},{"code":"IQ","value":0,"name":"Iraq"},{"code":"IE","value":0,"name":"Ireland"},{"code":"IM","value":0,"name":"Isle of Man"},{"code":"IL","value":0,"name":"Israel"},{"code":"IT","value":0,"name":"Italy"},{"code":"JM","value":0,"name":"Jamaica"},{"code":"JP","value":0,"name":"Japan"},{"code":"JO","value":0,"name":"Jordan"},{"code":"KZ","value":0,"name":"Kazakhstan"},{"code":"KE","value":0,"name":"Kenya"},{"code":"KI","value":0,"name":"Kiribati"},{"code":"KP","value":0,"name":"Korea, Dem. Rep."},{"code":"KR","value":0,"name":"Korea, Rep."},{"code":"XK","value":0,"name":"Kosovo"},{"code":"KW","value":0,"name":"Kuwait"},{"code":"KG","value":0,"name":"Kyrgyz Republic"},{"code":"LA","value":0,"name":"Lao PDR"},{"code":"LV","value":0,"name":"Latvia"},{"code":"LB","value":0,"name":"Lebanon"},{"code":"LS","value":0,"name":"Lesotho"},{"code":"LR","value":0,"name":"Liberia"},{"code":"LY","value":0,"name":"Libya"},{"code":"LI","value":0,"name":"Liechtenstein"},{"code":"LT","value":0,"name":"Lithuania"},{"code":"LU","value":0,"name":"Luxembourg"},{"code":"MO","value":0,"name":"Macao SAR, China"},{"code":"MK","value":0,"name":"Macedonia, FYR"},{"code":"MG","value":0,"name":"Madagascar"},{"code":"MW","value":0,"name":"Malawi"},{"code":"MY","value":0,"name":"Malaysia"},{"code":"MV","value":0,"name":"Maldives"},{"code":"ML","value":0,"name":"Mali"},{"code":"MT","value":0,"name":"Malta"},{"code":"MH","value":0,"name":"Marshall Islands"},{"code":"MR","value":0,"name":"Mauritania"},{"code":"MU","value":0,"name":"Mauritius"},{"code":"YT","value":0,"name":"Mayotte"},{"code":"MX","value":0,"name":"Mexico"},{"code":"FM","value":0,"name":"Micronesia, Fed. Sts."},{"code":"MD","value":0,"name":"Moldova"},{"code":"MC","value":0,"name":"Monaco"},{"code":"MN","value":0,"name":"Mongolia"},{"code":"ME","value":0,"name":"Montenegro"},{"code":"MA","value":0,"name":"Morocco"},{"code":"MZ","value":0,"name":"Mozambique"},{"code":"MM","value":0,"name":"Myanmar"},{"code":"NA","value":0,"name":"Namibia"},{"code":"NP","value":0,"name":"Nepal"},{"code":"NL","value":0,"name":"Netherlands"},{"code":"NC","value":0,"name":"New Caledonia"},{"code":"NZ","value":0,"name":"New Zealand"},{"code":"NI","value":0,"name":"Nicaragua"},{"code":"NE","value":0,"name":"Niger"},{"code":"NG","value":0,"name":"Nigeria"},{"code":"MP","value":0,"name":"Northern Mariana Islands"},{"code":"NO","value":0,"name":"Norway"},{"code":"OM","value":0,"name":"Oman"},{"code":"PK","value":0,"name":"Pakistan"},{"code":"PW","value":0,"name":"Palau"},{"code":"PA","value":0,"name":"Panama"},{"code":"PG","value":0,"name":"Papua New Guinea"},{"code":"PY","value":0,"name":"Paraguay"},{"code":"PE","value":0,"name":"Peru"},{"code":"PH","value":0,"name":"Philippines"},{"code":"PL","value":0,"name":"Poland"},{"code":"PT","value":0,"name":"Portugal"},{"code":"PR","value":0,"name":"Puerto Rico"},{"code":"WA","value":0,"name":"Qatar"},{"code":"RO","value":0,"name":"Romania"},{"code":"RU","value":0,"name":"Russian Federation"},{"code":"RW","value":0,"name":"Rwanda"},{"code":"WS","value":0,"name":"Samoa"},{"code":"SM","value":0,"name":"San Marino"},{"code":"ST","value":0,"name":"Sao Tome and Principe"},{"code":"SA","value":0,"name":"Saudi Arabia"},{"code":"SN","value":0,"name":"Senegal"},{"code":"RS","value":0,"name":"Serbia"},{"code":"SC","value":0,"name":"Seychelles"},{"code":"SL","value":0,"name":"Sierra Leone"},{"code":"SG","value":0,"name":"Singapore"},{"code":"SK","value":0,"name":"Slovak Republic"},{"code":"SI","value":0,"name":"Slovenia"},{"code":"SB","value":0,"name":"Solomon Islands"},{"code":"SO","value":0,"name":"Somalia"},{"code":"ZA","value":0,"name":"South Africa"},{"code":"SS","value":0,"name":"South Sudan"},{"code":"ES","value":0,"name":"Spain"},{"code":"LK","value":0,"name":"Sri Lanka"},{"code":"KN","value":0,"name":"St. Kitts and Nevis"},{"code":"LC","value":0,"name":"St. Lucia"},{"code":"MF","value":0,"name":"St. Martin (French part)"},{"code":"VC","value":0,"name":"St. Vincent and the Grenadines"},{"code":"SD","value":0,"name":"Sudan"},{"code":"SR","value":0,"name":"Suriname"},{"code":"SZ","value":0,"name":"Swaziland"},{"code":"SE","value":0,"name":"Sweden"},{"code":"CH","value":0,"name":"Switzerland"},{"code":"SY","value":0,"name":"Syrian Arab Republic"},{"code":"TJ","value":0,"name":"Tajikistan"},{"code":"TZ","value":0,"name":"Tanzania"},{"code":"TH","value":0,"name":"Thailand"},{"code":"TP","value":0,"name":"Timor-Leste"},{"code":"TG","value":0,"name":"Togo"},{"code":"TO","value":0,"name":"Tonga"},{"code":"TT","value":0,"name":"Trinidad and Tobago"},{"code":"TN","value":0,"name":"Tunisia"},{"code":"TR","value":0,"name":"Turkey"},{"code":"TM","value":0,"name":"Turkmenistan"},{"code":"TC","value":0,"name":"Turks and Caicos Islands"},{"code":"TV","value":0,"name":"Tuvalu"},{"code":"UG","value":0,"name":"Uganda"},{"code":"UA","value":0,"name":"Ukraine"},{"code":"AE","value":0,"name":"United Arab Emirates"},{"code":"UK","value":0,"name":"United Kingdom"},{"code":"US","value":0,"name":"United States"},{"code":"UY","value":0,"name":"Uruguay"},{"code":"UZ","value":0,"name":"Uzbekistan"},{"code":"VU","value":0,"name":"Vanuatu"},{"code":"VE","value":0,"name":"Venezuela, RB"},{"code":"VN","value":0,"name":"Vietnam"},{"code":"VI","value":0,"name":"Virgin Islands (U.S.)"},{"code":"PS","value":0,"name":"West Bank and Gaza"},{"code":"EH","value":0,"name":"Western Sahara"},{"code":"YE","value":0,"name":"Yemen, Rep."},{"code":"ZM","value":0,"name":"Zambia"},{"code":"ZW","value":0,"name":"Zimbabwe"}]);;angular.module('Dashboard').
	constant('WIDGET_DEFAULT_DEFINITION', {
		title: 'new widget',
		size: { width: 1, height: 1 },
		position: { x: 1, y: 1 },
		backgroundcolor: 'white',
		fontcolor: 'black',
		type: 'singlenumber'
	}).
	constant('WIDGET_TYPE', {
		pie: {
			type: 'pie',
			name: 'PIE',
			icon: '/images/widget-icons/icopie.png',
			width: [1],
			height: 3,
			config: {"metrics":[{"name":"count.user"}],"segments":[{"name":"user.country"}]}
		},
		singlenumber: {
			type: 'singlenumber',
			name: 'Single Number',
			icon: '/images/widget-icons/icosinglenumber.png',
			width: [1],
			height: 1,
			config: {"metrics":[{"name":"user.age.avg"}],"segments":[]}
		},
		table: {
			type: 'table',
			name: 'Table',
			icon: '/images/widget-icons/icotable.png',
			width: [1,2,3,4],
			height: 4,
			config: {"metrics":[{"name":"user.age.avg"}, {"name":"count.user"}],"segments":[{"name":"user.country"},{"name":"user.inscriptiondate"}], "order": "user.inscriptiondate"}
		},
		graph: {
			type: 'graph',
			name: 'Graph',
			icon: '/images/widget-icons/icochart.png',
			width: [1,2,3,4],
			height: 3,
			config: {"metrics":[{"name":"count.user", "shape": "column"}],"segments":[{"name":"user.country", "axis":"abs"},{"name":"user.inscriptiondate"}], "order": "user.inscriptiondate", "stacked": true}
		},
		map: {
			type: 'map',
			name: 'Map',
			icon: '/images/widget-icons/icomap.png',
			width: [1,2,3,4],
			height: 4,
			config: {"metrics":[{"name":"count.user"}],"segments":[{"name":"user.countrycode"},{"name":"user.country"}], "order": "user.countrycode"}
		}
	}).
	constant('WIDGET_TEMPLATES', {
		graph: '<section dd-widget-graph class="dd-widget"></section>',
		singlenumber: '<section dd-widget-single-number class="dd-widget"></section>',
		pie: '<section dd-widget-pie class="dd-widget"></section>',
		table: '<section dd-widget-table class="dd-widget"></section>',
		map: '<section dd-widget-map class="dd-widget"></section>'
	}).
	constant('WIDGET_GRAPH_TYPES', [
		{
			type: 'area',
			icon: '/images/widget-icons/tiny-icochart-area.png'
		},
		{
			type: 'line',
			icon: '/images/widget-icons/tiny-icochart-line.png'
		},
		{
			type: 'column',
			icon: '/images/widget-icons/tiny-icochart-bar.png'
		}
	]);;angular.module('Dashboard').
	constant('DASHYDASH_SETTINGS', {
		margin: 2,
		height: 110,
		columns: {
			xl: 4,
			l: 4,
			sm: 4,
			xs: 1
		}
	}).constant('WIDGET_DEFAULT_SETTINGS', {
		title: 'new widget',
		size: { width: 1, height: 1 },
		position: { x: 1, y: 1 },
		backgroundcolor: 'white',
		fontcolor: 'black',
		type: 'singlenumber',
		filters: [],
		metrics: [],
		segments: [],
		operator: 'AND'
	}).constant('DASHBOARD_ICONS', [
		"icon-earth",
		"icon-pin",
		"icon-bolt",
		"icon-layers",
		"icon-group",
		"icon-info",
		"icon-star",
		"icon-heart",
		"icon-sunny",
		"icon-pacman",
		"icon-rocket",
		"icon-moneybag",
		"icon-diamond",
		"icon-locked",
		"icon-spaceinvaders"
	]);;angular.module('Dashboard').
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
	]);angular.module('Dashboard').
	service('DashboardOptimizeService', ['DASHYDASH_SETTINGS', '$window', function(DASHYDASH_SETTINGS, $window){

		this.widgetWidth = function(widthContainer, nbCols) {
			return (widthContainer / nbCols) - DASHYDASH_SETTINGS.margin * 2;
		}

		this.amountOfColumn = function() {
			var width = angular.element($window).width()
			,	amount = DASHYDASH_SETTINGS.columns.xl;

			if(width <= 1100)
				amount = DASHYDASH_SETTINGS.columns.xs;
			else
				if(width <= 1124)
					amount = DASHYDASH_SETTINGS.columns.sm;
				else
					if(width <= 1466)
						amount = DASHYDASH_SETTINGS.columns.l;

			return amount;
		}

	}]);angular.module('Dashboard').
	controller('DashboardController', ['$scope', '$location', '$routeParams', 'DashboardFactory', 'CaptureService', function($scope, $location, $routeParams, DashboardFactory, CaptureService){
		var $local = $scope.Dashboard = {}

		$local.dashboards = [];
		$local.currentDashboard = {};
		$local.lockRouteChange = false;

		function getDashboards(callback) {
			DashboardFactory($scope).all(function(data) {
				for(var i = 0; i < data.length; i++)
					$local.dashboards.push(data[i]);

				$local.currentDashboard = $local.dashboards[0];
				callback.call(this);
			})
		}

		$scope.$on('$routeChangeSuccess', function() {

			var next = function() {

				if($location.path() == '/add') {
					var dashboard = {
						id: 0,
						title: '',
						icon: 'icon-earth',
						editMode: true
					};
					$local.dashboards.push(dashboard);
					$local.currentDashboard = dashboard;
				}
				else {
					var idToFound = $routeParams.id || null;

					for(var i = 0; i < $local.dashboards.length; i++)
						if(idToFound == $local.dashboards[i].id || idToFound == null) {
							$local.currentDashboard = $local.dashboards[i];
							break;
						}

					if($local.currentDashboard && !idToFound)
						$location.path('/' + $local.currentDashboard.id);
				}

			};

			if(!$local.lockRouteChange) {
				$local.lockRouteChange = true;
				$local.currentDashboard = {};
				if($local.dashboards === null || $local.dashboards.length == 0)
					getDashboards(next);
				else
					next();
			}

		});

		$local.delete = function($event) {
			if($event) {
				$event.stopPropagation();
				$event.preventDefault();
			}
			DashboardFactory($scope).remove($local.currentDashboard.id, function(data) {
				if(data.information && data.information.indexOf('error') == -1) {

					var index = $local.dashboards.indexOf($local.currentDashboard);
					if(index > -1)
						$local.dashboards.splice(index, 1);

					$local.currentDashboard = $local.dashboards[0];
				}
			})
		}

		$local.capture = function() {
			var $board = angular.element('.dd-board');
			CaptureService($board, $local.currentDashboard.title);
		}

		$scope.toString = function() {
			return 'Dashboard';
		}
	}]);angular.module('Dashboard').
    controller('DashboardMenuController', ['$scope', '$location', 'DASHBOARD_ICONS', function($scope, $location, DASHBOARD_ICONS){
        var $local = $scope.DashboardMenu = {}

        $local.icons = DASHBOARD_ICONS;

        $local.location = function(location) {
            $scope.Dashboard.lockRouteChange = false;
            $location.path('/' + location);
        };

        $scope.toString = function() {
            return 'DashboardMenu';
        }
    }]);angular.module('Dashboard').
	controller('WidgetMenuController', ['$scope', 'WIDGET_TYPE', '$rootScope', function($scope, WIDGET_TYPE, $rootScope){
		var $local = $scope.WidgetMenu = {}

		$local.widgets = WIDGET_TYPE;

		$local.create = function(widget, width) {
			var definition = {
				size: {
					width: width,
					height: widget.height
				},
				config: widget.config,
				type: widget.type
			}
			
			$rootScope.$broadcast('create_widget', definition);
		}

		$scope.toString = function() {
			return 'WidgetMenu';
		}
	}]);angular.module('Dashboard').
	controller('WidgetBackSideController', ['$scope', 'QUERY_BUILDER', 'OPERATORS', 'OPERATORS_NAME', '$timeout',  function($scope, QUERY_BUILDER, OPERATORS, OPERATORS_NAME, $timeout){
		var $local = $scope.WidgetBackSide = {}
		,	widgetScopeName = $scope.$parent.toString()
		,	$widgetScope = $scope[widgetScopeName];

		$local.operators = OPERATORS;
		$local.operatorsName = OPERATORS_NAME;
		$local.tab = 'data';
		$local.kpis = {};
		$local.segments = {};
		$local.metrics = {};

		var kpi;
		for(var i in QUERY_BUILDER) {

			kpi = {
				alias: QUERY_BUILDER[i].alias,
				index: QUERY_BUILDER[i].index,
				datatype: QUERY_BUILDER[i].datatype,
				type: QUERY_BUILDER[i].type
			}

			if(!$local.kpis[QUERY_BUILDER[i].category])
				$local.kpis[QUERY_BUILDER[i].category] = [];

			$local.kpis[QUERY_BUILDER[i].category].push(kpi);

			if(QUERY_BUILDER[i].type == 'segment' || QUERY_BUILDER[i].type == 'meta') {
				if(!$local.segments[QUERY_BUILDER[i].category])
					$local.segments[QUERY_BUILDER[i].category] = [];
				$local.segments[QUERY_BUILDER[i].category].push(kpi);
			}

			if(QUERY_BUILDER[i].type == 'metric' || QUERY_BUILDER[i].type == 'meta') {
				if(!$local.metrics[QUERY_BUILDER[i].category])
					$local.metrics[QUERY_BUILDER[i].category] = [];
				$local.metrics[QUERY_BUILDER[i].category].push(kpi);
			}
		}

		$local.save = function() {
			$scope._flip.active = !$scope._flip.active;
			$timeout(function() { $widgetScope.edit() }, 250);
			$widgetScope.widget.save();
			$scope._dashydash.serialize();
		}

		$local.resize = function(size, resizeKpisArray) {
			resizeKpisArray = resizeKpisArray || false;
			size = size || {};
			$widgetScope.widget.resize(size);

			if(resizeKpisArray) {
				var nbToRemove = $widgetScope.widget.kpis.length - (size.width * 2 + 1)
				,	indexToRemove = $widgetScope.widget.kpis.length - 1;
				for(var i = 0; i < nbToRemove; i++) {
					if($widgetScope.widget.kpis[indexToRemove].kpi)
						$local.removeKpi(indexToRemove, true);
					$widgetScope.widget.kpis.splice(indexToRemove, 1);
					indexToRemove--;
				}
				while($widgetScope.widget.kpis.length < size.width * 2 + 1)
					$widgetScope.widget.kpis.push({});
			}
		}

		$local.delete = function() {
			$widgetScope.widget.delete();
		}

		$local.addFilter = function() {
			$widgetScope.widget.filters.push({
				kpi: QUERY_BUILDER['count.user'],
				operator: '>',
				value: [0, 0]
			})
		}
		$local.addMetric = function(options) {
			options = angular.extend({ name: QUERY_BUILDER['count.user'].index}, options);
			$widgetScope.widget.metrics.push({
				kpi: QUERY_BUILDER['count.user'],
				options: options
			})
		}
		$local.addSegment = function(options) {
			options = angular.extend({ name: QUERY_BUILDER['user.country'].index}, options);
			$widgetScope.widget.segments.push({
				kpi: QUERY_BUILDER['user.country'],
				options: options
			})
		}
		$local.addKpi = function(kpiIndex) {
			options = { name: QUERY_BUILDER['count.user'].index};
			$widgetScope.widget.kpis[kpiIndex] = {
				kpi: QUERY_BUILDER['count.user'],
				options: options
			}
			$local.addMetric();
		}
		$local.changeKpi = function(kpiIndex, kpi) {
			if(kpi.type == "metric")
				$widgetScope.widget.metrics.push({
					kpi: kpi,
					options: {}
				})
			if(kpi.type == "segment")
				$widgetScope.widget.segments.push({
					kpi: kpi,
					options: {}
				})

			$local.removeKpi(kpiIndex, false);
			$widgetScope.widget.kpis[kpiIndex].kpi = kpi;
		}
		$local.removeKpi = function(kpiIndex, clean) {
			clean = clean || false;
			for(var i = $widgetScope.widget.metrics.length - 1; i >= 0 ; i--)
				if($widgetScope.widget.metrics[i].kpi.index == $widgetScope.widget.kpis[kpiIndex].kpi.index) {
					$widgetScope.widget.metrics.splice(i, 1);
					break;
				}
			for(var i = $widgetScope.widget.segments.length - 1; i >= 0 ; i--)
				if($widgetScope.widget.segments[i].kpi.index == $widgetScope.widget.kpis[kpiIndex].kpi.index) {
					$widgetScope.widget.segments.splice(i, 1);
					break;
				}

			if(clean) $widgetScope.widget.kpis[kpiIndex] = {};
		}

		$scope.toString = function() {
			return 'WidgetBackSide';
		}
	}]);angular.module('Dashboard').
	controller('WidgetFrontSideController', ['$scope', function($scope){
		var $local = $scope.WidgetFrontSide = {};

		$scope.toString = function() {
			return 'WidgetFrontSide';
		}
	}]);angular.module('Dashboard').
	factory('DashboardFactory', ['$http', function($http){

		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};

			prototype.create = function(dashboard, callback) {

				$http({	method: 'POST', url: '/api/dashboards/', data: dashboard }).
					success(function(dashboards) { callback.call(this, dashboards); }).
					error(function() { callback.call(this, null); console.error('an error occured during the dashboard creation'); });
			};

			prototype.update = function(dashboard, callback) {

				$http({	method: 'PUT', url: '/api/dashboards/' + dashboard.id, data: dashboard }).
					success(function(dashboards) { callback.call(this, dashboards); }).
					error(function() { callback.call(this, null); console.error('an error occured during the dashboard update'); });
			};

			prototype.remove = function(dashboardId, callback) {

				$http({	method: 'DELETE', url: '/api/dashboards/' + dashboardId }).
					success(function(data) { callback.call(this, data); }).
					error(function() { callback.call(this, null); console.error('an error occured during the dashboard deletion'); });
			};

			prototype.get = function(dashboardId, callback) {

				$http({	method: 'GET', url: '/api/dashboards/' + dashboardId }).
					success(function(dashboard) { callback.call(this, dashboard); }).
					error(function() { callback.call(this, null); console.error('an error occured during the dashboard recuperation'); });
			};

			prototype.all = function(callback) {

				$http({	method: 'GET', url: '/api/dashboards' }).
					success(function(dashboards) { callback.call(this, dashboards); }).
					error(function() { callback.call(this, null); console.error('an error occured during the dashboards recuperation'); });
			};

			return prototype;
		};
	}]);;angular.module('Dashboard').
	factory('WidgetFactory', ['$http', function($http){

		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};
		
			prototype.create = function(dashboardId, definition, callback) {
				
				$http({	method: 'POST', url: '/api/dashboards/' + dashboardId + '/widgets', data: definition }).
					success(function(widgetDefinition) { callback && callback.call(this, widgetDefinition); }).
					error(function() { console.error('an error occured during the widget creation'); });
			};

			prototype.remove = function(dashboardId, widgetId, callback) {

				$http({	method: 'DELETE', url: '/api/dashboards/' + dashboardId + '/widgets/' + widgetId}).
					success(function() { callback && callback.call(this); }).
					error(function() { console.error('an error occured during the widget deletion'); });

			};

			prototype.get = function(dashboardId, widgetId, callback) {

				$http({	method: 'GET', url: '/api/dashboards/' + dashboardId + '/widgets/' + widgetId }).
					success(function(widgets) { callback && callback.call(this, widgets); }).
					error(function() { console.error('an error occured during the widget recuperation'); });
			};
			
			prototype.getByDashboardId = function(dashboardId, callback) {
				
				$http({	method: 'GET', url: '/api/dashboards/' + dashboardId + '/widgets' }).
					success(function(widgets) { callback && callback.call(this, widgets); }).
					error(function() { console.error('an error occured during the widget recuperation'); });
			};

			prototype.getData = function(dashboardId, widgetId, callback) {

				$http({	method: 'GET', url: '/api/dashboards/' + dashboardId + '/widgets/' + widgetId + '/data' }).
					success(function(data) { callback && callback.call(this, data); }).
					error(function() { console.error('an error occured during the data recuperation'); });
			};

			prototype.updatePosition = function(dashboardId, serialization, callback) {

				$http({method: 'PUT', url: '/api/dashboards/' + dashboardId + '/widgets/position', data: JSON.stringify(serialization)}).
					success(function(data) { callback && callback.call(this); }).
					error(function() { console.error('an error occured when trying to save widgets position'); })
			}

			prototype.update = function(definition, callback) {

				$http({method: 'PUT', url: '/api/dashboards/' + definition.dashboardid + '/widgets/' + definition.id, data: JSON.stringify(definition)}).
					success(function(data) { callback && callback.call(this); }).
					error(function() { console.error('an error occured when trying to update widget'); })
			}
			

			return prototype;
		};
	}]);;angular.module('Dashboard').
	directive('flip', function(WidgetGraphProvider){
		return {
			scope: true,
			restrict: 'A',
			link: function($scope, $node, attributes) {
				var $local = $scope._flip = {}

				$local.active = false;

				$scope.$on('stop_edit', function() {
					$local.active = false;
				})

				$scope.toString = function() {
					return '_flip';
				}
			}
		};
	});;angular.module('Dashboard').
    directive('dashboard', ['DashboardFactory', function(DashboardFactory){
        return {
            scope: true,
            replace: false,
            require: 'dashboard',
            restrict: 'A',
            controller: ['$scope', '$attrs', function($scope, $attrs) {
                var $local = $scope._dashboard = {}
                ,   self = this;

                $local.edit = function() {
                    if($local.isSelected) {
                        $local.dashboard.editMode = true;
                        $local.oldTitle = $local.dashboard.title;
                        $local.oldIcon = $local.dashboard.icon;
                    }
                }

                $local.isSelected = function() {
                    return $scope.Dashboard.currentDashboard.id == $local.dashboard.id
                }

                $local.validEdit = function(event) {
                    var keyCode = event ? event.keyCode : -1;
                    if(keyCode == 13 || keyCode == -1) {
                        $local.dashboard.editMode = false;
                        if($local.dashboard.title != '' && $local.dashboard.title.indexOf('/') == -1 && $local.dashboard.title.indexOf('\\') == -1) {
                            if($local.dashboard.id == 0) {
                                DashboardFactory($scope).create($local.dashboard, function(data) {
                                    if(data && data.dashboard && data.dashboard.id) {
                                        $local.dashboard.id = data.dashboard.id;
                                        $scope.DashboardMenu.location(data.dashboard.id);
                                    }
                                    else {
                                        $scope.Dashboard.dashboards.pop();
                                        $scope.DashboardMenu.location($scope.Dashboard.dashboards[0].id);
                                    }
                                })
                            } else {
                                DashboardFactory($scope).update($local.dashboard, function(data) {
                                    if(!data || !data.dashboard || !data.dashboard.id) {
                                        $local.dashboard.title = $local.oldTitle;
                                        $local.dashboard.icon = $local.oldIcon;
                                    }
                                })
                            }
                        } else
                            $local.cancelEdit();
                    }
                };

                $local.cancelEdit = function() {
                    $local.dashboard.editMode = false;
                    $local.dashboard.title = $local.oldTitle;
                    if($local.dashboard.id == 0) {
                        $scope.Dashboard.dashboards.pop();
                        $scope.DashboardMenu.location($scope.Dashboard.dashboards[0].id);
                    }
                };

                $scope.toString = function() {
                    return '_dashboard';
                }
            }],
            link: function($scope, $node, attributes, self) {
                var $local = $scope._dashboard;

                for(var i = 0; i < $scope.Dashboard.dashboards.length; i++)
                    if($scope.Dashboard.dashboards[i].id == attributes.dashboardId) {
                        $local.dashboard = $scope.Dashboard.dashboards[i];
                        $local.oldTitle = $local.dashboard.title;
                        $local.oldIcon = $local.dashboard.icon;
                        break;
                    }

                $scope.$watch('Dashboard.currentDashboard', function() {
                    if(!$local.isSelected() && $local.dashboard.editMode) {
                        $local.dashboard.editMode = false;
                        $local.dashboard.title = $local.oldTitle;
                        $local.dashboard.icon = $local.oldIcon;
                    }
                    if(!$local.isSelected() && $local.dashboard.id == 0)
                        $scope.Dashboard.dashboards.pop();
                })

            }
        };
    }]);;angular.module('Dashboard').
	directive('dashydash', ['DASHYDASH_SETTINGS', '$parse', 'WidgetFactory', 'DashboardOptimizeService', '$window',
	function(DASHYDASH_SETTINGS, $parse, WidgetFactory, DashboardOptimizeService, $window){
		return {
			scope: true,
			replace: true,
			require: 'dashydash',
			restrict: 'A',
			template:
				'<section class="dashydash">'
			+		'<section class="dd-board"></section>'
			+		'<section class="dd-pool"></section>'
			+ 	'</section>',
			controller: ['$scope', '$compile', 'DASHYDASH_SETTINGS', 'WIDGET_DEFAULT_DEFINITION', 'WIDGET_TEMPLATES', 'DashboardOptimizeService',
			function($scope, $compile, DASHYDASH_SETTINGS, WIDGET_DEFAULT_DEFINITION, WIDGET_TEMPLATES, DashboardOptimizeService) {

				var $local = $scope._dashydash = {}
				,	self = this
				,	dashboardDefinition = null
				,	throttleTimer;

				$local.widgets = {};
				$local.zIndex = 10;

				self.dashydash = null;
				self.options = {};


				//**************** gestion d'event ****************//

				$scope.$on('create_widget', function(scope, definition) {
					var options = {};
					_.merge(options, WIDGET_DEFAULT_DEFINITION, definition);

					WidgetFactory($scope).create(self.dashboardDefinition.id, options, function(definition) {
						self.addWidget(definition, function() { $local.serialize(); })
					})
				});

				$scope.$on('delete_widget', function(scope, options) {
					delete $local.widgets[options.id];
					self.deleteWidget(options.node);
				});

				$scope.$on('resize_widget', function(scope, options) {
					self.resizeWidget(options.node, options.size, options.callback);
				});

				//**************** dashydash management ****************//

				$local.serialize = function() {
					var currentAmountOfColumn = DashboardOptimizeService.amountOfColumn()
					if(DASHYDASH_SETTINGS.columns.xs != currentAmountOfColumn) {
						var serialization = self.dashydash.serialize();

						WidgetFactory($scope).updatePosition(self.dashboardDefinition.id, serialization, angular.noop);
					}
				}

				self.deleteWidget = function($node) {
					self.dashydash.remove_widget($node);
					$local.serialize();
				}

				self.resizeWidget = function(node, size, callback) {
					self.dashydash.resize_widget( node, size.width, size.height, function() {
						$local.serialize();
						callback && callback.call(this);
					});
				}

				self.addWidget = function(definition, callback) {
					var options = {}
					,	currentAmountOfColumn = DashboardOptimizeService.amountOfColumn();
					definition = definition || {};

					_.merge(options, WIDGET_DEFAULT_DEFINITION, definition);

					if(!$local.widgets[ options.id ])
						$local.widgets[ options.id ] = options;

					var $widget = angular.element( WIDGET_TEMPLATES[options.type] );
					$widget.attr('widget-id', options.id);

					var compiled = $compile($widget)($scope)
					,	configuration = DASHYDASH_SETTINGS.columns.xl == currentAmountOfColumn ? [compiled, options.size.width, options.size.height] : [compiled, 1, options.size.height];

					if(DASHYDASH_SETTINGS.columns.xl == self.options.col) {
						$widget.attr('dd-col', options.position.x);
						$widget.attr('dd-row', options.position.y);
						configuration.push(options.position.x, options.position.y)
					}

					self.dashydash.add_widget.apply( self.dashydash, configuration );
					callback && callback.call(this);
				}

				$scope.toString = function() {
					return '_dashydash';
				}
			}],
			link: function($scope, $node, attributes, self) {
				var $local = $scope._dashydash
				,	$board = $node.find('.dd-board')
				,	$pool = $node.find('.dd-pool')
				,	linked = false;

				$local.locked = false;

				self.options = {
					width: 0,
					col: DashboardOptimizeService.amountOfColumn()
				};

				if(!attributes.dashydash)
					throw 'dashydash property cannot be empty';

				$scope.$watch(attributes.dashydash, function(definition) {
					if(!definition.id)
						return false;

					self.dashydash.remove_all_widgets();

					self.dashboardDefinition = definition;
					if(self.dashboardDefinition.id)
						WidgetFactory($scope).getByDashboardId(self.dashboardDefinition.id, function(widgets) {
							for(var i = 0; i<widgets.length; i++)
								self.addWidget(widgets[i]);
						});
				})


				$window.onresize = _.throttle(buildDelayed, 240);

				build();

				//**************** widgets management ****************//

				function destroy() { self.dashydash && self.dashydash.destroy(true, true, false); }

				function build() {
					if($node.width() == self.options.width)
						return true;

					copyWidgetInPool();
					self.options.width = $node.width();
					self.options.col = DashboardOptimizeService.amountOfColumn();

					var width = DashboardOptimizeService.widgetWidth(self.options.width, self.options.col, DASHYDASH_SETTINGS.margin);
					destroy();

					self.dashydash = $board.dashyDash({
						draggable: { stop: $local.serialize },
						margin: [DASHYDASH_SETTINGS.margin, DASHYDASH_SETTINGS.margin],
						max_cols: self.options.col,
						dimensions: [ width, DASHYDASH_SETTINGS.height]
					});

					reloadFromPool();

					$local.locked = !( DASHYDASH_SETTINGS.columns.xl == self.options.col );

					linked && $scope.$apply();
					linked = true;
				}

				function buildDelayed() {
					window.clearTimeout(self.throttleTimer);
					self.throttleTimer = window.setTimeout(build, 500);
				}

				function copyWidgetInPool() {
					$board.find('.dd-widget').each(function() {
						var $this = angular.element(this);

						if(DASHYDASH_SETTINGS.columns.xl == self.options.col) {
							$this.attr('dd-row-saved', $this.attr('dd-row'));
							$this.attr('dd-col-saved', $this.attr('dd-col'));
						}

                		delete $this.data().coords;
						$this.appendTo($pool);
					})
				}

				function reloadFromPool() {

					$pool.find('.dd-widget').each(function() {
						var $this = angular.element(this)
						,	widgetId = $this.attr('widget-id')
						,	dashydashWidth = parseInt($this.attr('dd-width'), 10)
						,	dashydashHeight = parseInt($this.attr('dd-height'), 10)
						,	widgetWidth = $local.widgets[widgetId].size.width ? $local.widgets[widgetId].size.width : dashydashWidth
						,	parameters = [ $this, ( widgetWidth > self.options.col ? 1 : widgetWidth ), dashydashHeight ];

						if(DASHYDASH_SETTINGS.columns.xl == self.options.col) {
							$local.locked = false;
							parameters.push(
								parseInt($this.attr('dd-col-saved'), 10),
								parseInt($this.attr('dd-row-saved'), 10)
							);

							$this.removeAttr('dd-row-saved');
							$this.removeAttr('dd-col-saved');
						}
						else
							if(DASHYDASH_SETTINGS.columns.xs == self.options.col)
								$scope.$broadcast('stop_edit');

						self.dashydash.add_widget.apply(self.dashydash, parameters);
						$scope.$broadcast('widget_refresh');
					});
				}
			}
		};
	}]);;angular.module('Dashboard').
	directive('ddWidgetGraph', ['WidgetGraphProvider', function(WidgetGraphProvider){
		return {
			scope: true,
			replace: false,
			require: 'ddWidgetGraph',
			restrict: 'A',
			templateUrl: '/templates/widgets/widgetGraph',
			controller: ['$scope', '$attrs', function($scope, $attrs) {
				var $local = $scope._ddWidgetGraph = {}
				,	self = this;

				$local.widget = {};

				self.edit = false;
				self.id  = parseInt($attrs.widgetId, 10);

				$scope.toString = function() {
					return '_ddWidgetGraph';
				}
			}],
			link: function($scope, $node, attributes, self) {
				var $local = $scope._ddWidgetGraph;

				$local.edit = function() {
					self.edit = !self.edit;
					$node.css('z-index', ( self.edit ? ++$scope._dashydash.zIndex : 2 ) );
				}

				$local.widget = new WidgetGraphProvider($scope._dashydash.widgets[self.id], {scope: $scope, node: $node});
				$local.widget.load()
			}
		};
	}]);;angular.module('Dashboard').
	directive('ddWidgetSingleNumber', ['WidgetSingleNumberProvider', function(WidgetSingleNumberProvider){
		return {
			scope: true,
			replace: false,
			require: 'ddWidgetSingleNumber',
			restrict: 'A',
			templateUrl: '/templates/widgets/widgetSingleNumber',
			controller: ['$scope', '$attrs', function($scope, $attrs) {
				var $local = $scope._ddWidgetSingleNumber = {}
				,	self = this;

				$local.widget = {};

				self.edit = false;
				self.id  = parseInt($attrs.widgetId, 10);

				$scope.toString = function() {
					return '_ddWidgetSingleNumber';
				}
			}],
			link: function($scope, $node, attributes, self) {
				var $local = $scope._ddWidgetSingleNumber;

                $local.edit = function() {
                    self.edit = !self.edit;
                    $node.css('z-index', ( self.edit ? ++$scope._dashydash.zIndex : 2 ) );
                }

				$local.widget = new WidgetSingleNumberProvider($scope._dashydash.widgets[self.id], {scope: $scope, node: $node});
				$local.widget.load()
			}
		};
	}]);;angular.module('Dashboard').
	directive('ddWidgetPie', ['WidgetPieProvider', function(WidgetPieProvider){
		return {
			scope: true,
			replace: false,
			require: 'ddWidgetPie',
			restrict: 'A',
			templateUrl: '/templates/widgets/widgetPie',
			controller: ['$scope', '$attrs', function($scope, $attrs) {
				var $local = $scope._ddWidgetPie = {}
				,	self = this;

				$local.widget = {};

				self.edit = false;
				self.id  = parseInt($attrs.widgetId, 10);

				$scope.toString = function() {
					return '_ddWidgetPie';
				}
			}],
			link: function($scope, $node, attributes, self) {
				var $local = $scope._ddWidgetPie;

                $local.edit = function() {
                    self.edit = !self.edit;
                    $node.css('z-index', ( self.edit ? ++$scope._dashydash.zIndex : 2 ) );
                }

				$local.widget = new WidgetPieProvider($scope._dashydash.widgets[self.id], {scope: $scope, node: $node});
				$local.widget.load()
			}
		};
	}]);;angular.module('Dashboard').
	directive('ddWidgetTable', ['WidgetTableProvider', function(WidgetTableProvider){
		return {
			scope: true,
			replace: false,
			require: 'ddWidgetTable',
			restrict: 'A',
			templateUrl: '/templates/widgets/widgetTable',
			controller: ['$scope', '$attrs', function($scope, $attrs) {
				var $local = $scope._ddWidgetTable = {}
				,	self = this;

				$local.widget = {};

				self.edit = false;
				self.id  = parseInt($attrs.widgetId, 10);

				$scope.toString = function() {
					return '_ddWidgetTable';
				}
			}],
			link: function($scope, $node, attributes, self) {
				var $local = $scope._ddWidgetTable;

                $local.edit = function() {
                    self.edit = !self.edit;
                    $node.css('z-index', ( self.edit ? ++$scope._dashydash.zIndex : 2 ) );
                }

				$local.widget = new WidgetTableProvider($scope._dashydash.widgets[self.id], {scope: $scope, node: $node});
				$local.widget.load()
			}
		};
	}]);;angular.module('Dashboard').
    directive('ddWidgetMap', ['WidgetMapProvider', function(WidgetMapProvider){
        return {
            scope: true,
            replace: false,
            require: 'ddWidgetMap',
            restrict: 'A',
            templateUrl: '/templates/widgets/widgetMap',
            controller: ['$scope', '$attrs', function($scope, $attrs) {
                var $local = $scope._ddWidgetMap = {}
                ,   self = this;

                $local.widget = {};
                self.edit = false;

                self.id  = parseInt($attrs.widgetId, 10);

                $scope.toString = function() {
                    return '_ddWidgetMap';
                }
            }],
            link: function($scope, $node, attributes, self) {
                var $local = $scope._ddWidgetMap;

                $local.edit = function() {
                    self.edit = !self.edit;
                    $node.css('z-index', ( self.edit ? ++$scope._dashydash.zIndex : 2 ) );
                }

                $local.widget = new WidgetMapProvider($scope._dashydash.widgets[self.id], {scope: $scope, node: $node});
                $local.widget.load();
            }
        };
    }]);;angular.module('Dashboard').
	provider('WidgetProvider', function(){

		this.$get = ['WIDGET_DEFAULT_SETTINGS', 'QUERY_BUILDER', 'WidgetFactory', '$window', function(WIDGET_DEFAULT_SETTINGS, QUERY_BUILDER, WidgetFactory, $window) {

			var Widget = function(options, context) {
				if(!options || !context)
					return false;

				var self = this;
				self.options = {};
				_.merge(self.options, WIDGET_DEFAULT_SETTINGS, options);

				self.size = {
					width: self.options.size.width,
					height: self.options.size.height
				};
				self.position = {
					x: self.options.position.x,
					y: self.options.position.y
				};
				self.id = self.options.id;
				self.title = self.options.title;
				self.backgroundColor = self.options.backgroundcolor;
				self.fontColor = self.options.fontcolor;
				self.metrics = self.options.metrics;
				self.segments = self.options.segments;
				self.filters = self.options.filters;
				self.dashboardId = self.options.dashboardid;

				self.scope = context.scope;
				self.node = context.node;

				self.limit = self.options.config.limit;
				self.operator = self.options.config.operator || 'AND';

				self.sort = self.options.config.sort || {};

				if(self.options.config.metrics)
				for(var i = 0; i<self.options.config.metrics.length; i++)
					self.metrics.push({
						kpi: QUERY_BUILDER[self.options.config.metrics[i].name],
						options: self.options.config.metrics[i]
					});

				if(self.options.config.segments)
				for(var i = 0; i<self.options.config.segments.length; i++)
					self.segments.push({
						kpi: QUERY_BUILDER[self.options.config.segments[i].name],
						options: self.options.config.segments[i]
					});

				if(self.options.config.filters)
				for(var i = 0; i<self.options.config.filters.length; i++)
					self.filters.push({
						kpi: QUERY_BUILDER[self.options.config.filters[i].name],
						operator: self.options.config.filters[i].operator,
						value: self.options.config.filters[i].value
					});

				self.scope.$on('widget_refresh', function() { self.refresh(); })
			};

			Widget.prototype.init = function() { throw 'init method must be overriden'; };

			Widget.prototype._formatFilters = function() {
				var self = this;

				for(var i = 0; i<self.filters.length; i++) {
					var lengthMax = 0;
					if(self.filters[i].operator == 'BETWEEN' || self.filters[i].operator == 'NOT BETWEEN') {
						lengthMax = 2;
						if(self.filters[i].value[0] == '' || self.filters[i].value[1] == '')
							if(self.filters[i].value[0] != '')
								self.filters[i].value[1] = self.filters[i].value[0];
							else if(self.filters[i].value[1] != '')
								self.filters[i].value[0] = self.filters[i].value[1];
							else {
								self.filters[i].value[0] = '0';
								self.filters[i].value[1] = '0';
							}
					}
					else if(self.filters[i].operator == 'IN' || self.filters[i].operator == 'NOT IN') {
						for(var j = self.filters[i].value.length - 1; j >= 0 ; j--)
							if(self.filters[i].value[j] == '')
								self.filters[i].value.splice(j, 1);

						if(self.filters[i].value.length == 0)
							self.filters[i].value.push('0');

						if(self.filters[i].value.length < 2) {
							if(self.filters[i].value[0] != '')
								self.filters[i].value[1] = self.filters[i].value[0];
							else if(self.filters[i].value[1] != '')
								self.filters[i].value[0] = self.filters[i].value[1];
						}
					}
					else
						lengthMax = 1;

					if(lengthMax != 0)
						while(self.filters[i].value.length > lengthMax)
								self.filters[i].value.splice(self.filters[i].value.length - 1, 1);

					if(self.filters[i].value.length == 1 && self.filters[i].value[0] == '')
						self.filters[i].value[0] = '0';
				}
			}

			Widget.prototype._save = function() {
				var configuration = {}
				,	options
				,	self = this;
				configuration.sort = self.sort;
				configuration.operator = self.operator;
				configuration.metrics = [];
				configuration.segments = [];
				configuration.filters = [];

				for(var i = 0; i<self.metrics.length; i++) {
					options = self.metrics[i].options;
					options.name = self.metrics[i].kpi.index;
					configuration.metrics.push(options)
				}

				for(var i = 0; i<self.segments.length; i++) {
					options = self.segments[i].options;
					options.name = self.segments[i].kpi.index;
					configuration.segments.push(options)
				}

				self._formatFilters();

				for(var i = 0; i<self.filters.length; i++) {
					configuration.filters.push({
						name: self.filters[i].kpi.index,
						operator: self.filters[i].operator,
						value: self.filters[i].value
					})
				}

				return configuration;

			};

			Widget.prototype.save = function() {
				var self = this
				,	definition = {}
				,	configuration = self._save();

				definition.title = self.title;
				definition.size = self.size;
				definition.position = self.position;
				definition.id = self.id;
				definition.backgroundcolor = self.backgroundColor;
				definition.fontcolor = self.fontColor;
				definition.dashboardid = self.dashboardId;
				definition.config = configuration;

				WidgetFactory(self.scope).update(definition, function() {
					self.load();
				});

			}

			Widget.prototype.load = function() {
				var self = this;
				WidgetFactory(self.scope).getData(self.dashboardId, self.id, function(data) { self.init(data); })
			};

			Widget.prototype.refresh = function() { };

			Widget.prototype.delete = function() {
				var self = this;

				WidgetFactory(self.scope).remove(self.dashboardId, self.id, function() {
					self.scope.$emit('delete_widget', { id: self.id, node: self.node });
				})
			};

			Widget.prototype.resize = function(size, callback) {
				var self = this;
				callback = callback || angular.noop;
				angular.extend(self.size, size);

				self.scope.$emit('resize_widget', { node: self.node, size: self.size, callback: function() {
					callback.call(self);
				}});
			};

			Widget.prototype.toString = function() {
				return 'Widget';
			};

			return Widget
		}]
	});angular.module('Dashboard').
	provider('WidgetGraphProvider', function(){

		this.$get = ['ClassService', 'WidgetProvider', 'WidgetFactory', '$window', function(ClassService, WidgetProvider, WidgetFactory, $window) {

			var Widget = function(options, context) {
				var self = this;
				WidgetProvider.call(this, options, context);

				self.chartOptions = {};
				self.stacked = self.options.config.stacked || false;
			};

			ClassService.extend(WidgetProvider, Widget);

			Widget.prototype.init = function(data) {
				var self = this
				,	$node = self.node.find('.widget-front-body')
				,	series = {}
				,	segment = []
				,	absName = ''
				,	segmentName = ''
				,	axis = []
				,	axisType = ''
				,	index = '';

				if(!data || data.length == 0)
					return true;

				self.chartOptions = {};
				self.chartOptions.series = [];

				self.chartOptions.title = {
					text: self.title,
					align: 'left'
				};

    			if(self.stacked)
				self.chartOptions.plotOptions = {
					column: { stacking: 'normal' },
					area: { stacking: 'normal' },
					line: { stacking: 'normal' }
				}

				for(var i = 0; i<self.segments.length; i++) {
					index = self.segments[i].kpi.alias;
					series = { data: [] };

					for(var j = 0; j<data.length; j++)
						series.data.push(data[j][index]);

					if(self.segments[i].options.axis == 'abs' || self.segments.length == 1) {
						axisType = self.segments[i].kpi.datatype;
						absName = index;
						switch(self.segments[i].kpi.datatype) {
							case 'string':
								axis = _.uniq(series.data, false);
								self.chartOptions.xAxis = { categories: axis };
							break;
							case 'date':
								self.chartOptions.xAxis = { type: 'datetime' };
								for(var j = 0; j< series.data.length; j++)
									axis.push( (new Date(series.data[j])).getTime() )
								axis = _.uniq(axis, false);
							break;
							case 'number':
								axis = _.uniq(series.data, false);
							break;
						}

						self.chartOptions.xAxis.labels = {
							rotation: -45
						}

					}
					else {
						segmentName = index;
						segment = _.uniq(series.data, false);
					}

				}

				var value = '';

				if(!!segment && segment.length > 0)
					for(var i = 0; i<segment.length; i++) {
						index = segment[i];
						alias = self.metrics[0].kpi.alias;

						series = {
							type: self.metrics[0].options.shape,
							name: index,
							marker: { enabled: false },
							data: [],
               				stack: segmentName
						};

						switch(self.metrics[0].options.shape) {
							case 'area':
								series.zIndex = 0;
							break;
							case 'column':
								series.zIndex = 1;
							break;
							case 'line':
								series.zIndex = 2;
							break;
						}

						var witness = false;
						// if(axis.length>0)
							for(var j = 0; j<axis.length; j++) {
								witness = false;
								for(var k = 0; k<data.length; k++) {
									value = axisType == 'date' ? (new Date(data[k][absName])).getTime() : data[k][absName];
									if(value == axis[j] && data[k][segmentName] == index) {
										witness = true;
										series.data.push([axis[j], data[k][alias]]);
									}
								}
								if(!witness)
									series.data.push([axis[j], 0]);
							}
						// else
						// 	for(var j = 0; j<data.length; j++){
						// 		console.log('passage')
						// 		series.data.push(data[j][alias]);
						// 	}

						self.chartOptions.series.push(series)
					}
				else {

					self.chartOptions.yAxis = [];
					for(var i = 0; i<self.metrics.length; i++) {
						index = self.metrics[i].kpi.alias;

						series = {
							type: self.metrics[i].options.shape,
							name: index,
							marker: { enabled: false },
							data: [],
							yAxis: i
						};

						switch(self.metrics[i].options.shape) {
							case 'area':
								series.zIndex = 0;
							break;
							case 'column':
								series.zIndex = 1;
							break;
							case 'line':
								series.zIndex = 2;
							break;
						}
						var witness = false;
						if(axis.length>0)
							for(var j = 0; j<axis.length; j++) {
								witness = false;
								for(var k = 0; k<data.length; k++) {
									value = axisType == 'date' ? (new Date(data[k][absName])).getTime() : data[k][absName];
									if(value == axis[j]) {
										witness = true;
										series.data.push([axis[j], data[k][index]]);
									}
								}
								if(!witness)
									series.data.push([axis[j], 0]);
							}
						else
							for(var j = 0; j<data.length; j++)
								series.data.push(data[j][index]);

						self.chartOptions.yAxis.push({
							title: {
								text: index
							},
							opposite: i>0
						})

						self.chartOptions.series.push(series)
					}
				}


				this.refresh();
			};

			Widget.prototype.save = function() {
				var self = this
				,	definition = {}
				,	configuration = this._save();

				configuration.stacked = self.stacked;
				definition.title = self.title;
				definition.size = self.size;
				definition.position = self.position;
				definition.id = self.id;
				definition.backgroundcolor = self.backgroundColor;
				definition.fontcolor = self.fontColor;
				definition.dashboardid = self.dashboardId;
				definition.config = configuration;

				WidgetFactory(self.scope).update(definition, angular.noop);

				self.load();
			}

			Widget.prototype.refresh = function() {
				var self = this;
				this.node.find('.widget-front-body').highcharts(self.chartOptions);
			}

			Widget.prototype.toString = function() {
				return 'Widget Graph';
			};

			return Widget
		}]
	});angular.module('Dashboard').
    provider('WidgetMapProvider', function(){

        this.$get = ['ClassService', 'WidgetProvider', '$window', 'COUNTRIES', function(ClassService, WidgetProvider, $window, COUNTRIES) {

            var Widget = function(options, context) {
                var self = this;
                WidgetProvider.call(this, options, context);
                self.chartOptions = {};
                self.series = [];
            };

            ClassService.extend(WidgetProvider, Widget);

            Widget.prototype.init = function(data) {
                var self = this
                ,   series = {}
                ,   metricName = self.metrics[0].kpi.alias
                ,   segmentName = self.segments[0].kpi.alias;
                self.chartOptions = {};
                self.series = new Array();

                self.chartOptions.title = {
                    text: self.title,
                    align: 'left'
                };

                self.chartOptions.plotOptions = {
                    map: {
                        allowPointSelect: false,
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                };

                self.chartOptions.mapNavigation = {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                };

                var maxValue = 0;
                for(var i = 0; i < data.length; i++)
                    if(data[i][metricName] > maxValue)
                        maxValue = data[i][metricName];

                self.chartOptions.colorAxis = {
                    min: 0,
                    max: maxValue,
                    minColor: '#FFFFFF'
                };

                var serie = {
                    data : [],
                    mapData: Highcharts.maps.world,
                    joinBy: 'code',
                    name: metricName,
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    }
                };

                var dataTemp = [];
                for(var i = 0; i<data.length; i++)
                    dataTemp.push({"value": data[i][metricName], "code": data[i]["countrycode"], "name": data[i]["country"]});

                dataFinal = [];
                for(var i = 0; i < COUNTRIES.length; i++) {
                    var added = false;
                    for(var j = 0; j < dataTemp.length; j++) {
                        if(COUNTRIES[i].code == dataTemp[j].code)
                            dataFinal.push(dataTemp[j])
                        else if(!added) {
                            dataFinal.push(COUNTRIES[i]);
                            added = true;
                        }
                    }
                }


                serie.data = dataFinal;
                self.series.push(serie);

                this.refresh();
            };

            Widget.prototype.refresh = function() {
                var self = this

                self.chartOptions.series = self.series;
                self.node.find('.widget-front-body').highcharts("Map", self.chartOptions);
            }

            Widget.prototype.toString = function() {
                return 'Widget Map';
            };

            return Widget
        }]
    });angular.module('Dashboard').
	provider('WidgetSingleNumberProvider', function(){

		this.$get = ['ClassService', 'WidgetProvider', '$window', function(ClassService, WidgetProvider, $window) {

			var Widget = function(options, context) {
				var self = this;
				WidgetProvider.call(this, options, context);
				self.value = 0;
			};

			ClassService.extend(WidgetProvider, Widget);

			Widget.prototype.init = function(data) {
				var self = this;
				self.value = data[0][self.metrics[0].kpi.alias];
			};

			Widget.prototype.refresh = function() {}

			Widget.prototype.toString = function() {
				return 'Widget Single Number';
			};

			return Widget
		}]
	});angular.module('Dashboard').
	provider('WidgetPieProvider', function(){

		this.$get = ['ClassService', 'WidgetProvider', '$window', function(ClassService, WidgetProvider, $window) {

			var Widget = function(options, context) {
				var self = this;
				WidgetProvider.call(this, options, context);
				self.chartOptions = {};
			};

			ClassService.extend(WidgetProvider, Widget);

			Widget.prototype.init = function(data) {

				var self = this
				,	series = {}
				,	metricName = self.metrics[0].kpi.alias
				,	segmentName = self.segments[0].kpi.alias;
				self.chartOptions = {};
				self.chartOptions.series = [];
				
				self.chartOptions.title = {
					text: self.title,
					align: 'left'
				};

				self.chartOptions.plotOptions = {
					pie: {
						allowPointSelect: false,
						cursor: 'pointer',
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				}

				var serie = {
					type: 'pie',
					name: metricName,
					data: []
				}

				for(var j = 0; j<data.length; j++)
					serie.data.push([data[j][segmentName].toString(), data[j][metricName]]);

				self.chartOptions.series.push(serie);

				this.refresh();
			};

			Widget.prototype.refresh = function() {
				var self = this;
				this.node.find('.widget-front-body').highcharts(this.chartOptions);
			}

			Widget.prototype.toString = function() {
				return 'Widget Pie';
			};

			return Widget
		}]
	});angular.module('Dashboard').
	provider('WidgetTableProvider', function(){

		this.$get = ['ClassService', 'WidgetProvider', '$window', function(ClassService, WidgetProvider, $window) {

			var Widget = function(options, context) {
				var self = this;
				WidgetProvider.call(this, options, context);
				self.value = 0;
				self.kpis = [];
			};

			ClassService.extend(WidgetProvider, Widget);

			Widget.prototype.init = function(data) {
				var self = this
				,	datatype
				,	index
				,	row;
				self.kpis = [];
				self.head = [];

				for(var i = 0; i < self.metrics.length; i++) {
					self.head.push(self.metrics[i].kpi.alias);
					self.kpis.push(self.metrics[i]);
				}
				for(var i = 0; i < self.segments.length; i++) {
					self.head.push(self.segments[i].kpi.alias);
					self.kpis.push(self.segments[i]);
				}

				while(self.kpis.length < self.size.width * 2 + 1)
					self.kpis.push({});


				self.body = [];
				for(var i = 0; i < data.length; i++) {
					row = [];

					for(var j = 0; j < self.metrics.length; j++) {
						index = self.metrics[j].kpi.alias;
						datatype = self.metrics[j].kpi.datatype;
						switch(datatype) {
							case 'date':
								row.push( moment( new Date(data[i][index]) ).format("MMM Do YYYY") );
							break;
							default:
								row.push( data[i][index] );
							break;
						}

					}
					for(var j = 0; j < self.segments.length; j++) {
						index = self.segments[j].kpi.alias;
						datatype = self.segments[j].kpi.datatype;
						switch(datatype) {
							case 'date':
								row.push( moment( new Date(data[i][index]) ).format("MMM Do YYYY") );
							break;
							default:
								row.push( data[i][index] );
							break;
						}
					}

					self.body.push(row);
				}

			};

			Widget.prototype._save = function() {
				var configuration = {}
				,	options
				,	self = this;
				configuration.sort = self.sort;
				configuration.limit = self.limit;
				configuration.operator = self.operator;
				configuration.metrics = [];
				configuration.segments = [];
				configuration.filters = [];

				for(var i = 0; i < self.kpis.length; i++)
					if(self.kpis[i].kpi) {
						options = self.kpis[i].options;
						options.name = self.kpis[i].kpi.index;
						if(self.kpis[i].kpi.type == "metric")
							configuration.metrics.push(options);
						else if(self.kpis[i].kpi.type == "segment")
							configuration.segments.push(options);
					}

				self.formatFilters();

				for(var i = 0; i<self.filters.length; i++) {
					configuration.filters.push({
						name: self.filters[i].kpi.index,
						operator: self.filters[i].operator,
						value: self.filters[i].value
					})
				}

				return configuration;

			};

			Widget.prototype.refresh = function() {}

			Widget.prototype.toString = function() {
				return 'Widget Table';
			};

			return Widget
		}]
	})