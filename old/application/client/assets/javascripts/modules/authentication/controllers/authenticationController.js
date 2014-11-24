angular.module('Authentication').
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
    }])