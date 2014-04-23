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

                      Projects.get({id : $routeParams.id},function(res) {
                          $scope.project = res;
                          var numberOfTasks = $scope.project.tasks.length;
                          for (var i = 0;i<numberOfTasks;i++) {
                            if ($scope.project.tasks[i].cd === task.cd) {
                              if ($scope.project.tasks[i].status === 'Closed') {
                                $scope.project.tasks[i].status = '';
                              }
                              else {
                                $scope.project.tasks[i].status = 'Closed';
                              }
                            }
                          }

                          $scope.project.$update(function() {
                              console.log('saved');
                            });
                        });
                    };
                }
            };
      });
