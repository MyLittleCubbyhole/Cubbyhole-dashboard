angular.module('Config', []);;angular.module('Config').
    //*/
    constant('API_URL', 'http://127.0.0.1:5150/api/').
    constant('WEBSOCKET_URL', 'http://127.0.0.1:5150').
    /*/
    constant('API_URL', 'https://api.trouducube.com/api/').
    constant('WEBSOCKET_URL', 'https://api.trouducube.com').
    /*
    constant('API_URL', 'http://www.pillowrc.com/api/').
    constant('WEBSOCKET_URL', 'http://www.pillowrc.com:80').
    //*/
    constant('socketRoom', '/cubbyhole');;angular.module('Tools', ['Grumpy-ui']);;angular.module('Tools').
    directive('datePicker', [function() {
        return {
            scope: true,
            controller: function($scope) {
                var $local = $scope._datePicker = {}
                ,   self = this;

                $scope.toString = function() {
                    return '_datePicker';
                };
            },
            require: 'datePicker',
            restrict: 'A',
            link: function($scope, $node, attributes, self) {
                var $local = $scope._datePicker;

                $node.datepicker({
                    dateFormat: 'yy-mm-dd',
                    minDate: null,
                    maxDate: null,
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-10:+5",
                    prevText: '<i class="icon-chevron-left"></i>',
                    nextText: '<i class="icon-chevron-right"></i>'
                });
            }
        };
    }]);;angular.module('Tools').
    directive('ngAutoFocus', function(){
        return {
            scope: {},
            restrict: 'A',
            link: function($scope, $node) {
                $node.focus();
            }
        };
    });;angular.module('Tools').
    directive('modal', [function() {
        return {
            scope: true,
            controller: function($scope) {
                var $local = $scope._modal = {}
                ,   self = this;

                $local.close = function() {
                    $scope.Overlay.clickout();
                }

                $scope.toString = function() {
                    return '_modal';
                }
            },
            require: 'modal',
            restrict: 'A',
            link: function($scope, $node, attributes, self) {
                var $local = $scope._modal;

                $local.node = $node;
                $node.appendTo(angular.element('body'));
            }
        };
    }]);;angular.module('Tools').
    directive('scrollBar', function(){
        return {
            scope: true,
            restrict: 'A',
            link: function($scope, $node, attributes) {
                $node.mCustomScrollbar({
                    theme: attributes.theme || 'light',
                    scrollEasing:"easeOutCirc",
                    mouseWheel:"auto",
                    autoDraggerLength:true,
                    advanced:{
                        updateOnBrowserResize:true,
                        updateOnContentResize:true
                    }
                });
            }
        };
    });;angular.module('Tools').
    service('ClassService', function(){

    	/**
    	 * prototypal inheritence
    	 * @param  {Object} parent 
    	 * @param  {Object} child  
    	 */
        this.extend =   function(parent, child){
            child.prototype = new parent();
            child.constructor = child;
        }
    });;angular.module('Tools').
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
;angular.module('Tools').
    filter('numeraljs', function () {
        return function (input, format) {
            if (input == null || format == null)
                return input;
            if (format === '')
                return '';

            return numeral(input).format(format);
        };
    });;angular.module('Authentication', ['Navigation', 'Config']);;angular.module('Authentication').
    controller('AuthenticationController', ['$scope', 'UserFactory', 'API_URL', function($scope, UserFactory, API_URL){
        var $local = $scope.Authentication = {}
        ,   user = localStorage.getItem('user');

        if(!user)
            user = sessionStorage.getItem('user');

        if(user)
            user = JSON.parse(user);
        else
            user = {};

        UserFactory($scope).set(user);

        $local.stylePhoto = {};
        
        if(user.photo && user.photo != 'null')
            $local.stylePhoto = {'background-image': 'url(' + API_URL + 'download/1/userPhotos/' + user.photo + '?token=' + user.token + '&run)'};

        $local.user = user;
        $local.authenticated = false;
        $local.opened = false;

        /**
         * LISTENER - hide the profile popup when called
         */
        $scope.$on('hide', function() {
            $local.opened = false;
        });

        /**
         * open the profile popup
         */
        $local.open = function() {
            $local.opened = !$local.opened;
            $scope.Overlay.activated = true;
        };

        /**
         * call the logout method of the authenticationfactory and disconnect the current user
         */
        $local.logout = function() {
            UserFactory($scope).logout();
        };

        $scope.toString = function() {
            return 'Authentication';
        };
    }]);angular.module('Authentication').
    controller('LoginController', ['$scope', '$location', 'UserFactory', function($scope, $location, UserFactory) {
        var $local = $scope.Login = {};

        $local.isFormSubmited = false;

        $local.user = {};

        $local.rememberMe = true;

        $local.errorLogin = false;

        /**
         * called when submitting form
         * call the authenticate method from the authentication factory
         * and save the current user in the chossen storage
         * @param  {Boolean} isValid form validity
         */
        $local.authenticate = function(isValid) {
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            $local.isFormSubmited = true;
            if(isValid) {
                UserFactory($scope).login($local.user, $local.rememberMe, function(error) {
                    if(error)
                        $local.errorLogin = true;
                    else
                       $local.errorLogin = false;
                });
            }
        };

        $scope.toString = function() {
            return 'Login';
        };
    }]);;angular.module('Authentication').
    //manage all the client-server queries and add to them some params like token 
    factory('AuthenticationFactory', ['$window', '$q', function($window, $q) {
        return {
            request: function(config) {

                if(config.url.indexOf('token') == -1) {
                    config.url += config.url.indexOf('?') > -1 ? '&' : '?';

                    config.url += "token=";

                    var user = localStorage.getItem('user');
                    if(!user)
                        user = sessionStorage.getItem('user');
                    if(user)
                        config.url += JSON.parse(user).token || "";
                }

                return config || $q.when(config);
            },
            responseError: function(response) {
                if (response.status === 401) {}
                return response || $q.when(response);
            }
        };
    }]);;angular.module('Authentication').
    factory('UserFactory', ['$window', '$http', 'AuthenticationFactory', function($window, $http, AuthenticationFactory){

        var _user = {};

        return function($scope) {

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {};

            /**
             * get the current loaded user
             * @return {Object} User
             */
            prototype.get = function() {
                return _user;
            };

            /**
             * set new informations to the current user
             * @param {Object} user User
             */
            prototype.set = function(user) {
                angular.extend(_user, user);
            };

            /**
             * Authenticate the user to the web Api
             * and set the loaded user to the local storage|session storage
             * in order to use it later
             * @param  {Object}   user       User
             * @param  {Boolean}   rememberMe manage the saving container - session or local
             * @param  {Function} callback  
             */
            prototype.login = function(user, rememberMe, callback) {
                $http.post('/api/auth', user).
                success(function(data, status, headers, config) {
                    if(data && data.user && data.user.token) {
                        prototype.set(data.user);
                        if(rememberMe)
                            localStorage.setItem('user', JSON.stringify(data.user));
                        else
                            sessionStorage.setItem('user', JSON.stringify(data.user));

                        callback.call(this, null);

                        $window.location = $window.location.protocol + "//" + $window.location.host + "/dashboard?token=" + data.user.token;
                    } else {
                        callback.call(this, 'authentication failed');
                    }
                }).
                error(function(data, status, headers, config) {
                    callback.call(this, 'authentication failed');
                    console.error(data);
                });
            };

            /**
             * disconnect the user and remove him from the storages
             */
            prototype.logout = function() {
                var user = prototype.get();
                if(user.token) {
                    $http.get(AuthenticationFactory.request({ url: '/api/logout' }).url).
                    success(function(data, status, headers, config) {
                        localStorage.removeItem('user');
                        sessionStorage.removeItem('user');
                        $window.location.reload();
                    }).
                    error(function(data, status, headers, config) {
                        localStorage.removeItem('user');
                        sessionStorage.removeItem('user');
                        $window.location.reload();
                        console.error(data);
                    });
                }
            };

            return prototype;
        };
    }]);;angular.module('Overlay', []);;angular.module('Overlay').
    controller('OverlayController', ['$scope', function($scope){
        var $local = $scope.Overlay = {};

        $local.activated = false;
        $local.pusherOpen = false;

        $local.locked = false;

        /**
         * LISTNER - active the overlay when triggered
         */
        $scope.$on('enable_overlay', function() { $local.activated = true; });

        $local.clickout = function() {
            if(!$local.locked) {
                $local.activated = false;
                $local.pusherOpen = false;
                $scope.$broadcast('hide');
            }
        }

        $scope.toString = function() {
            return 'Overlay';
        }
    }]);angular.module('Navigation', []);;angular.module('Navigation').
    controller('NavigationController', ['$scope', '$window', '$location', 'UserFactory', function($scope, $window, $location, UserFactory){
        var $local = $scope.Navigation = {};

        /**
         * navigate to the selected path
         * @param  {string} path path to go
         */
        $local.goto = function(path) {
            path += (path == '/dashboard' && UserFactory($scope).get()) ? "?token=" + UserFactory($scope).get().token : "";

            $window.location = path;
        };

        /**
         * check if the pathname is the current path
         * @param  {string}  pathname path name
         */
        $local.isSelected = function(pathname) {
            return $window.location.pathname == pathname;
        }

        if($window.location.pathname == '/home' && $location.$$path.length>0)
            $local.goto('/home#' + $location.$$path.substring(1), '#bloc-container')

        $scope.toString = function() {
            return 'Navigation';
        }
    }])