/**
 * Authorization controller
 *
 * @namespace Controllers
 */
(function () {
'use strict';

angular
    .module('nutr')
    .controller('authCtrl', [
        '$scope', '$state', 'User',
        function ($scope, $state, User) {
            $scope.DB = require('../server/database/createDb.js');
            $scope.authorize = function () {
                User.authorize($scope.login, $scope.password)
                    .catch(function (error) {
                        alert(error)
                    });
            }
        }]);
}());