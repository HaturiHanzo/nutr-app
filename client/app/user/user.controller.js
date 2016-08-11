(function () {
    'use strict';

    var backendDishCtrl = require('../server/models/dish');

    angular
        .module('nutr')
        .controller('userCtrl', [
            '$http',
            '$scope',
            function ($http, $scope) {
                $scope.getDishes = function () {
                    backendDishCtrl
                        .query()
                        .then(function (dishes) {
                            $scope.dishes = [];
                            dishes.forEach(function (elem) {
                                $scope.dishes.push({name: elem.name, price: elem.price})
                            })
                            console.log($scope.dishes);
                        }, function (error) {
                            alert(error);
                        })
                        .finally(function () {
                            $scope.$apply()
                        })
                }

                $scope.getDishes();
            }]);
}());