'use strict';

angular.module('ogcApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Projects',
      'link': '/projects'
    }];

    $scope.configLink = '/config';
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
