'use strict';

angular.module('ogcApp')
    .controller('SmartListCtrl', function ($scope, $routeParams, $location, CurrentProject, SmartLists, ListTypes,  PrepareSmartListRecord, $modal, Projects, ngTableParams) {

        $scope.currentProjectId = $routeParams.id;
        $scope.listItems = [];
        $scope.smartLists = [];

        Projects.get({id : $scope.currentProjectId},function(res) {
            $scope.project = res;
          });

        ListTypes.query(function(response) {
            $scope.listTypes = response;
            $scope.filterByListType($scope.listTypes[0]);
          });

        // Set the table properties
        /*jshint -W055 */
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 50           // count per page
          }, {
            counts: [], // hide page counts control
            total: $scope.listItems.length, // length of data
            getData: function($defer, params) {
                $defer.resolve($scope.listItems);
              }
          });
        /*jshint +W055 */

        $scope.filterByListType = function(listType) {
            // Set the column Collection
            $scope.columnCollection = listType.views[3].fields;
            var searchObject = {};
            searchObject.Type = listType.name;
            $scope.items = [];
            // get the project Data
            SmartLists.get({id : $scope.currentProjectId},function(response) {
                $scope.smartLists = response;
                $scope.listItems = response[searchObject.Type];
              });
          };

        // Modal New Project Form
        $scope.saveFormDetails = function(formData) {
            var myRecord = PrepareSmartListRecord.getRecord(formData,$scope.selectedType);
            var newSmartListItem = new SmartLists(myRecord);
            newSmartListItem.$save({id : $scope.currentProjectId, type : $scope.selectedType },function(response) {
            });
            SmartLists.get({id : $scope.currentProjectId},function(response) {
                $scope.listItems = response[$scope.selectedType];
              });
          };

        $scope.openCreateListModal = function (selectedList) {
            // get tags
            $scope.selectedType = selectedList.name;
            var modalInstance = $modal.open({
                templateUrl: 'partials/modalSmartListCreate.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    items: function () {
                        return selectedList.views[0].fields;
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

            $scope.ok = function () {
                $modalInstance.close($scope.items);
              };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
              };

          };

      });

