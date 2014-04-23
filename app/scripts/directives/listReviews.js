'use strict';

angular.module('ogcApp')
    .directive('listReviews', function () {
        return {
            templateUrl: 'scripts/directives/templates/listReviews.html',
            scope: {
                reviews: '=reviews'
              },
              controller : 'listReviewsCtrl'
            };
      });
