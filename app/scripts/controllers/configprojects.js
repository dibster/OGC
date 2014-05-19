'use strict';

angular.module('ogcApp')
    .controller('ConfigProjectsCtrl', function ($scope, ngTableParams, Objects, ChannelTypes, ProjectTypes) {

        $scope.newObject = {};
        $scope.channel = 'Digital';
        $scope.channelTypes = [];
        $scope.searchObject = {};
        $scope.searchObject.type = 'Digital';
        $scope.projectTypes = [];
        $scope.object = {};
        $scope.search = {};
        $scope.selectedItem = null;

        $scope.columnCollection = [{name : 'name'}, {name : 'fields', type : 'field'}, {name : 'views', type : 'view'}];

        // get base channel Types

        ChannelTypes.query(function(response) {
            $scope.channelTypes = response;
          });


        ProjectTypes.query(function(response) {
            $scope.projectTypes = response;
            /*jshint -W055 */
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 50           // count per page
              }, {
                counts: [], // hide page counts control
                total: $scope.projectTypes.length, // length of data
                getData: function($defer) {
                    $defer.resolve($scope.projectTypes);
                  }
              });
            /*jshint +W055 */
          });

        // create a new Project Type

        $scope.create = function() {

            $scope.object = new Objects({
                name: $scope.newObject.name,
                type: 'Project',
                channel : $scope.searchObject.type,
                template : false,
                views : [{name : 'Create', fields : []},{name : 'Edit', fields : []},{name : 'Show', fields : []},{name : 'List', fields : []},{name : 'Dashboard', fields : []}]
              });


            $scope.projectTypes.push($scope.object);
            $scope.newObject.name = '';
            $scope.object = $scope.object.$save(function(response) {
                return response;
              });
          };

        $scope.removeObject = function(object) {
            var index = $scope.objects.indexOf(object);
            $scope.objects.splice(index, 1);
            object.$remove();
          };


        $scope.selectChannelType = function(channeltype) {
            $scope.selectedItem = channeltype._id;
            $scope.searchObject.type = channeltype.name;
          };



      });
