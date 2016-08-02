/* jshint node: true */
'use strict';

var Q = require('q'),
    Measurement = require('./measurement.model.js').model,
    CRUD = ('../crud.js');


var MeasurementCRUD = {

}

MeasurementCRUD.prototype = new CRUD(Measurement);


module.exports = MeasurementCRUD;
