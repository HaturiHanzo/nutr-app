(function () {
    'use strict';

    var backendTransactionCtrl = require('../server/models/transaction'),
        backendStockCtrl = require('../server/models/stock'),
        backendIngredientCtrl = require('../server/models/ingredient');

    angular
        .module('nutr')
        .controller('userBuyCtrl', [
            '$scope',
            'User',
            '$q',
            function ($scope, User, $q) {
                /**
                 * Gets today-sold dishes
                 */
                $scope.getProducts = function () {
                    backendTransactionCtrl
                        .query()
                        .then(function (products) {
                            $scope.allIncome = 0;
                            $scope.products = [];
                            var currentDate = new Date(),
                                productDate;
                            currentDate.setHours(0,0,0,0);
                            $scope.products = products.filter(function (product) {
                                productDate = new Date(product.date);
                                return productDate.setHours(0,0,0,0).valueOf() === currentDate.valueOf();

                            });
                            return $q.all($scope.products.map(function (product) {
                                return product
                                    .getUser()
                                    .then(function (user) {
                                        if (product.type == 'buy') {
                                            $scope.allIncome -= product.cost;
                                        } else if (product.type == 'sell') {
                                            $scope.allIncome += product.cost;
                                        }
                                        product.userName = user.fullName;
                                    });
                            }));
                        }, function (err) {
                            alert(err);
                        })
                        .finally(function () {
                            $scope.$apply();
                        })
                };

                /**
                 * Adds nonexistent product. Records only in transaction table
                 */
                $scope.addProduct = function () {
                    backendTransactionCtrl
                        .create({name: $scope.name, date: new Date(), type: 'buy', cost: $scope.cost})
                        .then(function (result) {
                            result.setUser(User.getUser());
                            $scope.name = $scope.cost = '';
                            return $scope.getProducts();
                        })
                        .finally(function () {
                            $scope.$apply();
                        });
                }

                $scope.getProducts();
            }]);
}());