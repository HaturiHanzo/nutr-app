var Sequelize = require('sequelize');

var connection = new Sequelize('nutr', null, null, {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: './database.db'
});


module.exports = connection;