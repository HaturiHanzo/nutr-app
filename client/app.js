/**
 * Nutr application angular module initialization
 *
 * @namespace Modules
 */
'use strict';

angular
    .module('nutr', [
        'ui.router',
        'ui.bootstrap'
    ])
    .constant('nutrConfiguration', {
        width: 900,
        height: 600,
        enviroment: 'development'
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
                controller: ['$state',function ($state) {
                    $state.go('admin.user');
                }],
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
            .state('admin.other', {
                url: '/admin/other',
                controller: 'adminOtherCtrl',
                templateUrl: '/app/admin/other/other.html'
            })
            .state('admin.ingredient', {
                url: '/admin/ingredient',
                controller: 'adminIngredientCtrl',
                templateUrl: '/app/admin/ingredient/ingredient.html'
            })
            .state('user', {
                url: '/user',
                controller: 'userCtrl',
                templateUrl: '/app/user/user.html'
            });
    }])
    .run(['nwGui', function (nwGui) {
        nwGui.initialize();
    }]);
