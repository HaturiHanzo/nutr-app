/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../../database'),
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
