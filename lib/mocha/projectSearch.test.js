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

        it('Should find a match using search API', function(done) {
            request(api)
                .get('/api/match/project/' + addedProjectId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.statusCode.should.eql('200');
                    res.text.should.containDeep(addedProjectId);
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

