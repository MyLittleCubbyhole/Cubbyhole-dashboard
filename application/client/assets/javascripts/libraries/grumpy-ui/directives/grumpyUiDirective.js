angular.module('Grumpy-ui').
	directive('grumpyUi', function(){
		return {
			scope: true,
			restrict: 'A',
			priority: 1,
			require: 'grumpyUi',
			controller: ['$scope', '$transclude', 'GRUMPY_SCROLL_CONTEXT', 'GRUMPY_IDENTIFIER', 'GRUMPY_OVERLAY_IDENTIFIER', 'GrumpyScrolling', '$rootScope',
			function($scope, $transclude, GRUMPY_SCROLL_CONTEXT, GRUMPY_IDENTIFIER, GRUMPY_OVERLAY_IDENTIFIER, GrumpyScrolling, $rootScope) {
				var $local = $scope._grumpyUi =	{}
				,	self = this;

				self.$scrollContext = angular.element(GRUMPY_SCROLL_CONTEXT)
				self.$overlay = angular.element('#' + GRUMPY_OVERLAY_IDENTIFIER)
				self.scrollStatus = true;
				self.stopScroll = true;

				if(self.$overlay.size() <= 0) {
					self.$overlay = angular.element('<section id="' + GRUMPY_OVERLAY_IDENTIFIER + '">');
					self.$overlay.appendTo(self.$scrollContext);

					self.$overlay.bind('click', function(event) {
						event.stopPropagation();
						event.preventDefault();
						
						$rootScope.$broadcast('grumpy-ui-hide-child');
						$local.scrolling(true);
					})
				}

				self.display = function() {}

				$local.scrolling = function(enable) {
					enable = typeof enable == 'boolean' ? enable : !self.scrollStatus;
					if(!enable) {
						self.stopScroll && GrumpyScrolling(self.$scrollContext).start();
						self.$overlay.addClass('active');
						self.scrollStatus = false;
					}
					else {
						self.$overlay.removeClass('active');
						self.stopScroll && GrumpyScrolling(self.$scrollContext).stop();
						self.scrollStatus = true;
					}
				}

				$local.closeChildren = function($event) {
					$event.stopPropagation();
					$event.preventDefault();
					self.initiator = true;
					$scope.$parent.$broadcast('grumpy-ui-hide-child');
				}

				$scope.toString = function() {
					return '_grumpyUi';
				}
			}],
			link: function($scope, $node, attributes, self) {
				var $local = $scope._grumpyUi;

				self.node = $node;
				self.initiator = false;

				$local.align = attributes.grumpyAlign || 'center';
				$local.position = attributes.grumpyPosition || 'bottom';
				self.stopScroll = attributes.grumpyStopScroll ? true : false;

				$scope.$on('$destroy', function() {
					$node.remove();
				});

				$local.close = function() {
					$local.scrolling(true);
					$scope.$parent.$broadcast('grumpy-ui-hide-child');
				}

				$scope.$on('grumpy-ui-hide-child', function() {
					!self.initiator && self.display(false);
					self.initiator = false;
				})

				$node.bind('click', function(event) {					
					event.stopPropagation();
					event.preventDefault();
					self.initiator = true;
					$local.closeChildren(event);

					self.display(true);
					$local.scrolling(false);
				});

			}
		};
	});