'use strict';

angular.module('ogcApp')
    .controller('ConfigAdminCtrl', function ($scope, Objects, ObjectTypes) {

        $scope.newObject = {};
        $scope.object = {};
        $scope.search = {};


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
                template : false,
                views : [{name : 'Create', fields : []},{name : 'Edit', fields : []},{name : 'Show', fields : []},{name : 'List', fields : []},{name : 'Dashboard', fields : []}]
              });


            $scope.objects.push($scope.object);
            $scope.newObject.name = '';
            $scope.object = $scope.object.$save(function(response) {
                return response;
              });
          };

        $scope.removeObject = function(object) {
          var index = $scope.objects.indexOf(object);
          $scope.objects.splice(index, 1);
          object.$remove();
        };

      });
