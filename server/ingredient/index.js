/* jshint node: true */
'use strict';

var Q = require('q'),
    Ingredient = require('./ingredient.model.js').model;

/**
 * Creates new ingredient
 * @param {string} name - new ingredient name
 * @param {object} measurement - new ingredient measurement
 * @param {object} ingredientType - new ingredient ingredientType
 */
function create(name, measurement, ingredientType) {
    Ingredient
        .build({ name: name })
        .save()
        .success(function(ingredient) {
            ingredient.addMeasurement(measurement);
            ingredient.setIngredientType(ingredientType);
        }).error(function(error) {
            console.log(error);
        });
}
/**
 * Removes ingredient by id
 * @param {integer} id - deleted ingredient id
 */
function remove(id) {
    Ingredient.find({
        where:{
            id : id
        }
    }).success(function (ingredient) {
        ingredient.destroy().error(function(err){
            console.log(err);
        });
    });
}
/**
 * Updates ingredient by id
 * @param {integer} id - updated ingredient id
 * @param {string} name - updated ingredient name
 * @param {object} measurement - updated ingredient measurement
 * @param {object} ingredientType - updated ingredient ingredientType
 */
function update(id, name, measurement, ingredientType) {
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

module.exports = {
    create: create,
    remove: remove,
    update: update
};
