/*Parent class cloning*/

	var Controller = require('kanto-patterns').controller.clone();

/*Services requiring*/

	var ExportService = require(__dirname + '/../services/export');

/*Attributes definitions*/

	Controller._name = 'Export';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Controller.post.exportCSV = exportCSV;
	Controller.post.exportXML = exportXML;

module.exports = Controller;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function exportCSV(request, response) {
		var body = request.body,
		    header = {},
		    config = JSON.parse(body.config);

		Controller.isDefined({ 'segments': config.segments, 'metrics': config.metrics, 'filters': config.filters })
			.then(() => ExportService.export.CSV(config))
			.then((csv) => {
				header['Content-Type'] = 'text/csv';
				header['Content-Disposition'] = 'attachment; filename="export.csv"';
				header['Content-Length'] = csv.length;
				response.writeHead(200, header);
				response.write(csv);
				response.end();
			})
			.catch(() => response.write('BAD REQUEST').end());
	}

	function exportXML(request, response) {
		var body = request.body,
		    header = {},
		    config = JSON.parse(body.config);

		Controller.isDefined({ 'segments': config.segments, 'metrics': config.metrics, 'filters': config.filters })
			.then(() => ExportService.export.XML(config))
			.then((xml) => {
				header['Content-Type'] = 'text/xml';
				header['Content-Disposition'] = 'attachment; filename="export.xml"';
				header['Content-Length'] = xml.length;
				response.writeHead(200, header);
				response.write(xml);
				response.end();
			})
			.catch(() => response.write('BAD REQUEST').end());
	}