angular.module('Tools').
	service('ClassService', function(){
		this.extend = 	function(parent, child){
			child.prototype = new parent();
			child.constructor = child;
		}
	});