/**
 * Admin users controller
 *
 * @namespace Controllers
 */

/**
 * User object description
 *
 * @typedef {Object} User
 * @property {String} login
 * @property {String} fullName
 * @property {('admin'|'user')} role
 * @property {String} password
 */

(function () {
'use strict';

var backendIngredientCtrl = require('../server/models/ingredient'),
    backendStockCtrl = require('../server/models/stock');

angular
    .module('nutr')
    .controller('adminStockCtrl', [
        '$scope',
        '$q',
        function ($scope, $q) {

            /**
             * Gets all ingredients
             */
            $scope.getIngredients = function () {
                backendIngredientCtrl
                    .query()
                    .then(function (ingredients) {
                        $scope.ingredients = ingredients;
                    }, function (error) {
                        alert(error);
                    })
                    .finally(function () {
                        $scope.$apply();
                    });
            };

            /**
             * Watches select changing and updates ingredient's measurement
             */
            $scope.changedIngredient = function () {
                $scope.ingredient
                    .getMeasurement()
                    .then(function (measurement) {
                        $scope.ingredientMeasurement = measurement.name;
                    })
                    .finally(function () {
                        $scope.$apply();
                    });
            }

            /**
             * Removes product from stock
             * @param {Number} id - product id
             */
            $scope.removeProduct = function (id) {
                backendStockCtrl
                    .remove(id)
                    .then(function () {
                        return $scope.getFromStock();
                    }, function (error) {
                        alert(error);
                    })
                    .finally(function () {
                        $scope.$apply();
                    });
            }

            /**
             * Adds ingredient to stock
             */
            $scope.addToStock = function () {
                    var ifContains = $scope.products.some(function (product) {
                        if (product.ingredient.id === $scope.ingredient.id) {
                            product.amount += $scope.amount;
                            $scope.ingredient = $scope.amount = '';
                            return product.save();
                        }
                        return false;
                    })
                    if (!ifContains) {
                        return backendStockCtrl
                            .create({amount: $scope.amount})
                            .then(function (instance) {
                                instance.setIngredient($scope.ingredient);
                                $scope.ingredient = $scope.amount = '';
                                return $scope.getFromStock();
                            }, function (error) {
                                alert(error);
                            })
                            .finally(function () {
                                $scope.$apply();
                            });
                    }
            }

            /**
             * Gets all ingredients from stock
             */
            $scope.getFromStock = function () {
                backendStockCtrl
                    .query()
                    .then(function (products) {
                        $scope.products = products;
                        return $q.all($scope.products.map(function (product) {
                            return product.getIngredient()
                                .then(function (ingredient) {
                                    product.ingredient = ingredient;
                                    product.ingredientName = ingredient.name;
                                });
                        }));
                    }, function (error) {
                        alert(error);
                    })
                    .finally(function () {
                        $scope.$apply();
                    });
            };

            $scope.getFromStock();
            $scope.getIngredients();
        }
    ]);
}());