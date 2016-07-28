/* jshint node: true */
'use strict';

var Q = require('q'),
    Sold = require('./sold.model.js').model;

/**
 * Creates new sold dish
 * @param {object} dish - new sold dish
 * @param {object} user - sold dish user
 * @param {date} date - new sold dish date
 */

function create(dish, user, date) {
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
/**
 * Removes sold dish by id
 * @param {integer} id - deleted sold id
 */
function remove(id) {
    Sold.find({
        where:{
            id : id
        }
    }).success(function (sold) {
        sold.destroy().error(function(err){
            console.log(err);
        });
    });
}
/**
 * Updates sold dish by id
 * @param {integer} id - updated sold dish id
 * @param {object} dish - updated sold dish
 * @param {object} user - updated sold dish user
 * @param {date} date - updated sold dish date
 */
function update(id, dish, user, date) {
    Sold.find({
        where:{
            id: id
        }
    }).success(function(sold){
        sold.updateAttributes({
            date: date
        }).success(function(){
            sold.setDish(dish);
            sold.setUser(user);
        });
    });
}

module.exports = {
    create: create,
    remove: remove,
    update: update
};
