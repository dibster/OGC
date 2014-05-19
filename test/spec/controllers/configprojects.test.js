'use strict';

describe('ConfigProjectsCtrl', function(){

    var scope, $httpBackend;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(module('ogcApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'http://localhost:9000/api/admin/channeltypes').respond([{id: 1, name: 'Bob'}, {id:2, name: 'Jane'}]);
        $httpBackend.when('GET', 'http://localhost:9000/api/projects/types').respond([{id: 1, name: 'Bob'}, {id:2, name: 'Jane'}, {id:3, name: 'type 3'}]);

        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('ConfigProjectsCtrl', {$scope: scope});
      }));

    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
      }));

    // tests start here

    it('should fetch 2 channel types', function(){
        $httpBackend.flush();
        expect(scope.channelTypes.length).toBe(2);
      });

    it('should fetch 3 project types', function(){
        $httpBackend.flush();
        expect(scope.projectTypes.length).toBe(3);
      });

  });
