(function () {
    'use strict';

    var backendTransactionCtrl = require('../server/models/transaction');

    angular
        .module('nutr')
        .controller('adminReportCtrl', [
            '$q',
            '$scope',
            function ($q, $scope) {

                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                var afterTomorrow = new Date();
                afterTomorrow.setDate(tomorrow.getDate() + 1);

                $scope.today = function () {
                    $scope.dtStart = new Date();
                    $scope.dtFinish = new Date(tomorrow);
                };
                $scope.today();
                $scope.hourStart = 15;
                $scope.hourFinish = 3;
                $scope.clear = function () {
                    $scope.dtStart = null;
                    $scope.dtFinish = null;
                };

                $scope.inlineOptions = {
                    customClass: getDayClass,
                    minDate: new Date(),
                    showWeeks: true
                };

                $scope.open1 = function () {
                    $scope.popup1.opened = true;
                };

                $scope.open2 = function () {
                    $scope.popup2.opened = true;
                };

                $scope.setDate = function (year, month, day) {
                    $scope.dtStart = new Date(year, month, day);
                };

                $scope.popup2 = {
                    opened: false
                };

                $scope.popup1 = {
                    opened: false
                };

                $scope.events = [
                    {
                        date: tomorrow,
                        status: 'full'
                    },
                    {
                        date: afterTomorrow,
                        status: 'partially'
                    }
                ];

                function getDayClass(data) {
                    var date = data.date,
                        mode = data.mode;
                    if (mode === 'day') {
                        var dayToCheck = new Date(date).setHours(0,0,0,0);

                        for (var i = 0; i < $scope.events.length; i++) {
                            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                            if (dayToCheck === currentDay) {
                                return $scope.events[i].status;
                            }
                        }
                    }

                    return '';
                }

                $scope.search = function () {
                    backendTransactionCtrl
                        .query()
                        .then(function (products) {
                            $scope.products = [];
                            $scope.allIncome = 0;
                            $scope.dtStart.setHours($scope.hourStart,0,0,0);
                            $scope.dtFinish.setHours($scope.hourFinish,0,0,0);
                            var wantedDate = new Date($scope.dtStart),
                                nextWantedDate = new Date($scope.dtFinish);
                            $scope.products = products.filter(function (product) {
                                return product.date.getTime() >= wantedDate.getTime() && product.date.getTime() <= nextWantedDate.getTime();

                            });
                            return $q.all($scope.products.map(function (product) {
                                return product
                                    .getUser()
                                    .then(function (user) {
                                        if (product.type == 'buy') {
                                            $scope.allIncome -= product.cost;
                                        } else if (product.type == 'sell') {
                                            $scope.allIncome += product.cost;
                                        }
                                        product.userName = user.fullName;
                                    });
                            }));
                        }, function (err) {
                            alert(err);
                        })
                        .finally(function () {
                            $scope.$apply();
                        })
                }
            }]
    )
    .filter('range', function () {
        return function (input, min, max) {
            min = parseInt(min); //Make string input int
            max = parseInt(max);
            for (var i = min; i < max; i++) {
                input.push(i);
            }
            return input;
        };
    });
}());



$scope.tables = [
    {
        name: 'стол 1',
        id: 'genRandomId',
        dishes: [
            {
                dishRef: 'борщ_id',
                quantity: 51
            },{
                dishRef: 'сыр_id',
                quantity: 125
            }
        ]
    }, {
        name: 'стол 2',
        dishes: [
            {
                dishRef: 'борщ_id',
                quantity: 5
            },{
                dishRef: 'сало_id',
                quantity: 15
            }
        ]
    }
];