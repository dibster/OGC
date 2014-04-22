'use strict';

angular.module('ogcApp')
    .controller('ScratchCtrl', function ($scope, Objects, SayToConsole, ObjectTypes, ProjectTypes, PrepareRecord, $modal, Projects, hashTags, ngTableParams) {

        SayToConsole.hello('dave');
        SayToConsole.bye('dave');

        $scope.dateNow = new Date();
        $scope.tasks = [];
        $scope.task = {};
        $scope.task.name = 'Let me have feedback please';
        $scope.task.who = 'Dave';
        $scope.task.status = 'Open';
        $scope.task.decision = 'Rejected';
        $scope.task.date = new Date();
        $scope.task.date.setDate($scope.task.date.getDate() + 1);
        $scope.tasks.push($scope.task);
        $scope.task = {};
        $scope.task.name = 'Let me have feedback please';
        $scope.task.who = 'Dave';
        $scope.task.decision = '';
        $scope.task.date = new Date();
        $scope.task.date.setDate($scope.task.date.getDate() + 1);
        $scope.task.status = 'Open';
        $scope.tasks.push($scope.task);
        $scope.task = {};
        $scope.task.name = 'Let me have feedback please';
        $scope.task.who = 'Dave';
        $scope.task.decision = 'Changes';
        $scope.task.date = new Date();
        $scope.task.status = 'Open';
        $scope.task.date.setDate($scope.task.date.getDate() + 1);
        $scope.tasks.push($scope.task);
        $scope.task = {};
        $scope.task.name = 'Let me have feedback please 2';
        $scope.task.who = 'Dave';
        $scope.task.decision = '';
        $scope.task.date = new Date();
        $scope.task.status = 'Open';
        $scope.task.date.setDate($scope.task.date.getDate() - 1);
        $scope.tasks.push($scope.task);

        $scope.dateIsOverDue = function(task) {
            if (task.date < $scope.dateNow && task.decision.length === 0) {
              return true;
            }
            return false;
          };



      });

