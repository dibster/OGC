'use strict';

angular.module('ogcApp')
    .controller('ProjectDashBoardCtrl', function ($scope, $routeParams, $upload, Objects, ObjectTypes, ProjectTypes, SearchResults,  SimilarProjects, PrepareRecord, $modal, Projects) {

        $scope.newsItems = [];
        $scope.tasks = [];
        $scope.files = [];
        $scope.currentProjectId = $routeParams.id;
        $scope.alerts = [];
        SearchResults = {};

        Projects.get({id : $scope.currentProjectId},function(res) {
            $scope.project = res;
            var currentTime = new Date().getTime();
            var projectCreateTime = new Date($scope.project.cd).getTime();
            var timeDiff = currentTime - projectCreateTime;
            if (timeDiff < 6000) {
              // do the search
              SimilarProjects.query({id : $routeParams.id},function(res) {
                  if (res.length > 1) {
                    //Save the Search Results for Copy COntroller
                    SearchResults = res;
                    $scope.alerts = [
                        { type: 'success', msg: 'Have found ' + res.length + ' similar projects,  To copy tasks, assets or people click ' + '<a href=#/projectcopy/' + $scope.project._id + '>Here</a>' }
                      ];
                  }
                });
            }

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

        $scope.onFileSelect = function($files) {
            for (var i = 0; i < $files.length; i++) {
              var file = $files[i];
              $scope.upload = $upload.upload({
                  url: '/api/files/addfile',
                  data: {myObj: $scope.myModelObj},
                  file: file
                }).progress(function(evt) {
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                  }).success(function(data, status, headers, config) {
                    console.log(data);
                  });
              console.log('add file location to project');
            }
          };

      });

