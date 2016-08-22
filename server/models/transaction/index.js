/* jshint node: true */
'use strict';

var Q = require('q'),
    Transaction = require('./transaction.model.js').model,
    CRUD = require('../query.js'),
    TransactionCRUD;

TransactionCRUD = {};

TransactionCRUD.__proto__ = new CRUD(Transaction);

module.exports = TransactionCRUD;
