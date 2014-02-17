var db = require('../../lib/config/env/db');

console.log('Open Database');

//db.open(function(err, db) {
//    if (!err) {
//        console.log("Connected to blueprint database");
//        db.collection('kaboodleobjects', {strict: true}, function(err, collection) {
//            if (err) {
//                console.log("The objects collection is empty...");
//            }
//        });
//    }
//    else {
//        console.log('err ' + err);
//    }
//});

var emptyDb = function() {
    console.log("Connected to 'blueprintdb' database");
    db.collection('kaboodleobjects').remove({},function(err,numberRemoved){
        console.log("remove kaboodle objects");
    });
    db.collection('kaboodlefieldtypes').remove({},function(err,numberRemoved){
        console.log("remove kaboodle field types");
    });
    db.collection('kaboodleprojects').remove({},function(err,numberRemoved){
        console.log("remove kaboodle projects");
    });
    db.collection('kaboodleObjectTypes').remove({},function(err,numberRemoved){
        console.log("remove kaboodle types");
    });
    db.collection('kaboodlelists').remove({},function(err,numberRemoved){
            console.log("remove kaboodle lists");
    });
        db.collection('kaboodleObjectTypes').remove({},function(err,numberRemoved){
        console.log("remove kaboodle types");
    });
    db.collection('kaboodletags').remove({},function(err,numberRemoved){
        console.log("remove kaboodle tags");
    });
    db.collection('kaboodleobjects', {strict:true}, function(err, collection) {
        populateDB();
//        res.send('Database Reset');
    });
};

var populateDB = function() {
    var fs = require('fs');
    var kaboodleobjects = 'kaboodleobjects.json';

    fs.readFile(kaboodleobjects, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var objects = JSON.parse(data);
        db.collection('kaboodleobjects', function(err, collection) {
            if (err) {
                throw err;
            }
            collection.insert(objects, {safe: true}, function(err, result) {
                if (err) {
                    throw err;
                }
                db.close();
            });
        });
    });

    var objecttypes = 'kaboodleObjectTypes.json';
    fs.readFile(objecttypes, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var objects = JSON.parse(data);
        db.collection('kaboodleObjectTypes', function(err, collection) {
            if (err) {
                throw err;
            }
            collection.insert(objects, {safe: true}, function(err, result) {
                if (err) {
                    throw err;
                }
                db.close();
            });
        });
    });

    var fieldtypes = 'kaboodlefieldtypes.json';
    fs.readFile(fieldtypes, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var objects = JSON.parse(data);
        db.collection('kaboodlefieldtypes', function(err, collection) {
            if (err) {
                throw err;
            }
            collection.insert(objects, {safe: true}, function(err, result) {
                if (err) {
                    throw err;
                }
                db.close();
            });
        });
    });

    var kaboodletags = 'kaboodletags.json';
    fs.readFile(kaboodletags, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var objects = JSON.parse(data);
        db.collection('kaboodletags', function(err, collection) {
            if (err) {
                throw err;
            }
            collection.insert(objects, {safe: true}, function(err, result) {
                if (err) {
                    throw err;
                }
                db.close();
            });
        });
    })
};

emptyDb();
