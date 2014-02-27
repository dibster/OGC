'use strict';

angular.module('ogcApp')
    .controller('ConfigCtrl', function ($scope, $http, config, objectTypes) {

        config.query(function(response) {
            $scope.objects = response;
          });

        objectTypes.query(function(response) {
            $scope.types = response;
            console.log($scope.types);
          });

      });