/* jshint node: true */
'use strict';

var Q = require('q'),
    Ingredient = require('./ingredient.model.js').model,
    CRUD = require('../crud.js');


var IngredientCRUD = {
    /**
     * Creates new ingredient
     * @param {string} name - new ingredient name
     * @param {object} measurement - new ingredient measurement
     * @param {object} ingredientType - new ingredient ingredientType
     */
    create: function (name, measurement, ingredientType) {
        Ingredient
            .build({ name: name })
            .save()
            .success(function(ingredient) {
                ingredient.addMeasurement(measurement);
                ingredient.setIngredientType(ingredientType);
            }).error(function(error) {
                console.log(error);
            });
    },

    /**
     * Updates ingredient by id
     * @param {integer} id - updated ingredient id
     * @param {string} name - updated ingredient name
     * @param {object} measurement - updated ingredient measurement
     * @param {object} ingredientType - updated ingredient ingredientType
     */
    update: function (id, name, measurement, ingredientType) {
        Ingredient.find({
            where:{
                id: id
            }
        }).success(function(ingredient){
            ingredient.updateAttributes({
                name: name
            }).success(function(){
                ingredient.setMeasurement(measurement);
                ingredient.setIngredientType(ingredientType);
            });
        });
    }

}

IngredientCRUD.prototype = new CRUD(Ingredient);

module.exports = IngredientCRUD;
