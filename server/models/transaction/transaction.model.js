/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../../database'),
    User = require('../user/user.model.js').model,
    Transaction;

Transaction = connection.define('transaction',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        },
        type: {
            type:   Sequelize.ENUM,
            values: ['buy', 'sell']
        },
        cost: {
            type: Sequelize.INTEGER
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

Transaction.belongsTo(User);

module.exports = {
    model: Transaction
};
