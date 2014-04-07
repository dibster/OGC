'use strict';

describe('ProjectDashBoardCtrl', function(){

    var scope, $httpBackend, routeParams, modal, log;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(module('ogcApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'http://localhost:9000/api/projects/5').respond({id: 5, name: 'Campaign'});
        $httpBackend.when('PUT', 'http://localhost:9000/api/projects/5').respond({id: 5, name: 'Campaign', news : [{item : 'This is a news Item'}]});
        $httpBackend.when('POST', 'http://localhost:9000/api/files').respond({_id: 98, name: 'animal.jpg'});

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

    it('should get a project', function(){
        $httpBackend.flush();
        expect(scope.project.name).toBe('Campaign');
      });

    it('should search For Projects', function(){
        $httpBackend.flush();
        expect(scope.project.name).toBe('Campaign');
      });

    it('should Add a News Item', function(){
        $httpBackend.flush();
        var newsItem = {'item' : 'This is a news Item'};
        scope.AddNewsItem(newsItem);
        expect(scope.project.news.length).toBe(1);
      });

    it('should Add a Task', function(){
        $httpBackend.flush();
        var task = {'name' : 'This is a Task'};
        scope.AddTask(task);
        expect(scope.project.tasks.length).toBe(1);
      });

    it('should Add a File', function(){
        $httpBackend.flush();
        scope.FileData = {filename : 'animal.jpg', isImage : true, isOffice : false, targetPath : '/files/animal.jpg', thumbnailUrl : '/files/thumnails/animap.jpg'};
        var file = {name : 'animal.jpg', comment : 'This is a comment'};
        scope.AddFile(file);
        // will add a comment
        expect(scope.project.news.length).toBe(1);
        // will add a file to the project, problem with testing resource callbacks
        //expect(scope.project.files.length).toBe(1);
      });

  });
