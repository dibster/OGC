'use strict';

describe('ProjectDashBoardCtrl', function(){

    var scope, $httpBackend, routeParams, modal, log;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(module('ogcApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'http://localhost:9000/api/projects/5').respond({id: 5, name: 'Campaign', fields : [{name : 'existing field', type : 'Date', req : 'n'}], views : [{name : 'create', fields : [{name : 'title'}]}]});

        //create an empty scope
        scope = $rootScope.$new();
        // add route Parameters
        routeParams = {};
        routeParams.id = 5;
        //declare the controller and inject our empty scope
        $controller('ProjectDashBoardCtrl', {$scope: scope, $routeParams : routeParams, $modal : modal, $log : log} );
      }));

    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
      }));

    // tests start here

    it('should get aproject', function(){
        $httpBackend.flush();
        expect(scope.project.name).toBe('Campaign');
      });

  });
