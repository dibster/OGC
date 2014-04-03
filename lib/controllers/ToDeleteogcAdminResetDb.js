/**
 * Created by dibster on 2/17/14.
 */
'use strict';

var async = require('async');
var fs = require('fs');
var context = require('../config/env/db');

var db = context.db;

var populateBaseProperties = function() {
    var ogcObjects = './lib/mocha/testdata/ogcObjects.json';

    fs.readFile(ogcObjects, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var objects = JSON.parse(data);
        db.collection('ogcObjects', function(err, collection) {
            if (err) {
                throw err;
            }
            collection.insert(objects, {safe: true}, function(err) {
                if (err) {
                    throw err;
                }
            });
        });
    });

    var ogcObjectTypes = './lib/mocha/testdata/ogcObjectTypes.json';
    fs.readFile(ogcObjectTypes, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var objects = JSON.parse(data);
        db.collection('ogcObjectTypes', function(err, collection) {
            if (err) {
                throw err;
            }
            collection.insert(objects, {safe: true}, function(err) {
                if (err) {
                    throw err;
                }
            });
        });
    });

    var ogcFieldTypes = './lib/mocha/testdata/ogcFieldTypes.json';
    fs.readFile(ogcFieldTypes, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var objects = JSON.parse(data);
        db.collection('ogcFieldTypes', function(err, collection) {
            if (err) {
                throw err;
            }
            collection.insert(objects, {safe: true}, function(err) {
                if (err) {
                    throw err;
                }
            });
        });
    });

    var ogcTags = './lib/mocha/testdata/ogcTags.json';
    fs.readFile(ogcTags, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var objects = JSON.parse(data);
        db.collection('ogcTags', function(err,collection) {
            if (err) {
                throw err;
            }
            collection.insert(objects, {safe: true}, function(err) {
                if (err) {
                    throw err;
                }
            });
        });
    });

    var ogcFiles = './lib/mocha/testdata/ogcFiles.json';
    fs.readFile(ogcFiles, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var objects = JSON.parse(data);
        db.collection('ogcFiles', function(err,collection) {
            if (err) {
                throw err;
            }
            collection.insert(objects, {safe: true}, function(err) {
                if (err) {
                    throw err;
                }
            });
        });
    });

    var ogcUsers = './lib/mocha/testdata/ogcUsers.json';
    fs.readFile(ogcTags, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var objects = JSON.parse(data);
        db.collection('ogcUsers', function(err,collection) {
            if (err) {
                throw err;
            }
            collection.insert(objects, {safe: true}, function(err) {
                if (err) {
                    throw err;
                }
            });
        });
    });
};

exports.reset = function(req, res) {

    var key = req.params.key;

    if (key !== '@ogcCarb0n') {
        res.send('Invalid Key Sent');
    }
    else {

        console.log("Connected to database : " + db.databaseName);

        async.waterfall([
            function(callback) {
                console.log('doing remove');
                db.collection('ogcObjects').remove({}, function () {
                    console.log("remove ogc objects");
                });
                db.collection('ogcFieldTypes').remove({},function(){
                    console.log("remove ogc field types");
                });
                db.collection('ogcProjects').remove({},function(){
                    console.log("remove ogc projects");
                });
                db.collection('ogcObjectTypes').remove({},function(){
                    console.log("remove ogc types");
                });
                db.collection('ogcLists').remove({},function(){
                    console.log("remove ogc lists");
                });
                db.collection('ogcObjectTypes').remove({},function(){
                    console.log("remove ogc types");
                });
                db.collection('ogcFiles').remove({},function(){
                    console.log("remove ogc files");
                });
                db.collection('ogcUsers').remove({},function(){
                    console.log("remove users");
                });
                db.collection('ogcprojects').remove({},function(){
                    console.log("remove projects");
                });
                db.collection('ogcTags').remove({},function(){
                    console.log("remove ogc tags");
                });
                callback();
            },
            function(callback) {
                console.log('Starting add');
                populateBaseProperties();
                callback();
            }
        ]);
        console.log('Finished Adding Data ');
        res.send('Database Reset');

    }
};




