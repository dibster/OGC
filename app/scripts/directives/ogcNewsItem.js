'use strict';

angular.module('ogcApp')
    .directive('ogcNewsItem', function () {
        return {
            template: '<div><span>{{newsItem.item}}</span></div>',
            scope: {
                newsItem: '=newsitem'
              },
              link: function LinkingFunction(scope) {

              }
            };
      });
