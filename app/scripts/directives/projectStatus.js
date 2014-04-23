'use strict';

angular.module('ogcApp')
    .directive('projectStatus', function () {
        return {
            templateUrl: 'scripts/directives/templates/projectStatus.html',
            scope: {
                tasks: '=tasks'
              },
              controller: function ($scope,ProjectStatus) {
                  // wait for the tasks to be populated by Angular then work on them
                  $scope.$watch('tasks', function(newValue) {
                      if (newValue !== undefined) {
                        $scope.percentComplete = ProjectStatus.percentComplete($scope.tasks);
                        $scope.status=ProjectStatus.statusType($scope.tasks);
                      }
                    });

                }
            };
      });
