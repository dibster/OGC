'use strict';

angular.module('ogcApp')
    .directive('ogcFileList', function () {
        return {
            templateUrl: 'scripts/directives/templates/ogcFileList.html',
            scope: {
                files : '=files'
              },
              link: function LinkingFunction(scope) {
              }
            };
      });
