'use strict';

angular.module('ogcApp')
    .controller('FileCtrl', function ($scope, $routeParams, Files, Projects) {

        $scope.file = {};
        $scope.fileId = $routeParams.id;
        $scope.newsItems = [];
        $scope.reviews = [];

        // get all file thumbnails for project

        Files.get({id : $routeParams.id},function(res) {
            $scope.file = res;
            // TODO make service
            Projects.get({id : $scope.file.projectId},function(proj) {
                $scope.project = proj;
              });
          });


        $scope.AddNewsItem = function(newsItem) {

            $scope.newsEditorEnabled=!$scope.newsEditorEnabled;

            if (!(_.has($scope.file, 'news'))){
              $scope.file.news = $scope.newsItems;
            }

            var user = 1;
            var datetimeNow = new Date();
            var userTimeStamp = {'u' : user, 'cd' : datetimeNow};

            // add timestamp to task
            var newNewsItem = _.assign(newsItem, userTimeStamp);
            $scope.file.news.push(newNewsItem);
            $scope.file._id = $routeParams.id;
            $scope.file.$update(function() {
                console.log('saved');
              });
          };

        $scope.AddReviewItem = function(review) {

            review.decision = '';

            $scope.reviewEditorEnabled=!$scope.reviewEditorEnabled;

            if (!(_.has($scope.file, 'reviews'))){
              $scope.file.reviews = $scope.reviews;
            }

            var user = 1;
            var datetimeNow = new Date();
            var userTimeStamp = {'u' : user, 'cd' : datetimeNow};

            // add timestamp to task
            var newReviewItem = _.assign(review, userTimeStamp);
            $scope.file.reviews.push(newReviewItem);
            $scope.file._id = $routeParams.id;
            $scope.file.$update(function() {
                console.log('saved');
              });
          };
      });
