var provider = require(global.paths.server + '/database/mysql/tables/widget')
,	MysqlTools = require(global.paths.server + '/database/tools/mysql/core')
,	widget = { get : {}, post : {}, put : {}, delete : {} };


/********************************[  GET   ]********************************/

widget.get.byDashboardId = function(request, response){
	var id = request.params.id;
	provider.get.byDashboardId(id, function(error, data){
		if(!error && data && data.length >0)
			for(var i = 0; i<data.length; i++)
				data[i] = MysqlTools.format(data[i]);
		response.send( (!error ? data : error ) );
		response.end();
	});
};

widget.get.byId = function(request, response) {
	var id = request.params.id
	,	dashboardid = request.params.dashboardid;
	provider.get.byId(id, dashboardid, function(error, data){
		if(!error && data && data.length>0)
			data = data[0];
		if(data.id)
			data = MysqlTools.format(data);
		response.send( (!error ? data : error ) );
		response.end();
	});
};

widget.get.data = function(request, response) {
	var id = request.params.id
	,	dashboardid = request.params.dashboardid;
	provider.get.data(id, dashboardid, function(error, data){
		response.send( (!error ? data : error ) );
		response.end();
	});
} 

/********************************[  POST   ]********************************/

widget.post.create = function(request, response) {
	var params = request.params
	,	body = request.body
	,	options = {
		title: body.title,
		config: body.config,
		backgroundcolor: body.backgroundcolor,
		fontcolor: body.fontcolor,
		width: body.size.width,
		height: body.size.height,
		positionx: body.position.x,
		positiony: body.position.y,
		type: body.type,
		dashboardid: params.id
	}

	provider.create.widget(options, function(error, data){
		if(!error && data)
			provider.get.byId(data.insertId, params.id, function(error, data) {
				if(!error && data && data.length>0)
					data = data[0];
				if(data.id)
					data = MysqlTools.format(data);
				response.send(!error ? data : error);
				response.end();
			})
		else {
			response.send({'information': 'An error has occurred - ' + error });
			response.end();
		}
	});
}

/********************************[  PUT   ]********************************/

widget.put.updatePosition = function(request, response) {
	var id = request.params.id
	,	body = request.body
	,	options;

	for(var i = 0; i<body.length; i++) {
		options = {
			id: body[i].id,
			x: body[i].col,
			y: body[i].row,
			width: body[i].width,
			height: body[i].height,
			dashboardid: id
		}
		provider.update.position(options, function(error, data) {
			if(!error && data)
				response.send({'information': 'Position updated' });
			else
				response.send({'information': 'An error has occurred - ' + error });
			response.end();
		})
		
	}


}

widget.put.update = function(request, response) {
	var params = request.params
	,	body = request.body
	,	options = {
		id: body.id,
		title: body.title,
		config: body.config,
		backgroundcolor: body.backgroundcolor,
		fontcolor: body.fontcolor,
		width: body.size.width,
		height: body.size.height,
		positionx: body.position.x,
		positiony: body.position.y,
		dashboardid: body.dashboardid
	}

	provider.update.widget(options,  function(error, data) {
		if(!error && data)
			response.send({'information': 'Widget saved' });
		else
			response.send({'information': 'An error has occurred - ' + error });
		response.end();
	})

}

/********************************[  DELETE   ]********************************/

widget.delete.byId = function(request, response) {
	var id = request.params.id
	,	dashboardid = request.params.dashboardid;
	provider.delete.byId(id, dashboardid, function(error, data){
		response.send({'information': (!error ? 'widget deleted' : 'An error has occurred - ' + error) });
		response.end();
	});
}


module.exports = widget;