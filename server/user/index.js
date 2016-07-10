/* jshint node: true */
'use strict';

var User = require('./user.model.js').model;

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

function authenticate() {

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
