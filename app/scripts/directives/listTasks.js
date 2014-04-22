'use strict';

angular.module('ogcApp')
    .directive('listTasks', function () {
        return {
            templateUrl: 'scripts/directives/templates/listTasks.html',
            scope: {
                tasks: '=tasks'
              },
              controller: function ($scope, Projects, $routeParams) {

                  $scope.closeTask = function(task) {
                      console.log('close task');
                      // update task
                      var numberOfTasks = $scope.tasks.length;
                      for (var i = 0;i<numberOfTasks;i++) {
                        if ($scope.tasks[i].cd === task.cd) {
                          if ($scope.tasks[i].status === 'Closed') {
                            $scope.tasks[i].status = 'Open';
                          }
                          else {
                            $scope.tasks[i].status = 'Closed';
                          }
                        }
                      }
                      Projects.get({id : $routeParams.id},function(res) {
                          $scope.project = res;
                          // TODO make service
                          $scope.project.tasks = $scope.tasks;
                          $scope.project.$update(function() {
                              console.log('saved');
                            });
                        });
                    };
                }
            };
      });
