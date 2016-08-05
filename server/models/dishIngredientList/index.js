/* jshint node: true */
'use strict';

var Q = require('q'),
    DishIngredientList = require('./dishIngredientList.model.js').model,
    CRUD = require('../query.js'),
    DishIngredientListCRUD;

DishIngredientListCRUD = {
    /**
     * Creates new dishIngredientList
     * @param {float} amount - new dishIngredientList amount
     * @param {object} dish - new dishIngredientList dish
     * @param {object} ingredient - new dishIngredientList ingredient
     */
    create: function (amount, dish, ingredient) {
        DishIngredientList
            .build({amount: amount})
            .save()
            .then(function (dishIngredientList) {
                dishIngredientList.addDish(dish);
                dishIngredientList.addIngredient(ingredient);
            })
            .error(function (error) {
                console.log(error);
            });
    },
    /**
     * Updates dishIngredientList by id
     * @param {number} id - updated dishIngredientList id
     * @param {float} amount - updated dishIngredientList amount
     * @param {object} dish - updated dishIngredientList dish
     * @param {object} ingredient - updated dishIngredientList ingredient
     */
    update: function (id, amount, dish, ingredient) {
        DishIngredientList
            .find(
            {
                where: {
                    id: id
                }
            })
            .then(function (dishIngredientList) {
                dishIngredientList.updateAttributes({
                    amount: amount
                })
                    .then(function () {
                        dishIngredientList.setDish(dish);
                        dishIngredientList.setIngredient(ingredient);
                    });
            });
    }
};

DishIngredientListCRUD.__proto__ = new CRUD(DishIngredientList);

module.exports = DishIngredientListCRUD;
