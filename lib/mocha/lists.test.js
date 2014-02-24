/**
 * Created by dibster on 11/19/13.
 */

'use strict';

var should = require('should');
var request = require('supertest');

var api = 'http://localhost:9000';

var addedListId = '';

describe('List Tests', function() {

    describe('Base List Tests', function() {

        it('Should Add New List Items', function(done) {
            var newListItem = {};
            newListItem.ListName = 'Change Orders';
            newListItem.Title = 'CO1';
            newListItem.Description = 'Description';

            request(api)
                .post('/api/lists')
                .send(newListItem)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body._id.should.have.length(24);
                    addedListId = res.body._id;
                    done();
                });
        });

        it('Should not find any items for list NoItems', function(done) {
            request(api)
                .get('/api/listbyname/NoItems')
                .expect(404)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.statusCode.should.eql('404');
                    done();
                });
        });


        it('Should find just one List Item for Change Orders', function(done) {
            request(api)
                .get('/api/listbyname/Change Orders')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.length.should.eql(1);
                    done();
                });
        });

        it('Should find just one List Item based on id', function(done) {
            request(api)
                .get('/api/lists/' + addedListId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body._id.should.eql(addedListId);
                    done();
                });
        });

        it('Should update a Project', function(done) {

            var updateListItem = {};
            updateListItem.ListName = 'Change Orders';
            updateListItem.Title = 'CO1';
            updateListItem.Description = 'Updated by Karma Tests';

            request(api)
                .put('/api/lists/' + addedListId)
                .send(updateListItem)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.Description.should.eql('Updated by Karma Tests');
                    done();
                });
        });

        it('Should remove the List Item', function(done) {
            request(api)
                .del('/api/lists/'+ addedListId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.text.should.containDeep(addedListId);
                    done();
                });
        });

    });
});

