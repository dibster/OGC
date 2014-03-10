'use strict';

angular.module('ogcApp')
    .controller('ObjectViewsCtrl', function ($scope, $routeParams, Objects) {

        $scope.alerts = [
            { type: 'success', msg: 'Add fields to views from Available fields, drag fields in views to change the order'}
          ];

        $scope.objectRoute = $routeParams.id;

        $scope.object = {};

        Objects.get({id : $routeParams.id},function(object) {
            $scope.object = object;
          });

        $scope.addFieldToViews = function(selectedField) {

            $scope.object._id = $routeParams.id;
            // iterate through all views
            var numberOfViews = $scope.object.views.length;
            for(var i=0;i<numberOfViews;i++) {
              var fieldExists = false;
              // get the array length
              var arrayLength = $scope.object.views[i].fields.length;
              // does the field exist
              for (var index = 0; index < arrayLength; ++index) {
                if ($scope.object.views[i].fields[index].name === selectedField.name) {
                  fieldExists = true;
                  break;
                }
              }
              if (!fieldExists) {
                $scope.object.views[i].fields.push(selectedField);
              }
            }

            $scope.object.$update(function(response) {
              $scope.object = response;
            });
          };

        $scope.removeViewField = function(viewNumber,viewCOlumnId) {
            $scope.object._id = $routeParams.id;
            $scope.object.views[viewNumber].fields.splice(viewCOlumnId, 1);
            $scope.object.$update(function(response) {
                $scope.object = response;
              });
          };

        // sorting (drag drop)

        $scope.dragDropUpdate = {
            // called after a node is dropped
            stop: function(e, ui) {
                $scope.object._id = $routeParams.id;
                $scope.object.views[ui.item.scope().viewIndex].fields = ui.item.scope().view.fields;
                $scope.object.$update(function(response) {
                    $scope.object = response;
                  });
              }
          };

      });
