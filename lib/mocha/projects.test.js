/**
 * Created by dibster on 11/19/13.
 */

'use strict';

var should = require('should');
var request = require('supertest');

var api = 'http://localhost:9000';

var addedProjectId = '';

describe('Project Tests', function() {

    describe('Base Project Tests', function() {

        it('Should Add a New Project', function(done) {
            var newSimpleProject = {};
            newSimpleProject.Title = 'Job 12345';
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

        it('Should not find any tasks for user Test', function(done) {
            request(api)
                .get('/api/projectsforuser/Test')
                .expect(404)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.statusCode.should.eql('404');
                    done();
                });
        });

        it('Should update a Project', function(done) {

            var updateSimpleProject = {
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
                    } ],
                'Invoices' : [
                    {
                        'Title' : 'Pay This',
                        'date' : '2014-01-16T00:00:00.000Z',
                        'who' : 'Test',
                        'u' : 1,
                        'cd' : '2014-01-16T08:30:07.441Z',
                        'Status' : 'Open'
                    },
                    {
                        'Title' : 'Pay This',
                        'date' : '2014-01-16T00:00:00.000Z',
                        'who' : 'Test',
                        'u' : 1,
                        'cd' : '2014-01-16T08:30:07.441Z',
                        'Status' : 'Open'
                    },
                    {
                        'Title' : 'Pay This',
                        'date' : '2014-01-16T00:00:00.000Z',
                        'who' : 'Test',
                        'u' : 1,
                        'cd' : '2014-01-16T08:30:07.441Z',
                        'Status' : 'Open'
                    }
            ]

            };
            
            request(api)
                .put('/api/projects/' + addedProjectId)
                .send(updateSimpleProject)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.Description.should.eql('Updated by Karma Tests');
                    done();
                });
        });

        it('Should find all Projects and return 1', function(done) {
            request(api)
                .get('/api/projects/')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.length.should.eql(1);
                    done();
                });
        });

        it('should return a project for userid Test', function(done) {
            request(api)
                .get('/api/projectsforuser/Test')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('Title');
                    res.body[0].tasks.length.should.eql(4);
                    done();
                });

        });

        it('should update a task based on project and create date', function(done) {

            var newTask = {};
            newTask.name = 'Receive Brief Updated';
            newTask.date = '2014-01-16T00:00:00.000Z';
            newTask.who =  'Dave';
            newTask.u =  1;
            newTask.cd = '2014-01-16T08:30:07.441Z';
            newTask.taskStatus = 'Open';

            request(api)
                .put('/api/projects/' + addedProjectId + '/tasks/' + newTask.cd)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.text.should.containDeep('Task Updated');
                    done();
                });

        });

        it('show retrieve the invoices for a record' + addedProjectId, function(done) {
            request(api)
                .get('/api/projects/' + addedProjectId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.have.property('Invoices');
                    done();
                });
        });




        it('Should remove the Project', function(done) {
            request(api)
                .del('/api/projects/'+ addedProjectId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.text.should.containDeep(addedProjectId);

                    done();
                });
        });

    });
});

