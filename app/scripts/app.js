'use strict';

angular.module('ogcApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
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
     .when('/object/:id/edit', {
        templateUrl: 'partials/object.html',
        controller: 'ObjectCtrl'
      })
    .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });