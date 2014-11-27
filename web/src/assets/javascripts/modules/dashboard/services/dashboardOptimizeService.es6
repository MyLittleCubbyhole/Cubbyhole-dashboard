angular.module('Dashboard').
    service('DashboardOptimizeService', ['DASHYDASH_SETTINGS', '$window', function(DASHYDASH_SETTINGS, $window){

        /**
         * get the widget width from the window width
         * @param  {Object} widthContainer angular node
         * @param  {integer} nbCols         mac amount of column
         * @return {float}                widget width
         */
        this.widgetWidth = function(widthContainer, nbCols) {
            return (widthContainer / nbCols) - DASHYDASH_SETTINGS.margin * 2;
        };

        /**
         * get the current displayable amount of color
         * @return {integer} amount of column
         */
        this.amountOfColumn = function() {
            var width = angular.element($window).width()
            ,   amount = DASHYDASH_SETTINGS.columns.xl;

            if(width <= 1100)
                amount = DASHYDASH_SETTINGS.columns.xs;
            else
                if(width <= 1124)
                    amount = DASHYDASH_SETTINGS.columns.sm;
                else
                    if(width <= 1466)
                        amount = DASHYDASH_SETTINGS.columns.l;

            return amount;
        };

    }]);