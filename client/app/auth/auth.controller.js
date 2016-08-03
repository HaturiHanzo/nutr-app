(function () {
'use strict';

var backendUserCtrl = require('../server/user/test.js');

angular
    .module('nutr')
    .controller('authCtrl', [
        '$scope',
        function ($scope) {
            $scope.authorize = function () {
                backendUserCtrl.authenticate($scope.login, $scope.password)
                    .then(function (result) {
                        alert(result);
                    });
            };
        }]);
}());