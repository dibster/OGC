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

        it('Should not find any tasks for user TEST', function(done) {
            request(api)
                .get('/api/projectsforuser/TEST')
                .expect(404)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.statusCode.should.eql('404');
                    done();
                });
        });

        it('Update a Project', function(done) {
            var updateSimpleProject = {};
            updateSimpleProject.Title = 'Job 12345';
            updateSimpleProject.Type = 'Project';
            updateSimpleProject.Description = 'Updated by Karma Tests';
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


        it('Remove the Project', function(done) {
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

