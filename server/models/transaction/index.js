/* jshint node: true */
'use strict';

var Q = require('q'),
    Transaction = require('./transaction.model.js').model,
    CRUD = require('../query.js'),
    TransactionCRUD;

TransactionCRUD = {
    /**
     * Finds all instances
     */
    query: function (where) {
        return Transaction.findAll(
            where
        )
    }
};

TransactionCRUD.__proto__ = new CRUD(Transaction);

module.exports = TransactionCRUD;
