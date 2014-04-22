'use strict';

angular.module('ogcApp')
    .directive('ogcCalculated', function () {
        return {
            template: '<div><span>{{result}}</span></div>',
            scope: {
                calculation: '=calculation',
                project: '=project'
              },
              controller: function ($scope) {
                  try {
                    $scope.result = eval('$scope.project.' + $scope.calculation);
                  } catch (e) {
                      $scope.result = '';
                    }
                }
            };
      });
