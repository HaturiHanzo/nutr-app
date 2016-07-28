/* jshint node: true */
'use strict';

var Q = require('q'),
    IngredientType = require('./ingrType.model.js').model;

/**
 * Creates new ingredientType
 * @param {string} name - new ingredientType name
 * @returns {Promise.<Sequelize>} promised new ingredientType
 */
function create(name) {
    return IngredientType.create({
        name: name
    });
}
/**
 * Removes ingredientType by id
 * @param {integer} id - deleted ingredientType id
 */
function remove(id) {
    IngredientType.find({
        where:{
            id : id
        }
    }).success(function (ingredientType) {
        ingredientType.destroy().error(function(err){
            console.log(err);
        });
    });
}
/**
 * Updates ingredientType by id
 * @param {integer} id - updated ingredientType id
 * @param {string} name - updated ingredientType name
 */
function update(id, name) {
    IngredientType.find({
        where:{
            id: id
        }
    }).success(function(ingredientType){
        ingredientType.updateAttributes({
            name: name
        });
    });
}

module.exports = {
    create: create,
    remove: remove,
    update: update
};
