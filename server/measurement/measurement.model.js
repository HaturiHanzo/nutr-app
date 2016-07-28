/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../database'),
    Measurement;

Measurement = connection.define('measurement',
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
        freezeTableName: true
    }
);

function syncModel() {
    return Measurement.sync({force: true});
}

module.exports = {
    model: Measurement,
    syncModel: syncModel
};