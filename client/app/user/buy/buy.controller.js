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
                $scope.amount = 1;
                /**
                 * Gets today-sold dishes
                 */
                $scope.getProducts = function () {
                    var currentDate = new Date(),
                        tommorowDate;
                    currentDate.setHours(0,0,0,0);
                    tommorowDate = new Date(currentDate);
                    tommorowDate.setDate(tommorowDate.getDate() + 1);
                    tommorowDate.setHours(3,0,0,0);
                    backendTransactionCtrl
                        .query({
                            where: {
                                date: {
                                    $lt: tommorowDate,
                                    $gt: currentDate
                                }
                            }
                        })
                        .then(function (products) {
                            $scope.allIncome = 0;
                            $scope.products = products;
                            return $q.all($scope.products.map(function (product) {
                                return product
                                    .getUser()
                                    .then(function (user) {
                                        if (product.type == 'buy') {
                                            $scope.allIncome -= product.price * product.amount;
                                        } else if (product.type == 'sell') {
                                            $scope.allIncome += product.price * product.amount;
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
                    if (!$scope.name || !$scope.price || !$scope.amount) {
                        alert('Заполните все поля!')
                    } else {
                        backendTransactionCtrl
                            .create({name: $scope.name, date: new Date(), type: 'buy', price: $scope.price,
                                amount: $scope.amount})
                            .then(function (result) {
                                result.setUser(User.getUser());
                                $scope.name = $scope.price = $scope.amount = '';
                                return $scope.getProducts();
                            })
                            .finally(function () {
                                $scope.$apply();
                            });
                    }
                }

                $scope.getProducts();
            }]);
}());