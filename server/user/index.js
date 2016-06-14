'use strict';

var User = require('./user.model.js').model;

function create(name, pass, role) {
    return User.create({
        name : name,
        password : pass,
        role : role
    });
}

function authenticate() {

}

function remove() {

}

function update() {

}

module.exports = {
    create : create,
    remove : remove,
    update : update,
    authenticate : authenticate
};


//User.findOne().then(function (user) {
//    console.log(user);
//});
