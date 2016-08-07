/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../../database'),
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
            type: Sequelize.STRING,
            unique: true
        },
        role: {
            type:   Sequelize.ENUM,
            values: ['admin', 'user']
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        underscored: true,
        freezeTableName: true
    }
);

module.exports = {
    model: User
};
