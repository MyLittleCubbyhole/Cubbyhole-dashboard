var dependencies;
var fs = require('fs');
var http = require('http');

dependencies = function(server, app) {

    require(global.paths.server + '/database/core').init();
    require(global.paths.server + '/routing/core').init(app);

}

module.exports = dependencies;