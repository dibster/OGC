'use strict';

angular.module('ogcApp')
    .controller('ProjectCopyCtrl', function ($scope, Objects, $location, $routeParams,  ObjectTypes, ObjectDefinitionForType, SimilarProjects, ProjectTypes, SearchResults, ngTableParams, Projects, CopyProject ) {

        $scope.columnCollection = [];
        $scope.projectDefinition = {};
        $scope.columnCollection = [];
        $scope.searchResults = [];
        $scope.alerts = [];
        $scope.project = {};
        $scope.projectSelected = false;
        $scope.showAll = false;
        $scope.copyParms = {
            useWeekends : false,
            replaceAllTasks : false,
            startDate : new Date(),
            tasks : [],
            endDate : new Date()
          };

        $scope.viewSettings = {};
        $scope.viewSettings.showAllFilterButton = false;


        // get any saved search results (when new project created)

        $scope.searchResults = SearchResults;

        // get the current project type and the view fields

        Projects.get({id : $routeParams.id},function(project) {
            $scope.project = project;
            // get the view fields
            ObjectDefinitionForType.get({type: $scope.project.Type}, function (objectDefinition) {
                $scope.projectDefinition = objectDefinition;
                $scope.columnCollection = $scope.projectDefinition.views[3].fields;
              });
          });

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

        if (_.isEmpty($scope.searchResults)) {

          $scope.viewSettings.showAllFilterButton = true;
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
                  });
                _.each($scope.selectedProject.assets,function(asset) {
                    asset.selected=false;
                  });
                $scope.alerts.splice(0,$scope.alerts.length);
                $scope.alerts.push({msg: 'Select Tasks, Assets and Team from the area on the left'});

              });
          };

        // do the copy
        $scope.copyProject = function() {
            $scope.copyParms.tasks = _.filter($scope.selectedProject.tasks,'selected');
            console.log($scope.copyParms);
            CopyProject.update({id : $routeParams.id},$scope.copyParms,function(response) {
                console.log('Updated Task' + response);
              });
            $location.path( '/project/' + $routeParams.id);
          };

        // show all
        $scope.showAll = function() {
            console.log('clicked show all');
            Projects.get({id : $routeParams.id},function(res) {
                $scope.currentProject = res;
                var searchObject = {};
                searchObject.Type = $scope.currentProject.Type;
                $scope.viewSettings.showAllFilterButton = false;
                $scope.alerts.splice(0,$scope.alerts.length);
                $scope.alerts.push({msg: 'Showing all ' + $scope.currentProject.Type + 's'});
                var searchString = encodeURIComponent(JSON.stringify(searchObject));

                // get the project Data

                Projects.query({filter : searchString},function(response) {
                    $scope.searchResults = response;
                  });
              });



          };

        if (_.isEmpty($scope.searchResults)) {
          $scope.showAll();
          $scope.viewSettings.showAllFilterButton = false;
        }

      });

