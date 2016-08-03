/* jshint node: true */
'use strict';

var Sequelize = require('sequelize'),
    connection = require('../database'),
    Sold = require('../models/sold/sold.model.js').model,
    Dish = require('../models/dish/dish.model.js').model,
    DishIngredientList = require('../models/dishIngredientList/dishIngredientList.model.js').model,
    Ingredient = require('../models/ingredient/ingredient.model.js').model,
    IngredientType = require('../models/ingrType/ingrType.model.js').model,
    Measurement = require('../models/measurement/measurement.model.js').model,
    User = require('../models/user/user.model.js').model,
    UserCRUD = require('../models/user');

function createDb(){
    connection.sync().then(function(){
        return UserCRUD.create({
            fullName : "test",
            password: "1",
            login: "test",
            role: "admin"
        })
    });
}


module.exports = createDb;