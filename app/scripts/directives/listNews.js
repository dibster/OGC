'use strict';

angular.module('ogcApp')
    .directive('listNews', function () {
        return {
            templateUrl: 'scripts/directives/templates/listNews.html',
            scope: {
                newsItems: '=newsitems'
              },
              controller: function ($scope) {
              }
            };
      });
