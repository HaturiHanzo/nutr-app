/* jshint node: true */
'use strict';

var Q = require('q'),
    IngredientType = require('./ingrType.model.js').model,
    CRUD = require('../query.js'),
    IngredientTypeCRUD = {};

IngredientTypeCRUD.__proto__ = new CRUD(IngredientType);

module.exports = IngredientTypeCRUD;
