'use strict';

angular.module('ogcApp')
    .controller('ConfigCtrl', function ($scope, Objects, ObjectTypes) {

        $scope.newObject = {};
        $scope.object = {};

        // get base admin object configuration data

        Objects.query(function(response) {
            $scope.objects = response;
          });

        ObjectTypes.query(function(response) {
            $scope.types = response;
          });

        // create a new Object
        
        $scope.create = function() {

            $scope.object = new Objects({
                name: $scope.newObject.name,
                type: $scope.search.type,
                template : false
              });
            $scope.objects.push($scope.object);
            $scope.newObject.name = '';
            $scope.object = $scope.object.$save(function(response) {
                return response;
              });
          };
      });
