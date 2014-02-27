'use strict';

describe('ConfigCtrl', function(){

    var scope, $httpBackend;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('ogcApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'http://localhost:9000/api/admin/objects').respond([{id: 1, name: 'Bob'}, {id:2, name: 'Jane'}]);
        $httpBackend.when('GET', 'http://localhost:9000/api/admin/objecttypes').respond([{id: 1, name: 'Project'}, {id:2, name: 'List'}]);

        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('ConfigCtrl', {$scope: scope});
      }));
    // tests start here

    it('should fetch list of users', function(){
        $httpBackend.flush();
        expect(scope.objects.length).toBe(2);
        expect(scope.types.length).toBe(2);
    });
  });
