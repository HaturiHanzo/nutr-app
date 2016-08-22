/* jshint node: true */
'use strict';

var connection = require('../database'),
    UserCRUD = require('../models/user'),
    MeasurementCRUD = require('../models/measurement'),
    IngredientCRUD = require('../models/ingredient'),
    DishCRUD = require('../models/dish');

function createDb() {
    connection
        .sync({
            force: true
        })
        .then(function () {
            return UserCRUD.create({
                    fullName: 'test',
                    password: '1',
                    login: 'test',
                    role: 'admin'
                }
            )
        })
        .then(function () {
            return UserCRUD.create({
                    fullName: 'test2',
                    password: '2',
                    login: 'test2',
                    role: 'user'
                })
        })
        .then(function () {
            return MeasurementCRUD.create({
                    name: 'Литр'
                })
        })
        .then(function (measurement) {
            return IngredientCRUD.create({
                name: 'Вода',
                type: 'drink'
            })
        })
        .then(function (ingredient) {
            return DishCRUD
                .create({
                    name: 'Лимонад',
                    price: 30
                })
                .then(function (dish) {
                    dish.addIngredient(ingredient, {amount: 0.2});
                })
        })
        .then(function () {
            return MeasurementCRUD.create({
                name: 'Пучок'
            })
        }).then(function () {
            return IngredientCRUD.create({
                name: 'Зелень',
                type: 'food'
            })
        })
        .then(function (ingredient) {
            return DishCRUD
                .create({
                    name: 'Салат',
                    price: 60
                })
                .then(function (dish) {
                    dish.addIngredient(ingredient, {amount: 1});
                })
        })
        .then(function () {
            return MeasurementCRUD.create({
                name: 'Штук'
            })
        })
        .then(function (measurement) {
            return IngredientCRUD
                .create({
                    name: 'Картошка',
                    type: 'food'
                })
        })
        .then(function (ingredient) {
            return DishCRUD
                .create({
                    name: 'Картофельный гарнир',
                    price: 20
                })
                .then(function (dish) {
                    dish.addIngredient(ingredient, {amount: 6});
                })
        })

}

module.exports = createDb;
