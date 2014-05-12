angular.module('Account', ['CubbyHole', 'highcharts-ng']);;angular.module('Account').
	config(['$locationProvider', '$routeProvider', '$httpProvider', function($location, $routeProvider, $httpProvider) {

        $routeProvider
        .when('/config', {
            templateUrl: '/templates/account/configuration',
            controller: 'ConfigurationController'
        })
        .when('/infos', {
            templateUrl: '/templates/account/information',
            controller: 'InformationsController'
        })
        .when('/timeline', {
            templateUrl: '/templates/account/timeline',
            controller: 'TimelineController'
        })
        .when('/plans', {
            templateUrl: '/templates/account/plans',
            controller: 'PlansController'
        })
        .otherwise({ redirectTo: '/config' });

		$location.html5Mode(false);

	}]);;angular.module('Account').
    controller('AccountController', ['$scope', 'DataChartFactory', 'FormatSizeService', 'UserFactory', function($scope, DataChartFactory, FormatSizeService, UserFactory) {
        var $local = $scope.Account = {};

        $local.currentPlan = {};

        $scope.$watch(UserFactory($scope).get(), function() {
            DataChartFactory($scope).getActualPlan(function(error, plan) {
                if (!error && plan) {
                    $local.currentPlan = plan;
                    $scope.$broadcast('plan_updated');
                }
            });
        });

        $scope.toString = function() {
            return 'Account';
        };
    }]);angular.module('Account').
	controller('AccoutnNavigationController', ['$scope', '$location', function($scope, $location){
		var $local = $scope.AccountNavigation = {};

		$local.goto = function(target) {
			$location.path('/' + target);
		}

		$scope.toString = function() {
			return 'AccountNavigation';
		}
	}]);angular.module('Account').
	controller('ConfigurationController', ['$scope', function($scope){
		var $local = $scope.Configuration = {};

		$scope.toString = function() {
			return 'Configuration';
		}
	}]);angular.module('Account').
    controller('InformationsController', ['$scope', 'DonutChartProvider', 'DataChartFactory', 'FormatSizeService', function($scope, DonutChart, DataChartFactory, FormatSizeService) {
        var $local = $scope.Informations = {};

        $local.charts = [];

        function updateElements() {
            $local.charts = [];

            DataChartFactory($scope).getSizeUsed(function(error, sizes) {
                var availableSize = 1
                ,   usedSpace = 0
                ,   data = null
                ,   videos = 0
                ,   images = 0
                ,   musiques = 0
                ,   documents = 0
                ,   others = 0;

                if(!error && sizes) {
                    for(var i = 0; i < sizes.length; i++) {
                        if(sizes[i]._id.indexOf("video") > -1)
                            videos += sizes[i].size;
                        else if(sizes[i]._id.indexOf("image") > -1)
                             images += sizes[i].size;
                        else if(sizes[i]._id.indexOf("audio") > -1)
                             musiques += sizes[i].size;
                        else if(sizes[i]._id.indexOf("document") > -1 || sizes[i]._id.indexOf("pdf") > -1)
                             documents += sizes[i].size;
                        else
                             others += sizes[i].size;

                        usedSpace += sizes[i].size;
                    }

                    availableSize = $scope.Account.currentPlan.storage - usedSpace;
                }

                $local.charts.push({
                    availableSize: availableSize > 1 ? FormatSizeService.format(availableSize, true) : FormatSizeService.format($scope.Account.currentPlan.storage, true),
                    textSize: 'LIBRE',
                    data: [
                        {
                            name: 'Disponible',
                            y: parseInt(availableSize, 10),
                            size: availableSize > 1 ? FormatSizeService.format(availableSize) : FormatSizeService.format($scope.Account.currentPlan.storage),
                            color: '#ffffff'
                        }
                    ],
                    title: 'STOCKAGE UTILISE',
                    subtitle: $scope.Account.currentPlan.storage ? FormatSizeService.format($scope.Account.currentPlan.storage) + ' total' : ''
                });

                if(videos)
                   $local.charts[0].data.push(
                        {
                            name: 'Vidéos',
                            y: parseInt(videos, 10),
                            size: FormatSizeService.format(videos),
                            color: '#75c8ef'
                        }
                   );
                if(images)
                   $local.charts[0].data.push(
                        {
                            name: 'Images',
                            y: parseInt(images, 10),
                            size: FormatSizeService.format(images),
                            color: '#ffcb2d'
                        }
                   );
                if(musiques)
                   $local.charts[0].data.push(
                        {
                            name: 'Musiques',
                            y: parseInt(musiques, 10),
                            size: FormatSizeService.format(musiques),
                            color: '#ff5a5a'
                        }
                   );
                if(documents)
                   $local.charts[0].data.push(
                        {
                            name: 'Documents',
                            y: parseInt(documents, 10),
                            size: FormatSizeService.format(documents),
                            color: '#52d11a'
                        }
                   );
                if(others)
                   $local.charts[0].data.push(
                        {
                            name: 'Autre',
                            y: parseInt(others, 10),
                            size: FormatSizeService.format(others),
                            color: '#B175EF'
                        }
                   );

            })

            DataChartFactory($scope).getCurrentQuota(function(error, quota) {
                var availableSize = 1;
                if(!error && quota) {
                    availableSize = $scope.Account.currentPlan.quota - quota.quotaUsed;
                }
                $local.charts.push({
                    availableSize: availableSize > 1 ? FormatSizeService.format(availableSize, true) : FormatSizeService.format($scope.Account.currentPlan.quota, true),
                    textSize: 'DISPO',
                    data: [],
                    title: 'QUOTA DE PARTAGE',
                    subtitle: $scope.Account.currentPlan.quota ? FormatSizeService.format($scope.Account.currentPlan.quota) + ' total' : ''
                });

                if(quota)
                    $local.charts[1].data.push({
                        name: 'Utilisé',
                        y: quota.quotaUsed,
                        size: FormatSizeService.format(quota.quotaUsed),
                        color: '#40a7fd'
                    })

                $local.charts[1].data.push({
                    name: 'Disponible',
                    y: availableSize,
                    size: availableSize > 1 ? FormatSizeService.format(availableSize) : FormatSizeService.format($scope.Account.currentPlan.quota),
                    color: '#ffffff'
                })
            })
        }

        if(!$scope.Account.currentPlan)
            $scope.$on('plan_updated', function() {
                updateElements();
            });
        else
            updateElements();

        $scope.toString = function() {
            return 'Informations';
        };
    }]);angular.module('Account').
	controller('TimelineController', ['$scope', 'UserFactory', function($scope, UserFactory){
		var $local = $scope.Timeline = {};

		UserFactory($scope).historic(function(data) {
			var witness = true;
			for(var i = 0; i<data.length; i++) {
				data[i].date = new Date(data[i].date);
				data[i].message = data[i].owner;
				data[i].message += data[i].owner == 'You' ? ' have ' : ' has ';
				witness = true;
				switch(data[i].action) {
					case 'delete': 
						data[i].icon = 'icon-times';
						data[i].message += 'deleted "'+ data[i].name +'"';
					break;
					case 'create':
						data[i].icon = 'icon-cloud-upload';
						data[i].message += (data[i].itemType == 'folder' ? 'created ' : 'uploaded ') + '"'+ data[i].name +'" in ' + data[i].fullPath.substring(1,data[i].fullPath.lastIndexOf('/')) + '/' ;
					break;
					case 'share':
						data[i].icon = 'icon-link';
						data[i].message += 'shared "/'+ data[i].fullPath.split('/').pop() + '" with ';
						if(data[i].targetOwner == 'You' && data[i].name != 'Public' && data[i].name == '')
							data[i].message +=  'you';
						else
							data[i].message += '"'+ data[i].name +'"';
					break;
					case 'unshare':
						data[i].icon = 'icon-link';
						data[i].message += 'stoped the sharing of "/'+ data[i].fullPath.split('/').pop() + '" with you ';
					break;
					case 'rename':
						data[i].icon = 'icon-pencil';
						data[i].message += 'renamed "'+ data[i].fullPath.split('/').pop() + '" to "'+ data[i].name +'"';
					break;
					case 'move':
						data[i].icon = 'icon-chevron-right';
						data[i].message += 'moved "'+ data[i].name + '" in '+ data[i].fullPath;
					break;
				}
			}
			$local.events = data;
		});

		$scope.toString = function() {
			return 'Timeline';
		}
	}]);angular.module('Account').
	controller('PlansController', ['$scope', function($scope){
		var $local = $scope.Plans = {};

		$scope.toString = function() {
			return 'Plans';
		}
	}]);angular.module('Account').
    provider('DonutChartProvider', function() {

        var _default = {
            options: {
                chart: {
                    type: 'pie',
                    backgroundColor: 'transparent',
                    events: {
                        load: function() {
                            setTimeout(function(){$(window).trigger('resize')}, 00);
                        }
                    }
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true,
                        startAngle: 120,
                        borderWidth: 0,
                        tooltip: {
                            pointFormat: '<b>{point.size}<b>'
                        }
                    }
                },
                legend: {
                    align: 'center',
                    enabled: true
                },
                credits: {
                    enabled: false
                }
            },
            series: [{
                name: '',
                data: null,
                size: '110%',
                innerSize: '70%'
            }],
            title: {
                text: '',
                margin: 10,
                style: {
                    'font-size': '22px',
                    'font-family': '"Open Sans", sans-serif'
                }
            },
            subtitle: {
                text: '',
                style: {
                    'font-size': '17px',
                    'font-family': '"Open Sans", sans-serif',
                    'margin-bottom': '5px'
                }
            },

            loading: false
        };

        this.$get = function() {

            var DonutChart = function(options) {

                this.opts = {};
                _.merge(this.opts, _default, options);
                this.options = this.opts.options;
                this.series = this.opts.series;
                this.title = this.opts.title;
                this.subtitle = this.opts.subtitle;
                this.loading = this.opts.loading;
                this.tooltip = this.opts.tooltip;
            };

            Object.defineProperties(DonutChart.prototype, {
                'node' : {
                    get : function() {
                        return this._node;
                    },
                    set : function(node) {
                        this._node = angular.element(node);
                    }
                }
            });

            return DonutChart;
        };
    });angular.module('Account').
    factory('DataChartFactory', ['Restangular', 'UserFactory', 'FormatSizeService', function(restangular, userFactory, FormatSizeService){

        return function($scope, context) {
            context = context || {};

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {};

            prototype.getActualPlan = function(callback) {
                restangular.one('users').one(userFactory($scope).get().id + '/plan').get().then(function(plan) {
                    var planToReturn = null;
                    if(plan && plan.id) {
                        planToReturn = {
                            id: plan.id,
                            price: plan.price,
                            name: plan.name,
                            storage: parseInt(plan.storage, 10),
                            duration: parseInt(plan.duration, 10),
                            uploadBandwidth: parseInt(plan.uploadbandwidth, 10),
                            downloadBandwidth: parseInt(plan.downloadbandwidth, 10),
                            quota: parseInt(plan.quota, 10),
                            available: plan.available,
                            dateStart: plan.datestart,
                            dateEnd: plan.dateend
                        }
                    }
                    callback.call(this, (planToReturn ? null : 'no current plan'), (planToReturn ? planToReturn : null));
                }, function(error) { callback.call(this, 'no current plan', null); console.error(error); });
            }

            prototype.getSizeUsed = function(callback) {
                restangular.one('browse').one(userFactory($scope).get().id + '/size').getList().then(function(sizes) {
                    var sizesToReturn = null;
                    if(sizes && sizes.length > 0) {
                        sizesToReturn = [];
                        for(var i = 0; i < sizes.length; i++) {
                            sizesToReturn.push({
                                _id: sizes[i]._id,
                                size: parseInt(sizes[i].size, 10)
                            });
                        }
                    }
                    callback.call(this, (sizesToReturn ? null : 'no sizes'), (sizesToReturn ? sizesToReturn : null));
                }, function(error) { callback.call(this, 'no sizes', null); console.error(error); });
            }

            prototype.getCurrentQuota = function(callback) {
                restangular.one('users').one(userFactory($scope).get().id + '/quota').get().then(function(quota) {
                    var quotaToReturn = null;
                    if(quota && quota.quotaused) {
                        quotaToReturn = {
                            day: quota.day,
                            quotaUsed: parseInt(quota.quotaused, 10)
                        }
                    }
                    callback.call(this, (quotaToReturn ? null : 'no current quota'), (quotaToReturn ? quotaToReturn : null));
                }, function(error) { callback.call(this, 'no current quota', null); console.error(error); });
            }

            return prototype;
        };
    }]);;angular.module('Account').
    directive('donutchart', ['DonutChartProvider', '$parse', '$window', function(DonutChart, $parse, $window) {
        return {
            scope: true,
            restrict: 'E',
            controller: ['$scope', function($scope){
                var $local = $scope._donutChart = {};

                $local.sizeAvailable = '';
                $local.sizeText = '';

                $local.chart = new DonutChart({});

                $scope.toString = function() {
                    return '_donutChart';
                }
            }],
            template:
                '<section>'
            +       '<highchart config="_donutChart.chart"></highchart>'
            +       '<article class="leftPanel">'
            +           '<article class="topPanel">'
            +               '<article class="chart-label-primary google-font">'
            +                   '{{_donutChart.sizeAvailable}}'
            +                   '<article class="chart-label-secondary google-font">{{_donutChart.sizeText}}</article>'
            +               '</article>'
            +           '</article>'
            +       '</article>'
            +   '</section>',
            replace: true,
            link: function($scope, $node, attributes) {
                var $local = $scope._donutChart;

                $local.sizeAvailable = attributes.sizeAvailable;
                $local.sizeText = attributes.sizeText;
                $local.chart.series[0].name = 'Taille';
                $local.chart.series[0].data = $parse(attributes.data)($scope);
                $local.chart.title.text = attributes.title;
                $local.chart.subtitle.text = attributes.subtitle;

                angular.element($window).trigger('resize');

            }
        };
    }]);;angular.module('CubbyHole', ['FileManager', 'Authentication', 'restangular', 'Breadcrumb']);
;angular.module('CubbyHole').
	config(['apiUrl', 'RestangularProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', function(apiUrl, restangular, $location, $httpProvider, $sceDelegateProvider) {

		restangular.setBaseUrl(apiUrl);
		$location.html5Mode(false);

        $httpProvider.interceptors.push('AuthenticationFactory');

        $sceDelegateProvider.resourceUrlWhitelist([
           'self',
           apiUrl + '**'
        ]);
    }]);;angular.module('CubbyHole').
	controller('CubbyHoleController', ['$scope', function($scope) {
		var $local = $scope.CubbyHole = {};


		$scope.toString = function() {
			return 'CubbyHole';
		}
	}]);