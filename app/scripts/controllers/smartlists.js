'use strict';

angular.module('ogcApp')
    .controller('SmartListCtrl', function ($scope, $routeParams, CurrentProject, ListTypes,  PrepareRecord, $modal, Projects, ngTableParams) {

        $scope.currentProjectId = $routeParams.id;

        Projects.get({id : $scope.currentProjectId},function(res) {
            $scope.project = res;
          });

        ListTypes.query(function(response) {
            $scope.listTypes = response;
          });

      });

