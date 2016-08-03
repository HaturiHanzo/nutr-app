(function () {
'use strict';

var backendUserCtrl = require('../server/models/user'),
    DbCtrl = require('../server/database/createDb.js');

angular
    .module('nutr')
    .controller('authCtrl', [
        '$scope',
        function ($scope) {
            $scope.authorize = function () {
                backendUserCtrl.authenticate($scope.login, $scope.password);
            };

            $scope.createDb = function () {
                DbCtrl();
            };
        }]);
}());