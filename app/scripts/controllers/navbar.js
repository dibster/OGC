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

    $scope.configAdminLink = '/configAdmin';
    $scope.configProjectLink = '/configProjects';
    $scope.configSmartListsLink = '/configSmartLists';
    $scope.profileLink = '/profile';
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };

  });
