/* jshint node: true */
'use strict';

var Q = require('q'),
    Ingredient = require('./ingredient.model.js').model,
    CRUD = require('../query.js'),
    IngredientCRUD;


IngredientCRUD = {
    /**
     * Creates new ingredient
     */
    create: function (instance) {
        return Ingredient.create(instance)
            .then(function (ingr) {
                return ingr.setMeasurement(instance.measurement);
            })
    }
}

IngredientCRUD.__proto__ = new CRUD(Ingredient);

module.exports = IngredientCRUD;
