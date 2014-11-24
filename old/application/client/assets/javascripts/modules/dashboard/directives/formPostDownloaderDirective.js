angular.module('Dashboard').
	directive('formPostDownloader', function() {
		return {
			scope: true,
			restrict: 'E',
			controller: ['$scope', function($scope){
				var $local = $scope._formPostDownloader = {}
				,	iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false
				,	android = navigator.userAgent.toLowerCase().match(/android/g) ? true : false;

				$local.target = iOS || android ? '_blank' : 'downloadFrame';

				$scope.$on('start_post_download', function() {
					$local.download();
				});

				$scope.toString = function() {
					return '_formPostDownloader';
				};
			}],
			template:
				'<form target={{_formPostDownloader.target}} action="{{Export.exportUrl}}" method="POST" form-post-downloader>'
			+		'<input type="text" name="config" value="">'
			+	'</form>',
			replace: true,
			link: function($scope, $node, attributes) {
				var $local = $scope._formPostDownloader
				,	template = '<iframe name="downloadFrame" id="downloadIFrame" style="display: none;" src="" />';

				/**
				 * download the targeted export thanks to the current generate form
				 */
				$local.download = function() {
					angular.element('#downloadIFrame').remove();
					angular.element('body').append(template);
					$node.submit();
				}
			}
		};
	});