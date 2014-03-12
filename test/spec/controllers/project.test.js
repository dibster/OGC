'use strict';

describe('ProjectCtrl', function(){

    var scope, $httpBackend, routeParams, modal, log;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(module('ogcApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'http://localhost:9000/api/projects/types').respond([{name: 'Project'}, {name: 'Campaign'}]);
        $httpBackend.when('GET', 'http://localhost:9000/api/projects').respond([{name: 'Project 1'}, {name: 'Campaign 1'}]);
        $httpBackend.when('GET', 'http://localhost:9000/api/projects?filter=%257B%2522Type%2522%253A%2522Project%2522%257D').respond([{name: 'Campaign 3'}]);

        //create an empty scope
        scope = $rootScope.$new();
        // add route Parameters
        routeParams = {};
        routeParams.id = 5;
        //declare the controller and inject our empty scope
        $controller('ProjectCtrl', {$scope: scope, $routeParams : routeParams, $modal : modal, $log : log} );
      }));

    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
      }));

    // tests start here

    it('should get 1 project type', function(){
        $httpBackend.flush();
        expect(scope.projectTypes.length).toBe(2);
      });
    it('should get 2 projects', function(){
        $httpBackend.flush();
        var objectType = {name : 'Project',  'views': [
            { 'name': 'Create',
                'fields': [
              {'name': 'Title', 'type': 'Text', 'req': 'y'},
              {'name': 'Description', 'type': 'Note', 'req': 'n'},
              {'name': 'Start', 'type': 'Date', 'req': 'n'},
              {'name': 'End', 'type': 'Date', 'req': 'n'},
              {'name': 'Owner', 'type': 'user', 'req': 'n'}
            ]
            },
            { 'name': 'Edit',
                'fields': [
              {'name': 'Title', 'type': 'Text', 'req': 'y'},
              {'name': 'Description', 'type': 'Note', 'req': 'n'},
              {'name': 'Start', 'type': 'Date', 'req': 'n'},
              {'name': 'End', 'type': 'Date', 'req': 'n'},
              {'name': 'Status', 'type': 'List', 'req': 'n', 'values': ['a', 'b', 'c']},
              {'name': 'Owner', 'type': 'user', 'req': 'n'}
            ]
            },
            { 'name': 'Show',
                'fields': [
              {'name': 'Title', 'type': 'Text', 'req': 'y'},
              {'name': 'Description', 'type': 'Note', 'req': 'n'},
              {'name': 'Start', 'type': 'Date', 'req': 'n'},
              {'name': 'End', 'type': 'Date', 'req': 'n'},
              {'name': 'Status', 'type': 'List', 'req': 'n', 'values': ['a', 'b', 'c']},
              {'name': 'Owner', 'type': 'user', 'req': 'n'}
            ]
            },
            { 'name': 'List',
                'fields': [
                {'name': 'Title', 'type': 'Text', 'req': 'y'},
                {'name': 'Description', 'type': 'Note', 'req': 'n'},
                {'name': 'Start', 'type': 'Date', 'req': 'n'},
                {'name': 'End', 'type': 'Date', 'req': 'n'},
                {'name': 'Status', 'type': 'List', 'req': 'n', 'values': ['a', 'b', 'c']},
                {'name': 'Owner', 'type': 'user', 'req': 'n'}
              ]
            },
              { 'name': 'Dashboard',
                'fields': [
                {'name': 'Title', 'type': 'Text', 'req': 'y'},
                {'name': 'Description', 'type': 'Note', 'req': 'n'},
                {'name': 'Start', 'type': 'Date', 'req': 'n'},
                {'name': 'End', 'type': 'Date', 'req': 'n'},
                {'name': 'Status', 'type': 'List', 'req': 'n', 'values': ['a', 'b', 'c']},
                {'name': 'Owner', 'type': 'user', 'req': 'n'}
              ]
            }
            ]};
        scope.projects = [{}];
        scope.filterByProjectType(objectType);
        expect(scope.projects.length).toBe(1);
      });

  });
