angular.module('Grumpy-ui').
	service('GrumpyScrolling', ['GRUMPY_IDENTIFIER', function(GRUMPY_IDENTIFIER){

		return function($scope) {

			if(!$scope)
				throw 'a scope must be defined';

			var prototype = {};

			prototype.stop = function(classToRemove) {
				classToRemove = classToRemove || '';

				$scope.removeClass(classToRemove).unbind('mousewheel');
  
			};

			prototype.start = function(classToAdd) {
				classToAdd = classToAdd || '';

				$scope.addClass('active').bind('mousewheel',function(event) {
					if( angular.element(event.target).hasClass(GRUMPY_IDENTIFIER) ) return;
					event.preventDefault();
					event.stopPropagation();
				})

			};

			return prototype;
		}
	}])