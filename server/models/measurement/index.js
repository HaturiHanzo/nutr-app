/* jshint node: true */
'use strict';

var Q = require('q'),
    Measurement = require('./measurement.model.js').model,
    CRUD = require('../query.js'),
    MeasurementCRUD;


MeasurementCRUD = {};

MeasurementCRUD.__proto__ = new CRUD(Measurement);

module.exports = MeasurementCRUD;
