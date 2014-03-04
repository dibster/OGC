'use strict';

angular.module('ogcApp')
    .controller('ObjectViewsCtrl', function ($scope, $routeParams, $modal, $log,  Objects) {

        $scope.object = {};

        Objects.get({id : $routeParams.id},function(object) {
            $scope.object = object;
          });

      });

