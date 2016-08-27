/**
 * Admin dish controller
 *
 * @namespace Controllers
 */
(function () {
    'use strict';

    var backendDishCtrl = require('../server/models/dish'),
        backendIngredientCtrl = require('../server/models/ingredient'),
        backendDishIngredientListCtrl = require('../server/models/dishIngredientList');

    angular
        .module('nutr')
        .controller('adminDishCtrl', [
            '$http',
            '$scope',
            '$q',
            function ($http, $scope, $q) {
                /**
                 * Adds a new dish
                 */
                $scope.addDish = function () {
                    backendDishCtrl
                        .create($scope.editedDish)
                        .then(function (dish) {
                            $scope.editedDish.ingredients.forEach(function (ingredient) {
                                return dish.addIngredient(ingredient.ingredient, {amount: ingredient.amount});
                            });
                            $scope.clearEditDish();
                            $scope.getDishes();
                        }, function (error) {
                            alert(error);
                        })
                        .finally(function () {
                            $scope.$apply();
                        });
                };

                /**
                 * Clears edited dish
                 */
                $scope.clearEditDish = function () {
                    $scope.editedDish = null;
                    $scope.mode = null;
                };
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

                $scope.getIngredients();

                /**
                 * Gets all dishes
                 */
                $scope.getDishes = function () {
                    return backendDishCtrl
                        .query()
                        .then(function (dishes) {
                            $scope.dishes = dishes;
                            return $q.all($scope.dishes.map(function (dish) {
                                return dish.getIngredients()
                                    .then(function (ingredients) {
                                        dish.ingredients = ingredients;
                                        dish.ingredients.forEach(function (ingr) {
                                            ingr
                                                .getMeasurement()
                                                .then(function (measurement) {
                                                    ingr.measurement = measurement.name;
                                                })
                                            backendDishIngredientListCtrl
                                                .getByIds(ingr.id, dish.id)
                                                .then(function (found) {
                                                    ingr.amount = found.amount;
                                                })
                                        });
                                    });
                            }));
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
                    $scope.newIngredient.ingredient
                        .getMeasurement()
                        .then(function (measurement) {
                            $scope.ingredientMeasurement = measurement.name;
                        })
                        .finally(function () {
                            $scope.$apply();
                        });
                }

                /**
                 * Assigns dish and mode
                 * @param {Dish} dish
                 * @param {('edit'|'add')} mode
                 */
                $scope.assignDish = function (dish, mode) {
                    $scope.editedDish = angular.copy(dish);
                    if (!$scope.editedDish.ingredients) {
                        $scope.editedDish.ingredients = [];
                    }
                    $scope.mode = mode;
                };


                /**
                 * Adds empty ingredient
                 */
                $scope.addIngredient = function () {
                    $scope.newIngredient.name = $scope.newIngredient.ingredient.name;
                    $scope.newIngredient.measurement = $scope.ingredientMeasurement;
                    $scope.editedDish.ingredients.push($scope.newIngredient);
                    $scope.newIngredient = null;
                };

                /**
                 * Removes one ingredient from the edited dish
                 *
                 * @param {Object} ingredient
                 */
                $scope.removeIngredient = function (ingredient) {
                    if ($scope.mode == 'edit') {
                        backendDishIngredientListCtrl
                            .remove({
                                dish_id: $scope.editedDish.id,
                                ingredient_id: ingredient.id
                            })
                    }
                    $scope.editedDish.ingredients.splice($scope.editedDish.ingredients.indexOf(ingredient),1);
                };

                /**
                 * Edits a dish
                 */
                $scope.editDish = function () {
                    $scope.editedDish
                        .save()
                        .then(function (result) {
                            result.ingredients.forEach(function (ingredient) {
                                return result.addIngredient(ingredient.ingredient, {amount: ingredient.amount});
                            });
                            $scope.clearEditDish();
                            return $scope.getDishes();
                        }, function (error) {
                            alert(error);
                        })
                        .finally(function () {
                            $scope.$apply();
                        });
                };

                /**
                 * Removes a dish from the DB
                 * @param {Number} dishId
                 */
                $scope.deleteDish = function (dishId) {
                    backendDishCtrl
                        .remove(dishId)
                        .then(backendDishIngredientListCtrl.removesByDishId.bind(null, dishId))
                        .then(function (result) {
                            alert('Успешно удалено');
                            $scope.dishes.some(function (dish, index) {
                                return dish.id === dishId
                                    ? $scope.dishes.splice(index, 1)
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

                $scope.getDishes();
            }]);
}());