/* jshint node: true */
'use strict';

var Q = require('q');

function authenticate(login, password) {
    var deferred = Q.defer();
    if (password === '1') {
        deferred.resolve('OK for: ' + login);
    } else {
        deferred.resolve('NOT OK for: ' + login);
    }
    return deferred.promise;
}

module.exports = {
    authenticate: authenticate
};