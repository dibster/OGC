'use strict';

describe('ProjectCopyCtrl', function(){

    var scope, $httpBackend, routeParams, modal, log, emptySearch;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(module('ogcApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'http://localhost:9000/api/match/project/6').respond([{id: 6, name: 'Campaign'}]);
        $httpBackend.when('GET', 'http://localhost:9000/api/admin/objects/findbytype').respond({id: 5, name: 'Campaign', fields : [{name : 'existing field', type : 'Date', req : 'n'}], views : [{name : 'create', fields : [{name : 'title'}]},{name : 'create', fields : [{name : 'title'}]},{name : 'create', fields : [{name : 'title'}]},{name : 'create', fields : [{name : 'title'}]}]});
        //create an empty scope
        scope = $rootScope.$new();
        // add route Parameters
        routeParams = {};
        emptySearch = [];
        routeParams.id = 6;
        //declare the controller and inject our empty scope
        $controller('ProjectCopyCtrl', {$scope: scope, $routeParams : routeParams, $modal : modal, $log : log, SearchResults : emptySearch });
      }));

    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
      }));

    // tests start here

    it('should find a project set when the project is created', function(){
        $httpBackend.flush();
        expect(scope.searchResults.length).toBe(1);
      });



  });
