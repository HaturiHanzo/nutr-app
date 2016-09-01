/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../../database'),
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
        },
        type: {
            type:   Sequelize.ENUM,
            values: ['drink', 'food']
        }
    },
    {
        underscored: true,
        freezeTableName: true
    }
);

Ingredient.belongsTo(Measurement);

module.exports = {
    model: Ingredient
};
