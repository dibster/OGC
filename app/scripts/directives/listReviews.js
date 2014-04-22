'use strict';

angular.module('ogcApp')
    .directive('listReviews', function () {
        return {
            templateUrl: 'scripts/directives/templates/listReviews.html',
            scope: {
                reviews: '=reviews'
              },
              link: function LinkingFunction(scope) {
                  scope.dateIsOverDue = function(review) {
                      var dateNow = new Date();
                      return review.date < dateNow && review.decision.length === 0;
                    };
                }
            };
      });
