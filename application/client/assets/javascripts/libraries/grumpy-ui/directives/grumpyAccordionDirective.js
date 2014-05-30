angular.module('Grumpy-ui').
	directive('grumpyAccordion', ['GrumpyPosition', '$parse', function(GrumpyPosition, $parse){

		return {
			scope: true,
			require: 'grumpyUi',
			priority: 2,
			restrict: 'A',
			transclude: true,
			template:	'<section class="grumpy-ui grumpy-accordion" grumpy-align="{{_grumpyUi.align}}" grumpy-position="{{_grumpyUi.position}}">'
			+				'<section class="grumpy-search-box">'
			+					'<article class="grumpy-search-box-container">'
			+						'<span class="grumpy-input-label"><input type="text" ng-model="grumpySearch"></span>'
			+					'</article>'
			+				'</section>'
			+				'<section class="grumpy-list-box">'
			+					'<section class="grumpy-list-box-container">'
			+						'<ul>'
			+							'<li ng-repeat="label_1 in _grumpyAccordion.labels" ng-class="{open: label_1.visible || grumpySearch}">'
			+								'<article class="grumpy-label" ng-click="_grumpyAccordion.select(label_1)">{{label_1.name}}</article>'
			+								'<ul class="grumpy-label-content" ng-if="label_1.content">'
			+									'<li ng-repeat="label_2 in label_1.content | filter: grumpySearch" ng-class="{open: label_2.visible || grumpySearch}">'
			+										'<article class="grumpy-label" ng-click="_grumpyAccordion.select(label_2)" >{{label_2.name}}</article>'
			+										'<ul class="grumpy-label-content" ng-if="label_2.content">'
			+											'<li ng-repeat="label_3 in label_2.content | filter: grumpySearch" ng-click="_grumpyAccordion.open(label_3)">'
			+												'<article class="grumpy-label">{{label_3.name}}</article>'
			+											'</li>'
			+										'</ul>'
			+									'</li>'
			+								'</ul>'
			+							'</li>'
			+						'</ul>'
			+					'</section>'
			+				'</section>'
			+			'</section>',
			controller: function($scope) {
				var $local = $scope._grumpyAccordion = {};


				$scope.toString = function() {
					return '_grumpyAccordion';
				}
			},
			compile: function($node, attributes, transcluder) {
				return function linking($scope, $node, attributes, self){
					var $local = $scope._grumpyAccordion
					,	$localUi = $scope._grumpyUi
					,	$grumpyNode = $node.children().first()
					,	$_model = attributes.grumpyModel || '$parent.selected'
					,	displayStatus = false;

					$local.select = function(label) {
						label.visible = !label.visible
						if(label.selectable)
							$parse($_model).assign($scope, label);
					}

					$local.labels = [];
 					$scope.$watchCollection(attributes.grumpyAccordion, function(labels) {
 						$local.labels = labels;
 					})

					transcluder($scope, function(transcluded) { $node.append(transcluded); })

					var options = {}

					self.display = function(enable) {
						enable = typeof enable == 'boolean' ? enable : !displayStatus;

						options = {
							position: 'absolute',
							left: GrumpyPosition($scope, {local: $localUi}).left($grumpyNode, $node),
							top: GrumpyPosition($scope, {local: $localUi}).top($grumpyNode, $node)
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