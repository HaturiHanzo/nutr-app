/* jshint node: true */
'use strict';

var Q = require('q'),
    Ingredient = require('./ingredient.model.js').model,
    CRUD = require('../query.js'),
    IngredientCRUD;


IngredientCRUD = {
    /**
     * Creates new ingredient
     * @param {string} name - new ingredient name
     * @param {Object} measurement - new ingredient measurement
     * @param {Object} ingredientType - new ingredient ingredientType
     */
    create: function (name, measurement, ingredientType) {
        Ingredient
            .build({name: name})
            .save()
            .then(function (ingredient) {
                ingredient.addMeasurement(measurement);
                ingredient.setIngredientType(ingredientType);
            })
            .error(function (error) {
                console.log(error);
            });
    },

    /**
     * Updates ingredient by id
     * @param {number} id - updated ingredient id
     * @param {string} name - updated ingredient name
     * @param {Object} measurement - updated ingredient measurement
     * @param {Object} ingredientType - updated ingredient ingredientType
     */
    update: function (id, name, measurement, ingredientType) {
        Ingredient
            .find({
                where: {
                    id: id
                }
            })
            .then(function (ingredient) {
                ingredient.updateAttributes({
                    name: name
                })
                .then(function () {
                    ingredient.setMeasurement(measurement);
                    ingredient.setIngredientType(ingredientType);
                });
            });
    }
}

IngredientCRUD.__proto__ = new CRUD(Ingredient);

module.exports = IngredientCRUD;
