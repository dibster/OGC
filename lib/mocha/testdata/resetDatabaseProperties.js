var context = require('../../lib/config/env/db');

var db=context.db;

var emptyDb = function() {

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
    db.collection('ogcUsers').remove({},function(){
            console.log("remove Users");
    });
    db.collection('ogcTags').remove({},function(){
        console.log("remove ogc tags");
    });

    populateBaseProperties();

};

var populateBaseProperties = function() {
    var fs = require('fs');
    var ogcObjects = 'ogcObjects.json';

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

    var objecttypes = 'ogcObjectTypes.json';
    fs.readFile(objecttypes, 'utf8', function(err, data) {
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

    var fieldtypes = 'ogcFieldTypes.json';
    fs.readFile(fieldtypes, 'utf8', function(err, data) {
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

    var ogctags = 'ogcTags.json';
    fs.readFile(ogctags, 'utf8', function(err, data) {
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
    })
};

emptyDb();
