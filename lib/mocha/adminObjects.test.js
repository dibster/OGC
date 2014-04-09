/**
 * Created by dibster on 11/19/13.
 */

'use strict';

var should = require('should');
var request = require('supertest');
var api = 'http://localhost:9000';

// test Data

var CampaignType = {};
var CampaignTypeUpdate = {};
CampaignType.name = 'FaceBook Project';
CampaignTypeUpdate.name = 'FaceBook Project Update';

var recordIdForReadTests = '';
var recordIdForProject = '';

// reset the test Database

describe('Object Tests, ', function () {

    before(function (done) {

        console.log('connecting to API');

        request(api)
            .get('/api/admin/resetDb/@ogcCarb0n')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                done();
            });
      });

    before(function (done) {
        console.log('getting objects');
        request(api)
            .get('/api/admin/objects/')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.length(5);
                recordIdForProject = res.body[4]._id;
                done();
            });

    });

    describe('Standard API access', function () {

        it('Return 5 Objects', function (done) {
            request(api)
                .get('/api/admin/objects/')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                      throw err;
                    }
                    res.body.should.have.length(5);
                    done();
                  });
          });

        it('Should Add a record ', function (done) {
            request(api)
                .post('/api/admin/objects')
                .send(CampaignType)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body._id.should.have.length(24);
                    recordIdForReadTests = res.body._id;
                    done();
                });
        });

        it('Should find a record by its Id ', function (done) {
            request(api)
                .get('/api/admin/objects/' + recordIdForReadTests)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.name.should.eql('FaceBook Project');
                    done();
                });
        });

        it('should update the record', function (done) {
            request(api)
                .put('/api/admin/objects/' + recordIdForReadTests)
                .send(CampaignTypeUpdate)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                      throw err;
                    }
                    res.body.name.should.be.exactly('FaceBook Project Update');
                    done();
                  });
          });

        it('Should remove a record by its Id ', function (done) {
            request(api)
                .del('/api/admin/objects/' + recordIdForReadTests)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                      throw err;
                    }
                    res.text.should.containDeep(recordIdForReadTests);
                    done();
                  });
          });

        it('Should find 6 fields for the project object', function (done) {
            request(api)
                .get('/api/admin/objects/' + recordIdForProject + '/fields' )
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                        }
                    res.body.fields.length.should.eql(6);
                    done();
                });
        });

        it('Should find 5 views for the project object', function (done) {
            request(api)
                .get('/api/admin/objects/' + recordIdForProject + '/views' )
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.views.length.should.eql(5);
                    done();
                });
        });

      });
  });

