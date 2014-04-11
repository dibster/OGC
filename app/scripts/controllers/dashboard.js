'use strict';

angular.module('ogcApp')
    .controller('ProjectDashBoardCtrl', function ($scope, $routeParams, CurrentProject, $upload, Objects, Files, ObjectTypes, ProjectTypes, SearchResults,  SimilarProjects, PrepareRecord, $modal, Projects) {

        $scope.newsItems = [];
        $scope.tasks = [];
        $scope.files = [];
        $scope.currentProjectId = $routeParams.id;
        $scope.alerts = [];
        SearchResults = {};
        $scope.FileData = {};

        Projects.get({id : $scope.currentProjectId},function(res) {
            $scope.project = res;
            CurrentProject.project = $scope.project;
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

        $scope.AddFile = function(file) {

            if(typeof file === 'undefined') {
              file = {};
            }
            else if (file.comment.length > 0) {
              // add a comment
              $scope.newsEditorEnabled=!$scope.newsEditorEnabled;
              $scope.AddNewsItem({'item' : file.comment });
            }

            $scope.fileEditorEnabled=!$scope.fileEditorEnabled;

            /// create new file entry using fileData

            var newFile = new Files($scope.FileData);

            $scope.addedfile = newFile.$save(function(response) {
                file.fileId =  response._id;
                file.name = $scope.FileData.filename;
                file.isImage = $scope.FileData.isImage;
                file.isOffice = $scope.FileData.isOffice;
                file.url = $scope.FileData.targetPath;
                file.thumbnailUrl = response.thumbnailUrl;

                if (!(_.has($scope.project, 'files'))){
                  $scope.project.files = $scope.files;
                }

                var user = 1;
                var datetimeNow = new Date();
                var userTimeStamp = {'u' : user, 'cd' : datetimeNow};

                // add timestamp to file
                var newFile = _.assign(file, userTimeStamp);
                $scope.project.files.push(newFile);
                $scope.project._id = $routeParams.id;
                $scope.project.$update(function() {
                    // reset file information
                    $scope.FileData = {};
                    $scope.file = {};
                  });
              });


          };

        $scope.onFileSelect = function($files) {
            console.log($files[0].name);
            for (var i = 0; i < $files.length; i++) {
              var file = $files[i];
              $scope.upload = $upload.upload({
                  url: '/api/files/addfile',
                  data: {projectId: $routeParams.id},
                  file: file
                }).progress(function(evt) {
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                  }).success(function(data, status, headers, config) {
                    $scope.FileData = data;
                  });
              console.log('add file location to project');
            }
          };

      });

