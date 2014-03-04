'use strict';

angular.module('ogcApp')
    .controller('ObjectViewsCtrl', function ($scope, $routeParams, Objects) {

        $scope.object = {};

        Objects.get({id : $routeParams.id},function(object) {
            $scope.object = object;
          });

        $scope.addFieldToViews = function(selectedItem) {

            $scope.object._id = $routeParams.id;
            // iterate through all views
            var numberOfViews = $scope.object.views.length;
            for(var i=0;i<numberOfViews;i++) {
              var fieldExists = false;
              // get the array length
              var arrayLength = $scope.object.views[i].fields.length;
              // does the field exist
              for (var index = 0; index < arrayLength; ++index) {
                if ($scope.object.views[i].fields[index].name === selectedItem.name) {
                  fieldExists = true;
                  break;
                }
              }
              if (!fieldExists) {
                $scope.object.views[i].fields.push(selectedItem);
              }
            }

            $scope.object.$update(function(response) {
              $scope.object = response;
            });
          };

        $scope.removeViewField = function(viewnumber,viewcolumnid) {
            $scope.object._id = $routeParams.id;
            $scope.object.views[viewnumber].fields.splice(viewcolumnid, 1);
            $scope.object.$update(function(response) {
                $scope.object = response;
              });
          };

        // sorting (drag drop)

        $scope.sortingLog = [];

        $scope.sortableOptionsCreate = {
            // called after a node is dropped
            stop: function(e, ui) {
                var logEntry = {
                    ID: $scope.sortingLog.length + 1,
                    Text: 'Moved element: ' + ui.item.scope().item.text
                  };
                $scope.sortingLog.push(logEntry);
                $scope.object.views[0].fields = $scope.createview;
                $scope.object.$update(function(response) {
                });
              }
          };

      });
