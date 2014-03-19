'use strict';

angular.module('ogcApp')
    .directive('ogcTaskList', function () {
        return {
            templateUrl: 'scripts/directives/templates/ogcTaskList.html',
            scope: {
                tasks: '=tasks'
              },
              link: function LinkingFunction(scope) {
              }
            };
      });
