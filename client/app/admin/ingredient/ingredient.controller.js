/**
 * Admin ingredient controller
 *
 * @namespace Controllers
 */
(function () {
    'use strict';

    var backendIngredientCtrl = require('../server/models/ingredient'),
        backendMeasurementCtrl = require('../server/models/measurement');

    angular
        .module('nutr')
        .controller('adminIngredientCtrl', [
            '$http',
            '$scope',
            '$q',
            function ($http, $scope, $q) {
                /**
                 * Adds a new ingredient
                 */
                $scope.addIngredient = function () {
                    return backendIngredientCtrl
                        .create($scope.editedIngredient)
                        .then(function (ingredient) {
                            console.log(ingredient);
                            $scope.clearEditIngredient();
                            return $scope.getIngredients();
                        }, function (error) {
                            alert(error);
                        })
                        .finally(function () {
                            $scope.$apply();
                        });
                };

                /**
                 * Clears edited ingredient
                 */
                $scope.clearEditIngredient = function () {
                    $scope.editedIngredient = null;
                    $scope.mode = null;
                };

                /**
                 * Gets all ingredients
                 */
                $scope.getIngredients = function () {
                    return backendIngredientCtrl
                        .query()
                        .then(function (ingredients) {
                            $scope.ingredients = ingredients;
                            $scope.ingredients.forEach(function (ingredient) {
                                ingredient.getMeasurement()
                                    .then(function (msrm) {
                                        ingredient.measurement = msrm;
                                        $scope.$apply();
                                    });
                            });
                        }, function (error) {
                            alert(error);
                        })
                        .finally(function () {
                            $scope.$apply();
                        });
                };

                /**
                 * Gets all measurements
                 */
                $scope.getMeasurements = function () {
                    return backendMeasurementCtrl
                        .query()
                        .then(function (measurements) {
                            $scope.measurements = measurements;
                        }, function (error) {
                            alert(error);
                        })
                        .finally(function () {
                            $scope.$apply();
                        });
                };

                /**
                 * Assigns ingredient and mode
                 * @param {Ingredient} ingredient
                 * @param {('edit'|'add')} mode
                 */
                $scope.assignIngredient = function (ingredient, mode) {
                    $scope.getMeasurements();
                    $scope.editedIngredient = angular.copy(ingredient);
                    $scope.mode = mode;
                };

                /**
                 * Edits a ingredient
                 */
                $scope.editIngredient = function () {
                    $scope.editedIngredient
                        .save()
                        .then(function (result) {
                            $scope.clearEditIngredient();
                            return $scope.getIngredients();
                        }, function (error) {
                            alert(error);
                        })
                        .finally(function () {
                            $scope.$apply();
                        });
                };

                /**
                 * Removes a ingredient from the DB
                 * @param {Number} ingredientId
                 */
                $scope.deleteIngredient = function (ingredientId) {
                    backendIngredientCtrl
                        .remove(ingredientId)
                        .then(function (result) {
                            $scope.ingredients.some(function (ingredient, index) {
                                return ingredient.id === ingredientId
                                    ? $scope.ingredients.splice(index, 1)
                                    : false;
                            })
                        }, function (error) {
                            // TODO use custom alert
                            alert(error);
                        })
                        .finally(function () {
                            $scope.$apply();
                        });
                };

                $scope.getIngredients();
            }]);
}());