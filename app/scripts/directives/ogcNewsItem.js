'use strict';

angular.module('ogcApp')
    .directive('ogcNewsItem', function () {
        return {
            templateUrl: 'scripts/directives/templates/ogcNewsItem.html',
            scope: {
                newsItems: '=newsitems'
              },
              link: function LinkingFunction(scope) {
              }
            };
      });
