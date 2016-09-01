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
            'Tables',
            function ($q, $scope, User, Table) {

                $scope.tables = Table.getTables();

                $scope.activeTable = $scope.tables[0];
                /**
                 * Adds new table
                 */
                $scope.addTable = function () {
                    Table.addTable();
                };
                /**
                 * Deletes table
                 * @param {Object} table
                 */
                $scope.removeTable = function (table) {
                    if (table.dishes.length) {
                        alert('Перед удалением закройте счет!');
                    } else {
                        Table.removeTable(table);
                    }
                };

                /**
                 * Removes dish from table list by id
                 * @param {Number} id
                 */
                $scope.removeDish = function (id) {
                    var table = Table.getTableById($scope.activeTable.id);
                    table.dishes.forEach(function (tableDish) {
                        if (tableDish.id == id) {
                            table.totalCount -= tableDish.price;
                            if (tableDish.amount > 1) {
                                tableDish.amount--;
                            } else {
                                table.dishes.splice(table.dishes.indexOf(tableDish),1);
                            }
                            backendDishCtrl
                                .getById(tableDish.id)
                                .then(function (dish) {
                                    if (dish) {
                                        return dish.getIngredients();
                                    }
                                })
                                .then(function (ingredients) {
                                    return $q.all(ingredients.map(function (ingredient) {
                                        return backendStockCtrl
                                            .findByIngredientId(ingredient.id)
                                            .then(function (foundInStockIngredient) {
                                                if (!foundInStockIngredient) {
                                                    return backendStockCtrl
                                                        .create({amount: ingredient.dishIngredientList.amount})
                                                        .then(function (instance) {
                                                            instance.setIngredient(ingredient);
                                                        })
                                                } else {
                                                    foundInStockIngredient.amount += ingredient.dishIngredientList.amount;
                                                    foundInStockIngredient.amount.toFixed(2);
                                                    foundInStockIngredient.save();
                                                }
                                            })

                                    }))
                                })
                        }
                    });
                };

                /**
                 * Adds dish in current bill
                 */
                $scope.addDishInBill = function (dish) {
                    var table = Table.getTableById($scope.activeTable.id);
                    if (dish.amount > 0) {
                        $scope.minusIngredients(dish)
                            .then(function () {
                                var result = false;
                                table.dishes.forEach(function (item) {
                                    if (item.id === dish.id) {
                                        item.amount += dish.amount;
                                        table.totalCount += dish.price * dish.amount;
                                        result = true;
                                    }
                                });
                                if (!result) {
                                    table.dishes.push({id: dish.id, name: dish.name,
                                        price: dish.price, amount: dish.amount});
                                    table.totalCount += dish.price * dish.amount;
                                }
                                $scope.showAllDishes = false;
                                $scope.dishes.forEach(function (elem) {
                                    elem.amount = 1;
                                });
                            })
                            .catch(function (err) {
                                alert(err);
                                $scope.showAllDishes = false;
                            })
                            .finally(function () {
                                $scope.$apply();
                            });
                    }
                };
                /**
                 * Sets current table
                 * @param {Object} table
                 */
                $scope.activateTable = function (table) {
                    $scope.activeTable = table;
                    $scope.showAllDishes = false;
                };

                /**
                 * Closes table's bill
                 */
                $scope.closeBill = function () {
                    if (confirm('Вы уверены?')) {
                        var table = Table.getTableById($scope.activeTable.id);
                        table.dishes.map(function (dish) {
                            backendTransactionCtrl
                                .create({name: dish.name, date: new Date(), type: 'sell', price: dish.price,
                                    amount: dish.amount})
                                .then(function (result) {
                                    result.setUser(User.getUser());
                                }, function (error) {
                                    alert(error);
                                })
                        })
                        table.dishes = [];
                        table.totalCount = 0;
                    }
                };

                /**
                 * Gets all dishes
                 */
                $scope.getDishes = function () {
                    backendDishCtrl
                        .query()
                        .then(function (dishes) {
                            $scope.dishes = [];
                            dishes.forEach(function (elem) {
                                $scope.dishes.push({id: elem.id, name: elem.name,
                                    price: elem.price, type: elem.type, amount: 1});
                            });
                        }, function (error) {
                            alert(error);
                        })
                        .finally(function () {
                            $scope.$apply()
                        })
                };

                /**
                 * Records sold dish in transaction table, removes al its ingredients from stock
                 * @param {Object} product - dish
                 */
                $scope.minusIngredients = function (product) {
                    return backendDishCtrl
                        .getById(product.id)
                        .then(function (dish) {
                            if (dish) {
                                return dish.getIngredients();
                            }
                        })
                        .then(function (ingredients) {
                            return $q.all(ingredients.map(function (ingredient) {
                                return backendStockCtrl
                                    .findByIngredientId(ingredient.id)
                                    .then(function (foundInStockIngredient) {
                                        if (!foundInStockIngredient) {
                                            throw (new Error('Hет ' + ingredient.name + ' на складе'));
                                        } else if (foundInStockIngredient.amount < ingredient.dishIngredientList.amount * product.amount) {
                                            throw (new Error('Hедостаточное количество ' + ingredient.name
                                                + ' на складе.\nОсталось ' + foundInStockIngredient.amount
                                                + '. Нужно ' + ingredient.dishIngredientList.amount * product.amount));
                                        }
                                    })

                            }))
                        })
                        .then(function () {
                            return backendDishCtrl
                                .getById(product.id)
                        })
                        .then(function (dish) {
                            if (dish) {
                                return dish.getIngredients();
                            }
                        })
                        .then(function (ingredients) {
                            return $q.all(ingredients.map(function (ingredient) {
                                return backendStockCtrl
                                    .findByIngredientId(ingredient.id)
                                    .then(function (foundInStockIngredient) {
                                        if (foundInStockIngredient.amount > ingredient.dishIngredientList.amount * product.amount) {
                                            foundInStockIngredient.amount -= (ingredient.dishIngredientList.amount * product.amount).toFixed(2);
                                            foundInStockIngredient.amount = foundInStockIngredient.amount.toFixed(2);
                                            foundInStockIngredient.save();
                                        } else if (foundInStockIngredient.amount === ingredient.dishIngredientList.amount * product.amount) {
                                            foundInStockIngredient.destroy();
                                        }
                                    })
                            }))
                        })
                }
                $scope.getDishes();
            }]);
}());