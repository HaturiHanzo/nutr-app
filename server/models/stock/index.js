/* jshint node: true */
'use strict';

var Q = require('q'),
    Stock = require('./stock.model.js').model,
    CRUD = require('../query.js'),
    StockCRUD;


StockCRUD = {
    /**
     * Removes instance by id
     * @param {Number} id
     * @returns {Promise}
     */
    remove: function (id) {
        return Stock
            .findById(id)
            .then(function (instance) {
                if (instance) {
                    return instance.destroy();
                } else {
                    throw new Error('Instance not found')
                }
            });
    },

    /**
     * Finds by ingredient id
     * @param {Number} id
     * @returns {Promise.<Sequelize>} promised found instance
     */
    findByIngredientId: function (id) {
        return Stock
            .findOne({
                where: {
                    ingredient_id: id
                }
            })
    }
};

StockCRUD.__proto__ = new CRUD(Stock);

module.exports = StockCRUD;
