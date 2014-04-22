'use strict';

angular.module('ogcApp')
    .directive('listReviews', function () {
        return {
            templateUrl: 'scripts/directives/templates/listReviews.html',
            scope: {
                reviews: '=reviews'
              },
              controller : function ($scope,  Files, $routeParams) {

                  $scope.dateIsOverDue = function(review) {
                      var dateNow = new Date();
                      return review.date < dateNow && review.decision.length === 0;
                    };

                  $scope.setReviewStatus = function(review, comment, decision) {
                      // update review status
                      var numberOfReviews = $scope.reviews.length;
                      for (var i = 0;i<numberOfReviews;i++) {
                        if ($scope.reviews[i].cd === review.cd) {
                          $scope.reviews[i].decision = decision;
                          $scope.reviews[i].comment = comment;
                        }
                      }
                      // now update
                      Files.get({id : $routeParams.id},function(res) {
                          $scope.file = res;
                          // TODO make service
                          $scope.file.reviews = $scope.reviews;
                          $scope.file.$update(function() {
                              console.log('saved');
                            });
                        });

                    };

                }
            };
      });
