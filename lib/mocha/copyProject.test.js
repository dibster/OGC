/**
 * Created by dibster on 11/19/13.
 */

'use strict';

var should = require('should');
var request = require('supertest');

var api = 'http://localhost:9000';

var addedProjectId = '';
var secondProjectId = '';

describe('Copy Project Test', function() {

    describe('Base Project Copy', function() {

        it('Should Add a New Project', function(done) {
            var newSimpleProject = {};
            newSimpleProject.Title = 'Project To Copy Into';
            newSimpleProject.Type = 'Project';
            newSimpleProject.Description = 'Added by Karma Tests';
            request(api)
                .post('/api/projects')
                .send(newSimpleProject)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body._id.should.have.length(24);
                    addedProjectId = res.body._id;
                    done();
                });
        });


        it('Should Create Tasks on the project correct order', function(done) {

//          Set the Copy Details
            var newProjectCopyDetails = {};
            newProjectCopyDetails.startDate = new Date("October 1, 2013 12:13:00");
            newProjectCopyDetails.endDate = new Date("October 30, 2013 12:13:00");
            newProjectCopyDetails.useWeekends = false;
            newProjectCopyDetails.replaceAllTasks = false;
            newProjectCopyDetails.tasks = [];
            newProjectCopyDetails.tasks[0] = {'name' : 'Receive Brief','date' : '2014-01-16T00:00:00.000Z','who' : 'Test'};
            newProjectCopyDetails.tasks[1] = {'name' : 'Start Work','date' : '2014-04-16T00:00:00.000Z','who' : 'Test'};
            newProjectCopyDetails.tasks[2] = {'name' : 'Finish Work','date' : '2014-08-16T00:00:00.000Z','who' : 'Test'};
            newProjectCopyDetails.tasks[3] = {'name' : 'Bill Work','date' : '2014-12-16T00:00:00.000Z','who' : 'Test'};
            newProjectCopyDetails.team = ['Dave','Joe','Fred'];

            request(api)
                .put('/api/project/copy/' + addedProjectId)
                .send(newProjectCopyDetails)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body._id.should.have.length(24);
                    res.body.tasks.length.should.eql(4);
                    res.body.tasks[0].date.should.eql("2013-10-01T11:13:00.000Z");
                    done();
                });
        });

        it('Should Add a New Project', function(done) {
            var newSimpleProject = {};
            newSimpleProject.Title = 'Project To Copy Into in reverse';
            newSimpleProject.Type = 'Project';
            newSimpleProject.Description = 'Added by Karma Tests';
            request(api)
                .post('/api/projects')
                .send(newSimpleProject)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body._id.should.have.length(24);
                    secondProjectId = res.body._id;
                    done();
                });
        });

        it('Should Create Tasks on the project reverse order', function(done) {

//          Set the Copy Details
            var newProjectCopyDetails = {};
            newProjectCopyDetails.startDate = new Date("October 1, 2013 12:13:00");
            newProjectCopyDetails.endDate = new Date("October 30, 2013 12:13:00");
            newProjectCopyDetails.useWeekends = false;
            newProjectCopyDetails.replaceAllTasks = false;
            newProjectCopyDetails.tasks = [];
            newProjectCopyDetails.tasks[0] = {'name' : 'Receive Brief','date' : '2014-12-16T00:00:00.000Z','who' : 'Test'};
            newProjectCopyDetails.tasks[1] = {'name' : 'Start Work','date' : '2014-10-16T00:00:00.000Z','who' : 'Test'};
            newProjectCopyDetails.tasks[2] = {'name' : 'Finish Work','date' : '2014-08-16T00:00:00.000Z','who' : 'Test'};
            newProjectCopyDetails.tasks[3] = {'name' : 'Bill Work','date' : '2014-02-16T00:00:00.000Z','who' : 'Test'};
            newProjectCopyDetails.team = ['Dave','Joe','Fred'];

            request(api)
                .put('/api/project/copy/' + secondProjectId)
                .send(newProjectCopyDetails)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body._id.should.have.length(24);
                    res.body.tasks.length.should.eql(4);
                    res.body.tasks[0].date.should.eql("2013-10-01T11:13:00.000Z");
                    done();
                });
        });

    });
});

