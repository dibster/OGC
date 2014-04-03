/**
 * Created by dibster on 11/19/13.
 */

'use strict';

var should = require('should');
var request = require('supertest');

var api = 'http://localhost:9000';

var addedFileId = '';

describe('File Tests', function() {

    describe('Base File Tests', function() {

        it('Should Add New File Items', function(done) {
            var newFileItem = {};
            newFileItem.name = 'file';
            newFileItem.Description = 'CO1';
            newFileItem.url = '/data/file.jpg';


            request(api)
                .post('/api/files')
                .send(newFileItem)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body._id.should.have.length(24);
                    addedFileId = res.body._id;
                    done();
                });
        });

        it('Should find just one File Item based on id', function(done) {
            request(api)
                .get('/api/files/' + addedFileId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body._id.should.eql(addedFileId);
                    done();
                });
        });

        it('Should update a File', function(done) {

            var updateFileItem = {};
            updateFileItem.name = 'File';
            updateFileItem.Description = 'CO2';
            updateFileItem.url = '/data/file.jpg';

            request(api)
                .put('/api/files/' + addedFileId)
                .send(updateFileItem)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.Description.should.eql('CO2');
                    done();
                });
        });

        it('Should remove the File Item', function(done) {
            request(api)
                .del('/api/files/'+ addedFileId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.text.should.containDeep(addedFileId);
                    done();
                });
        });

    });
});

