/* jshint node: true */
'use strict';

var Q = require('q'),
    DishIngredientList = require('./dishIngredientList.model.js').model,
    CRUD = require('../query.js'),
    DishIngredientListCRUD;

DishIngredientListCRUD = {

    /**
     * Gets amount of ingredient in dish by their ids
     * @param {Number} ingredientId
     * @param {Number} dishId
     * @returns {Promise.<Sequelize>}
     */
    getByIds: function (ingredientId, dishId){
        return DishIngredientList
            .findOne({
                where: {
                    ingredient_id: ingredientId,
                    dish_id: dishId
                }
            })
    },

    /**
     * Removes dishIngredientList by dish id
     * @param {Number} dishId - dish id
     */
    removesByDishId: function (dishId) {
        return DishIngredientList
            .destroy({
                where: {
                    dish_id: dishId
                }
            })
    },

    /**
     * Removes dishIngredientList
     * @param {Object} params - contains dish and ingredient id
     */
    remove: function (params) {
        return DishIngredientList
            .destroy({
                where: {
                    dish_id: params.dish_id,
                    ingredient_id: params.ingredient_id
                }
            })
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
