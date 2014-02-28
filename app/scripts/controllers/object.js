'use strict';

angular.module('ogcApp')
  .controller('ObjectCtrl', function ($scope, $routeParams,  Objects) {

        $scope.object = {};

        Objects.get({id : $routeParams.id},function(object) {
            $scope.object = object;
          });

      });

