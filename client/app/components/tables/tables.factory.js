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
        .factory('Tables', ['$state', function ($state) {
            var tables = [];

            return {
                /**
                 * Generates 5 empty tables
                 */
                generateTables:  function () {
                    tables = [];
                    for (var i = 0; i < 5; i++) {
                        var newTable = {
                            id: i + 1,
                            name: 'Cтол ' + (i + 1),
                            dishes: [],
                            totalCount: 0
                        }
                        tables.push(newTable);
                    }
                },

                /**
                 * Adds new empty table
                 * @param {String} name - table name
                 */
                addTable: function () {
                    var id, newTable;
                    id = tables.length ?
                        tables[tables.length - 1].id + 1 :
                        1;
                    newTable = {
                        id: id,
                        name: 'Cтол ' + id,
                        dishes: []
                    }
                    tables.push(newTable);
                },

                /**
                 * Removes table
                 * @param {Object} table
                 */
                removeTable: function (table) {
                    tables.splice(tables.indexOf(table),1);
                },

                /**
                 * Current tables getter
                 *
                 * @returns {tables|undefined}
                 */
                getTables: function () {
                    return tables;
                },

                /**
                 * Gets table by id
                 * @param {Number} id
                 */
                getTableById: function (id) {
                    var result;
                    tables.forEach(function (table) {
                        if (table.id === id) {
                            result = table;
                        }
                    })
                    return result;
                }
            }
        }]);
}());