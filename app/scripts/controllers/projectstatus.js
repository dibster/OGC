'use strict';

angular.module('ogcApp')
    .controller('ProjectStatusCtrl', function ($scope, $routeParams, Projects) {

        $scope.projectId = $routeParams.id;
        $scope.alerts = [];

        // get all file thumbnails for project

        Projects.get({id : $scope.projectId},function(res) {
            $scope.project = res;
          });

        $scope.postMessage = function(message) {
          // send message
            $scope.alerts.push({msg: 'Message Sent to all team members'});
          };
      });

