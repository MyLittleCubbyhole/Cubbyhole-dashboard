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
            name = name || '';

            contextualizeCss(true);
            elements = convertSVGs($node);
            console.log($node.height())
            html2canvas($node, {
                onrendered: function(canvas) {
                    console.log(canvas)

                    var pdf = new jsPDF('p', 'mm', 'a3');
                    console.log(pdf)
                    //taille pdf px - 794, 1122
                    var image = canvas.toDataURL("image/jpeg", 1.0);
                    contextualizeCss(false);

                    var capture = new Image();
                    capture.src = image;

                    $('body').append(capture)
                    console.log(capture.height)
                    return true;
                    var MARGIN = 10;
                    var WIDTH = 1122 - MARGIN*4;//794;
                    var HEIGHT = 794 - MARGIN*4;
                    //ratio
                    HEIGHT = (WIDTH/HEIGHT) * WIDTH;


                    // $('body').append(canvas)
                    var cropCanvas = document.createElement('canvas')


                    // console.log(capture.height, capture.height/1122)
                    // console.log('width', capture.width, 794, capture.width/784, '||', capture.height, 1122, capture.height * (784/capture.width))


                    console.log('width', capture.width, WIDTH, 'ratio: '+(capture.width/WIDTH))
                    console.log('height', capture.height, (capture.height * WIDTH) / capture.width)
                    console.log('increment', (HEIGHT * capture.height) / ( (capture.height * WIDTH) / capture.width ), HEIGHT)

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
                    height.value = currentHeight//HEIGHT;//1122;//capture.height;
                    cropCanvas.setAttributeNode(width);
                    cropCanvas.setAttributeNode(height);
                    var context = cropCanvas.getContext("2d");

                    //pillow tag
                    ////todo ajouter margin + augmenter taille
                    var logo = new Image();
                    logo.src = '/images/design/logo-big.png';
                    logo.onload = function() {
                        context.fillStyle = "#fff";
                        context.fillRect(0,0,WIDTH,HEIGHT);

                        context.drawImage(logo, (WIDTH - 230)/2 , 250, 230, 286);
                        part = cropCanvas.toDataURL("image/jpeg", 1.0);
                        pdf.addImage(part,'JPEG', 0, 0)

                        while(maxHeight > 0) {
                            context.clearRect(0, 0, WIDTH, HEIGHT);
                            context.fillStyle = "#fff";
                            context.fillRect(0,0,WIDTH,HEIGHT);


                            currentHeight = maxHeight - increment < 0 ? maxHeight : currentHeight;
                            console.log(maxHeight - increment, maxHeight, increment, currentHeight)

                            context.drawImage(capture, 0, y, capture.width, increment, 0, 0, WIDTH, HEIGHT);

                            part = cropCanvas.toDataURL("image/jpeg", 1.0);
                            pdf.addPage();
                            pdf.addImage(part,'JPEG', MARGIN/2, MARGIN/2)

                            y += currentHeight;
                            maxHeight -= increment;
                            console.log(maxHeight);
                        }
                        pdf.save('export_'+ name +'.pdf')
                    }



                    //putain de math
                    // var startHeight = HEIGHT * (784/capture.width)
                    // var fullHeight = capture.height * (784/capture.width)//capture.height;
                    // var y = 0;
                    // var h = startHeight;
                    // console.log('=>',fullHeight, h)
                    // while(fullHeight>0) {
                    //  context.clearRect(0,0, WIDTH,HEIGHT)
                    //  h = fullHeight - startHeight < 0 ? fullHeight : h;

                    //  console.log(h, fullHeight, startHeight)
                    //  context.drawImage(capture, 0, y, capture.width, h, 0, 0, 794, HEIGHT);
                    //  var t = cv.toDataURL("image/jpeg", 1.0);
                    //  // console.log()
                    //  pdf.addImage(t,'JPEG', 0, 0)
                    //  pdf.addPage();

                    //  y += h;
                    //  fullHeight -= h;
                    // }


                    //couper au fur et a mesure le canvas principal
                    //load l'image et l'ajouter via addImage
                    // capture.onLoad = function() {
                        // for(var i =0; i<2; i++) {

                            // context.drawImage(capture, 0, i*200, capture.width, 200, 0, 0, 794, 300);
                            // var t = cv.toDataURL("image/jpeg", 1.0);
                            // // console.log()
                            // pdf.addImage(t,'JPEG', 0, 0)
                            // pdf.addPage();
                        // }
                        // pdf.save('toto.pdf')
                    // }

                    // generatePDF($(canvas), name, elements);
                }
            });

        }

    })