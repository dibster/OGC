'use strict';

angular.module('ogcApp')
  .controller('ObjectCtrl', function ($scope, $routeParams, $modal, $log,  Objects, ObjectFieldTypes) {

        $scope.object = {};
        $scope.fieldTypes = {};

        Objects.get({id : $routeParams.id},function(object) {
            $scope.object = object;
          });

        ObjectFieldTypes.query(function(fieldtypes) {
            $scope.fieldTypes = fieldtypes;
          });

        $scope.addField = function(addnewfield) {

            Objects.get({id : $routeParams.id},function(object) {
                $scope.object = object;
              });

            if (!(_.has($scope.object, 'fields')))
            {
              $scope.object.fields = [addnewfield];
            }
            else {
              $scope.object.fields.push(addnewfield);
            }

            // TODO object id is being lost 2nd time through the controller, so resetting it here until fixed
            $scope.object._id = $routeParams.id;

            $scope.object.$update(function(response) {
                $scope.object = response;
              });

            $scope.newfield = {};
            $scope.newfield.req = 'n';

          };

        // Modal Window for field Edit

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

