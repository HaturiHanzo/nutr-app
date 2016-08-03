/* jshint node: true */
'use strict';

var Q = require('q'),
    Sold = require('./sold.model.js').model,
    CRUD = require('../crud.js');

var SoldCRUD = {
    /**
     * Updates sold dish by id
     * @param {integer} id - updated sold dish id
     * @param {object} dish - updated sold dish
     * @param {object} user - updated sold dish user
     * @param {date} date - updated sold dish date
     */
    update: function (id, dish, user, date) {
        Sold.find({
            where: {
                id: id
            }
        }).success(function (sold) {
            sold.updateAttributes({
                date: date
            }).success(function () {
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
            .build({ date: date })
            .save()
            .success(function(sold) {
                sold.addDish(dish);
                sold.addUser(user);
            }).error(function(error) {
                console.log(error);
            });
    }
};

SoldCRUD.__proto__ = new CRUD(Sold);

module.exports = SoldCRUD;

