angular.module('Grumpy-ui').
	directive('grumpyVirgin', ['GrumpyPosition', function(GrumpyPosition){
		return {
			scope: true,
			template: '<section class="grumpy-ui grumpy-virgin" ng-click="_grumpyUi.closeChildren($event);" grumpy-align="{{_grumpyUi.align}}" grumpy-position="{{_grumpyUi.position}}" ng-transclude></section>',
			transclude: true,
			require: '^grumpyUi',
			priority: 2,
			restrict: 'E',
			replace: true,
			controller: function($scope) {
				var $local = $scope._grumpyVirgin = {};

				$scope.toString = function() {
					return '_grumpyVirgin';
				}
			},
			compile: function($node, attributes, transcluder) {
				return function linking($scope, $node, attributes, self){
					var $local = $scope._grumpyVirgin
					,	$localUi = $scope._grumpyUi
					,	$_model = attributes.grumpyModel
					,	$grumpyNode = $node
					,	displayStatus = false;

					var options = {};


					$scope.$on('$destroy', function() {
						$grumpyNode.remove();
					});

					self.display = function(enable) {
						enable = typeof enable == 'boolean' ? enable : !displayStatus;

						options = {
							position: 'absolute',
							left: GrumpyPosition($scope, {local: $localUi}).left($grumpyNode, self.node),
							top: GrumpyPosition($scope, {local: $localUi}).top($grumpyNode, self.node)
						}

						if(!enable)						
							$grumpyNode.css(options).removeClass('active');
						else
							$grumpyNode.css(options).addClass('active');

					}

					self.$scrollContext.append($grumpyNode);
				}
			}
		};
	}]); 

