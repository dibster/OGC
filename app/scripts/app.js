'use strict';

angular.module('ogcApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ngTable',
  'ui.sortable',
  'angularMoment',
  'angularFileUpload',
  'monospaced.elastic',
  'akoenig.deckgrid',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'partials/main.html',
      controller: 'MainCtrl'
    })
    .when('/config', {
        templateUrl: 'partials/config.html',
        controller: 'ConfigCtrl'
      })
    .when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl'
      })
    .when('/scratch', {
        templateUrl: 'partials/scratch.html',
        controller: 'ScratchCtrl'
      })
    .when('/project', {
        templateUrl: 'partials/project.html',
        controller: 'ProjectCtrl'
      })
    .when('/projectfiles/:id', {
        templateUrl: '../views/partials/projectFileGrid.html',
        controller: 'FileGridCtrl'
      })
    .when('/project/:id', {
        templateUrl: 'partials/projectDashboard.html',
        controller: 'ProjectDashBoardCtrl'
      })
    .when('/file/:id', {
        templateUrl: 'partials/file.html',
        controller: 'FileCtrl'
      })
    .when('/smartlist/:id', {
        templateUrl: 'partials/smartlist.html',
        controller: 'SmartListCtrl'
      })
    .when('/projectcopy/:id', {
        templateUrl: 'partials/projectCopy.html',
        controller: 'ProjectCopyCtrl'
      })
     .when('/object/:id/edit', {
        templateUrl: 'partials/object.html',
        controller: 'ObjectCtrl'
      })
     .when('/object/:id/views', {
        templateUrl: 'partials/objectViews.html',
        controller: 'ObjectViewsCtrl'
      })
    .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });