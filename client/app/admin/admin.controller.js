(function(){
    'use strict';

    angular
        .module('nutr')
        .controller("authCtrl", [
            '$http',
            '$scope',
            function($http, $scope){
                alert('admin');
            }]);
}());