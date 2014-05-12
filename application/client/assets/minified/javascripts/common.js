angular.module('Config', []);;angular.module('Config').
	//*/
	constant('apiUrl', 'http://127.0.0.1:5150/api/').
    constant('websocketUrl', 'http://127.0.0.1:5150').
    /*/
	constant('apiUrl', 'http://www.pillowrc.com/api/').
	constant('websocketUrl', 'http://www.pillowrc.com:80').
	//*/
	constant('socketRoom', '/cubbyhole');;angular.module('Config').
    factory('CountryFactory', function() {

        var countries = [{"name":"Afghanistan","code":"AF"},{"name":"Åland Islands","code":"AX"},{"name":"Albania","code":"AL"},{"name":"Algeria","code":"DZ"},{"name":"American Samoa","code":"AS"},{"name":"AndorrA","code":"AD"},{"name":"Angola","code":"AO"},{"name":"Anguilla","code":"AI"},{"name":"Antarctica","code":"AQ"},{"name":"Antigua and Barbuda","code":"AG"},{"name":"Argentina","code":"AR"},{"name":"Armenia","code":"AM"},{"name":"Aruba","code":"AW"},{"name":"Australia","code":"AU"},{"name":"Austria","code":"AT"},{"name":"Azerbaijan","code":"AZ"},{"name":"Bahamas","code":"BS"},{"name":"Bahrain","code":"BH"},{"name":"Bangladesh","code":"BD"},{"name":"Barbados","code":"BB"},{"name":"Belarus","code":"BY"},{"name":"Belgium","code":"BE"},{"name":"Belize","code":"BZ"},{"name":"Benin","code":"BJ"},{"name":"Bermuda","code":"BM"},{"name":"Bhutan","code":"BT"},{"name":"Bolivia","code":"BO"},{"name":"Bosnia and Herzegovina","code":"BA"},{"name":"Botswana","code":"BW"},{"name":"Bouvet Island","code":"BV"},{"name":"Brazil","code":"BR"},{"name":"British Indian Ocean Territory","code":"IO"},{"name":"Brunei Darussalam","code":"BN"},{"name":"Bulgaria","code":"BG"},{"name":"Burkina Faso","code":"BF"},{"name":"Burundi","code":"BI"},{"name":"Cambodia","code":"KH"},{"name":"Cameroon","code":"CM"},{"name":"Canada","code":"CA"},{"name":"Cape Verde","code":"CV"},{"name":"Cayman Islands","code":"KY"},{"name":"Central African Republic","code":"CF"},{"name":"Chad","code":"TD"},{"name":"Chile","code":"CL"},{"name":"China","code":"CN"},{"name":"Christmas Island","code":"CX"},{"name":"Cocos (Keeling) Islands","code":"CC"},{"name":"Colombia","code":"CO"},{"name":"Comoros","code":"KM"},{"name":"Congo","code":"CG"},{"name":"Congo, The Democratic Republic of the","code":"CD"},{"name":"Cook Islands","code":"CK"},{"name":"Costa Rica","code":"CR"},{"name":"Cote D\"Ivoire","code":"CI"},{"name":"Croatia","code":"HR"},{"name":"Cuba","code":"CU"},{"name":"Cyprus","code":"CY"},{"name":"Czech Republic","code":"CZ"},{"name":"Denmark","code":"DK"},{"name":"Djibouti","code":"DJ"},{"name":"Dominica","code":"DM"},{"name":"Dominican Republic","code":"DO"},{"name":"Ecuador","code":"EC"},{"name":"Egypt","code":"EG"},{"name":"El Salvador","code":"SV"},{"name":"Equatorial Guinea","code":"GQ"},{"name":"Eritrea","code":"ER"},{"name":"Estonia","code":"EE"},{"name":"Ethiopia","code":"ET"},{"name":"Falkland Islands (Malvinas)","code":"FK"},{"name":"Faroe Islands","code":"FO"},{"name":"Fiji","code":"FJ"},{"name":"Finland","code":"FI"},{"name":"France","code":"FR"},{"name":"French Guiana","code":"GF"},{"name":"French Polynesia","code":"PF"},{"name":"French Southern Territories","code":"TF"},{"name":"Gabon","code":"GA"},{"name":"Gambia","code":"GM"},{"name":"Georgia","code":"GE"},{"name":"Germany","code":"DE"},{"name":"Ghana","code":"GH"},{"name":"Gibraltar","code":"GI"},{"name":"Greece","code":"GR"},{"name":"Greenland","code":"GL"},{"name":"Grenada","code":"GD"},{"name":"Guadeloupe","code":"GP"},{"name":"Guam","code":"GU"},{"name":"Guatemala","code":"GT"},{"name":"Guernsey","code":"GG"},{"name":"Guinea","code":"GN"},{"name":"Guinea-Bissau","code":"GW"},{"name":"Guyana","code":"GY"},{"name":"Haiti","code":"HT"},{"name":"Heard Island and Mcdonald Islands","code":"HM"},{"name":"Holy See (Vatican City State)","code":"VA"},{"name":"Honduras","code":"HN"},{"name":"Hong Kong","code":"HK"},{"name":"Hungary","code":"HU"},{"name":"Iceland","code":"IS"},{"name":"India","code":"IN"},{"name":"Indonesia","code":"ID"},{"name":"Iran, Islamic Republic Of","code":"IR"},{"name":"Iraq","code":"IQ"},{"name":"Ireland","code":"IE"},{"name":"Isle of Man","code":"IM"},{"name":"Israel","code":"IL"},{"name":"Italy","code":"IT"},{"name":"Jamaica","code":"JM"},{"name":"Japan","code":"JP"},{"name":"Jersey","code":"JE"},{"name":"Jordan","code":"JO"},{"name":"Kazakhstan","code":"KZ"},{"name":"Kenya","code":"KE"},{"name":"Kiribati","code":"KI"},{"name":"Korea, Democratic People\"S Republic of","code":"KP"},{"name":"Korea, Republic of","code":"KR"},{"name":"Kuwait","code":"KW"},{"name":"Kyrgyzstan","code":"KG"},{"name":"Lao People\"S Democratic Republic","code":"LA"},{"name":"Latvia","code":"LV"},{"name":"Lebanon","code":"LB"},{"name":"Lesotho","code":"LS"},{"name":"Liberia","code":"LR"},{"name":"Libyan Arab Jamahiriya","code":"LY"},{"name":"Liechtenstein","code":"LI"},{"name":"Lithuania","code":"LT"},{"name":"Luxembourg","code":"LU"},{"name":"Macao","code":"MO"},{"name":"Macedonia, The Former Yugoslav Republic of","code":"MK"},{"name":"Madagascar","code":"MG"},{"name":"Malawi","code":"MW"},{"name":"Malaysia","code":"MY"},{"name":"Maldives","code":"MV"},{"name":"Mali","code":"ML"},{"name":"Malta","code":"MT"},{"name":"Marshall Islands","code":"MH"},{"name":"Martinique","code":"MQ"},{"name":"Mauritania","code":"MR"},{"name":"Mauritius","code":"MU"},{"name":"Mayotte","code":"YT"},{"name":"Mexico","code":"MX"},{"name":"Micronesia, Federated States of","code":"FM"},{"name":"Moldova, Republic of","code":"MD"},{"name":"Monaco","code":"MC"},{"name":"Mongolia","code":"MN"},{"name":"Montserrat","code":"MS"},{"name":"Morocco","code":"MA"},{"name":"Mozambique","code":"MZ"},{"name":"Myanmar","code":"MM"},{"name":"Namibia","code":"NA"},{"name":"Nauru","code":"NR"},{"name":"Nepal","code":"NP"},{"name":"Netherlands","code":"NL"},{"name":"Netherlands Antilles","code":"AN"},{"name":"New Caledonia","code":"NC"},{"name":"New Zealand","code":"NZ"},{"name":"Nicaragua","code":"NI"},{"name":"Niger","code":"NE"},{"name":"Nigeria","code":"NG"},{"name":"Niue","code":"NU"},{"name":"Norfolk Island","code":"NF"},{"name":"Northern Mariana Islands","code":"MP"},{"name":"Norway","code":"NO"},{"name":"Oman","code":"OM"},{"name":"Pakistan","code":"PK"},{"name":"Palau","code":"PW"},{"name":"Palestinian Territory, Occupied","code":"PS"},{"name":"Panama","code":"PA"},{"name":"Papua New Guinea","code":"PG"},{"name":"Paraguay","code":"PY"},{"name":"Peru","code":"PE"},{"name":"Philippines","code":"PH"},{"name":"Pitcairn","code":"PN"},{"name":"Poland","code":"PL"},{"name":"Portugal","code":"PT"},{"name":"Puerto Rico","code":"PR"},{"name":"Qatar","code":"QA"},{"name":"Reunion","code":"RE"},{"name":"Romania","code":"RO"},{"name":"Russian Federation","code":"RU"},{"name":"RWANDA","code":"RW"},{"name":"Saint Helena","code":"SH"},{"name":"Saint Kitts and Nevis","code":"KN"},{"name":"Saint Lucia","code":"LC"},{"name":"Saint Pierre and Miquelon","code":"PM"},{"name":"Saint Vincent and the Grenadines","code":"VC"},{"name":"Samoa","code":"WS"},{"name":"San Marino","code":"SM"},{"name":"Sao Tome and Principe","code":"ST"},{"name":"Saudi Arabia","code":"SA"},{"name":"Senegal","code":"SN"},{"name":"Serbia and Montenegro","code":"CS"},{"name":"Seychelles","code":"SC"},{"name":"Sierra Leone","code":"SL"},{"name":"Singapore","code":"SG"},{"name":"Slovakia","code":"SK"},{"name":"Slovenia","code":"SI"},{"name":"Solomon Islands","code":"SB"},{"name":"Somalia","code":"SO"},{"name":"South Africa","code":"ZA"},{"name":"South Georgia and the South Sandwich Islands","code":"GS"},{"name":"Spain","code":"ES"},{"name":"Sri Lanka","code":"LK"},{"name":"Sudan","code":"SD"},{"name":"Suriname","code":"SR"},{"name":"Svalbard and Jan Mayen","code":"SJ"},{"name":"Swaziland","code":"SZ"},{"name":"Sweden","code":"SE"},{"name":"Switzerland","code":"CH"},{"name":"Syrian Arab Republic","code":"SY"},{"name":"Taiwan, Province of China","code":"TW"},{"name":"Tajikistan","code":"TJ"},{"name":"Tanzania, United Republic of","code":"TZ"},{"name":"Thailand","code":"TH"},{"name":"Timor-Leste","code":"TL"},{"name":"Togo","code":"TG"},{"name":"Tokelau","code":"TK"},{"name":"Tonga","code":"TO"},{"name":"Trinidad and Tobago","code":"TT"},{"name":"Tunisia","code":"TN"},{"name":"Turkey","code":"TR"},{"name":"Turkmenistan","code":"TM"},{"name":"Turks and Caicos Islands","code":"TC"},{"name":"Tuvalu","code":"TV"},{"name":"Uganda","code":"UG"},{"name":"Ukraine","code":"UA"},{"name":"United Arab Emirates","code":"AE"},{"name":"United Kingdom","code":"GB"},{"name":"United States","code":"US"},{"name":"United States Minor Outlying Islands","code":"UM"},{"name":"Uruguay","code":"UY"},{"name":"Uzbekistan","code":"UZ"},{"name":"Vanuatu","code":"VU"},{"name":"Venezuela","code":"VE"},{"name":"Viet Nam","code":"VN"},{"name":"Virgin Islands, British","code":"VG"},{"name":"Virgin Islands, U.S.","code":"VI"},{"name":"Wallis and Futuna","code":"WF"},{"name":"Western Sahara","code":"EH"},{"name":"Yemen","code":"YE"},{"name":"Zambia","code":"ZM"},{"name":"Zimbabwe","code":"ZW"}];

        return function($scope) {

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {};

            prototype.get = function(id) {
                var results;

                id = id.toUpperCase();
                results = countries.filter(function(entry) {
                    return entry.code.toUpperCase().indexOf(id) !== -1;
                });
                return results[0];
            };

            prototype.list = function() {
                return countries;
            };

            return prototype;
        };

    });
