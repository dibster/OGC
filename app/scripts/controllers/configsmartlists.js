'use strict';

angular.module('ogcApp')
    .controller('ConfigSmartListsCtrl', function ($scope, Objects, ObjectDefinitionForType) {

        $scope.newObject = {};
        $scope.object = {};
        $scope.search = {};

        ObjectDefinitionForType.query({type : 'List'},function(response) {
            $scope.objects = response;
            $scope.showTypeFilter = false;
          });

        // create a new Object

        $scope.create = function() {

            $scope.object = new Objects({
                name: $scope.newObject.name,
                type: 'List',
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
