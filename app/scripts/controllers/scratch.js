'use strict';

angular.module('ogcApp')
    .controller('ScratchCtrl', function ($scope, Objects, SayToConsole, ObjectTypes, ProjectTypes, PrepareRecord, $modal, Projects, hashTags, ngTableParams) {

        $scope.dateNow = new Date();
        $scope.reviews = [];
        $scope.review = {};
        $scope.review.request = 'Let me have feedback please';
        $scope.review.who = 'Dave';
        $scope.review.decision = 'Rejected';
        $scope.review.date = new Date();
        $scope.review.date.setDate($scope.review.date.getDate() + 1);
        $scope.reviews.push($scope.review);
        $scope.review = {};
        $scope.review.request = 'Let me have feedback please';
        $scope.review.who = 'Dave';
        $scope.review.decision = '';
        $scope.review.date = new Date();
        $scope.review.date.setDate($scope.review.date.getDate() + 1);
        $scope.reviews.push($scope.review);
        $scope.review = {};
        $scope.review.request = 'Let me have feedback please';
        $scope.review.who = 'Dave';
        $scope.review.decision = 'Changes';
        $scope.review.date = new Date();
        $scope.review.date.setDate($scope.review.date.getDate() + 1);
        $scope.reviews.push($scope.review);
        $scope.review = {};
        $scope.review.request = 'Let me have feedback please 2';
        $scope.review.who = 'Dave';
        $scope.review.decision = '';
        $scope.review.date = new Date();
        $scope.review.date.setDate($scope.review.date.getDate() - 1);
        $scope.reviews.push($scope.review);

        $scope.dateIsOverDue = function(review) {
            return review.date < $scope.dateNow && review.decision.length === 0;

          };



      });

