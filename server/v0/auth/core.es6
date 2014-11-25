/*Parent class cloning*/

	var Module = require('kanto-patterns').module.clone(__dirname);

/*Attributes definitions*/

	Module._name = 'AUTH';
	Module._routing = true;

module.exports = Module;