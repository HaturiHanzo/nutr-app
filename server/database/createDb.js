/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../database'),
    Sold = require('../models/sold.model.js').model,
    Dish = require('../models/dish.model.js').model,
    DishIngredientList = require('../models/dishIngredientList.model.js').model,
    Ingredient = require('../models/ingredient.model.js').model,
    IngredientTypeCheck = require('../models/ingrType'),
    IngredientType = require('../models/ingrType.model.js').model,
    Measurement = require('../models/measurement.model.js').model,
    User = require('../models/user.model.js').model;

function createDb(){
    connection.sync({force: true});
}

module.exports = createDb;