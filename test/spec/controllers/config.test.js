'use strict';

describe('ConfigCtrl', function(){

    var scope, $httpBackend;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(module('ogcApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'http://localhost:9000/api/admin/objects').respond([{id: 1, name: 'Bob'}, {id:2, name: 'Jane'}]);
        $httpBackend.when('GET', 'http://localhost:9000/api/admin/objecttypes').respond([{id: 1, name: 'Project'}, {id:2, name: 'List'}]);
        $httpBackend.when('POST', 'http://localhost:9000/api/admin/objects').respond([{id: 8, name: 'New Object'}]);

        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('ConfigCtrl', {$scope: scope});
      }));

    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
      }));

    // tests start here

    it('should fetch object and types', function(){
        $httpBackend.flush();
        expect(scope.objects.length).toBe(2);
        expect(scope.types.length).toBe(2);
      });

    it('should create a new object', function(){
        $httpBackend.flush();
        scope.newObject = {name : 'new object'};
        scope.search = {type : 'Project'};
        scope.create();
        expect(scope.objects.length).toBe(3);
      });
  });
