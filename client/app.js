var gui = require('nw.gui');
var win = gui.Window.get();
win.resizeTo(1000, 700);

'use strict';

var app = angular.module("nutr",[
    "ui.router",
    "ui.bootstrap"
]);

app.config(["$locationProvider","$stateProvider", function($locationProvider,$stateProvider) {
    $stateProvider
        .state('auth', {
            url: '',
            controller : 'authCtrl',
            templateUrl : '/app/auth/auth.html'
        })
        .state('admin', {
            url: '/admin',
            controller : 'adminCtrl',
            templateUrl: '/app/admin/admin.html'
        })
}]);
