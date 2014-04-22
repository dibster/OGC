'use strict';

angular.module('ogcApp')
    .directive('listFiles', function () {
        return {
            templateUrl: 'scripts/directives/templates/listFiles.html',
            scope: {
                files : '=files'
              },
              controller: function ($scope) {
              }
            };
      });
