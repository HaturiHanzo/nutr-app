/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../database'),
    Sold = require('../sold/sold.model.js').model,
    Dish = require('../dish/dish.model.js').model,
    DishIngredientList = require('../dishIngredientList/dishIngredientList.model.js').model,
    Ingredient = require('../ingredient/ingredient.model.js').model,
    IngredientTypeCheck = require('../ingrType'),
    IngredientType = require('../ingrType/ingrType.model.js').model,
    Measurement = require('../measurement/measurement.model.js').model,
    User = require('../user/user.model.js').model;

function createDb(){
    connection.sync({force: true});
}

module.exports = createDb;