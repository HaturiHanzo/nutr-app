/* jshint node: true */
'use strict';

var Q = require('q'),
    DishIngredientList = require('./dishIngredientList.model.js').model,
    CRUD = require('../crud.js');

var DishIngredientListCRUD = {
    /**
     * Creates new dishIngredientList
     * @param {float} amount - new dishIngredientList amount
     * @param {object} dish - new dishIngredientList dish
     * @param {object} ingredient - new dishIngredientList ingredient
     */
    create: function (amount, dish, ingredient) {
        DishIngredientList
            .build({ amount: amount })
            .save()
            .success(function(dishIngredientList) {
                dishIngredientList.addDish(dish);
                dishIngredientList.addIngredient(ingredient);
            }).error(function(error) {
                console.log(error);
            });
    },
    /**
     * Updates dishIngredientList by id
     * @param {integer} id - updated dishIngredientList id
     * @param {float} amount - updated dishIngredientList amount
     * @param {object} dish - updated dishIngredientList dish
     * @param {object} ingredient - updated dishIngredientList ingredient
     */
    update: function (id, amount, dish, ingredient) {
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
};
 DishIngredientListCRUD.prototype = new CRUD(DishIngredientList);


module.exports = DishIngredientListCRUD;
