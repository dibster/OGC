'use strict';

describe('ProjectStatusFactory', function(){

    var projectStatus;

    //mock Application to allow us to inject our own dependencies
    beforeEach(module('ogcApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function( ProjectStatus){
        projectStatus = ProjectStatus;
      }));

    // tests start here

    it('should check the percent complete is 100%', function(){

        var projectTasks = [{name : 'task1', status : 'Closed', dueDate : '2013-06-06T16:00:00.000Z'},
                            {name : 'task2', status : 'Closed', dueDate : '2013-06-06T16:00:00.000Z'},
                            {name : 'task3', status : 'Closed', dueDate : '2013-06-06T16:00:00.000Z'},
                            {name : 'task4', status : 'Closed', dueDate : '2013-06-06T16:00:00.000Z'}];
        var percentComplete = projectStatus.percentComplete(projectTasks);
        expect(percentComplete).toBe(100);

      });


    it('should check the percent complete is 0%', function(){

        var projectTasks = [{name : 'task1', status : '', dueDate : '2013-06-06T16:00:00.000Z'},
                            {name : 'task2', status : '', dueDate : '2013-06-06T16:00:00.000Z'},
                            {name : 'task3', status : '', dueDate : '2013-06-06T16:00:00.000Z'},
                            {name : 'task4', status : '', dueDate : '2013-06-06T16:00:00.000Z'}];
        var percentComplete = projectStatus.percentComplete(projectTasks);
        expect(percentComplete).toBe(0);

      });


    it('should check the percent complete is 50%', function(){

        var projectTasks = [{name : 'task1', status : 'Closed', dueDate : '2013-06-06T16:00:00.000Z'},
                            {name : 'task2', status : 'Closed', dueDate : '2013-06-06T16:00:00.000Z'},
                            {name : 'task3', status : '', dueDate : '2013-06-06T16:00:00.000Z'},
                            {name : 'task4', status : '', dueDate : '2013-06-06T16:00:00.000Z'}];
        var percentComplete = projectStatus.percentComplete(projectTasks);
        expect(percentComplete).toBe(50);

      });

    it('should check the percent complete is 33%', function(){

        var projectTasks = [{name : 'task1', status : 'Closed', dueDate : '2013-06-06T16:00:00.000Z'},
                            {name : 'task2', status : '', dueDate : '2013-06-06T16:00:00.000Z'},
                            {name : 'task4', status : '', dueDate : '2013-06-06T16:00:00.000Z'}];
        var percentComplete = projectStatus.percentComplete(projectTasks);
        expect(percentComplete).toBe(33);

      });

    it('should say danger , have overdue tasks ', function(){

        var today = new Date();
        var isoDate = today.toISOString();

        var projectTasks = [{name : 'task1', status : '', date : '2012-06-06T16:00:00.000Z'},
                            {name : 'task2', status : '', date : isoDate},
                            {name : 'task4', status : '', date : '2012-06-06T16:00:00.000Z'}];
        var status = projectStatus.statusType(projectTasks);
        expect(status).toBe('danger');

      });

    it('should say warning , have tasks due today ', function(){

        var today = new Date();
        var isoDate = today.toISOString();

        var projectTasks = [{name : 'task1', status : 'completed', date : '2012-06-06T16:00:00.000Z'},
                            {name : 'task2', status : '', date : isoDate},
                            {name : 'task4', status : '', date : '2018-06-06T16:00:00.000Z'}];
        var status = projectStatus.statusType(projectTasks);
        expect(status).toBe('warning');

      });

    it('should say nothing , have tasks due today ', function(){

        var today = new Date();
        var isoDate = today.toISOString();

        var projectTasks = [{name : 'task1', status : 'completed', date : '2012-06-06T16:00:00.000Z'},
                            {name : 'task2', status : 'completed', date : isoDate},
                            {name : 'task4', status : '', date : '2018-06-06T16:00:00.000Z'}];
        var status = projectStatus.statusType(projectTasks);
        expect(status).toBe('');

      });

    it('should say handle undefined dates ', function(){

        var projectTasks = [{name : 'task1', status : ''},
            {name : 'task2', status : '', date : '2011-06-06T16:00:00.000Z'},
            {name : 'task4', status : '', date : '2018-06-06T16:00:00.000Z'}];
        var status = projectStatus.statusType(projectTasks);
        expect(status).toBe('danger');
      });

  });
