/*Parent class cloning*/

	var Service = require('kanto-patterns').service.clone();

/*Services requiring*/

	var QueryBuilder = require(__dirname + '/../../queryBuilder/services/widget'),
		json2csv = require('json2csv'),
		js2xmlparser = require('js2xmlparser');

/*Attributes definitions*/

	Service._name = 'Export';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Service.export.CSV = exportCSV;
	Service.export.XML = exportXML;

module.exports = Service;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function exportCSV(config) {
		return new Promise((resolve, reject) => {
			QueryBuilder.compare(config)
				.then((comparedData) => {
					json2csv({data: comparedData.data, fields: comparedData.head, del: '\t'}, function(error, csv) {
						if(error)
							reject(error);
						else
							resolve(csv);
					});
				});
		});
	}

	function exportXML(config) {
		return QueryBuilder.compare(config)
				.then((comparedData) => js2xmlparser('export', JSON.parse(JSON.stringify({'row': comparedData.data}))));
	}