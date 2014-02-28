'use strict';

describe('ObjectCtrl', function(){

    var scope, $httpBackend, routeParams;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(module('ogcApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'http://localhost:9000/api/admin/objects/5').respond({id: 1, name: 'Campaign'});
        //create an empty scope
        scope = $rootScope.$new();
        // add route Parameters
        routeParams = {};
        routeParams.id = 5;
        //declare the controller and inject our empty scope
        $controller('ObjectCtrl', {$scope: scope, $routeParams : routeParams});
      }));

    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
      }));

    // tests start here

    it('should get an object by Id', function(){
        $httpBackend.flush();
        expect(scope.object.name).toBe('Campaign');
      });

  });
