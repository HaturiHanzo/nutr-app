/* jshint node: true */
'use strict';

var Q = require('q'),
    Dish = require('./dish.model.js').model;

/**
 * Creates new dish
 * @param {string} name - new dish name
 * @param {string} price - new dish price
 * @returns {Promise.<Sequelize>} promised new dish
 */
function create(name, price) {
    return Dish.create({
        name: name,
        price: price
    });
}
/**
 * Removes dish by id
 * @param {integer} id - deleted dish id
 */
function remove(id) {
    Dish.find({
        where:{
            id : id
        }
    }).success(function (dish) {
        dish.destroy().error(function(err){
            console.log(err);
        });
    });
}
/**
 * Updates dish by id
 * @param {integer} id - updated dish id
 * @param {string} name - updated dish name
 * @param {float} price - updated dish price
 */
function update(id, name, price) {
    Dish.find({
        where:{
            id: id
        }
    }).success(function(dish){
        dish.updateAttributes({
            name: name,
            price: price
        });
    });
}

module.exports = {
    create: create,
    remove: remove,
    update: update
};
