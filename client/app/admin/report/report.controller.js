(function () {
    'use strict';

    var backendTransactionCtrl = require('../server/models/transaction');

    angular
        .module('nutr')
        .controller('adminReportCtrl', [
            '$q',
            '$scope',
            function ($q, $scope) {

                // All for datepicker
                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                var afterTomorrow = new Date();
                afterTomorrow.setDate(tomorrow.getDate() + 1);

                $scope.today = function () {
                    $scope.dtStart = new Date();
                    $scope.dtFinish = new Date(tomorrow);
                };
                $scope.today();
                $scope.clear = function () {
                    $scope.dtStart = null;
                    $scope.dtFinish = null;
                    $scope.hourStart = null;
                    $scope.hourFinish = null;
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

                //All for timepicker
                $scope.setStartTime = function () {
                    var d = new Date();
                    d.setHours(3);
                    d.setMinutes(0);
                    $scope.hourStart = d;
                };

                $scope.setFinishTime = function () {
                    var d = new Date();
                    d.setHours(3);
                    d.setMinutes(0);
                    $scope.hourFinish = d;
                };

                $scope.setStartTime();
                $scope.setFinishTime();

                $scope.ismeridian = true;


                //All for pagination
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };

                $scope.currentPage = 1;
                /**
                 * Sets total pagination items and counts proceeds
                 */
                $scope.setTotalItemPaginationAndCountProceeds = function () {
                    $scope.allIncome = 0;
                    backendTransactionCtrl
                        .query({
                            where: {
                                date: {
                                    $lt: new Date($scope.dtFinish),
                                    $gt: new Date($scope.dtStart)
                                }
                            }
                        })
                        .then(function (products) {
                            $scope.totalItems = products.length;
                            products.forEach(function (product) {
                                if (product.type == 'buy') {
                                    $scope.allIncome -= product.price * product.amount;
                                } else if (product.type == 'sell') {
                                    $scope.allIncome += product.price * product.amount;
                                }
                            });
                        })
                        .finally(function () {
                            $scope.$apply();
                        })
                };

                /**
                 * Searches transactions within definite dates
                 */
                $scope.search = function () {
                    $scope.dtStart.setHours($scope.hourStart.getHours(),0,0,0);
                    $scope.dtFinish.setHours($scope.hourFinish.getHours(),0,0,0);
                    backendTransactionCtrl
                        .query({
                            offset: 10 * ($scope.currentPage - 1),
                            limit: 10,
                            where: {
                                date: {
                                    $lt: new Date($scope.dtFinish),
                                    $gt: new Date($scope.dtStart)
                                }
                            }
                        })
                        .then(function (products) {
                            $scope.products = products;
                            $scope.setTotalItemPaginationAndCountProceeds();
                            return $q.all($scope.products.map(function (product) {
                                return product
                                    .getUser()
                                    .then(function (user) {
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
}());