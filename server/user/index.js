/* jshint node: true */
'use strict';

var Q = require('q'),
    User = require('./user.model.js').model;

/**
 * Creates new user
 * @param {string} name - new user name
 * @param {string} pass - new user password
 * @param {string} role - new user role
 * @returns {Promise.<Sequelize>} promised new user
 */
function create(name, pass, role) {
    return User.create({
        name: name,
        password: pass,
        role: role
    });
}

function authenticate(login, password) {
    var deferred = Q.defer();
    if (password === '1') {
        deferred.resolve('OK for: ' + login);
    } else {
        deferred.resolve('NOT OK for: ' + login);
    }
    return deferred.promise;
}

function remove() {

}

function update() {

}

module.exports = {
    create: create,
    remove: remove,
    update: update,
    authenticate: authenticate
};
