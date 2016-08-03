/* jshint node: true */
'use strict';

var Q = require('q'),
    User = require('./user.model.js').model,
    CRUD = require('../crud.js');


var UserCRUD = {
    /**
     * Authenticates user by login and password
     * @param login
     * @param password
     * @returns {*|promise}
     */
    authenticate: function (login, password) {
        return User
            .findAll({
                where:{
                    login: login,
                    password: password
                }
            })
            .then(function(users){
                if (typeof users !== 'undefined' && users.length > 0) {
                    alert('OK');
                } else {
                    alert('NOT OK');
                }
            })
    }
};

UserCRUD.__proto__ = new CRUD(User);

module.exports = UserCRUD;
