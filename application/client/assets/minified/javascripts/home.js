angular.module('CubbyHome', ['Authentication']);;angular.module('CubbyHome').
	controller('CubbyHomeController', ['$scope', '$location', function($scope, $location) {
		var $local = $scope.CubbyHome = {};

        $local.showModalRegister = false;
        $local.showModalLogin = false;
        $local.showModalConfirmation = false;

        $scope.$on('hide', function() {
            $local.showModalLogin = false;
            $local.showModalRegister = false;
            $local.showModalConfirmation = false;
        });

        $local.showRegisterModal = function() {
            $scope.Overlay.activated = true;
            $local.showModalLogin = false;
            $local.showModalRegister = true;
            $local.showModalConfirmation = false;
        }

        $local.showLoginModal = function() {
            $scope.Overlay.activated = true;
            $local.showModalRegister = false;
            $local.showModalLogin = true;
            $local.showModalConfirmation = false;
        }

        $local.showConfirmationModal = function() {
            $scope.Overlay.activated = true;
            $local.showModalRegister = false;
            $local.showModalLogin = false;
            $local.showModalConfirmation = true;
        }

        if($location.path() == '/login') {
            $local.showLoginModal();
        }

        if($location.path() == '/register') {
            $local.showRegisterModal();
        }

        if($location.path() == '/confirmation') {
            $local.showConfirmationModal();
        }

		$scope.toString = function() {
			return 'CubbyHome';
		}
	}]);