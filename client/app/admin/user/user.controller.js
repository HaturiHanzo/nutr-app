/**
 * Admin users controller
 *
 * @namespace Controllers
 */

/**
 * User object description
 *
 * @typedef {Object} User
 * @property {String} login
 * @property {String} fullName
 * @property {('admin'|'user')} role
 * @property {String} password
 */

(function () {
'use strict';

var backendUserCtrl = require('../server/models/user');

angular
    .module('nutr')
    .controller('adminUserCtrl', [
        '$http',
        '$scope',
        function ($http, $scope) {

            /**
             * Adds a new user
             */
            $scope.addUser = function () {
                backendUserCtrl
                    .create($scope.editedUser)
                    .then(function (user) {
                        alert(user.fullName + ' успешно создан');
                        $scope.users.push(user);
                        $scope.clearEditUser();
                    }, function (error) {
                        alert(error);
                    })
                    .finally(function () {
                        $scope.$apply();
                    });
            };

            /**
             * Clears edited user
             */
            $scope.clearEditUser = function () {
                $scope.editedUser = null;
                $scope.mode = null;
            };

            /**
             * Gets all users
             */
            $scope.getUsers = function () {
                return backendUserCtrl
                    .query()
                    .then(function (users) {
                        $scope.users = users;
                    }, function (error) {
                        alert(error);
                    })
                    .finally(function () {
                        $scope.$apply();
                    });
            };

            /**
             * Assigns user and mode
             * @param {User} user
             * @param {('edit'|'add')} mode
             */
            $scope.assignUser = function (user, mode) {
                $scope.editedUser = angular.copy(user);
                $scope.mode = mode;
            };

            /**
             * Edits a user
             */
            $scope.editUser = function () {
                $scope.editedUser
                    .save()
                    .then(function (result) {
                        $scope.clearEditUser();
                        return $scope.getUsers();
                    }, function (error) {
                        alert(error);
                    })
                    .finally(function () {
                        $scope.$apply();
                    });
            };

            /**
             * Removes a user from the DB
             * @param {Number} userId
             */
            $scope.deleteUser = function (userId) {
                backendUserCtrl
                    .remove(userId)
                    .then(function (result) {
                        alert('Успешно удалено');
                        $scope.users.some(function (user, index) {
                            return user.id === userId
                                ? $scope.users.splice(index, 1)
                                : false;
                        })
                    }, function (error) {
                        // TODO use custom alert
                        alert(error);
                    })
                    .finally(function () {
                        $scope.$apply();
                    });
            };

            $scope.getUsers();
        }
    ]);
}());