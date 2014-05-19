'use strict';

angular.module('ogcApp')
    .controller('ScratchCtrl', function ($scope, Objects, SayToConsole, ObjectTypes, ProjectTypes, PrepareRecord, $modal, Projects, hashTags, ngTableParams) {

    $scope.marketingGroups = [{name : 'Digital', channel : [{Name : 'Podcast', Description : 'Radio Podcasts'}, {Name : 'Youtube'}, {Name : 'Podcast'}, {Name : 'Youtube'}, {Name : 'Podcast'}, {Name : 'Youtube'}]},{name : 'Event'},{name : 'Relationship'},{name : 'Advertising'},{name : 'Database'},{name : 'Direct'}];
    $scope.channelGrid = [];
    $scope.columnCollection = [{name : 'Name'}, {name : 'Description'}];
    $scope.channels = [];


    $scope.displayChannels = function(selectedGroup) {
        $scope.channels = selectedGroup.channel;

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 50           // count per page
          }, {
            counts: [], // hide page counts control
            total: $scope.channels.length, // length of data
            getData: function($defer) {
                $defer.resolve($scope.channels);
              }
          });
        /*jshint +W055 */

        console.log($scope.channels);
      };

    $scope.displayChannels($scope.marketingGroups[0]);
//    var numberOfMarketingGroups = $scope.marketingGroups.length;
//    var i,j;
//    for (i=0;i<numberOfMarketingGroups;i++) {
//      var currentGroup = $scope.marketingGroups[i];
//      var numberOfChannels;
//      if (typeof currentGroup.channel.length === 'undefined') {
//
//        numberOfChannels = currentGroup.channel.length;
//      }
//      catch (err) {
//            numberOfChannels = 0;
//          }
//      for (j=0;j<numberOfChannels;j++) {
//
//      }
//
//    }




  });

