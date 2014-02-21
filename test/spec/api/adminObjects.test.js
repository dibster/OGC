/**
 * Created by dibster on 11/19/13.
 */

var should = require('should');
var request = require('supertest');
var api = 'http://localhost:9000';
var recordIdForReadTests = '';

// reset the test Database

//request(api)
//    .get('/api/admin/resetDb/@ogcCarb0n')
//    .expect(200)
//    .end(function(err, res) {
//        if (err) {
//            throw err;
//        }
//        res.text.should.contain('Database Reset');
//    });


describe('Object Tests, ', function() {

    before(function(done) {

        var newFaceBookProjectType = {
            'name' : 'FaceBook Project',
            'description': 'FaceBook Project ...',
            'type' : 'Project',
            'template' : true,
            'fields' : [{'name' : 'Title', 'type' : 'Text','req' : 'y'},
                {'name' : 'Description', 'type' : 'Note','req' : 'n'},
                {'name' : 'Start', 'type' : 'Date','req' : 'n'},
                {'name' : 'End', 'type' : 'Date','req' : 'n'},
                {'name' : 'Status', 'type' : 'List','req' : 'n','values' :['a','b','c']},
                {'name' : 'Owner', 'type' : 'user','req' : 'n'}
            ],
            'views' : [{ 'name' : 'Create',
                'fields' :  [{'name' : 'Title', 'type' : 'Text','req' : 'y'},
                    {'name' : 'Description', 'type' : 'Note','req' : 'n'},
                    {'name' : 'Start', 'type' : 'Date','req' : 'n'},
                    {'name' : 'End', 'type' : 'Date','req' : 'n'},
                    {'name' : 'Owner', 'type' : 'user','req' : 'n'}]
            },
                { 'name' : 'Edit',
                    'fields' :  [{'name' : 'Title', 'type' : 'Text','req' : 'y'},
                        {'name' : 'Description', 'type' : 'Note','req' : 'n'},
                        {'name' : 'Start', 'type' : 'Date','req' : 'n'},
                        {'name' : 'End', 'type' : 'Date','req' : 'n'},
                        {'name' : 'Status', 'type' : 'List','req' : 'n','values' :['a','b','c']},
                        {'name' : 'Owner', 'type' : 'user','req' : 'n'}]
                },
                { 'name' : 'Show',
                    'fields' :  [{'name' : 'Title', 'type' : 'Text','req' : 'y'},
                        {'name' : 'Description', 'type' : 'Note','req' : 'n'},
                        {'name' : 'Start', 'type' : 'Date','req' : 'n'},
                        {'name' : 'End', 'type' : 'Date','req' : 'n'},
                        {'name' : 'Status', 'type' : 'List','req' : 'n','values' :['a','b','c']},
                        {'name' : 'Owner', 'type' : 'user','req' : 'n'}]
                },
                { 'name' : 'List',
                    'fields' :  [{'name' : 'Title', 'type' : 'Text','req' : 'y'},
                        {'name' : 'Description', 'type' : 'Note','req' : 'n'},
                        {'name' : 'Start', 'type' : 'Date','req' : 'n'},
                        {'name' : 'End', 'type' : 'Date','req' : 'n'},
                        {'name' : 'Status', 'type' : 'List','req' : 'n','values' :['a','b','c']},
                        {'name' : 'Owner', 'type' : 'user','req' : 'n'}]
                },
                { 'name' : 'Dashboard',
                    'fields' :  [{'name' : 'Title', 'type' : 'Text','req' : 'y'},
                        {'name' : 'Description', 'type' : 'Note','req' : 'n'},
                        {'name' : 'Start', 'type' : 'Date','req' : 'n'},
                        {'name' : 'End', 'type' : 'Date','req' : 'n'},
                        {'name' : 'Status', 'type' : 'List','req' : 'n','values' :['a','b','c']},
                        {'name' : 'Owner', 'type' : 'user','req' : 'n'}]
                }]
        };

        request(api)
            .post('/api/admin/objects')
            .send(newFaceBookProjectType)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.body._id.should.have.length(24);
                recordIdForReadTests = res.body._id;
                done();
            });
    });


    describe('Standard API access', function() {

        it('Return 6 Objects', function(done) {
            request(api)
                .get('/api/admin/objects/')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.have.length(7);
                    done();
                });
        });

        it('Should find a record by its Id ' , function(done) {
            request(api)
                .get('/api/admin/objects/' + recordIdForReadTests)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.name.should.eql('FaceBook Project');
                    done();
                });
        });

        it('should update the record', function(done) {
            var FaceBookProjectUpdate = {
                'name' : 'FaceBook Project Update',
                'description': 'Default Project Object ...',
                'type' : 'Project',
                'template' : true,
                'fields' : [{'name' : 'Title', 'type' : 'Text','req' : 'y'},
                    {'name' : 'Description', 'type' : 'Note','req' : 'n'},
                    {'name' : 'Start', 'type' : 'Date','req' : 'n'},
                    {'name' : 'End', 'type' : 'Date','req' : 'n'},
                    {'name' : 'Status', 'type' : 'List','req' : 'n','values' :['a','b','c']},
                    {'name' : 'Owner', 'type' : 'user','req' : 'n'}
                ],
                'views' : [{ 'name' : 'Create',
                    'fields' :  [{'name' : 'Title', 'type' : 'Text','req' : 'y'},
                        {'name' : 'Description', 'type' : 'Note','req' : 'n'},
                        {'name' : 'Start', 'type' : 'Date','req' : 'n'},
                        {'name' : 'End', 'type' : 'Date','req' : 'n'},
                        {'name' : 'Owner', 'type' : 'user','req' : 'n'}]
                },
                    { 'name' : 'Edit',
                        'fields' :  [{'name' : 'Title', 'type' : 'Text','req' : 'y'},
                            {'name' : 'Description', 'type' : 'Note','req' : 'n'},
                            {'name' : 'Start', 'type' : 'Date','req' : 'n'},
                            {'name' : 'End', 'type' : 'Date','req' : 'n'},
                            {'name' : 'Status', 'type' : 'List','req' : 'n','values' :['a','b','c']},
                            {'name' : 'Owner', 'type' : 'user','req' : 'n'}]
                    },
                    { 'name' : 'Show',
                        'fields' :  [{'name' : 'Title', 'type' : 'Text','req' : 'y'},
                            {'name' : 'Description', 'type' : 'Note','req' : 'n'},
                            {'name' : 'Start', 'type' : 'Date','req' : 'n'},
                            {'name' : 'End', 'type' : 'Date','req' : 'n'},
                            {'name' : 'Status', 'type' : 'List','req' : 'n','values' :['a','b','c']},
                            {'name' : 'Owner', 'type' : 'user','req' : 'n'}]
                    },
                    { 'name' : 'List',
                        'fields' :  [{'name' : 'Title', 'type' : 'Text','req' : 'y'},
                            {'name' : 'Description', 'type' : 'Note','req' : 'n'},
                            {'name' : 'Start', 'type' : 'Date','req' : 'n'},
                            {'name' : 'End', 'type' : 'Date','req' : 'n'},
                            {'name' : 'Status', 'type' : 'List','req' : 'n','values' :['a','b','c']},
                            {'name' : 'Owner', 'type' : 'user','req' : 'n'}]
                    },
                    { 'name' : 'Dashboard',
                        'fields' :  [{'name' : 'Title', 'type' : 'Text','req' : 'y'},
                            {'name' : 'Description', 'type' : 'Note','req' : 'n'},
                            {'name' : 'Start', 'type' : 'Date','req' : 'n'},
                            {'name' : 'End', 'type' : 'Date','req' : 'n'},
                            {'name' : 'Status', 'type' : 'List','req' : 'n','values' :['a','b','c']},
                            {'name' : 'Owner', 'type' : 'user','req' : 'n'}]
                    }]
            };

            request(api)
                .put('/api/admin/objects/' + recordIdForReadTests)
                .send(FaceBookProjectUpdate)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.name.should.be.exactly('FaceBook Project Update');
                    done();
                });
        });


        it('Should remove a record by its Id ' , function(done) {
            request(api)
                .get('/api/admin/objects/' + recordIdForReadTests)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    });
});

