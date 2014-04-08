'use strict';

angular.module('ogcApp')
    .controller('FileGridCtrl', function ($scope, $routeParams, Projects) {

        $scope.files = [];
        $scope.projectId = $routeParams.id;

        // get all file thumbnails for project

        Projects.get({id : $scope.projectId},function(res) {
            $scope.files = _.map(res.files, function(file) {
                    if (file.name.length > 20) {
                      var startPart = file.name.substring(0,8);
                      var endPart = file.name.slice(-8);
                      var middle = '...';
                      file.name = startPart+middle+endPart;
                    }
                    return file;
                  });
            $scope.projectName = res.Title;
          });
      });
