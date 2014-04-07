'use strict';

angular.module('ogcApp')
    .controller('FileCtrl', function ($scope, $routeParams, Projects) {

        $scope.files = [];
        $scope.projectId = $routeParams.id;

        // get all file thumbnails for project

        Projects.get({id : $scope.projectId},function(res) {
            $scope.files = res.files;
          });
      });
