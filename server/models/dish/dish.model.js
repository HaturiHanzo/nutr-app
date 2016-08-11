/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../../database'),
    Ingredient = require('../ingredient/ingredient.model.js').model,
    DishIngredientList = require('../dishIngredientList/dishIngredientList.model.js').model,
    Dish;

Dish = connection.define('dish',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        price: {
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


Dish.belongsToMany(Ingredient, {through: DishIngredientList});
Ingredient.belongsToMany(Dish, {through: DishIngredientList});
/**
 * Creates table Dish
 * @returns {Promise.<Sequelize>}
 */
function syncModel() {
    return Dish.sync({force: true});
}

module.exports = {
    model: Dish
};
