(function () {
    'use strict';

    var backendDishCtrl = require('../server/models/dish'),
        backendStockCtrl = require('../server/models/stock'),
        backendTransactionCtrl = require('../server/models/transaction');

    angular
        .module('nutr')
        .controller('userSellCtrl', [
            '$q',
            '$scope',
            'User',
            function ($q, $scope, User) {

                /**
                 * Gets all dishes
                 */
                $scope.getDishes = function () {
                    backendDishCtrl
                        .query()
                        .then(function (dishes) {
                            $scope.dishes = [];
                            dishes.forEach(function (elem) {
                                $scope.dishes.push({id: elem.id, name: elem.name, price: elem.price});
                            });
                        }, function (error) {
                            alert(error);
                        })
                        .finally(function () {
                            $scope.$apply()
                        })
                }

                /**
                 * Records sold dish in transaction table, removes al its ingredients from stock
                 * @param {Object} product - dish
                 */
                $scope.sellDish = function (product) {
                    backendDishCtrl
                        .getById(product.id)
                        .then(function (dish) {
                            if (dish) {
                                return dish.getIngredients();
                            }
                        }, function (error) {
                            alert(error);
                        })
                        .then(function (ingredients) {
                            return $q.all(ingredients.map(function (ingredient) {
                                return backendStockCtrl
                                    .findByIngredientId(ingredient.id)
                                    .then(function (foundInStockIngredient) {
                                        if (!foundInStockIngredient) {
                                            throw new Error('Hет ' + ingredient.name + ' на складе');
                                        } else if (foundInStockIngredient.amount < ingredient.dishIngredientList.amount) {
                                            throw new Error('Hедостаточное количество ' + ingredient.name
                                                + ' на складе.\nОсталось ' + foundInStockIngredient.amount
                                                + '. Нужно ' + ingredient.dishIngredientList.amount);
                                        } else if (foundInStockIngredient.amount > ingredient.dishIngredientList.amount) {
                                            foundInStockIngredient.amount -= ingredient.dishIngredientList.amount;
                                            foundInStockIngredient.save();
                                        } else if (foundInStockIngredient.amount === ingredient.dishIngredientList.amount) {
                                            return foundInStockIngredient.destroy();
                                        }
                                    })
                            }))
                        })
                        .then(function () {
                            return backendTransactionCtrl
                                .create({name: product.name, date: new Date(), type: 'sell', cost: product.price})
                                .then(function (result) {
                                    result.setUser(User.getUser());
                                    alert('Продано!');
                                }, function (error) {
                                    alert(error);
                                })
                        })
                        .catch(function (err) {
                            alert(err);
                        })
                }

                $scope.getDishes();
            }]);
}());