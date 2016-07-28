/* jshint node: true */
'use strict';

var Q = require('q'),
    Measurement = require('./measurement.model.js').model;

/**
 * Creates new measurement
 * @param {string} name - new measurement name
 * @returns {Promise.<Sequelize>} promised new measurement
 */

function create(name) {
    return Measurement.create({
        name: name
    });
}
/**
 * Removes measurement by id
 * @param {integer} id - deleted measurement id
 */
function remove(id) {
    Measurement.find({
        where:{
            id : id
        }
    }).success(function (measurement) {
        measurement.destroy().error(function(err){
            console.log(err);
        });
    });
}

/**
 * Updates measurement by id
 * @param {integer} id - updated measurement id
 * @param {string} name - updated measurement name
 */
function update(id, name) {
    Measurement.find({
        where:{
            id: id
        }
    }).success(function(measurement){
        measurement.updateAttributes({
            name: name
        });
    });
}

module.exports = {
    create: create,
    remove: remove,
    update: update
};
