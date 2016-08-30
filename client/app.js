/**
 * Nutr application angular module initialization
 *
 * @namespace Modules
 */
'use strict';

angular
    .module('nutr', [
        'ngAnimate',
        'ui.router',
        'ui.bootstrap'
    ])
    .constant('nutrConfiguration', {
        width: 900,
        height: 600,
        enviroment: 'production'
    })
    .config(['$locationProvider','$stateProvider', function ($locationProvider, $stateProvider) {
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
            })
            .state('admin.dish', {
                url: '/admin/dish',
                controller: 'adminDishCtrl',
                templateUrl: '/app/admin/dish/dish.html'
            })
            .state('admin.user', {
                url: '/admin/user',
                controller: 'adminUserCtrl',
                templateUrl: '/app/admin/user/user.html'
            })
            .state('admin.measurement', {
                url: '/admin/measurement',
                controller: 'adminMeasurementCtrl',
                templateUrl: '/app/admin/measurement/measurement.html'
            })
            .state('admin.ingredient', {
                url: '/admin/ingredient',
                controller: 'adminIngredientCtrl',
                templateUrl: '/app/admin/ingredient/ingredient.html'
            })
            .state('admin.report', {
                url: '/admin/report',
                controller: 'adminReportCtrl',
                templateUrl: '/app/admin/report/report.html'
            })
            .state('admin.stock', {
                url: '/admin/stock',
                controller: 'adminStockCtrl',
                templateUrl: '/app/admin/stock/stock.html'
            })
            .state('user', {
                url: '/user',
                controller: 'userCtrl',
                templateUrl: '/app/user/user.html'
            })
            .state('user.sell', {
                url: '/user/sell',
                controller: 'userSellCtrl',
                templateUrl: '/app/user/sell/sell.html'
            })
            .state('user.buy', {
                url: '/user/buy',
                controller: 'userBuyCtrl',
                templateUrl: '/app/user/buy/buy.html'
            });
    }])
    .run(['nwGui', function (nwGui) {
        nwGui.initialize();
    }]);
