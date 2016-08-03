/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    config = require('../configuration'),
    path = require('path'),
    connection;

connection = new Sequelize('nutr', null, null, {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    omitNull: true,
    storage: path.join(config.get('dir:root:server'), 'database', 'database.db')
});

module.exports = connection;