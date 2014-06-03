angular.module('Dashboard').
	directive('dashydash', ['DASHYDASH_SETTINGS', '$parse', 'WidgetFactory', 'DashboardOptimizeService', '$window',
	function(DASHYDASH_SETTINGS, $parse, WidgetFactory, DashboardOptimizeService, $window){
		return {
			scope: true,
			replace: true,
			require: 'dashydash',
			restrict: 'A',
			template:
				'<section class="dashydash">'
			+		'<section class="dd-board"></section>'
			+		'<section class="dd-pool"></section>'
			+ 	'</section>',
			controller: ['$scope', '$compile', 'DASHYDASH_SETTINGS', 'WIDGET_DEFAULT_DEFINITION', 'WIDGET_TEMPLATES', 'DashboardOptimizeService',
			function($scope, $compile, DASHYDASH_SETTINGS, WIDGET_DEFAULT_DEFINITION, WIDGET_TEMPLATES, DashboardOptimizeService) {

				var $local = $scope._dashydash = {}
				,	self = this
				,	dashboardDefinition = null
				,	throttleTimer;

				$local.widgets = {};
				$local.zIndex = 10;

				self.dashydash = null;
				self.options = {};


				//**************** gestion d'event ****************//

				$scope.$on('create_widget', function(scope, definition) {
					var options = {};
					_.merge(options, WIDGET_DEFAULT_DEFINITION, definition);

					WidgetFactory($scope).create(self.dashboardDefinition.id, options, function(definition) {
						self.addWidget(definition, function() { $local.serialize(); })
					})
				});

				$scope.$on('delete_widget', function(scope, options) {
					delete $local.widgets[options.id];
					self.deleteWidget(options.node);
				});

				$scope.$on('resize_widget', function(scope, options) {
					self.resizeWidget(options.node, options.size, options.callback);
				});

				//**************** dashydash management ****************//

				$local.serialize = function() {
					var currentAmountOfColumn = DashboardOptimizeService.amountOfColumn()
					if(DASHYDASH_SETTINGS.columns.xs != currentAmountOfColumn) {
						var serialization = self.dashydash.serialize();

						WidgetFactory($scope).updatePosition(self.dashboardDefinition.id, serialization, angular.noop);
					}
				}

				self.deleteWidget = function($node) {
					self.dashydash.remove_widget($node);
					$local.serialize();
				}

				self.resizeWidget = function(node, size, callback) {
					self.dashydash.resize_widget( node, size.width, size.height, function() {
						$local.serialize();
						callback && callback.call(this);
					});
				}

				self.addWidget = function(definition, callback) {
					var options = {}
					,	currentAmountOfColumn = DashboardOptimizeService.amountOfColumn();
					definition = definition || {};

					_.merge(options, WIDGET_DEFAULT_DEFINITION, definition);

					if(!$local.widgets[ options.id ])
						$local.widgets[ options.id ] = options;

					var $widget = angular.element( WIDGET_TEMPLATES[options.type] );
					$widget.attr('widget-id', options.id);

					var compiled = $compile($widget)($scope)
					,	configuration = DASHYDASH_SETTINGS.columns.xl == currentAmountOfColumn ? [compiled, options.size.width, options.size.height] : [compiled, 1, options.size.height];

					if(DASHYDASH_SETTINGS.columns.xl == self.options.col) {
						$widget.attr('dd-col', options.position.x);
						$widget.attr('dd-row', options.position.y);
						configuration.push(options.position.x, options.position.y)
					}

					self.dashydash.add_widget.apply( self.dashydash, configuration );
					callback && callback.call(this);
				}

				$scope.toString = function() {
					return '_dashydash';
				}
			}],
			link: function($scope, $node, attributes, self) {
				var $local = $scope._dashydash
				,	$board = $node.find('.dd-board')
				,	$pool = $node.find('.dd-pool')
				,	linked = false;

				$local.locked = false;

				self.options = {
					width: 0,
					col: DashboardOptimizeService.amountOfColumn()
				};

				if(!attributes.dashydash)
					throw 'dashydash property cannot be empty';

				$scope.$watch(attributes.dashydash, function(definition) {
					if(!definition.id)
						return false;

					self.dashydash.remove_all_widgets();

					self.dashboardDefinition = definition;
					if(self.dashboardDefinition.id)
						WidgetFactory($scope).getByDashboardId(self.dashboardDefinition.id, function(widgets) {
							for(var i = 0; i<widgets.length; i++)
								self.addWidget(widgets[i]);
						});
				})


				$window.onresize = _.throttle(buildDelayed, 240);

				build();

				//**************** widgets management ****************//

				function destroy() { self.dashydash && self.dashydash.destroy(true, true, false); }

				function build() {
					if($node.width() == self.options.width)
						return true;

					copyWidgetInPool();
					self.options.width = $node.width();
					self.options.col = DashboardOptimizeService.amountOfColumn();

					var width = DashboardOptimizeService.widgetWidth(self.options.width, self.options.col, DASHYDASH_SETTINGS.margin);
					destroy();

					self.dashydash = $board.dashyDash({
						draggable: { stop: $local.serialize },
						margin: [DASHYDASH_SETTINGS.margin, DASHYDASH_SETTINGS.margin],
						max_cols: self.options.col,
						dimensions: [ width, DASHYDASH_SETTINGS.height]
					});

					reloadFromPool();

					$local.locked = !( DASHYDASH_SETTINGS.columns.xl == self.options.col );

					linked && $scope.$apply();
					linked = true;
				}

				function buildDelayed() {
					window.clearTimeout(self.throttleTimer);
					self.throttleTimer = window.setTimeout(build, 500);
				}

				function copyWidgetInPool() {
					$board.find('.dd-widget').each(function() {
						var $this = angular.element(this);

						if(DASHYDASH_SETTINGS.columns.xl == self.options.col) {
							$this.attr('dd-row-saved', $this.attr('dd-row'));
							$this.attr('dd-col-saved', $this.attr('dd-col'));
						}

                		delete $this.data().coords;
						$this.appendTo($pool);
					})
				}

				function reloadFromPool() {

					$pool.find('.dd-widget').each(function() {
						var $this = angular.element(this)
						,	widgetId = $this.attr('widget-id')
						,	dashydashWidth = parseInt($this.attr('dd-width'), 10)
						,	dashydashHeight = parseInt($this.attr('dd-height'), 10)
						,	widgetWidth = $local.widgets[widgetId].size.width ? $local.widgets[widgetId].size.width : dashydashWidth
						,	parameters = [ $this, ( widgetWidth > self.options.col ? 1 : widgetWidth ), dashydashHeight ];

						if(DASHYDASH_SETTINGS.columns.xl == self.options.col) {
							$local.locked = false;
							parameters.push(
								parseInt($this.attr('dd-col-saved'), 10),
								parseInt($this.attr('dd-row-saved'), 10)
							);

							$this.removeAttr('dd-row-saved');
							$this.removeAttr('dd-col-saved');
						}
						else
							if(DASHYDASH_SETTINGS.columns.xs == self.options.col)
								$scope.$broadcast('stop_edit');

						self.dashydash.add_widget.apply(self.dashydash, parameters);
						$scope.$broadcast('widget_refresh');
					});
				}
			}
		};
	}]);