/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../database'),
    IngredientType;

IngredientType = connection.define('ingredientType',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        }
    },
    {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    }
);

function syncModel() {
    return IngredientType.sync({force: true});
}

module.exports = {
    model: IngredientType,
    syncModel: syncModel
};