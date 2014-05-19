'use strict';

describe('ConfigSmartListsCtrl', function(){

    var scope, $httpBackend;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(module('ogcApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'http://localhost:9000/api/admin/objects/findbytype/List').respond([{id: 1, name: 'Bob'}, {id:2, name: 'Jane'}]);

        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('ConfigSmartListsCtrl', {$scope: scope});
      }));

    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
      }));

    // tests start here

    it('should fetch just the smartlist Objects', function(){
        $httpBackend.flush();
        expect(scope.objects.length).toBe(2);
      });

  });
