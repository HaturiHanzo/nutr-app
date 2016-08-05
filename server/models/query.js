/* jshint node: true */
'use strict';

var Q = require('q');

/**
 * Set Query model
 * @param {Model.<Sequelize>} model - new model
 * @constructor
 */
function Query(model) {
    this.model = model;
}

Query.prototype = {
    /**
     * Creates new instance
     * @param {Object} params - properties
     * @returns {Promise.<Sequelize>} - promised new instance
     */
    create: function (params) {
        return this.model.create(params);
    },

    /**
     * Removes object by id
     * @param {number} id - object id
     * @returns {*|promise}
     */
    remove: function (id) {
        return this.model
            .findById(id)
            .then(function (instance) {
                if (instance) {
                    instance.isActive = false;
                    return instance.save();
                } else {
                    throw new Error('Instance not found')
                }
            });
    },

    /**
     * Updates instance
     * @param {Object} params - object properties needed to be changed
     * @returns {*|promise}
     */
    update: function (params) {
        this.model
            .findById(params.id)
            .then(function (instance) {
                if (instance) {
                    return instance.update(params)
                } else {
                    throw new Error('Instance not found')
                }
            });
    },

    /**
     * Finds all instances which "isActive" is true
     * @returns {Promise.<Sequelize>} - promised instance array
     */
    query: function () {
        return this.model
            .findAll({
                where: {
                    isActive: true
                }
            })
    },
    /**
     * Creates table as the name of a model
     * @returns {Promise.<Sequelize>}
     */
    syncModel: function () {
        this.model.sync({force: true});
    }
};

Query.prototype.constructor = Query;

module.exports = Query;
