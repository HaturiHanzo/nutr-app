'use strict';

var Sequelize = require('sequelize');

var connection = require('../database');

var User = connection.define('user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        role: {
            type:   Sequelize.ENUM,
            values: ['admin', 'user']
        }
    },
    {
        freezeTableName: true
    }
);

function syncModel() {
    return User.sync({force: true});
}

module.exports = {
    model : User,
    syncModel : syncModel
};
