'use strict';

angular.module('ogcApp')
    .directive('listTasks', function () {
        return {
            templateUrl: 'scripts/directives/templates/listTasks.html',
            scope: {
                tasks: '=tasks'
              },
              link: function LinkingFunction(scope) {
              }
            };
      });
