(function () {
    'use strict';

    var backendDishCtrl = require('../server/models/dish'),
        backendUserCtrl = require('../server/models/user');

    angular
        .module('nutr')
        .controller('userCtrl', [
            '$state',
            '$scope',
            'User',
            'Tables',
            function ($state, $scope, User, Tables) {
                Tables.generateTables();
                $scope.logout = User.logout;
                $state.go('user.sell');
            }]);
}());