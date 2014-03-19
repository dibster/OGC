'use strict';

angular.module('ogcApp')
    .directive('ogcNewsItem', function () {
        return {
            templateUrl: 'scripts/directives/templates/ogcNewsItem.html',
            scope: {
                newsItem: '=newsitem'
              },
              link: function LinkingFunction(scope) {
//                console.log('in directive ' + newsItem);
              }
            };
      });
