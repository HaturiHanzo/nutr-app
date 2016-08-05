/* jshint node: true */
'use strict';

var connection = require('../database'),
    UserCRUD = require('../models/user');

function createDb() {
    connection
        .sync({
            force: true
        })
        .then(function () {
            return UserCRUD.create({
                fullName: 'test',
                password: '1',
                login: 'test',
                role: 'admin'
            })
        });
}

module.exports = createDb;
