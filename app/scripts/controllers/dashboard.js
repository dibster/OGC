'use strict';

angular.module('ogcApp')
    .controller('ProjectDashBoardCtrl', function ($scope, $routeParams, Objects, ObjectTypes, ProjectTypes, PrepareRecord, $modal, Projects) {

        $scope.newsItems = [];
        $scope.tasks = [];
        $scope.files = [];

        Projects.get({id : $routeParams.id},function(res) {
            $scope.project = res;
          });

        $scope.AddNewsItem = function(newsItem) {

            $scope.newsEditorEnabled=!$scope.newsEditorEnabled;

            if (!(_.has($scope.project, 'news'))){
              $scope.project.news = $scope.newsItems;
            }

            var user = 1;
            var datetimeNow = new Date();
            var userTimeStamp = {'u' : user, 'cd' : datetimeNow};

            // add timestamp to task
            var newNewsItem = _.assign(newsItem, userTimeStamp);
            $scope.project.news.push(newNewsItem);
            $scope.project._id = $routeParams.id;
            $scope.project.$update(function() {
                console.log('saved');
              });
          };

        $scope.AddTask = function(task) {

            $scope.taskEditorEnabled=!$scope.taskEditorEnabled;

            if (!(_.has($scope.project, 'tasks'))){
                $scope.project.tasks = $scope.tasks;
            }

            var user = 1;
            var datetimeNow = new Date();
            var userTimeStamp = {'u' : user, 'cd' : datetimeNow};

            // add timestamp to task
            var newTask = _.assign(task, userTimeStamp);
            $scope.project.tasks.push(newTask);
            $scope.project._id = $routeParams.id;
            $scope.project.$update(function() {
                console.log('saved');
              });
          };

      });

