(function () {
'use strict';

var backendUserCtrl = require('../server/user');

angular
    .module('nutr')
    .controller('authCtrl', [
        '$scope',
        function ($scope) {
            $scope.authorize = function () {
                alert($scope.login);
                /**backendUserCtrl.authenticate($scope.login, $scope.password)
                    .then(function (result) {
                        alert(result);
                    });*/
            };
        }]);
}());