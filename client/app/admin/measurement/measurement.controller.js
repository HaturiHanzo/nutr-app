/**
 * Admin other controller
 *
 * @namespace Controllers
 */
(function () {
    'use strict';

    var backendMeasurementCtrl = require('../server/models/measurement');

    angular
        .module('nutr')
        .controller('adminMeasurementCtrl', [
            '$http',
            '$scope',
            function ($http, $scope) {

                /**
                 * Gets all measurements
                 *
                 * @returns {Promise}
                 */
                $scope.getMeasurements = function () {
                    return backendMeasurementCtrl
                        .query()
                        .then(function (measurements) {
                            $scope.measurements = measurements;
                        }, function (error) {
                            alert(error);
                        })
                        .finally(function () {
                            $scope.$apply();
                        });
                };

                /**
                 * Adds a new measurement
                 */
                $scope.addMeasurement = function () {
                    backendMeasurementCtrl
                        .create({name: $scope.name})
                        .then(function (measurement) {
                            $scope.measurements.push(measurement);
                            $scope.name = '';
                        }, function (error) {
                            alert(error);
                        })
                        .finally(function () {
                            $scope.$apply();
                        });
                };

                /**
                 * Removes measurement by id
                 * @param {Number} id - measurement id
                 */
                $scope.deleteMeasurement = function (id) {
                    backendMeasurementCtrl
                        .remove(id)
                        .then(function (measurement) {
                            $scope.measurements.some(function (measurement, index) {
                                return measurement.id === id
                                    ? $scope.measurements.splice(index, 1)
                                    : false;
                            })
                        }, function (error) {
                            // TODO use custom alert
                            alert(error);
                        })
                        .finally(function () {
                            $scope.$apply();
                        });
                }

                $scope.getMeasurements();
            }]);
}());