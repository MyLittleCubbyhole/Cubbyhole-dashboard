angular.module('Home').
	controller('HomeController', ['$scope', '$location', function($scope, $location) {
		var $local = $scope.Home = {};

        $local.showModalLogin = false;

        $scope.$on('hide', function() {
            $local.showModalLogin = false;
        });

        $local.showLoginModal = function() {
            $scope.Overlay.activated = true;
            $local.showModalRegister = false;
            $local.showModalLogin = true;
            $local.showModalConfirmation = false;
        }

        if($location.path() == '/login') {
            $local.showLoginModal();
        }

		$scope.toString = function() {
			return 'Home';
		}
	}])