/**
 * Factory holds current user
 *
 * @namespace Factories
 */
'use strict';
(function () {
    var backendUserCtrl = require('../server/models/user');

    angular
        .module('nutr')
        .factory('User', ['$state', function ($state) {
            var user;

            return {
                /**
                 * Authorizes user
                 * @param {String} login
                 * @param {String} password
                 *
                 * @returns {Promise} authorized user
                 */
                authorize: function (login, password) {
                    return backendUserCtrl
                        .authenticate(login, password)
                        .then(function (result) {
                            user = result;
                            result.role === 'admin'
                                ? $state.go('admin')
                                : $state.go('user');
                            return user;
                        });
                },

                /**
                 *Clears current user
                 */
                logout: function () {
                    user = undefined;
                    $state.go('auth');
                },

                /**
                 * Current user getter
                 *
                 * @returns {User|undefined}
                 */
                getUser: function () {
                    return user;
                }
            }
        }]);
}());