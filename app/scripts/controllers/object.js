'use strict';

angular.module('ogcApp')
  .controller('ObjectCtrl', function ($scope, $routeParams,  Objects, ObjectFieldTypes) {

        $scope.object = {};
        $scope.fieldTypes = {};

        Objects.get({id : $routeParams.id},function(object) {
            $scope.object = object;
          });

        ObjectFieldTypes.query(function(fieldtypes) {
            $scope.fieldTypes = fieldtypes;
          });

      });

