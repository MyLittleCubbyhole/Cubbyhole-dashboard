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
	console.log(request.body);
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