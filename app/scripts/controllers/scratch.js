'use strict';

angular.module('ogcApp')
    .controller('ScratchCtrl', function ($scope, Objects, ObjectTypes, ProjectTypes, PrepareRecord, $modal, Projects, hashTags, ngTableParams) {

        $scope.newsItem = {};
        $scope.newsItem.item = 'This is a piece of news and it will go over a few lines just to see what the format is like';
        $scope.newsItem.u = 'animal';
        $scope.newsItem.cd = new Date();


      });

