/* jshint node: true */
'use strict';

var Q = require('q'),
    sync = require('./user.model.js').syncModel(),
    User = require('./user.model.js').model;

/**
 * Creates new user
 * @param {string} fullName - new user name
 * @param {string} login - new user login
 * @param {string} pass - new user password
 * @param {string} role - new user role
 * @returns {Promise.<Sequelize>} promised new user
 */

function create(fullName, login, pass, role) {
    return User.create({
        fullName: fullName,
        login: login,
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

/**
 * Removes user by id
 * @param {integer} id - deleted user id
 */
function remove(id) {
    User.find({
        where:{
            id : id
        }
    }).success(function (user) {
        user.destroy().error(function(err){
            console.log(err);
        });
    });
}
/**
 * Updates user by id
 * @param {integer} id - updated user id
 * @param {string} fullName - updated user fullName
 * @param {string} login - updated user login
 * @param {string} pass - updated user password
 * @param {string} role - updated user role
 */
function update(id, fullName, login, pass, role) {
    User.find({
        where:{
            id: id
        }
    }).success(function(user){
        user.updateAttributes({
            fullName: fullName,
            login: login,
            password: pass,
            role: role
        });
    });
}

module.exports = {
    create: create,
    remove: remove,
    update: update,
    authenticate: authenticate
};
