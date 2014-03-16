'use strict';

angular.module('ogcApp')
    .controller('ProjectDashBoardCtrl', function ($scope, $routeParams, Objects, ObjectTypes, ProjectTypes, PrepareRecord, $modal, Projects) {

        $scope.newsItems = [];

        Projects.get({id : $routeParams.id},function(res) {
            $scope.project = res;
          });

        $scope.AddNewsItem = function(newsItem) {

            console.log(newsItem);
            if (!(_.has($scope.project, 'news'))){
              $scope.project.news = $scope.newsItems;
            }

            var user = 1;
            var datetimeNow = new Date();
            var userTimeStamp = {'u' : user, 'cd' : datetimeNow};
            // add timestamp to task
            var newNewsItem = _.assign(newsItem, userTimeStamp);
            console.log(newNewsItem);
            $scope.project.news.push(newNewsItem);
            $scope.project._id = $routeParams.id;
            $scope.project.$update(function() {
                console.log('saved');
              });
          };

      });

