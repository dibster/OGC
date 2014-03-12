'use strict';

angular.module('ogcApp')
    .controller('ProjectCtrl', function ($scope, Objects, ObjectTypes, ProjectTypes, PrepareRecord, $modal, Projects, hashTags, ngTableParams) {

        $scope.projects = [{}];

        $scope.selectedType = '';

        ProjectTypes.query(function(response) {
            $scope.projectTypes = response;
          });

        Projects.query(function(response) {
            $scope.projects = response;
          });

        // Set the table properties
        /*jshint -W055 */
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 50           // count per page
          }, {
            counts: [], // hide page counts control
            total: $scope.projects.length, // length of data
            getData: function($defer, params) {
                $defer.resolve($scope.projects);
              }
          });
        /*jshint +W055 */

        $scope.filterByProjectType = function(objectType) {

            // Set the column Collection

            $scope.columnCollection = objectType.views[3].fields;

            var searchObject = {};
            searchObject.Type = objectType.name;
            var searchString = encodeURIComponent(JSON.stringify(searchObject));

            // get the project Data
            Projects.query({filter : searchString},function(response) {
                $scope.projects = response;
              });

          };



        // Modal New Project Form
        $scope.saveFormDetails = function(formData) {
            var myRecord = PrepareRecord.getRecord(formData,$scope.selectedType);
            var ogcProject = new Projects(myRecord);

            $scope.project = ogcProject.$save(function(response) {
                $scope.projects.push(response);
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