;angular.module('Websocket', []);;angular.module('Websocket').
	factory('WebsocketFactory', ['websocketUrl', 'socketRoom', function(url, socketRoom) {

		var socketIO = {}
		,	socket;

		var init = function() {
			console.info('connection to websocket server...');
			if(typeof io != 'undefined') {
				socketIO = io.connect(url);
				socket = socketIO.socket.of(socketRoom);
				console.info('socket connected at ' + url);
			}
			else {
				console.error('io not defined - problem with webservice');
			}
		};

		return function() {
			!socket && init();
			return socket;
		};
	}]);;angular.module('Tools', []);;angular.module('Tools').
	service('ClassService', function(){
		this.extend = 	function(parent, child){
			child.prototype = new parent();
			child.constructor = child;
		}
	});;angular.module('Tools').
    service('FormatSizeService', function() {
        this.format = function(input, ceil) {
            var out = "";
            var size = parseInt(input, 10);

            if(isNaN(size)) return "";

            var unit = ["oct","Ko","Mo","Go","To"];
            var i = 0;
            while (size >= 1024) {
                i++;
                size = size/1024;
            };

            if(size == 0)
                out = 0;
            else {
                out = size.toFixed(2);
                out.slice(-1) == "0" ? out = out.slice(0, -1) : out;
                out.slice(-1) == "0" ? out = out.slice(0, -2) : out;
                if(ceil)
                    out = Math.round(parseFloat(out, 10));
            };

            out += ' ' + unit[i];

            return out;
        };

    });;angular.module('Tools').
	directive('select2', function(){
		return {
			scope: true,
			restrict: 'A',
			link: function($scope, $node, attributes) {
				$node.select2({
					width: '250px',
					minimumInputLength: 2
				})
			}
		};
	});;angular.module('Tools').
	directive('select2Tags', function(){
		return {
			scope: true,
			restrict: 'A',
			link: function($scope, $node, attributes) {
				$node.select2({
					width: '350px',
					tags: []
				})
			}
		};
	});;angular.module('Tools').
	directive('ngRightClick', function($parse) {
		return function(scope, element, attrs) {
			var fn = $parse(attrs.ngRightClick);
			element.bind('contextmenu', function(event) {
				scope.$apply(function() {
					event.preventDefault();
					fn(scope, {$event:event});
				});
			});
		};
	});;angular.module('Tools').
    directive('ngAutoFocus', function(){
        return {
            scope: {},
            restrict: 'A',
            link: function($scope, $node) {
                $node.focus();
            }
        };
    });;angular.module('Tools').
	directive('progressBar', ['$parse', function($parse){
		return {
			scope: true,
			restrict: 'E',
			replace: true,
			template: 	'<section class="progress-bar">'
					+	'<section class="value">{{_loadingBar.value | ItemSizeFilter}}</section>'
					+	'<section class="progress-bar-value"></section>'
					+	'</section>',
			link: function($scope, $node, attributes) {
				var $local = $scope._loadingBar = {};

				$local.value = $scope.FileManager.selectedItems[0].size;

				var total = $scope.Preview.totalSize
				,	percent = Math.round($local.value)*100 / Math.round(total)
				,	bgColor = attributes.bgColor || '#2c2c2c'
				,	barColor = attributes.bgColor || '#52d11a'
				,	color = attributes.color || '#474747';

				$node.css('background-color', bgColor);
				$node.find('.value').css('color', color);

				$scope.$watch('Preview.totalSize', function() {
					total = $scope.Preview.totalSize;
				})
				$scope.$watch('FileManager.selectedItems', function() {
					$local.value = $scope.FileManager.selectedItems[0].size;
					percent = Math.round($local.value)*100 / Math.round(total);
					$node.find('.progress-bar-value').css({
						'width': percent+'%',
						'background-color': barColor
					});
				})


				$scope.toString = function() {
					return '_loadingBar';
				}
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
    directive('modal', [function() {
        return {
            scope: true,
            controller: function($scope) {
                var $local = $scope._modal = {}
                ,   self = this;

                $local.close = function() {
                    $scope.Overlay.clickout();
                    if($scope.FileManager) {
                        $scope.FileManager.urlSharing = null;
                        $scope.FileManager.folderSharing = false;
                    }
                    if($scope.Register)
                        $scope.Register.showModal = false;
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
            }
        };
    }]);;angular.module('Tools').
    filter('ItemSizeFilter', ['FormatSizeService', function(FormatSizeService) {
        return function(input) {
            return FormatSizeService.format(input);
        };
    }]);;angular.module('Breadcrumb', []);;angular.module('Breadcrumb').
	controller('BreadcrumbController', ['$scope', 'ItemFactory', function($scope, ItemFactory){
		var $local = $scope.Breadcrumb = {};

		$local.path = ['/'];

		$scope.$watch('FileManager.currentPath', function() {
			$local.path = [];
			$local.path = $scope.FileManager.pathItems;
		})

		$local.load = function(index) {
			var item = $local.path[index].item;
			
			for(var i =$scope.FileManager.pathItems.length; i>index; i--)
				$scope.FileManager.pathItems.pop();

			$scope.FileManager.preview(false);
			ItemFactory($scope, {local: $scope.FileManager}).load(item);
		}

		$scope.toString = function() {
			return 'Breadcrumb';
		}
	}]);angular.module('Authentication', ['Config', 'Navigation', 'Overlay', 'ngRoute', 'Tools', 'Annyang']);;angular.module('Authentication').
	controller('AuthenticationController', ['$scope', 'UserFactory', function($scope, UserFactory) {
		var $local = $scope.Authentication = {};

		var user = localStorage.getItem('user');
		if(!user)
			user = sessionStorage.getItem('user');

		if(user)
			user = JSON.parse(user);
		else
			user = {};

		UserFactory($scope).set(user);

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
    controller('RegisterController', ['$scope', '$location', 'CountryFactory', 'UserFactory', function($scope, $location, CountryFactory, UserFactory) {
        var $local = $scope.Register = {};

        $local.isFormSubmited = false;
        $local.errorPasswordMatch = false;

        $local.user = {};

        $local.errorRegister = false;

        $local.countries = CountryFactory($scope).list();

        $local.save = function(isValid) {
            $local.isFormSubmited = true;
            if(isValid) {
                if($local.user.password === $local.user.password2) {
                    $local.errorPasswordMatch = false;
                    UserFactory($scope).createUser($local.user, function(error) {
                        if(error)
                            $local.errorRegister = true;
                        else {
                           $local.errorRegister = false;
                           $scope.CubbyHome.showLoginModal();
                        }
                    });
                } else {
                    $local.errorPasswordMatch = true;
                }
            }
        };

        $scope.toString = function() {
            return 'Registration';
        };
    }]);;angular.module('Authentication').
    factory('UserFactory', ['$window', '$http', 'apiUrl', function($window, $http, apiUrl){

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

            prototype.createUser = function(user, callback) {
                $http.post(apiUrl + 'users', user).
                success(function(data, status, headers, config) {
                    if(data && data.user && data.user.id) {
                        callback.call(this, null);
                        //$window.location = $window.location.protocol + "//" + $window.location.host + "/home#/login";
                    }
                    else
                        callback.call(this, 'registration failed');
                }).
                error(function(data, status, headers, config) {
                    callback.call(this, 'registration failed');
                    console.error(data);
                });
            };

            prototype.login = function(user, rememberMe, callback) {
                $http.post(apiUrl + 'auth', user).
                success(function(data, status, headers, config) {
                    if(data && data.user && data.user.token) {
                        prototype.set(data.user);
                        if(rememberMe)
                            localStorage.setItem('user', JSON.stringify(data.user));
                        else
                            sessionStorage.setItem('user', JSON.stringify(data.user));

                        callback.call(this, null);

                        $window.location = $window.location.protocol + "//" + $window.location.host + "/manager?token=" + data.user.token;
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
                    $http.get(apiUrl + 'logout').
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

            prototype.historic = function(callback) {
                var user = prototype.get();
                $http.get(apiUrl + 'users/'+user.id+'/historic').
                success(callback).
                error(function(data, status, headers, config) {
                    console.error(status, data);
                });
            }

            prototype.getUsedSizeStorage = function(callback) {
                var user = prototype.get();
                $http.get(apiUrl + 'browse/' + user.id + '/size').success(function(sizes) {
                    var size = 0;
                    if(sizes && sizes.length > 0)
                        for(var i = 0; i < sizes.length; i++) 
                            size += parseInt(sizes[i].size, 10);
                    callback.call(this, (size>0 ? null : 'no sizes'), size);
                }).error(function(error) { 
                    callback.call(this, 'no sizes', null);
                    console.error(error);
                });
            }


            return prototype;
        };
    }]);;angular.module('Authentication').
    factory('AuthenticationFactory', ['$window', '$q', function($window, $q) {
        return {
            request: function(config) {

                config.url += config.url.indexOf('?') > -1 ? '&' : '?';

                config.url += "token=";

                var user = localStorage.getItem('user');
                if(!user)
                    user = sessionStorage.getItem('user');
                if(user)
                    config.url += JSON.parse(user).token || "";

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
                var $local = $scope._buttonUploader;

                $node.datepicker({
                    dateFormat: 'dd/mm/yy',
                    minDate: null,
                    maxDate: new Date(),
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-70:+0",
                    prevText: '<i class="icon-chevron-left"></i>',
                    nextText: '<i class="icon-chevron-right"></i>'
                });
            }
        };
    }]);;angular.module('FileManager', ['Tools', 'Websocket', 'Authentication', 'ngClipboard', 'Annyang']);;angular.module('FileManager').
	provider('ItemProvider', function(){

		var _default = {
			name: 'unknow',
			path: '/',
			icon: '',
			category: '',
			scope: null,
			node: null,
			lastUpdate: null,
			size: '',
			owner: '',
			ownerId: '',
			shared: false,
			editMode: false,
			newItem: false,
			_id: -1
		};

		this.$get = function() {

			var Item = function(options) {

				this.options = {};
				_.extend(this.options, _default, options);
				this.name = this.options.name;
				this.path = this.options.path;
				this.category = this.options.category;
				this.icon = this.options.icon;
				this.scope = this.options.scope;
				this._node = null;
				this.node = this.options.node;
				this.lastUpdate = this.options.lastUpdate;
				this.size = this.options.size;
				this.creator = this.options.creator;
				this.ownerId = this.options.ownerId;
				this.shared = typeof this.options.shared !== 'undefined' && this.options.shared === true;
				this.editMode = typeof this.options.editMode !== 'undefined' && this.options.editMode === true;
				this.newItem = typeof this.options.newItem !== 'undefined' && this.options.newItem === true;
				this._id = this.options._id || -1;
				this.unselectable = typeof this.options.unselectable !== 'undefined' && this.options.unselectable === true;

				options && this.init();
			};

			Item.prototype.init = function() { throw 'init method must be overrided'; };
			Item.prototype.download = function() { throw 'download method must be overrided'; };
			Item.prototype.getPath = function() { throw 'getPath method must be overrided'; };
			Item.prototype.getFullPath = function() { throw 'getFullPath method must be overrided'; };

			Object.defineProperties(Item.prototype, {
				'node' : {
					get : function() {
						return this._node;
					},
					set : function(node) {
						this._node = angular.element(node);
					}
				}
			});

			return Item;
		};
	});angular.module('FileManager').
	provider('FolderProvider', function(){

		var _default = {
			name: 'unknow',
			path: '/',
			icon: '',
			category: '',
			scope: null,
			node: null,
			unselectable: false
		};

		this.$get = ['ClassService', 'ItemProvider', '$window', 'apiUrl', 'UserFactory', function(Class, Item, $window, apiUrl, userFactory) {

			var Folder = function(options) {
				var params = {};
				_.extend(params, _default, options);
				Item.call(this, params);

				this.unselectable = params.unselectable || false;
			};

			Class.extend(Item, Folder);

			Folder.prototype.init = function() {};
			Folder.prototype.download = function(dumpOnly) {
				var url = apiUrl + 'download/' + this.ownerId + this.getFullPath();
				url = AuthenticationFactory.request({ url: url }).url;

				if(!dumpOnly)
					$window.location = url;

				return url;
			};

			Folder.prototype.getPath = function() {
				var path = this.path;
				// if(this._id == '. .') {
				// 	var paths = path.split('/');
				// 	path = '';
				// 	for(var i = 0; i < paths.length - 2; i++)
				// 		path += paths[i] + '/';
				// }
				// else 
				if(this._id != '.' && this._id != '. .') {
					path += this.name + '/';
				}

				return path;
			}

			Folder.prototype.getFullPath = function() {
				return this.getPath();
			}

			Folder.prototype.toString = function() {
				return 'Folder';
			}

			return Folder
		}];
	});angular.module('FileManager').
	provider('FileProvider', function(){

		var _default = {
			name: 'unknow',
			path: '/',
			icon: '',
			category: '',
			scope: null,
			node: null
		};

		this.$get = ['ClassService', 'ItemProvider', '$window', 'apiUrl', 'UserFactory', 'AuthenticationFactory', function(Class, Item, $window, apiUrl, UserFactory, AuthenticationFactory) {

			var File = function(options) {
				var params = {};
				_.extend(params, _default, options);
				Item.call(this, params);
			};

			Class.extend(Item, File);

			File.prototype.init = function() {};
			File.prototype.download = function(dumpOnly, withoutToken) {
				var url = apiUrl + 'download/' + this.ownerId + this.getFullPath();

				if(!withoutToken)
					url = AuthenticationFactory.request({ url: url }).url;

				if(!dumpOnly)
					$window.location = url;

				return url;
			};

			File.prototype.remove = function() {
				this.node.remove();
			}

			File.prototype.getPath = function() {
				return this.path;
			}

			File.prototype.getFullPath = function() {
				return this.path + this.name;
			}

			File.prototype.toString = function() {
				return 'File';
			};

			return File
		}]
	});angular.module('FileManager').
	factory('UploaderFactory', ['WebsocketFactory', function(WebsocketFactory){

		var files = {}
		,	socket = WebsocketFactory();

		socket.on('upload_next', function(data) {
			files[data.id].context.entity.size += data['chunkSize'];
			files[data.id].data.sizeAdded += parseInt(data['chunkSize'], 10);
			files[data.id].context.$scope.$apply();
			var chunk = data['chunk'] * 524288
			,	part = files[data.id].data.slice(chunk, chunk + Math.min(524288, (files[data.id].data.size - chunk)));

			files[data.id].context.controller.fileReaders[data.id].readAsBinaryString(part);
		});


		socket.on('upload_done', function(data){
			var file = files[data.id];
			file.context.entity.size += data['chunkSize'];
			file.data.sizeAdded += parseInt(data['chunkSize'], 10);
			file.context.entity._id = data._id;
			file.context.entity.unselectable = false;
			file.context.$scope.$apply();

			delete files[data.id];
		});

		socket.on('upload_stopped', function(data){
			console.error("upload stopped - " + data.error);
			if(files[data.id].context.entity.toString() == 'File')
				files[data.id].context.entity.remove();
			else
				files[data.id].context.entity.size -= files[data.id].data.sizeAdded;

			files[data.id].context.$scope.$apply();
		});

		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	entity = context.entity || {}
			,	controller = context.controller || {};

			var prototype = {};

			prototype.add = function(id, file) {
				files[id] = { data: file, context: { $local: $local, $scope: $scope, controller: controller, entity: entity } };
			}

			return prototype;
		};
	}]);angular.module('FileManager').
	factory('FileExtensionFactory', function() {

		/**
		 * mutualisation de service
		 * les parametres de context sont placés dans le premier appel
		 * on peut ainsi attaquer un scope annexe a partir d'un appel local
		 *
		 * ex: fileExtension($scope, {local: $local, controller: self}).maMethode('parameters', {une config})
		 *
		 * @param  {$scope} scope   angular scope
		 * @param  {object} context [OPTIONAL] specification du context - peut contenir refs vers $local, $node et controller
		 */
		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};

			prototype.getExtension = function(filename) {
				var extension = (/(?:\.([^.]+))?$/).exec(filename)[1];
				extension = extension || '';
				return extension.toLowerCase();
			}

			prototype.detection = function(file) {

				file.icon = "icon-file-css";

				if(file.type == "folder") {
					file.icon = "icon-folder";
					file.category = "folder";
				}
				else {

					var extension = prototype.getExtension(file.name);

					switch(extension) {
						// ARCHIVES
						case "zip": case "zipx": case "rar": case "7z": case "apk":
						case "cab": case "sfx": case "ar": case "tar": case "bz2":
						case "tgz": case "jar":
							file.icon = "icon-file-zip";
							file.category = "archive";
						break;
						// IMAGES
						case "jpg": case "jpeg": case "tif": case "bmp": case "gif":
						case "png": case "svg": case "ico":
							file.icon = "icon-image";
							file.category = "image";
						break;
						case "psd":
							file.icon = "icon-psd";
							file.category = "psd";
						break;
						case "ai":
							file.icon = "icon-ai";
							file.category = "ai";
						break;
						// AUDIO
						case "mp3":  case "wav": case "m3u": case "m4a": case "mid": case "mpa":
						case "wma": case "flac": case "aif": case "aifc": case "aiff":
						case "aac": case "swa": case "mid": case "cda":
							file.icon = "icon-music";
							file.category = "audio";
						break;
						// VIDEOS
						case "wmv": case "avi": case "mpg": case "mpeg": case "mov":
						case "3gp": case "dat": case "flv": case "m4v": case "mp4":
						case "ogg": case "mkv": case "vob": case "divx": case "xvid":
						case "webm":
							file.icon = "icon-film";
							file.category = "video";
						break;
						// CODE
						case "js": case "html": case "htm": case "xhtml": case "css":
						case "jsp": case "php": case "java": case "xml": case "c":
						case "cpp": case "h": case "hpp": case "cs": case "xaml":
						case "py": case "asm": case "asp": case "aspx": case "lua":
						case "pl": case "ps1": case "rb": case "vbs": case "lisp":
						case "vb":
							file.icon = "icon-file-xml";
							file.category = "text";
						break;
						// JSON
						case "json":
							file.icon = "icon-file-xml";
							file.category = "json";
						break;
						// DISKS
						case "iso": case "dmg": case "img": case "cdi": case "c2d":
							file.icon = "icon-file";
							file.category = "disk image";
						break;
						// EXE
						case "exe": case "bat": case "sh":
							file.icon = "icon-cog2";
							file.category = "executable";
						break;
						// DOCS
						case "pdf":
							file.icon = "icon-file-pdf";
							file.category = "pdf";
						break;
						case "doc": case "docx": case "docm": case "dot": case "dotx":
						case "odt": case "ott":
							file.icon = "icon-file-word";
							file.category = "word";
						break;
						case "pps": case "ppt": case "pptx": case "odp": case "otp":
							file.icon = "icon-file-powerpoint";
							file.category = "presentation";
						break;
						case "xls": case "xlsx": case "csv": case "ods": case "ots":
							file.icon = "icon-file-excel";
							file.category = "calculation";
						break;
						case "txt":
							file.icon = "icon-file-text";
							file.category = "text";
						break;
						default:
							file.icon = "icon-file";
							file.category = "file";
						break;
					}


				}
			};

			return prototype;

		};
	});;angular.module('FileManager').
	factory('ItemFactory', ['FileProvider', 'FolderProvider', 'FileExtensionFactory', 'Restangular', 'UserFactory', 'AnnyangFormatService', function(File, Folder, ExtensionFactory, restangular, UserFactory, AnnyangFormatService){

		var _items = [];

		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};

			prototype.load = function(item) {

				var ownerId = typeof item == 'object' ? item.ownerId : false
				,	path = typeof item == 'object' ? item.getFullPath() : item ? item : '';
				if(typeof item == 'object' && item._id != '.') {
					if(item._id != '. .')
						$scope.FileManager.pathItems.push({
							name: item.name,
							item: item
						});
					else
						$scope.FileManager.pathItems.pop();
				}

				if(UserFactory($scope).get().id) {
					ownerId = ownerId || UserFactory($scope).get().id;


					$scope.FileManager.folderOwner = ownerId;

					var browse = restangular.one('browse').one(ownerId + '/');

					path = path || '';
					if(path.slice(-1) != '/')
						path += '/';

					if(path == '/' && (!item || (item._id != '. .' &&  item._id != '.')))
						$scope.FileManager.pathItems = new Array({
							name: 'Files',
							item: '/'
						});

					var browsePath = browse.one(path.substring(1));

					browsePath.getList().then(function(items) {
						$scope.FileManager.currentPath = path;

						_items.splice(0);
						$local.items.splice(0);
						_items = [];
						$local.items = [];

						addFileNavigation();

						var options;
						for(var i = 0; i<items.length; i++) {
							options = {
								_id : items[i]._id,
								name: items[i].name,
								path: items[i].path,
								type: items[i].type,
								ownerId: items[i].ownerId,
	                			creator: items[i].creator,
								size: items[i]._id.substring(1) == '/Shared'? '' : items[i].size,
								lastUpdate: items[i].lastUpdate,
								shared: items[i].shared
							};

							if(options._id.substring(1) == '/Shared')
								options.unselectable = true;

							prototype.add(options);
						}

					}, function(error) { console.error(error); });
				}
			}

			prototype.get = function(id) {
				return _items[id];
			}

			prototype.getAll = function() {
				return _items;
			}

			prototype.clean = function(itemId) {
				for(var i=0; i<_items.length; i++)
					if(_items[i]._id == itemId) {
						_items.splice(i, 1);
						i--;
					}

				prototype.synchronize();
			}

			prototype.createFolder = function(item) {

				var browse = restangular.one('browse').one($scope.FileManager.folderOwner + '/')
				,	path = $local.currentPath != '/' ? $local.currentPath.substring(1) : '';

				path = path.indexOf('Shared') != 0 ? path : path.slice(7);

				browse.post(path, { name: item.name }).then(function() {
					item.newItem = false;
					item._id = item.ownerId + item.path + item.name;
				}, function(error) { console.error(error); });
			}

			prototype.delete = function(item) {
				var browse = restangular.one('browse').one(item.ownerId.toString()+item.getFullPath()).remove().then(function() {
					prototype.clean(item._id);
				}, function(error) { console.error(error); });
			}

			prototype.move = function(source, target) {

				var move = restangular.one('move').one(target.ownerId.toString());

				move.post(source.getFullPath().substring(1), { path: target.getFullPath() }).then(function() {
					prototype.clean(source._id);
				}, function(error) { console.error(error); });
			}

			prototype.rename = function(fullpath, newName, callback) {

				restangular.one('browse').one(fullpath).customPUT({name: newName}).then(function() {
				}, function(error) { console.error(error); });
			}

			prototype.checkNameExists = function(name, vocalMode) {
				vocalMode = typeof vocalMode !== 'undefined' && vocalMode === true;
				var exists = false;
				for(var i = 0; i < _items.length; i++) {
					var actualName = _items[i].name;

					if(vocalMode) {
						actualName = AnnyangFormatService.baseFormat(actualName);
						name = AnnyangFormatService.baseFormat(name);
					}

					if(actualName == name) {
						exists = true;
						break;
					}
				}

				return exists;
			}

			prototype.shareFile = function(item, callback) {
				var share = restangular.one('share');

				share.one(item.ownerId + item.getFullPath()).get().then(function(result) {
					if(result && result.token)
						callback.call(this, null, result.token);
					else
						callback.call(this, 'sharing failed');
				}, function(error) {
					callback.call(this, 'sharing failed');
					console.error(error);
				});
			}

			prototype.unshareFile = function(item, callback) {
				var unshare = restangular.one('unshare');

				unshare.one(item.ownerId + item.getFullPath()).get().then(function(result) {
					if(result && result.information)
						callback.call(this, null, result.information);
					else
						callback.call(this, 'unsharing failed');
				}, function(error) {
					callback.call(this, 'unsharing failed');
					console.error(error);
				});
			}

			prototype.synchronize = function() {
				$local.items.splice(0);
				$local.items = [];

				for(var i =0; i<_items.length; i++) {
					$local.items.push(_items[i]);
				}
			}

			prototype.add = function(options, callback) {
				var item;
				ExtensionFactory($scope).detection(options);

				options.scope = $scope;
				switch(options.type) {
					case 'file':
						item = new File(options);
					break;
					case 'folder':
						item = new Folder(options);
					break;
					default:
						throw 'unknow item type';
					break;
				}
				_items.push(item);
				options.path = item.getPath();
				$local && $local.items.push(item);
				callback && callback.call(this);
				return item;
			}

			function addFileNavigation() {
				var index = $scope.FileManager.pathItems.length-1
				,	path
				,	ownerId = $scope.FileManager.folderOwner;

				path = $scope.FileManager.pathItems[index] && typeof $scope.FileManager.pathItems[index].item != 'string' ?
					$scope.FileManager.pathItems[index].item.getFullPath() :
					$scope.FileManager.pathItems[index].item;
				prototype.add({
					_id: '.',
					name: ' . ',
					path:  path,
					type: 'folder',
					owner: '',
					ownerId: ownerId,
					size: '',
					unselectable: true
				});

				if($scope.FileManager.currentPath != '/' && $scope.FileManager.currentPath != '/Shared/') {
					path = $scope.FileManager.pathItems[index-1] && typeof $scope.FileManager.pathItems[index-1].item != 'string' ?
						$scope.FileManager.pathItems[index-1].item.getFullPath() :
						$scope.FileManager.pathItems[index-1].item;
					
					if(path != '/Shared/')
						prototype.add({
							_id: '. .',
							name: '. .',
							path: path,
							type: 'folder',
							owner: '',
							ownerId: ownerId,
							size: '',
							unselectable: true
						});
				}
			}

			return prototype;
		};
	}]);;angular.module('FileManager').
    factory('SharingFactory', ['Restangular', function(restangular){

        return function($scope, context) {
            context = context || {};

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {}
            ,   $node = context.node || {}
            ,   $local = context.local || {}
            ,   entity = context.entity || {}
            ,   controller = context.controller || {};

            var prototype = {};

            prototype.getSharedUsers = function(path, callback) {
                restangular.one('users').one('shared').one(path).get().then(function(data) {
                    if(data && !data.information) {
                        var users = [];
                        for(var i = 0; i < data.length; i++)
                            users.push({
                                email: data[i].email,
                                right: data[i].right
                            })
                        callback.call(this, null, users);
                    } else
                        callback.call(this, data.information, null)
                }, function(error) {
                    callback.call(this, 'no users found', null)
                    console.error(error);
                });
            }

            prototype.checkUserExists = function(email, callback) {
                restangular.one('users').one(email).one('exists').get().then(function(data) {
                    if(data.information == 'user exists')
                        callback.call(this, null, true)
                    else
                        callback.call(this, data.information, false)
                }, function(error) {
                    callback.call(this, data.information, false)
                    console.error(error);
                });
            }

            prototype.share = function(path, target, right, callback) {
                restangular.one('share').post(path, {'target': target, 'right': right}).then(function(data) {
                    if(data.information == 'folder shared')
                        callback.call(this, null, data.params)
                    else
                        callback.call(this, data.information, null)
                }, function(error) {
                    callback.call(this, data.information, null)
                    console.error(error);
                });
            }

            prototype.unshare = function(path, target, callback) {
                restangular.one('unshare').post(path, {'target': target}).then(function(data) {
                    if(data.information == 'folder unshared')
                        callback.call(this, null, data.params)
                    else
                        callback.call(this, data.information, null)
                }, function(error) {
                    callback.call(this, data.information, null)
                    console.error(error);
                });
            }

            return prototype;
        };
    }]);angular.module('FileManager').
	controller('FileManagerController', ['$scope', 'ItemFactory', 'UserFactory', 'FileExtensionFactory', 'AnnyangService', 'AnnyangFormatService', function($scope, ItemFactory, UserFactory, ExtensionFactory, AnnyangService, AnnyangFormatService) {
		var $local = $scope.FileManager = {};

        $local.draggedItem = null;

        $local.currentPath = '/';
		$local.folderOwner = -1;
		$local.previewActivated = false;
		$local.previewItem = null;
        $local.pathItems = [];


		$local.selectedItems = [];
		$local.items = [];

        $local.urlSharing = null;
        $local.folderSharing = false;

		ItemFactory($scope, {local: $local}).load();

		$scope.$on('unselect_all', function() {
			$local.selectedItems = [];
			$scope.$broadcast('unselect');
		})

        $scope.$on('select_file', function(scope, file) {
            ExtensionFactory($scope).detection(file);
            $local.selectedItems.push(file);
            $local.previewActivated = true;
        })

        $scope.$on('hide', function() {
            $local.urlSharing = null;
            $local.folderSharing = false;
        });

		$local.createFolder = function(name, callback) {
            var options = {
                owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
                ownerId: $local.folderOwner,
                size : 0,
                type: 'folder',
                path: $local.currentPath,
                newItem: true,
                lastUpdate: new Date(),
                creator: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname
            }

            if($local.currentPath == '/Shared/')
                return true;

            options.name = name ? name : ''
            options.editMode = name ? false : true;

            if((name && !ItemFactory($scope, {local: $local}).checkNameExists(name, true)) || !name) {
                var item = ItemFactory($scope, {local: $local}).add(options, callback);

                if(name)
                    ItemFactory($scope, {local: $local}).createFolder(item);
            }
		};

		$local.delete = function(name) {
            var items = name ? [] : $local.selectedItems;
            console.log(name)
            if(name)
                for(var i = 0; i<$local.items.length; i++)
                    if(AnnyangFormatService.baseFormat($local.items[i].name) == AnnyangFormatService.baseFormat(name))
                        items.push($local.items[i]);

            for(var i = 0; i<items.length; i++)
                ItemFactory($scope, {local: $local}).delete(items[i]);

            $local.preview(false);

		}

        $local.rename = function() {
            var canceled = false;
            for(var i = 0; i < $local.selectedItems.length; i++)
                if($local.selectedItems[i].editMode) {
                    $scope.$broadcast('cancel_edit');
                    canceled = true;
                    break;
                }

            !canceled && $scope.$broadcast('rename_item');
        }

		$local.download = function() {
            if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'File')
                $local.selectedItems[0].download();
            else if($local.selectedItems.length > 0)
                $scope.$broadcast('start_post_download');
        };

        $local.refresh = function() {
            ItemFactory($scope, {local: $local}).load( $local.currentPath );
        };

        $local.preview = function(force) {
            $local.previewActivated = typeof force !== 'undefined' ? force : $local.selectedItems.length == 1;
        }

        $local.deleteItem = function(itemId) {
            $local.items.splice(itemId, 1);
        }

        $local.cancelPreview = function() {
            $local.previewActivated = false;
        }

        $local.shareItem = function() {
            if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'File') {
                ItemFactory($scope, {local: $local}).shareFile($local.selectedItems[0], function(error, token) {
                    if(!error && token) {
                        $local.urlSharing = window.location.origin + '/shared/' + token;
                        $local.selectedItems[0].shared = true;
                        $scope.$emit('enable_overlay');
                    } else
                        console.error(error);
                });
            } else if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'Folder') {
                $scope.$broadcast('enable_overlay_sharing');
                $local.folderSharing = true;
                $scope.$emit('enable_overlay');
            }
        }

        $local.unshareFile = function() {
            if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'File') {
                ItemFactory($scope, {local: $local}).unshareFile($local.selectedItems[0], function(error, information) {
                    if(!error && information) {
                        $local.selectedItems[0].shared = false;
                    } else
                        console.error(error);
                });
            }
        }

        $local.renameVocal = function(oldName, newName) {
            if(!ItemFactory($scope, {local: $local}).checkNameExists(newName, true)) {
                var item = null
                for(var i = 0; i < $local.items.length; i++)
                    if(AnnyangFormatService.baseFormat($local.items[i].name) == AnnyangFormatService.baseFormat(oldName)) {
                        item = $local.items[i];
                        break;
                    }

                if(item) {
                    ItemFactory($scope, {local: $local}).rename(item.getFullPath(), newName);
                    item.name = newName;
                }
            }
        }

        $local.downloadVocal = function(name) {
            for(var i = 0; i < $local.items.length; i++)
                if(AnnyangFormatService.baseFormat($local.items[i].name) == AnnyangFormatService.baseFormat(name))
                    $local.selectedItems.push($local.items[i]);

            $scope.$apply();

            $local.download();
        }

        AnnyangService.set('open_item', function(name) {
            $scope.$broadcast('open_folder', name);
        });

        AnnyangService.set('open_parent_item', function() {
            $scope.$broadcast('open_parent_folder');
        });
        AnnyangService.set('open_parent_item_alternative', function() {
            $scope.$broadcast('open_parent_folder');
        });
        AnnyangService.set('open_parent_item_alternative2', function() {
            $scope.$broadcast('open_parent_folder');
        });

        AnnyangService.set('download_file', function(name) {
            $local.downloadVocal(name);
        });
        AnnyangService.set('download_file_alternative', function(name) {
            $local.downloadVocal(name);
        });
        AnnyangService.set('download_file_alternative2', function(name) {
            $local.downloadVocal(name);
        });

        AnnyangService.set('preview_file', function(name) {
            $scope.$broadcast('preview_item', name, function() { $scope.$apply(); });
        });

        AnnyangService.set('create_folder', function(name) {
            $local.createFolder(name, function() { $scope.$apply(); });
        });
        AnnyangService.set('create_folder_alternative', function(name) {
            $local.createFolder(name, function() { $scope.$apply(); });
        });
        AnnyangService.set('create_folder_alternative2', function(name) {
            $local.createFolder(name, function() { $scope.$apply(); });
        });
        AnnyangService.set('create_folder_alternative3', function(name) {
            $local.createFolder(name, function() { $scope.$apply(); });
        });

        AnnyangService.set('rename_item', function(oldName, newName) {
            $local.renameVocal(oldName, newName);
        });
        AnnyangService.set('rename_item_alternative', function(oldName, newName) {
            $local.renameVocal(oldName, newName);
        });
        AnnyangService.set('rename_item_alternative2', function(oldName, newName) {
            $local.renameVocal(oldName, newName);
        });
        AnnyangService.set('rename_item_alternative3', function(oldName, newName) {
            $local.renameVocal(oldName, newName);
        });

        AnnyangService.set('delete_item', function(name) {
            $local.delete(name);
        });

        AnnyangService.set('refresh', function(name) {
            $local.refresh();
        });

		$scope.toString = function() {
			return 'FileManager';
		}
	}]);angular.module('FileManager').
    controller('PreviewController', ['$scope', 'apiUrl', 'AuthenticationFactory', 'UserFactory', 'Restangular', function($scope, apiUrl, AuthenticationFactory, UserFactory, restangular) {
        var $local = $scope.Preview = {};
        $local.totalSize = 0;

        UserFactory($scope).getUsedSizeStorage(function(error, data) {
            $local.totalSize = data;
        });
        $local.getRessourceUrl = function() {

            var url = "";

            if($scope.FileManager.selectedItems && $scope.FileManager.selectedItems[0] && $scope.FileManager.previewActivated) {
                if($scope.FileManager.selectedItems[0].token) {
                    url = apiUrl + 'download/shared/' + $scope.FileManager.selectedItems[0].token + '?run';
                }
                else {
                    url = ($scope.FileManager.selectedItems[0].category != 'text' ? $scope.FileManager.selectedItems[0].download(true) + "&run" : $scope.FileManager.selectedItems[0].download(true, true) + '?run');
                }

                if($scope.FileManager.selectedItems[0].category == 'pdf')
                    url += "&nostream";
            }

            return url;
        };

        $scope.toString = function() {
            return 'Preview';
        };
    }]);;angular.module('FileManager').
    controller('SharingController', ['$scope', 'SharingFactory', function($scope, SharingFactory) {
        var $local = $scope.Sharing = {};

        $local.usersWebservice = [];
        $local.users = [];
        $local.usersToRemove = [];
        $local.email = "";

        $scope.$on('enable_overlay_sharing', function() {
            $local.loadUsers();
        })

        $local.loadUsers = function() {
            if($scope.FileManager.selectedItems[0]) {
                SharingFactory($scope, {local: $local}).getSharedUsers($scope.FileManager.selectedItems[0]._id + '/', function(error, data) {
                    if(!error && data) {
                        _.merge($local.usersWebservice, data);
                        _.merge($local.users, data);
                    }
                })
            }
        }

        $local.addUser = function(event) {
            if(event.keyCode == 13 && $local.email !== undefined && $local.email !== '') {
                SharingFactory($scope, {local: $local}).checkUserExists($local.email, function(error, exists) {
                    if(!error && exists)
                        $local.users.push({
                            email: $local.email,
                            right: 'R'
                        })

                    $local.email = "";
                });
            }
        }

        $local.share = function() {
            if($scope.FileManager.selectedItems[0]) {
                var path = $scope.FileManager.selectedItems[0]._id + '/'
                ,   length = $local.usersToRemove.length;

                var callback = function() {
                    for(var i = 0; i < $local.users.length; i++) {
                        var updateOrCreate = true;
                        for(var j = 0; j < $local.usersWebservice.length; j++) {
                            if($local.users[i].email == $local.usersWebservice[j].email && $local.users[i].right == $local.usersWebservice[j].right)
                                updateOrCreate = false;
                        }

                        if(updateOrCreate)
                            SharingFactory($scope, {local: $local}).share(path, $local.users[i].email, $local.users[i].right, function(error, data) {
                                if(error && !data)
                                    console.error(error);
                            })
                    }
                }

                if(length>0)
                    for(var i = 0 ; i < $local.usersToRemove.length; i++) {
                        var userToRevove = $local.usersToRemove[i];
                        SharingFactory($scope, {local: $local}).unshare(path, userToRevove.email, function(error, data) {
                            if(error && !data)
                                console.error(error);
                            var index = $local.usersWebservice.indexOf(userToRevove);
                            if(index > -1)
                                $local.usersWebservice.slice(index, 1);
                            --length <= 0 && callback();
                        })
                    }
                else
                    callback();

            }
        }

        $local.remove = function(user) {
            $local.usersToRemove.push(user);
            var index = $local.users.indexOf(user);
            if(index > -1)
                $local.users.splice(index, 1);
        }

        $scope.toString = function() {
            return 'Sharing';
        };
    }]);;angular.module('FileManager').
	directive('fileUploader', ['WebsocketFactory', 'UserFactory', 'ItemFactory', 'UploaderFactory', function(WebsocketFactory, UserFactory, ItemFactory, UploaderFactory){
		return {
			scope: true,
			require: 'fileUploader',
			restrict: 'A',
			controller: function($scope) {
				var $local = $scope._fileUploader = {}
				,	self = this;

				$local.progress = '';

				self.fileReaders = {};
				self.files = {};
				self.path;

				self.noop = function(event) {
					event.preventDefault();
					event.stopPropagation();
				}

				$scope.toString = function() {
					return '_fileUploader';
				}
			},
			link: function($scope, $node, attributes, self) {
				var $local = $scope._fileUploader
				,	socket = WebsocketFactory();

				self.path = attributes.filePath;

				$node.on('dragenter', self.noop);
				$node.on('dragleave', self.noop);
				$node.on('dragover', self.noop);

				$node.on('dragstart', function(event) {
					$scope.FileManager.draggedItem = null;
					if($scope._item.item._id != '.' && $scope._item.item._id != '. .')// && $scope._item.item._id.substring(1) != '/Shared')
						$scope.FileManager.draggedItem = $scope._item.item;
				});

				$node.on('drop', function(event){


					event.originalEvent.preventDefault();

					var source = $scope.FileManager.draggedItem
					,	target = $scope._item.item;

					// if($scope._item.item._id.substring(1) == '/Shared')
						// return true;

					if(target
					&& source
					&& target.getFullPath() != source.getFullPath()
					&& target.toString('Folder')
					&& target._id != '.') {
						ItemFactory($scope, {local: $scope.FileManager}).move(source, target);
						if(target._id != '. .')
							target.size += parseInt(source.size, 10);
					}

					if(event.originalEvent.dataTransfer.files.length <= 0)
						return true;

					for(var i = 0; i<event.originalEvent.dataTransfer.files.length; i++) {
						var file = event.originalEvent.dataTransfer.files[i]
						init(file);
					}

				});

				function init(file) {
					var id = Math.random().toString().replace('0.', '');

					self.fileReaders[id] = new FileReader();
					self.files[id] = file;
					self.files[id].sizeAdded = 0;

					var newItem = self.path == $scope.FileManager.currentPath ? ItemFactory($scope, {local: $scope.FileManager}).add({
						name: self.files[id].name,
						owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
						ownerId: UserFactory($scope).get().id,
						creator: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
						size : 0,
						type: 'file',
						path: self.path,
						lastUpdate: new Date(),
						unselectable: true
					}, function() { $scope.$apply(); }) : $scope._item.item;

					UploaderFactory($scope, {local: $local, controller: self, entity: newItem}).add(id, self.files[id]);

					self.fileReaders[id].onload = function(event){
						var data = event.target.result
						socket.emit('upload', { data: data, name: self.files[id].name });

					}

					socket.emit('upload_init', {
						id: id,
						owner: UserFactory($scope).get().id,
						name : self.files[id].name,
						size : self.files[id].size,
						type: self.files[id].type,
						path: self.path,
						token: UserFactory($scope).get().token
					});
				}
			}
		};
	}]);;angular.module('FileManager').
	directive('item', ['ItemFactory', 'AnnyangFormatService', function(ItemFactory, AnnyangFormatService){
		return {
			scope: true,
			controller: function($scope) {
				var $local = $scope._item = {}
				,	self = this;

				$local.item = {};
				$local.oldName = "";
				$local.selected = false;

				$scope.$on('unselect', function() {
					$local.selected = false;
				})

				$scope.$on('preview_item', function(scope, name, callback) {
					if(name && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)) == AnnyangFormatService.baseFormat(name))
						$local.preview({ctrlKey : true});

					callback && callback.call(this);
				})

				$scope.$on('rename_item', function() {
					$local.rename();
				})

				$scope.$on('download_item', function(scope, name) {
					if(name && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat(nameOnly)) == AnnyangFormatService.baseFormat(name))
						$local.download(name);
				})

				$scope.$on('cancel_edit', function() {
					$local.cancelEdit();
				})

				$scope.$on('open_folder', function(scope, name) {
					if(name && AnnyangFormatService.baseFormat($local.item.name) == AnnyangFormatService.baseFormat(name))
						$local.open();
				});

				$scope.$on('open_parent_folder', function() {
					if($local.item._id == '. .')
						$local.open();
				});

				$local.open = function() {
					if($local.item.category != 'folder')
						$local.download()
					else {
						$scope.FileManager.preview(false);
						ItemFactory($scope, {local: $scope.FileManager}).load($local.item);
						// ItemFactory($scope, {local: $scope.FileManager}).load($local.item.getFullPath(), $local.item.ownerId);
					}
				};

				$local.rename = function() {
					if($local.selected) {
						$scope.FileManager.cancelPreview();
						$local.item.editMode = true;
						$local.oldName = $local.item.name;
					}
				};

				$local.cancelEdit = function() {
					$local.item.editMode = false;
					$local.item.name = $local.oldName;

					if($local.item.newItem)
						ItemFactory($scope, {local: $scope.FileManager}).clean(-1);
				};

				$local.validEdit = function(event) {
					var keyCode = event ? event.keyCode : -1;
					if(keyCode == 13 || keyCode == -1) {
						$local.item.editMode = false;
						var newName = $local.item.name;
						$local.item.name = $local.oldName;
						var fullpath = $local.item.ownerId.toString() + $local.item.getFullPath();
						if(newName != '' && newName.indexOf('/') == -1 && newName.indexOf('\\') == -1) {

							if(!ItemFactory($scope, {local: $scope.FileManager}).checkNameExists(newName)) {
								$local.item.name = newName;
								if(!$local.item.newItem)
									ItemFactory($scope, {local: $scope.FileManager}).rename(fullpath, newName);
								else
									ItemFactory($scope, {local: $scope.FileManager}).createFolder($local.item);
							}
							else
								$local.cancelEdit();
						} else
							$local.cancelEdit();
					}
				};

				$local.select = function($event) {
					if($local.item.unselectable === true)
						return true;

					$scope.FileManager.preview(false);

					var witness = $local.selected;
					if(!$event.ctrlKey)
						$scope.$emit('unselect_all');

					$local.selected = !witness;

					if($local.selected)
						$scope.FileManager.selectedItems.push($local.item);
					else
						for(var i = 0; i<$scope.FileManager.selectedItems.length; i++)
							if($scope.FileManager.selectedItems[i].name == $local.item.name) {
								$scope.FileManager.selectedItems.splice(i,1);
								break;
							}
				};

				$local.preview = function($event) {
					$local.select($event);
					if(!$local.item.editMode)
						$scope.FileManager.preview();
				};

				$local.download = function(name) {
					$local.item.download();
				};

				$scope.toString = function() {
					return '_item';
				};
			},
			require: 'item',
			restrict: 'A',
			link: function($scope, $node, attributes, self) {
				var $local = $scope._item;
				self.itemId = attributes.itemId;
				$local.item = ItemFactory($scope).get(attributes.itemId);
				$local.item.node = $node;

			}
		};
	}]);;angular.module('FileManager').
	directive('buttonUploader', ['WebsocketFactory', 'UserFactory', 'UploaderFactory', 'ItemFactory', function(WebsocketFactory, UserFactory, UploaderFactory, ItemFactory) {
		return {
			scope: true,
			controller: function($scope) {
				var $local = $scope._buttonUploader = {}
				,	self = this;

				self.path;
				self.fileReaders = {};
				self.files = {};

				$scope.$on('upload_file', function() {
					$local.selectFile();
				});

				$local.selectFile = function() {
					self.$template.click();
				}

				$scope.toString = function() {
					return '_buttonUploader';
				}
			},
			require: 'buttonUploader',
			restrict: 'A',
			link: function($scope, $node, attributes, self) {
				var $local = $scope._buttonUploader
				,	socket = WebsocketFactory();

				self.$template = $node.parent().find('[type=file]');

				self.$template[0].addEventListener('change', function(event){
					var id = (Math.random() + '').replace('0.', '')
					,	nbPathPart = $scope.FileManager.pathItems.length;
					self.path = $scope.FileManager.currentPath;
					self.files[id] = event.target.files[0];
					self.files[id].sizeAdded = 0;
					self.fileReaders[id] = new FileReader();
					console.log(self.path)
					if(self.path.substring(1) == '/Shared')
						return true;
					var newItem = ItemFactory($scope, {local: $scope.FileManager}).add({
						name: self.files[id].name,
						owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
						ownerId: $scope.FileManager.folderOwner,
						creator: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
						size : 0,
						type: 'file',
						path: self.path,
						lastUpdate: new Date(),
						unselectable: true
					}, function() { $scope.$apply(); })

					UploaderFactory($scope, {local: $local, controller: self, entity: newItem}).add(id, self.files[id]);

					self.fileReaders[id].onload = function(event){

						var data = event.target.result
						socket.emit('upload', { data: data, name: self.files[id].name });
					}

					socket.emit('upload_init', {
						id: id,
						owner: $scope.FileManager.folderOwner, 
						name: self.files[id].name,
						size: self.files[id].size,
						type: self.files[id].type,
						path: self.path,
						token: UserFactory($scope).get().token
					});
				});
			}
		};
	}]);;angular.module('FileManager').
    directive('highlight', function(){
        return {
            scope: true,
            restrict: 'A',
            require: 'highlight',
            controller: function($scope) {

            },
            link: function($scope, $node, attributes, self) {
                hljs.highlightBlock($node.children()[0]);
            }
        };
    });;angular.module('FileManager').
	directive('formPostDownloader', function() {
		return {
			scope: true,
			restrict: 'E',
			controller: ['$scope', 'apiUrl', 'UserFactory', function($scope, apiUrl, UserFactory){
				var $local = $scope._formPostDownloader = {}
				,	iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false
				,	android = navigator.userAgent.toLowerCase().match(/android/g) ? true : false;

				$local.url = apiUrl + 'download/' +UserFactory($scope).get().id+ '/?token=' + UserFactory($scope).get().token;
				$local.target = iOS || android ? '_blank' : 'downloadFrame';

				$scope.$on('start_post_download', function() {
					$local.download();
				})

				$scope.toString = function() {
					return '_formPostDownloader';
				}
			}],
			template:
				'<form target={{_formPostDownloader.target}} action="{{_formPostDownloader.url}}" method="POST" form-post-downloader >'
			+		'<input type="text" name={{index}} value={{item.getFullPath()}} ng-repeat="(index, item) in FileManager.selectedItems">'
			+	'</form>',
			replace: true,
			link: function($scope, $node, attributes) {
				var $local = $scope._formPostDownloader
				,	template = '<iframe name="downloadFrame" id="downloadIFrame" style="display: none;" src="" />';

				$local.download = function() {
					angular.element('#downloadIFrame').remove();
					angular.element('body').append(template);
					$node.submit();
				}
			}
		};
	});;angular.module('Navigation', []);;angular.module('Navigation').
	controller('NavigationController', ['$scope', '$window', '$location', 'UserFactory', function($scope, $window, $location, UserFactory){
		var $local = $scope.Navigation = {};

		$local.goto = function(path) {

			path += (path == '/manager' && UserFactory($scope).get()) ? "?token=" + UserFactory($scope).get().token : "";

			$window.location = path;
		};

		$local.isSelected = function(pathname, anchor) {
			return $location.$$path == anchor && $window.location.pathname == pathname;
		}

		$scope.toString = function() {
			return 'Navigation';
		}
	}]);angular.module('Overlay', []);;angular.module('Overlay').
	controller('OverlayController', ['$scope', function($scope){
		var $local = $scope.Overlay = {};

		$local.activated = false;

		$scope.$on('enable_overlay', function() { $local.activated = true; });

		$local.clickout = function() {
			$local.activated = false;
			$scope.$broadcast('hide');
		}

		$scope.toString = function() {
			return 'Overlay';
		}
	}]);angular.module('Annyang', []);;angular.module('Annyang').
    config(function() {

    	if(annyang)
        	annyang.setLanguage('fr-FR');

    });;angular.module('Annyang').
    controller('AnnyangController', ['$scope', 'AnnyangService', function($scope, AnnyangService) {
        var $local = $scope.Annyang = {};

        $local.started = false;

        $local.activated = false;

        $local.startStop = function() {
            if($local.started)
                AnnyangService.stop();
            else
                AnnyangService.start();

            $local.started = !$local.started;
        };

        $scope.toString = function() {
            return 'Annyang';
        };
    }]);;angular.module('Annyang').
    factory('ConfigFactory', function() {

        return {
            'open_item': 'ouvrir (le) (dossier) *term',
            'open_parent_item': 'ouvrir le dossier parent',
            'open_parent_item_alternative': 'précédent',
            'open_parent_item_alternative2': 'revenir en arrière',

            'download_file': 'télécharger (le) (dossier) (fichier) *term',
            'download_file_alternative': 'téléchargé (le) (dossier) (fichier) *term',
            'download_file_alternative2': 'téléchargez (le) (dossier) (fichier) *term',

            'preview_file': 'prévisualiser (le) (dossier) (fichier) *term',
            'preview_file_alternative': 'prévisualisé (le) (dossier) (fichier) *term',
            'preview_file_alternative2': 'prévisualisez (le) (dossier) (fichier) *term',
            'preview_file_alternative3': 'aperçu *term',

            'create_folder': 'créer (le) (un) (dossier) *term',
            'create_folder_alternative': 'creer (le) (un) (dossier) *term',
            'create_folder_alternative2': 'cree (le) (un) (dossier) *term',
            'create_folder_alternative3': 'créez (le) (un) (dossier) *term',
            'delete_item': 'supprimer (le) (dossier) (fichier) *term',
            'rename_item': 'renommer (le) (dossier) (fichier) *term en *term',
            'rename_item_alternative': 'éditer (le) (dossier) (fichier) *term en *term',
            'rename_item_alternative2': 'édité (le) (dossier) (fichier) *term en *term',
            'rename_item_alternative3': 'éditez (le) (dossier) (fichier) *term en *term',

            'refresh': 'rafraîchir'
        }
    });;angular.module('Annyang').
    service('AnnyangService', ['ConfigFactory', function(ConfigFactory){

        var commands = {}
        ,   prototype = {};

        prototype.set = function(commandName, callback) {
            commands[ConfigFactory[commandName]] = callback;
        };

        prototype.submitCommands = function() {
            if(annyang) {
                annyang.removeAll();
                annyang.debug();
                annyang.addCommands(commands);
            }
        };

        prototype.start = function() {
            prototype.submitCommands();
            if(annyang)
                annyang.start();
        };

        prototype.stop = function() {
            if(annyang)
                annyang.abort();
        };

        return prototype;
    }]);;angular.module('Annyang').
	service('AnnyangFormatService', function(){

        var prototype = {};

        prototype.base = function(string) {
            return string.toLowerCase();
        };

        prototype.purals = function(string) {
        	if(string.slice(-1) == 's')
        		string = string.slice(0, -1);
        	return string;
        }

        prototype.accents = function(string) {
            return prototype.base(string)
            .replace(/\s/g,"")
            .replace(/[àáâãäå]/g,"a")
            .replace(/æ/g,"ae")
            .replace(/ç/g,"c")
            .replace(/[èéêë]/g,"e")
            .replace(/[ìíîï]/g,"i")
            .replace(/ñ/g,"n")
            .replace(/[òóôõö]/g,"o")
            .replace(/œ/g,"oe")
            .replace(/[ùúûü]/g,"u")
            .replace(/[ýÿ]/g,"y");
        }

        prototype.baseFormat = function(string) {
            return prototype.accents(prototype.purals(prototype.base(string)));
        }

        prototype.removeExtension = function(string) {

            var itemName = string.split(".");
            var extension = '';
            if(itemName.length !== 1 && (itemName[0] !== "" || itemName.length !== 2) )
                extension = itemName.pop();

            return nameOnly = itemName.join('.');
        }

        prototype.email = function(string) {

        }

        return prototype;
    });