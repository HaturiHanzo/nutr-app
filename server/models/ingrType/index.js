/* jshint node: true */
'use strict';

var Q = require('q'),
    IngredientType = require('./ingrType.model.js').model,
    CRUD = require('../crud.js');


var IngredientTypeCRUD = {

};

IngredientTypeCRUD.__proto__ = new CRUD(IngredientType);

module.exports =IngredientTypeCRUD;
