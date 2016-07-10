(function () {
    'use strict';

    var gui = require('nw.gui'),
        win = gui.Window.get();
    win.resizeTo(1000, 700);

    var app = angular.module('nutr',[
        'ui.router',
        'ui.bootstrap'
    ]);

    app.config(['$locationProvider','$stateProvider', function ($locationProvider, $stateProvider) {
        $stateProvider
            .state('auth', {
                url: '',
                controller: 'authCtrl',
                templateUrl: '/app/auth/auth.html'
            })
            .state('admin', {
                url: '/admin',
                controller: 'adminCtrl',
                templateUrl: '/app/admin/admin.html'
            });
    }]);
}());
