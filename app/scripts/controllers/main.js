'use strict';

angular.module('ogcApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/admin/objects').success(function(adminObjects) {
      $scope.objects = adminObjects;
    });
  });
