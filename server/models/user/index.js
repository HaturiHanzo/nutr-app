/* jshint node: true */
'use strict';

var Q = require('q'),
    User = require('./user.model.js').model,
    CRUD = require('../query.js'),
    UserCRUD;


UserCRUD = {
    /**
     * Authenticates user by login and password
     * @param {string} login - user login
     * @param {string} password - user - password
     * @returns {*|promise}
     */
    authenticate: function (login, password) {
        var deferred = Q.defer();
        User
            .findOne({
                where: {
                    login: login,
                    password: password
                }
            })
            .then(function (user) {
                if (user && user.isActive) {
                    deferred.resolve(user.role);
                } else if (user && !user.isActive) {
                    deferred.reject('Пользователь c таким логином существует найден');
                } else {
                    deferred.reject('Пользователь не найден');
                }
            });
        return deferred.promise;
    }
};

UserCRUD.__proto__ = new CRUD(User);

module.exports = UserCRUD;
