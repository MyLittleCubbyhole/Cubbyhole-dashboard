angular.module('Config', []);;angular.module('Config').
	//*/
	constant('API_URL', 'http://127.0.0.1:5150/api/').
    constant('WEBSOCKET_URL', 'http://127.0.0.1:5150').
    /*/
	constant('API_URL', 'https://api.trouducube.com/api/').
	constant('WEBSOCKET_URL', 'https://api.trouducube.com').
    //*/
	constant('socketRoom', '/cubbyhole');;angular.module('Tools', ['Grumpy-ui']);;angular.module('Tools').
    directive('ngAutoFocus', function(){
        return {
            scope: {},
            restrict: 'A',
            link: function($scope, $node) {
                $node.focus();
            }
        };
    });;angular.module('Tools').
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
		this.extend = 	function(parent, child){
			child.prototype = new parent();
			child.constructor = child;
		}
	});;angular.module('Authentication', ['Navigation', 'Config']);;angular.module('Authentication').
	controller('AuthenticationController', ['$scope', 'UserFactory', 'API_URL', function($scope, UserFactory, API_URL){
		var $local = $scope.Authentication = {};

        var user = localStorage.getItem('user');
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

        $scope.$on('hide', function() {
            $local.opened = false;
        });

        $local.open = function() {
            $local.opened = !$local.opened;
            $scope.Overlay.activated = true;
        };

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
    directive('userCard', [function(){
        return {
            scope: true,
            replace: false,
            require: 'userCard',
            restrict: 'A',
            controller: ['$scope', '$attrs', function($scope, $attrs) {
                var $local = $scope._userCard = {}
                ,   self = this;

                $scope.toString = function() {
                    return '_userCard';
                }
            }],
            link: function($scope, $node, attributes, self) {
                var $local = $scope._userCard;

                $node.appendTo(angular.element('body'));
            }
        };
    }]);;angular.module('Authentication').
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
                if (response.status === 401) {
                    //$window.location = $window.location.protocol + "//" + $window.location.host + "/authentication#/login";
                }
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

            prototype.get = function() {
                return _user;
            };

            prototype.set = function(user) {
                angular.extend(_user, user);
            };

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

		$scope.$on('enable_overlay', function() { $local.activated = true; });

		$local.clickout = function() {
			$local.activated = false;
			$local.pusherOpen = false;
			$scope.$broadcast('hide');
		}

		$scope.toString = function() {
			return 'Overlay';
		}
	}]);angular.module('Navigation', []);;angular.module('Navigation').
	controller('NavigationController', ['$scope', '$window', '$location', 'UserFactory', function($scope, $window, $location, UserFactory){
		var $local = $scope.Navigation = {};

		$local.goto = function(path) {
			path += (path == '/dashboard' && UserFactory($scope).get()) ? "?token=" + UserFactory($scope).get().token : "";

			$window.location = path;
		};

		$local.isSelected = function(pathname) {
			return $window.location.pathname == pathname;
		}

		if($window.location.pathname == '/home' && $location.$$path.length>0)
			$local.goto('/home#' + $location.$$path.substring(1), '#bloc-container')

		$scope.toString = function() {
			return 'Navigation';
		}
	}])