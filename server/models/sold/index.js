/* jshint node: true */
'use strict';

var Q = require('q'),
    Sold = require('./sold.model.js').model,
    CRUD = require('../query.js'),
    SoldCRUD;

SoldCRUD = {
    /**
     * Updates sold dish by id
     * @param {number} id - updated sold dish id
     * @param {Object} dish - updated sold dish
     * @param {Object} user - updated sold dish user
     * @param {Date} date - updated sold dish date
     */
    update: function (id, dish, user, date) {
        Sold
            .find({
                where: {
                    id: id
                }
            })
            .then(function (sold) {
                sold.updateAttributes({
                    date: date
                })
                .then(function () {
                        sold.setDish(dish);
                        sold.setUser(user);
                    });
            });
    },

    /**
     * Creates new sold dish
     * @param {Object} dish - new sold dish
     * @param {Object} user - sold dish user
     * @param {Date} date - new sold dish date
     */
    create: function (dish, user, date) {
        Sold
            .build({date: date})
            .save()
            .then(function (sold) {
                sold.addDish(dish);
                sold.addUser(user);
            });
    }
};

SoldCRUD.__proto__ = new CRUD(Sold);

module.exports = SoldCRUD;
