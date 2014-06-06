module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.initConfig({

        concat: {
            options: {
                separator: ';'
            },
            libs: {
                src: [
                    "application/client/assets/javascripts/libraries/jquery/jquery.js",

                    "application/client/assets/javascripts/libraries/jquery/jquery.js",
                    "application/client/assets/javascripts/libraries/jquery/jquery-ui.js",
                    "application/client/assets/javascripts/libraries/angular/angular.js",
                    "application/client/assets/javascripts/libraries/angular/angular-route.js",
                    "application/client/assets/javascripts/libraries/lodash/lodash.js",
                    "application/client/assets/javascripts/libraries/socket.io/socket.io.js",
                    "application/client/assets/javascripts/libraries/restangular/restangular.js",
                    "application/client/assets/javascripts/libraries/select2/select2.min.js",
                    "application/client/assets/javascripts/libraries/ui-select2/ui-select2.js",
                    "application/client/assets/javascripts/libraries/highlight/highlight.pack.js",
                    "application/client/assets/javascripts/libraries/highcharts/highcharts.js",
                    "application/client/assets/javascripts/libraries/highcharts/theme.js",
                    "application/client/assets/javascripts/libraries/highmaps/highmaps.js",
                    "application/client/assets/javascripts/libraries/highmaps/world.js",
                    "application/client/assets/javascripts/libraries/highcharts-ng/highcharts-ng.js",
                    "application/client/assets/javascripts/libraries/customScrollBar/customScrollBar.js",
                    "application/client/assets/javascripts/libraries/scrollTo/scrollTo.js",
                    "application/client/assets/javascripts/libraries/annyang/annyang.js",
                    "application/client/assets/javascripts/libraries/moment/moment.js",
                    "application/client/assets/javascripts/libraries/dashydash/dependencies/draggable.js",
                    "application/client/assets/javascripts/libraries/dashydash/dependencies/coords.js",
                    "application/client/assets/javascripts/libraries/dashydash/dependencies/collision.js",
                    "application/client/assets/javascripts/libraries/dashydash/dashydash.0.0.4.js",
                    "application/client/assets/javascripts/libraries/grumpy-ui/core.js",
                    "application/client/assets/javascripts/libraries/grumpy-ui/constants/grumpyConfigConstants.js",
                    "application/client/assets/javascripts/libraries/grumpy-ui/directives/grumpyAccordionDirective.js",
                    "application/client/assets/javascripts/libraries/grumpy-ui/directives/grumpyUiDirective.js",
                    "application/client/assets/javascripts/libraries/grumpy-ui/directives/grumpyVirginDirective.js",
                    "application/client/assets/javascripts/libraries/grumpy-ui/services/grumpyPositionService.js",
                    "application/client/assets/javascripts/libraries/grumpy-ui/services/grumpyScrollingService.js"
                ],
                dest: 'application/client/assets/minified/javascripts/libraries.js'
            },
            modules_common: {
                src: [
                    "application/client/assets/javascripts/modules/config/core.js",
                    "application/client/assets/javascripts/modules/config/constants/configConstants.js",
                    "application/client/assets/javascripts/modules/tools/core.js",
                    "application/client/assets/javascripts/modules/tools/directives/focusDirective.js",
                    "application/client/assets/javascripts/modules/tools/directives/modalDirective.js",
                    "application/client/assets/javascripts/modules/tools/directives/scrollBarDirective.js",
                    "application/client/assets/javascripts/modules/tools/services/classService.js",
                    "application/client/assets/javascripts/modules/authentication/core.js",
                    "application/client/assets/javascripts/modules/authentication/controllers/authenticationController.js",
                    "application/client/assets/javascripts/modules/authentication/controllers/loginController.js",
                    "application/client/assets/javascripts/modules/authentication/factories/authenticationFactory.js",
                    "application/client/assets/javascripts/modules/authentication/factories/userFactory.js",
                    "application/client/assets/javascripts/modules/overlay/core.js",
                    "application/client/assets/javascripts/modules/overlay/controllers/overlayController.js",
                    "application/client/assets/javascripts/modules/navigation/core.js",
                    "application/client/assets/javascripts/modules/navigation/controllers/navigationController.js"
                ],
                dest: 'application/client/assets/minified/javascripts/common.js'
            },
            modules_home: {
                src: [
                    "application/client/assets/javascripts/modules/home/core.js",
                    "application/client/assets/javascripts/modules/home/controllers/homeController.js"
                ],
                dest: 'application/client/assets/minified/javascripts/home.js'
            },
            modules_dashboard: {
                src: [
                    "application/client/assets/javascripts/modules/dashboard/core.js",
                    "application/client/assets/javascripts/modules/dashboard/config/dashboardConfig.js",
                    "application/client/assets/javascripts/modules/dashboard/constants/countriesConstant.js",
                    "application/client/assets/javascripts/modules/dashboard/constants/widgetConstants.js",
                    "application/client/assets/javascripts/modules/dashboard/constants/settingsConstant.js",
                    "application/client/assets/javascripts/modules/dashboard/constants/queryBuilderConstant.js",
                    "application/client/assets/javascripts/modules/dashboard/services/dashboardOptimizeService.js",
                    "application/client/assets/javascripts/modules/dashboard/controllers/dashboardController.js",
                    "application/client/assets/javascripts/modules/dashboard/controllers/dashboardMenuController.js",
                    "application/client/assets/javascripts/modules/dashboard/controllers/exportController.js",
                    "application/client/assets/javascripts/modules/dashboard/controllers/widgetMenuController.js",
                    "application/client/assets/javascripts/modules/dashboard/controllers/widgetBackSideController.js",
                    "application/client/assets/javascripts/modules/dashboard/controllers/widgetFrontSideController.js",
                    "application/client/assets/javascripts/modules/dashboard/factories/dashboardFactory.js",
                    "application/client/assets/javascripts/modules/dashboard/factories/widgetFactory.js",
                    "application/client/assets/javascripts/modules/dashboard/directives/flipDirective.js",
                    "application/client/assets/javascripts/modules/dashboard/directives/dashboardDirective.js",
                    "application/client/assets/javascripts/modules/dashboard/directives/dashydashDirective.js",
                    "application/client/assets/javascripts/modules/dashboard/directives/ddWidgetGraphDirective.js",
                    "application/client/assets/javascripts/modules/dashboard/directives/ddWidgetSingleNumberDirective.js",
                    "application/client/assets/javascripts/modules/dashboard/directives/ddWidgetPieDirective.js",
                    "application/client/assets/javascripts/modules/dashboard/directives/ddWidgetTableDirective.js",
                    "application/client/assets/javascripts/modules/dashboard/directives/ddWidgetMapDirective.js",
                    "application/client/assets/javascripts/modules/dashboard/providers/exportProvider.js",
                    "application/client/assets/javascripts/modules/dashboard/providers/widgetProvider.js",
                    "application/client/assets/javascripts/modules/dashboard/providers/widgetGraphProvider.js",
                    "application/client/assets/javascripts/modules/dashboard/providers/widgetMapProvider.js",
                    "application/client/assets/javascripts/modules/dashboard/providers/widgetSingleNumberProvider.js",
                    "application/client/assets/javascripts/modules/dashboard/providers/widgetPieProvider.js",
                    "application/client/assets/javascripts/modules/dashboard/providers/widgetTableProvider.js"
                ],
                dest: 'application/client/assets/minified/javascripts/dashboard.js'
            }


        },

        cssmin: {
            combine: {
                files: {
                    'application/client/assets/minified/styles/style.min.css' : [
                        "application/client/assets/styles/libraries/animate/animate.css",
                        "application/client/assets/styles/libraries/dashydash.css",
                        "application/client/assets/styles/libraries/fonts/font.css",
                        "application/client/assets/styles/libraries/bootstrap/bootstrap.min.css",
                        "application/client/assets/styles/libraries/customScrollBar/customScrollBar.css",
                        "application/client/assets/styles/libraries/grumpy-ui/grumpy-ui.css",
                        "application/client/assets/styles/libraries/grumpy-ui/grumpy-accordion.css",
                        "application/client/assets/styles/libraries/modalWindowEffects/component.css",
                        "application/client/assets/styles/components/buttons.css",
                        "application/client/assets/styles/components/forms.css",
                        "application/client/assets/styles/components/header.css",
                        "application/client/assets/styles/components/modale.css",
                        "application/client/assets/styles/components/overlay.css",
                        "application/client/assets/styles/components/userCard.css",
                        "application/client/assets/styles/modules/dashboard/dashboard.css",
                        "application/client/assets/styles/modules/dashboard/dashboardExport.css",
                        "application/client/assets/styles/modules/dashboard/dashboardMenu.css",
                        "application/client/assets/styles/modules/dashboard/widget/backWidget.css",
                        "application/client/assets/styles/modules/dashboard/widget/customWidgets.css",
                        "application/client/assets/styles/modules/dashboard/widget/frontWidget.css",
                        "application/client/assets/styles/modules/dashboard/widget/widget.css",
                        "application/client/assets/styles/core.css"
                    ]
                }
            }
        }
    });


    grunt.registerTask('concatJS', [
        'concat:libs',
        'concat:modules_common',
        'concat:modules_home',
        'concat:modules_dashboard',
        'cssmin'
    ])

}