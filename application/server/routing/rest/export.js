var MysqlTools = require(global.paths.server + '/database/tools/mysql/core')
,	json2csv = require('json2csv')
,	js2xmlparser = require("js2xmlparser")
,	exporter = { get : {}, post : {}, put : {}, delete : {} };


/********************************[  GET   ]********************************/

/********************************[  POST   ]********************************/

exporter.post.exportCSV = function(request, response) {
	var body = request.body
	,	params = request.params
	,	header = {}
	,	config = JSON.parse(body.config);

	if(!!config.segments && !!config.metrics && !!config.filters)
		MysqlTools.query.compare(config, function(error, data) {
			json2csv({data: data.data, fields: data.head, del: '\t'}, function(error, csv) { //pillowTAG la data renvoyée est correcte mais le csv contient uniquement les headers. La même requête pour le xml marche. Cas de test : export avec en kpi count_users, age et country, et en filtre : le 1er filtre countrycode = FR et 2ème filtre country code = BE

				header['Content-Type'] = 'text/csv';

				header['Content-Disposition'] = 'attachment; filename="export.csv"';
				header['Content-Length'] = csv.length;
				response.writeHead(200, header );
				response.write(csv);
				response.end();
			});

		});
	else {
		response.write('BAD REQUEST');
		response.end();
	}


}


exporter.post.exportXML = function(request, response) {
	var body = request.body
	,	params = request.params
	,	header = {}
	,	config = JSON.parse(body.config);

	/*var options = {"sort":{"name":"user.inscriptiondate","order":"asc"},"metrics":[{"name":"count.user","shape":"column"}],"segments":[{"name":"user.country","axis":"abs"},{"name":"user.inscriptiondate"}],"filters":[{"name": "sup0","conditions":[{"name":"count.user","operator":">","value":["0"]}],"operator":"AND"},{"name": "sup10","conditions":[{"name":"count.user","operator":">","value":["10"]}],"operator":"AND"}],"stacked":true}*/
	if(!!config.segments && !!config.metrics && !!config.filters)
		MysqlTools.query.compare(config, function(error, data) {

			var xml = js2xmlparser("export", JSON.parse(  JSON.stringify( { "row":data.data } ) ) );

			header['Content-Type'] = 'text/xml';

			header['Content-Disposition'] = 'attachment; filename="export.xml"';
			header['Content-Length'] = xml.length;
			response.writeHead(200, header );
			response.write(xml);
			response.end();

		});
	else {
		response.write('BAD REQUEST');
		response.end();
	}
}

/********************************[  PUT   ]********************************/

/********************************[  DELETE   ]********************************/

module.exports = exporter;