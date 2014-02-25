'use strict';

angular.module('ogcApp')
    .controller('ConfigCtrl', function ($scope, $http, config) {

        config.query(function(response) {
            $scope.objects = response;
          });

      });
