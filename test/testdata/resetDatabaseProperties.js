var db = require('../../lib/config/env/db');

var emptyDb = function() {

    console.log("Connected to database : " + db.databaseName);

    db.collection('kaboodleobjects').remove({},function(){
        console.log("remove kaboodle objects");
    });
    db.collection('kaboodlefieldtypes').remove({},function(){
        console.log("remove kaboodle field types");
    });
    db.collection('kaboodleprojects').remove({},function(){
        console.log("remove kaboodle projects");
    });
    db.collection('kaboodleObjectTypes').remove({},function(){
        console.log("remove kaboodle types");
    });
    db.collection('kaboodlelists').remove({},function(){
            console.log("remove kaboodle lists");
    });
        db.collection('kaboodleObjectTypes').remove({},function(){
        console.log("remove kaboodle types");
    });
    db.collection('kaboodletags').remove({},function(){
        console.log("remove kaboodle tags");
    });

    populateBaseProperties();

};

var populateBaseProperties = function() {
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
            collection.insert(objects, {safe: true}, function(err) {
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
            collection.insert(objects, {safe: true}, function(err) {
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
            collection.insert(objects, {safe: true}, function(err) {
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
        db.collection('kaboodletags', function(err,collection) {
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
    })
};

emptyDb();
