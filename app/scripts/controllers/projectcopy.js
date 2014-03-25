'use strict';

angular.module('ogcApp')
    .controller('ProjectCopyCtrl', function ($scope, Objects, $location, $routeParams,  ObjectTypes, ObjectDefinitionForType, SimilarProjects, ProjectTypes, SearchResults, ngTableParams,Projects ) {

        $scope.columnCollection = [];
        $scope.searchResults = [];
        $scope.projectSelected = false;
        // get any saved search results (when new project created)

        $scope.searchResults = SearchResults;

        if (_.isEmpty($scope.searchResults)) {
          SimilarProjects.query({id : $routeParams.id},function(res) {
              if (res.length > 0) {
                $scope.searchResults = res;
                $scope.alerts = [
                    { type: 'success', msg: 'Have found ' + res.length + ' similar ' + $scope.searchResults[0].Type + 's. Closest match at the top' }
                  ];
                if ($scope.searchResults.length > 0) {
                        // get the columns for the list view
                  ObjectDefinitionForType.get({type: $scope.searchResults[0].Type}, function(res) {
                            $scope.columnCollection = res.views[3].fields;
                          });
                }
              }
            });
        }


        // Set the table properties
        /*jshint -W055 */
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 50           // count per page
          }, {
            counts: [], // hide page counts control
            total: $scope.searchResults.length, // length of data
            getData: function($defer) {
                $defer.resolve($scope.searchResults);
              }
          });
        /*jshint +W055 */

        $scope.getProjectSummary = function(selectedProject) {
            Projects.get({id : selectedProject._id},function(project) {
                $scope.selectedProject = project;
                $scope.projectSelected = true;
                // add selected property to object, makes it easier to use when copying
                _.each($scope.selectedProject.tasks,function(task) {
                    task.selected=true;
                  })
                _.each($scope.selectedProject.assets,function(asset) {
                    asset.selected=false;
                  })
                $scope.alerts.splice(0,$scope.alerts.length);
                $scope.alerts.push({msg: 'Select Tasks, Assets and Team from the area on the left'});

              });
          };


      });

