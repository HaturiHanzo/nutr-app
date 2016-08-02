/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../database'),
    User;

User = connection.define('user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        login: {
            type: Sequelize.STRING
        },
        role: {
            type:   Sequelize.ENUM,
            values: ['admin', 'user']
        }
    },
    {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    }
);

function syncModel() {
    return User.sync({force: true});
}

module.exports = {
    model: User,
    syncModel: syncModel
};