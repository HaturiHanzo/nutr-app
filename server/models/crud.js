/* jshint node: true */
'use strict';

function CRUD(model) {
    this.model = model;
}

CRUD.prototype = {
    create: function(params){
        return this.model.create(params);
    },
    remove: function(id){
        return this.model.findById(id).success(function (foundObj) {
            foundObj.destroy().error(function(err){
                console.log(err);
            });
        });
    },
    update: function(params){
        return this.model.findById(params.id).success(function(foundObj){
            foundObj.updateAttributes(params);
        });
    },
    read: function(){
        return this.model.findAll();
    }
}

CRUD.prototype.constructor = CRUD;

module.exports = CRUD;