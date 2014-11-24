angular.module('Tools').
    service('CaptureService', function(){

        var $body = angular.element('body');

        /**
         * manage the activation of the capturing class
         * @param  {Boolean} activate 
         */
        function contextualizeCss(activate) {

            if(activate === false)
                $body.removeClass('capturing');
            else
                $body.addClass('capturing');
        }

        /**
         * convert all svgs node into canvas
         * @param  {Object} $node Angular node
         * @return {Array}       converted elements
         */
        function convertSVGs($node) {
            var SVGs = $node.find('svg')
            ,   elements = {
                toRemove : [],
                toRecover : []
            }

            SVGs.each(function(index, node) {
                var parent = node.parentNode
                ,   svg = parent.innerHTML
                ,   canvas = document.createElement('canvas');

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

        /**
         * recover the svgs elements
         * @param  {Array} elements array of svgs node
         */
        function recover(elements) {

            for(var i = 0; i<elements.toRemove.length; i++)
                elements.toRemove[i].child.remove();

            for(var i = 0; i<elements.toRecover.length; i++)
                elements.toRecover[i].parent.appendChild(elements.toRecover[i].child);

            contextualizeCss(false);
        }

		return function($node, name, callback) {
			var elements;
			name = name || '';

			contextualizeCss(true);
			elements = convertSVGs($node);

			html2canvas($node, {
				onrendered: function(canvas) {

					var pdf = new jsPDF('p', 'mm', 'a3');

					//taille pdf px - 794, 1122
					var image = canvas.toDataURL("image/jpeg", 1.0);

					var capture = new Image();
					capture.src = image;

					var MARGIN = 10;
					var WIDTH = 1122 - MARGIN*4;//794;
					var HEIGHT = 794 - MARGIN*4;
					//ratio
					HEIGHT = (WIDTH/HEIGHT) * WIDTH;

					var cropCanvas = document.createElement('canvas')

					var maxHeight = capture.height;
					var projectionMaxHeight = (capture.height * WIDTH) / capture.width;
					var increment = (HEIGHT * capture.height) / ( (capture.height * WIDTH) / capture.width );
					var projectionIncrement = HEIGHT;
					var currentHeight = increment;
					var part;
					var y = 0;


					var width = document.createAttribute("width");
					width.value = WIDTH;//794//capture.width;
					var height = document.createAttribute("height");
					height.value = currentHeight;//HEIGHT;//1122;//capture.height;
					cropCanvas.setAttributeNode(width);
					cropCanvas.setAttributeNode(height);
					var context = cropCanvas.getContext("2d");

					var canvasHeight = currentHeight;

					var logo = new Image();
					logo.src = '/images/design/logo-big.png';

					logo.onload = function() {
						context.fillStyle = "#fff";
						context.fillRect(0,0,WIDTH,canvasHeight);

						context.drawImage(logo, (WIDTH - 230)/2 , 250, 230, 286);
						part = cropCanvas.toDataURL("image/jpeg", 1.0);
						pdf.addImage(part,'JPEG', 0, 0)

						while(maxHeight > 0) {
							context.clearRect(0, 0, WIDTH, canvasHeight);
							context.fillStyle = "#fff";
							context.fillRect(0,0,WIDTH,canvasHeight);

                            currentHeight = maxHeight - increment < 0 ? maxHeight : currentHeight;

                            context.drawImage(capture, 0, y, capture.width, increment, 0, 0, WIDTH, HEIGHT);

                            part = cropCanvas.toDataURL("image/jpeg", 1.0);
                            pdf.addPage();
                            pdf.addImage(part,'JPEG', MARGIN/2, MARGIN/2)

                            y += currentHeight;
                            maxHeight -= increment;
                        }

                        pdf.save('export_'+ name +'.pdf')
                        recover(elements);
                        callback.call(this);
                    }
                }
            });

        }

    })
