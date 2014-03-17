/**
 * Created by dibster on 11/19/13.
 */

'use strict';

var should = require('should');
var request = require('supertest');

var api = 'http://localhost:9000';

var addedUserId = '';

describe('User Tests', function() {

    describe('Base User Tests', function() {

        it('Should Add New User', function(done) {
            var newUserItem = {};
            newUserItem.UserName = 'dave.ashenhurst@hotmail.com';
            newUserItem.Title = 'Mr';
            newUserItem.Profile = 'I am a Marketing Manager';
            newUserItem.Password = 'APassword';

            request(api)
                .post('/api/users')
                .send(newUserItem)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body._id.should.have.length(24);
                    addedUserId = res.body._id;
                    done();
                });
        });


        it('Should find just one User Item based on id', function(done) {
            request(api)
                .get('/api/users/' + addedUserId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body._id.should.eql(addedUserId);
                    done();
                });
        });

        it('Should update a User', function(done) {

            var updateUserItem = {};
            updateUserItem.UserName = 'dave.ashenhurst@hotmail.com';
            updateUserItem.Title = 'Mr';
            updateUserItem.Profile = 'I am a Marketing Manager Update';
            updateUserItem.Password = 'APassword';

            request(api)
                .put('/api/users/' + addedUserId)
                .send(updateUserItem)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.Profile.should.eql('I am a Marketing Manager Update');
                    done();
                });
        });

        it('Should remove the User Item', function(done) {
            request(api)
                .del('/api/users/'+ addedUserId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.text.should.containDeep(addedUserId);
                    done();
                });
        });

    });
});

