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
        $httpBackend.when('GET', 'http://localhost:9000/api/projects/6').respond({id: 5, name: 'Campaign'});
        $httpBackend.when('GET', 'http://localhost:9000/api/projects?filter=%257B%257D').respond([{name: 'Campaign 3'},{name: 'Campaign 3'},{name: 'Campaign 3'},{name: 'Campaign 3'}]);
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

    it('should find 1 project', function(){
        $httpBackend.flush();
        expect(scope.searchResults.length).toBe(1);
      });

    // select a project and have 4 tasks
    it('should select a project and show 4 tasks', function(){
        $httpBackend.flush();
        var  selectedProject = {
            'Title' : 'Job12345',
            'Description': 'Updated by Karma Tests',
            'Channel Type ' : 'Facebook',
            'Type' : 'Project',
            'Status' : 'Open',
            'tasks' : [
                {
                    'name' : 'Receive Brief',
                    'date' : '2014-01-16T00:00:00.000Z',
                    'who' : 'Test',
                    'u' : 1,
                    'cd' : '2014-01-16T08:30:07.441Z',
                    'taskStatus' : 'Open'
                  },
                  {
                    'name' : 'Ingest Content',
                    'date' : '2014-01-16T00:00:00.000Z',
                    'who' : 'Test',
                    'u' : 1,
                    'cd' : '2014-01-16T08:30:26.560Z',
                    'taskStatus' : 'Open'
                  },
                  {
                    'name' : 'Create Quote',
                    'date' : '2014-01-17T00:00:00.000Z',
                    'who' : 'Test',
                    'u' : 1,
                    'cd' : '2014-01-16T08:30:51.238Z',
                    'taskStatus' : 'Open'
                  },
                  {
                    'name' : 'Produce Project Plan',
                    'date' : '2014-01-17T00:00:00.000Z',
                    'who' : 'Test',
                    'u' : 1,
                    'cd' : '2014-01-16T08:31:12.820Z',
                    'taskStatus' : 'Open'
                  }
                ]
              };

        scope.prepareProjectSummary(selectedProject);
        expect(scope.projectSelected).toBe(true);
        expect(scope.selectedProject.tasks.length).toBe(4);
        expect(scope.selectedProject.tasks[0].selected).toBe(true);
        expect(scope.alerts.length).toBe(1);

      });

    // copy the project and reroute to the project dashboard
    it('should copy the project and reroute to the project dashboard', function(){
        $httpBackend.flush();
        expect(scope.searchResults.length).toBe(1);
      });

  });
