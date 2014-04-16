'use strict';

describe('SmartListCtrl', function(){

    var scope, $httpBackend, routeParams, modal, log;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(module('ogcApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'http://localhost:9000/api/smartlisttypes').respond([{name : 'Budget'},{name : 'Invoice'}]);
        $httpBackend.when('GET', 'http://localhost:9000/api/projects/5').respond({id: 5, name: 'Campaign', news : [{item : 'This is a news Item'}]});
        $httpBackend.when('GET', 'http://localhost:9000/api/smartlists/5').respond([{id: 5, name: 'Invoice'},{id: 5, name: 'Invoice'}]);

        //create an empty scope
        scope = $rootScope.$new();

        // add route Parameters
        routeParams = {};
        routeParams.id = 5;
        //declare the controller and inject our empty scope
        $controller('SmartListCtrl', {$scope: scope, $routeParams : routeParams, $modal : modal, $log : log} );
      }));

    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
      }));

    // tests start here

    it('should get a project and 2 list types', function(){
        $httpBackend.flush();
        expect(scope.project.name).toBe('Campaign');
        expect(scope.listTypes.length).toBe(2);
      });


  });
