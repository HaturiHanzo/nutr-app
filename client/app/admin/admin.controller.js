(function () {
    'use strict';

    angular
        .module('nutr')
        .controller('adminCtrl', [
            '$scope',
            'User',
            '$state',
            function ($scope, User, $state) {
                $scope.logout = User.logout;
                $state.go('admin.user');
            }]);
}());