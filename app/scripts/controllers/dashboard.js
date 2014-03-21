'use strict';

angular.module('ogcApp')
    .controller('ProjectDashBoardCtrl', function ($scope, $routeParams, Objects, ObjectTypes, ProjectTypes, SimilarProjects, PrepareRecord, $modal, Projects) {

        $scope.newsItems = [];
        $scope.tasks = [];
        $scope.files = [];

        $scope.alerts = [];

        Projects.get({id : $routeParams.id},function(res) {
            $scope.project = res;
            var currentTime = new Date().getTime();
            var projectCreateTime = new Date($scope.project.cd).getTime();
            var timeDiff = currentTime - projectCreateTime;
            if (timeDiff < 9000000) {
              // do the search
              SimilarProjects.query({id : $routeParams.id},function(res) {
                  if (res.length > 1) {
                    $scope.alerts = [
                        { type: 'success', msg: 'Have found ' + res.length + ' similar projects,  To copy tasks, assets or people click ' + '<a href=#/projectcopy/' + $scope.project._id + '>Here</a>' }
                      ];
                  }
                });
            }

          });


        // if project set in the last few minutes then search for similar ones and show the message

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

