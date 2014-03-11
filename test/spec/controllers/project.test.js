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

  });
