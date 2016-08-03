/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../../database'),
    IngredientType = require('../ingrType/ingrType.model.js').model,
    Measurement = require('../measurement/measurement.model.js').model,
    Ingredient;

Ingredient = connection.define('ingredient',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    },
    {
        underscored: true,
        freezeTableName: true
    }
);

Ingredient.hasMany(Measurement);
Ingredient.hasOne(IngredientType);

function syncModel() {
    return Ingredient.sync({force: true});
}

module.exports = {
    model: Ingredient,
    syncModel: syncModel
};