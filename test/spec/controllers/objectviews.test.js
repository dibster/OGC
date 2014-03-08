'use strict';

describe('ObjectViewsCtrl', function(){

    var scope, $httpBackend, routeParams, modal, log;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(module('ogcApp','ui.sortable'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'http://localhost:9000/api/admin/objects/5').respond({id: 5, name: 'Campaign', fields : [{name : 'existing field', type : 'Date', req : 'n'}], views : [{name : 'create', fields : [{name : 'title'}]}]});
        $httpBackend.when('PUT', 'http://localhost:9000/api/admin/objects/5').respond({id: 5, name: 'Campaign', fields : [{name : 'existing field', type : 'Date', req : 'n'}], views : [{name : 'create', fields : [{name : 'title'}]}]});

        //create an empty scope
        scope = $rootScope.$new();
        // add route Parameters
        routeParams = {};
        routeParams.id = 5;
        //declare the controller and inject our empty scope
        $controller('ObjectViewsCtrl', {$scope: scope, $routeParams : routeParams, $modal : modal, $log : log} );
      }));

    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
      }));

    // tests start here

    it('should get an object by Id', function(){
        $httpBackend.flush();
        expect(scope.object.name).toBe('Campaign');
      });

    it('should get add a field to all views', function(){
        $httpBackend.flush();
        // new field
        var field = {name : 'existing field', type : 'Date', req : 'n'};
        scope.addFieldToViews(field);
        expect(scope.object.views[0].fields.length).toBe(2);
      });

    it('should remove a field', function(){
        $httpBackend.flush();
        // new field
        scope.removeViewField(0,0);
        expect(scope.object.views[0].fields.length).toBe(0);
      });

  });
