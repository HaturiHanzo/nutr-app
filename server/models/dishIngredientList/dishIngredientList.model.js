/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../../database'),
    Dish = require('../dish/dish.model.js').model,
    Ingredient = require('../ingredient/ingredient.model.js').model,
    DishIngredientList;

DishIngredientList = connection.define('dishIngredientList',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: Sequelize.FLOAT
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

DishIngredientList.hasMany(Dish);
DishIngredientList.hasMany(Ingredient);

module.exports = {
    model: DishIngredientList
};
