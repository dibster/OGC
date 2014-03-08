'use strict';

angular.module('ogcApp')
    .controller('ProjectCtrl', function ($scope, Objects, ObjectTypes, Projects) {

        console.log('in controller');
        ObjectTypes.query(function(response) {
            $scope.projectTypes = response;
          });

//        Projects.query(function(response) {
//            $scope.projects = response;
//          });
//




        // project tree build.

//        $scope.myData = [{
//            label: 'Languages',
//            children: ['Jade','Less','CoffeeScript']
//          }];

      });

