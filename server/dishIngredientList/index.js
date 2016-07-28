/* jshint node: true */
'use strict';

var Q = require('q'),
    DishIngredientList = require('./dishIngredientList.model.js').model;

/**
 * Creates new dishIngredientList
 * @param {float} amount - new dishIngredientList amount
 * @param {object} dish - new dishIngredientList dish
 * @param {object} ingredient - new dishIngredientList ingredient
 */
function create(amount, dish, ingredient) {
    DishIngredientList
        .build({ amount: amount })
        .save()
        .success(function(dishIngredientList) {
            dishIngredientList.addDish(dish);
            dishIngredientList.addIngredient(ingredient);
        }).error(function(error) {
            console.log(error);
        });
}
/**
 * Removes dishIngredientList by id
 * @param {integer} id - deleted dishIngredientList id
 */
function remove(id) {
    DishIngredientList.find({
        where:{
            id : id
        }
    }).success(function (dishIngredientList) {
        dishIngredientList.destroy().error(function(err){
            console.log(err);
        });
    });
}
/**
 * Updates dishIngredientList by id
 * @param {integer} id - updated dishIngredientList id
 * @param {float} amount - updated dishIngredientList amount
 * @param {object} dish - updated dishIngredientList dish
 * @param {object} ingredient - updated dishIngredientList ingredient
 */
function update(id, amount, dish, ingredient) {
    DishIngredientList.find({
        where:{
            id: id
        }
    }).success(function(dishIngredientList){
        dishIngredientList.updateAttributes({
            amount: amount
        }).success(function(){
            dishIngredientList.setDish(dish);
            dishIngredientList.setIngredient(ingredient);
        });
    });
}

module.exports = {
    create: create,
    remove: remove,
    update: update
};
