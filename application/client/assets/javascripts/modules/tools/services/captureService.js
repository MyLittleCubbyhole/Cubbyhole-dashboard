angular.module('Tools').
	service('CaptureService', function(){

		var $body = angular.element('body');
		function contextualizeCss(activate) {

			if(activate === false)
				$body.removeClass('capturing');
			else
				$body.addClass('capturing');
		}

		function convertSVGs($node) {
			var SVGs = $node.find('svg')
			,	elements = {
				toRemove : [],
				toRecover : []
			}

			SVGs.each(function(index, node) {
				var parent = node.parentNode
				,	svg = parent.innerHTML
				,	canvas = document.createElement('canvas');

				canvg(canvas, svg);

				elements.toRecover.push({
					parent: parent,
					child: node
				});
				parent.removeChild(node);

				elements.toRemove.push({
					parent: parent,
					child: canvas
				});

				parent.appendChild(canvas);

			})

			return elements;

		}

		function generatePDF($node, name, elements) {

			var pdf = new jsPDF();
				pdf.addHTML($node, function() {

				pdf.save(name);
				for(var i = 0; i<elements.toRemove.length; i++)
					elements.toRemove[i].child.remove();

				for(var i = 0; i<elements.toRecover.length; i++)
					elements.toRecover[i].parent.appendChild(elements.toRecover[i].child);

				contextualizeCss(false);
			});
		}

		return function($node, name) {
			var elements;
			name = name || 'download.pdf';

			contextualizeCss(true);
			elements = convertSVGs($node);
			generatePDF($node, name, elements);

		}

	})