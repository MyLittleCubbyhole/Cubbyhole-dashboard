var provider = require(global.paths.server + '/database/mysql/tables/dashboard')
,	dashboard = { get : {}, post : {}, put : {}, delete : {} };


/********************************[  GET   ]********************************/

dashboard.get.all = function(request, response){
	provider.get.all(function(error, data){
		response.send( (!error ? data : error ) );
		response.end();
	});
};

dashboard.get.byId = function(request, response) {
	var id = request.params.id;
	provider.get.byId(id, function(error, data){
		if(!error && data && data.length>0)
			data = data[0];
		response.send( (!error? data : error ) );
		response.end();
	});
};

/********************************[  POST   ]********************************/

dashboard.post.create = function(request, response) {
	var body = request.body
	,	witness = true
	,	dashboard = {
		title: body.title,
		icon: body.icon
	};

	for(var i in dashboard)
		witness = typeof dashboard[i] == 'undefined' ? false : witness;

	if(!witness)
		response.send({'information': 'An error has occurred - missing information', 'dashboard' : dashboard });
	else {
		provider.create.dashboard(dashboard, function(error, data) {
			dashboard.id = data && data.insertId ? data.insertId : null;
			response.send({'information': (!error ? 'dashboard created' : 'An error has occurred - ' + error), 'dashboard': dashboard });
			response.end();
		})
	}
}


/********************************[  PUT   ]********************************/

dashboard.put.update = function(request, response) {
	var body = request.body
	,	witness = true
	, 	id = request.params.id
	,	dashboard = {
		title: body.title,
		icon: body.icon
	};

	for(var i in dashboard)
		witness = typeof dashboard[i] == 'undefined' ? false : witness;

	if(!witness)
		response.send({'information': 'An error has occurred - missing information', 'dashboard' : dashboard });
	else {
		dashboard.id = id;
		provider.update.dashboard(dashboard, function(error, data) {
			response.send({'information': (!error ? 'dashboard updated' : 'An error has occurred - ' + error), 'dashboard': dashboard });
			response.end();
		})
	}
}


/********************************[  DELETE   ]********************************/

dashboard.delete.byId = function(request, response) {
	var id = request.params.id;
	provider.delete.byId(id, function(error, data){
		response.send({'information': (!error ? 'dashboard deleted' : 'An error has occurred - ' + error) });
		response.end();
	});
}

module.exports = dashboard;