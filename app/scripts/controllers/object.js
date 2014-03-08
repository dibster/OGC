'use strict';

angular.module('ogcApp')
  .controller('ObjectCtrl', function ($scope, $routeParams, $modal, $log,  Objects, ObjectFieldTypes) {

        $scope.object = {};
        $scope.fieldTypes = {};
        $scope.objects = [];
        $scope.currentObjectId = $routeParams.id;

        Objects.get({id : $routeParams.id},function(object) {
            $scope.object = object;
          });

        ObjectFieldTypes.query(function(fieldtypes) {
            $scope.fieldTypes = fieldtypes;
          });

        Objects.query(function(objects) {
            $scope.objects = objects;
          });


        $scope.addField = function(addNewField) {

            Objects.get({id : $routeParams.id},function(object) {
                $scope.object = object;
              });

            if (!(_.has($scope.object, 'fields')))
            {
              $scope.object.fields = [addNewField];
            }
            else {
              $scope.object.fields.push(addNewField);
            }

            // TODO object id is being lost 2nd time through the controller, so resetting it here until fixed
            $scope.object._id = $routeParams.id;

            $scope.object.$update(function(response) {
                $scope.object = response;
              });

            $scope.newfield = {};
            $scope.newfield.req = 'n';

          };

        $scope.removeField = function(column) {

            Objects.get({id : $routeParams.id},function(object) {
                $scope.object = object;
              });

            $scope.object._id = $routeParams.id;
            var fieldIndex = $scope.object.fields.indexOf(column);
            $scope.object.fields.splice(fieldIndex, 1);

            // remove fields on views

            for(var i=0; i< $scope.object.views.length; i++)
            {
                // get the array length
              var arrayLength = $scope.object.views[i].fields.length;
                // does the field exist
              for (var index = 0; index < arrayLength; index++) {
                if ($scope.object.views[i].fields[index].name === column.name) {
                  $scope.object.views[i].fields.splice(index, 1);
                  break;
                }
              }
            }

            $scope.object.$update(function(response) {
                $scope.object = response;
              });
          };

        $scope.copySelectedObject = function(selectedItem) {

            Objects.get({id : $routeParams.id},function(object) {
                $scope.object = object;
              });

            $scope.object.fields = selectedItem.fields;
            $scope.objectId = $routeParams.id;
            $scope.object.views = selectedItem.views;

            $scope.object.$update(function(response) {
                $scope.object = response;
              });
          };



        //
        // Modal Window for field Edit
        //

        $scope.openFieldModal = function (index) {
            var thisModalField= JSON.parse( JSON.stringify( $scope.object.fields[index]) );
            console.log(thisModalField.type);

            var modalInstance = $modal.open({
                templateUrl: 'partials/modalFieldEdit.html',
                controller: FieldModalInstanceCtrl,
                resolve: {
                    modalField: function () {
                        if (_.has(thisModalField, 'values')) {
                          thisModalField.choices = thisModalField.values.join('\n');
                        }
                        return thisModalField;
                      },
                    fieldtypes: function () {
                        return $scope.fieldTypes;
                      }
                  }
                });

            modalInstance.result.then(function (updatedField) {
                // update the column
                if (updatedField.type === 'Choice') {
                  var values = updatedField.choices.split('\n');
                  // remove choice from updated Field and add the array
                  var newField = _.omit(updatedField,'choices');
                  newField.values = values;
                  $scope.object.fields[index] = newField;
                }
                else {
                  $scope.object.fields[index] = updatedField;
                }
                $scope.object._id = $routeParams.id;
                $scope.object.$update(function(response) {
                    $scope.object = response;
                  });
              }, function () {
                $log.info('Modal dismissed at: ' + new Date());
              });
          };

        var FieldModalInstanceCtrl = function($scope, $modalInstance, modalField, fieldtypes) {
            $scope.modalField = modalField;
            $scope.fieldtypes = fieldtypes;

            $scope.ok = function () {
                $modalInstance.close($scope.modalField);
              };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
              };
          };
      });

