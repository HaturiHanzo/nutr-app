/* jshint node: true */
'use strict';

var Q = require('q'),
    Dish = require('./dish.model.js').model,
    CRUD = require('../crud.js');

var DishCRUD = {

}


DishCRUD.__proto__ = new CRUD(Dish);

module.exports = DishCRUD;
