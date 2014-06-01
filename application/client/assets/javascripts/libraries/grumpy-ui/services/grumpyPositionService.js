angular.module('Grumpy-ui').
	service('GrumpyPosition', ['$window', function($window){

		return function($scope, context) {


			if(!$scope)
				throw 'a scope must be defined';

			var prototype = {}
			,	$local = context.local || {}
			,	windowSize = {
				height: angular.element($window).height(),
				width: angular.element($window).width()
			}
			,	recursive = false;

			prototype.left = function($grumpyNode, $node, position) {
				var left = 0;
				position = position || $local.position;
				$grumpyNode.removeClass('force-position-left');
				$grumpyNode.removeClass('force-position-right');

				if(position == 'top' || position == 'bottom')
					switch($local.align) {
						case 'left':
							left = $node.offset().left - 13;
						break;
						case 'center':
							left = $node.offset().left + ($node[0].offsetWidth - $grumpyNode.width())/2;
						break;
						case 'right':
							left = $node.offset().left + $node[0].offsetWidth - $grumpyNode.width();
						break;
						default:
							throw 'Grumpy-Accordion - unknow align type';
						break;
					}
				else
					switch(position) {
						case 'right':
							left = $node.offset().left + $node[0].offsetWidth + 15;
							if(left + $grumpyNode.width() > windowSize.width && !recursive) {
								recursive = true;
								left = prototype.left($grumpyNode, $node, 'left');
								$grumpyNode.addClass('force-position-left');
							}
						break;
						case 'left':
							left = $node.offset().left - $grumpyNode.width() - 1;
							if(left < 0 && !recursive) {
								recursive = true;
								left = prototype.left($grumpyNode, $node, 'right');
								$grumpyNode.addClass('force-position-right');
							}
						break;
						default :
							throw 'Grumpy-Accordion - unknow position type';
						break;
					}
				return left;
			}

			prototype.top = function($grumpyNode, $node, position) {
				var top = 0;
				position = position || $local.position;
				$grumpyNode.removeClass('force-position-bottom');
				$grumpyNode.removeClass('force-position-top');

				if(position == 'top' || position == 'bottom')
					switch(position) {
						case 'top':
							top = $node.offset().top - $grumpyNode.height() - 15;
							if(top < 0 && !recursive) {
								recursive = true;
								top = prototype.top($grumpyNode, $node, 'bottom');
								$grumpyNode.addClass('force-position-bottom');
							}
						break;
						case 'bottom':
							top = $node.offset().top + $node[0].offsetHeight + 15;
							if(top + $grumpyNode.height() > windowSize.height && !recursive) {
								recursive = true;
								top = prototype.top($grumpyNode, $node, 'top');
								$grumpyNode.addClass('force-position-top');
							}
						break;
						default :
							throw 'Grumpy-Accordion - unknow position type';
						break;
					}
				else
					switch($local.align) {
						case 'top':
							top = $node.offset().top - 6;
						break;
						case 'center':
							top = $node.offset().top + ($node[0].offsetHeight - $grumpyNode.height())/2
						break;
						case 'bottom':
							top = $node.offset().top + $node[0].offsetHeight - $grumpyNode.height();
						break;
						default:
							throw 'Grumpy-Accordion - unknow align type';
						break;
					}

				return top;
			};

			return prototype;
		}
	}])