/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../database'),
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
        }
    },
    {
        underscored: true,
        freezeTableName: true
    }
);

function syncModel() {
    return Dish.sync({force: true});
}

module.exports = {
    model: Dish,
    syncModel: syncModel
};