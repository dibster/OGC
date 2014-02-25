'use strict';

angular.module('ogcApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Configuration',
      'link': '/config'
    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
