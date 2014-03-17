/**
 * Created by dibster on 2/17/14.
 */
'use strict';

var context = require('../config/env/db');

var db = context.db;

var populateBaseProperties = function() {
    var fs = require('fs');
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
                db.close();
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
                db.close();
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
                db.close();
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
                db.close();
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
                db.close();
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
        db.collection('ogcObjects').remove({},function(){
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
        db.collection('ogcUsers').remove({},function(){
            console.log("remove users");
        });
        db.collection('ogcTags').remove({},function(){
            console.log("remove ogc tags");
        });
        populateBaseProperties();
        res.send('Database Reset');
    }
};




