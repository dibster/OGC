/**
 * Created by dibster on 11/19/13.
 */

'use strict';

var should = require('should');
var request = require('supertest');

var api = 'http://localhost:9000';

describe('Admin Reference Tests', function() {

    describe('Lookup Tests', function() {

        it('Return 11 field types', function(done) {
            request(api)
                .get('/api/admin/fieldtypes/')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                      throw err;
                    }
                    res.body.should.have.length(12);
                    done();
                  });
          });

        it('Return 5 object types', function(done) {
            request(api)
                .get('/api/admin/objecttypes/')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                      throw err;
                    }
                    res.body.should.have.length(5);
                    done();
                  });
          });
      });
  });

