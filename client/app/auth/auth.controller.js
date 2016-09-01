/**
 * Authorization controller
 *
 * @namespace Controllers
 */
(function () {
'use strict';

var backendUserCtrl = require('../server/models/user');

angular
    .module('nutr')
    .controller('authCtrl', [
        '$scope', '$state',
        function ($scope, $state) {
            $scope.DB = require('../server/database/createDb.js')
            $scope.authorize = function () {
                backendUserCtrl.authenticate($scope.login, $scope.password)
                    .then(function (result) {
                        if (result == 'admin') {
                            $state.go('admin')
                        } else {
                            $state.go('user');
                        }
                    })
                    .fail(function (err) {
                        alert(err);
                    });
            };
        }]);
}());