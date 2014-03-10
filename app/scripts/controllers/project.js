'use strict';

angular.module('ogcApp')
    .controller('ProjectCtrl', function ($scope, Objects, ObjectTypes, ProjectTypes, PrepareRecord, $modal, Projects, hashTags) {

        $scope.projectInstances = [{}];

        $scope.selectedType = '';

        ProjectTypes.query(function(response) {
            $scope.projectTypes = response;
          });

        // project tree build.
        //        $scope.myData = [{
        //            label: 'Languages',
        //            children: ['Jade','Less','CoffeeScript']
        //          }];

        $scope.saveFormDetails = function(formData) {
            var myRecord = PrepareRecord.getRecord(formData,$scope.selectedType);
            var ogcProject = new Projects(myRecord);

            $scope.project = ogcProject.$save(function(response) {
                $scope.projectInstances.push(response);
                //                return response;
              });
          };

        $scope.openCreateProjectModal = function (selectedObject) {
            // get tags
            $scope.selectedType = selectedObject.name;
            var modalInstance = $modal.open({
                templateUrl: 'partials/modalProjectCreate.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    items: function () {
                        return selectedObject.views[0].fields;
                      }
                  }
                });

            modalInstance.result.then(function (selectedItem) {
                $scope.formData = selectedItem;
                $scope.saveFormDetails($scope.formData);

              }, function () {
                console.log('Modal dismissed at: ' + new Date());
              });
          };


        var ModalInstanceCtrl = function($scope,$modalInstance, items) {

            $scope.items = items;
            $scope.bannertypes = ['40K Banner', 'Static Banner', '100K Banner'];

            // this would get values from backend,  but not implemented yet

            $scope.getTagValues = function(fieldname) {
                //
                hashTags.get({id : fieldname},function(tag) {
                    //$log.info('tag values : ' + tag.values[0].value );
                    return tag.values;
                  });
              };

            $scope.ok = function () {
                $modalInstance.close($scope.items);
              };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
              };

          };
      });

