/* jshint node: true */
'use strict';

var Q = require('q'),
    sync = require('./user.model.js').syncModel(),
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
        var deferred = Q.defer();
        if (password === '1') {
            deferred.resolve('OK for: ' + login);
        } else {
            deferred.resolve('NOT OK for: ' + login);
        }
        return deferred.promise;
    }

}

UserCRUD.prototype = new CRUD(User);


module.exports = UserCRUD;
