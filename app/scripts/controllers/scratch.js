'use strict';

angular.module('ogcApp')
    .controller('ScratchCtrl', function ($scope, Objects, ObjectDefinitionForType, SayToConsole, ObjectTypes, ProjectTypes, PrepareRecord, $modal, Projects, hashTags, ngTableParams) {

    $scope.materialTypes = [];
    $scope.selectedAssetType = {};
    $scope.showTypeField = false;
    ObjectDefinitionForType.query({type : 'Asset'},function(res) {
        if (res.length > 0) {
          $scope.materialTypes= res;
        }
      });

    $scope.getFieldTypes = function(selectedAssetType) {
        console.log('in type selection' + selectedAssetType.name);
        // check for type field in the create view
        var createView = _.find(selectedAssetType.views, function (view) {
            return view.name === 'Create';
          });
        $scope.TypeField = _.find(createView.fields, function (field) {
            return field.name === 'Type';
          });

        $scope.showTypeField = false;

        if (typeof $scope.TypeField !== 'undefined') {
          $scope.showTypeField = true;
          console.log('type ' + $scope.TypeField);
        }
      };
  });

