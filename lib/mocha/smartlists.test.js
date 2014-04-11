/**
 * Created by dibster on 11/19/13.
 */

'use strict';

var should = require('should');
var request = require('supertest');

var api = 'http://localhost:9000';

var addedListProjectId = '';
var projectId = '5341bbc1f0547bffd3000002';



describe('List Tests', function() {

    describe('Base List Tests', function() {

        it('Should Add New SmartList Object and a new Item', function(done) {
            var newListItem = {};
            newListItem.ListType = 'ChangeOrders';
            newListItem.Title = 'CO1';
            newListItem.Description = 'Description';

            request(api)
                .post('/api/smartlists/' + projectId + '/' + newListItem.ListType)
                .send(newListItem)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.ChangeOrders.length.should.eql(1);
                    addedListProjectId = res.body._id;
                    done();
                });
        });

        it('Should Add New SmartList Object Type to Existing Project', function(done) {
            var newSmartList = {};
            newSmartList.ListType = 'TimeSheet';
            newSmartList.Title = 'TO1';
            newSmartList.Description = 'Description of Timesheet';

            request(api)
                .post('/api/smartlists/' + addedListProjectId + '/' + newSmartList.ListType)
                .send(newSmartList)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.ChangeOrders.length.should.eql(1);
                    res.body.TimeSheet.length.should.eql(1);
                    done();
                });
        });

        it('Should Add New SmartList Item to existing project and item', function(done) {
            var newSmartList = {};
            newSmartList.ListType = 'TimeSheet';
            newSmartList.Title = 'TO2';
            newSmartList.Description = 'Description of Timesheet';

            request(api)
                .post('/api/smartlists/' + addedListProjectId + '/' + newSmartList.ListType)
                .send(newSmartList)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.ChangeOrders.length.should.eql(1);
                    res.body.TimeSheet.length.should.eql(2);
                    res.body.TimeSheet[1].index.should.equal(1);
                    res.body.TimeSheet[1].should.have.property('cd');
                    console.log(res.body);
                    done();
                });
        });

        it('Should Return all Timesheet records ', function(done) {
            var newSmartList = {};
            newSmartList.ListType = 'TimeSheet';
            newSmartList.Title = 'TO2';
            newSmartList.Description = 'Description of Timesheet';

            request(api)
                .get('/api/smartlists/' + addedListProjectId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.TimeSheet.length.should.eql(2);
                    res.body.ChangeOrders.length.should.eql(1);
                    done();
                });
        });


    });
});

