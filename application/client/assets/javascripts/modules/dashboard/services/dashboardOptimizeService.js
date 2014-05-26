angular.module('Dashboard').
	service('DashboardOptimizeService', ['DASHYDASH_SETTINGS', '$window', function(DASHYDASH_SETTINGS, $window){
	
		this.widgetWidth = function(widthContainer, nbCols) {
			return (widthContainer / nbCols) - DASHYDASH_SETTINGS.margin * 2;
		}

		this.amountOfColumn = function() {
			var width = angular.element($window).width()
			,	amount = DASHYDASH_SETTINGS.columns.xl;
			
			if(width <= 868)
				amount = DASHYDASH_SETTINGS.columns.xs;			
			else
				if(width <= 1124)
					amount = DASHYDASH_SETTINGS.columns.sm;
				else
					if(width <= 1466)
						amount = DASHYDASH_SETTINGS.columns.l;
			
			return amount;
		}

	}])