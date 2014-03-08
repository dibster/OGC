'use strict';

angular.module('ogcApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ui.sortable',
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
    .when('/project', {
        templateUrl: 'partials/project.html',
        controller: 'ProjectCtrl'
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