/**
 * Created by dibster on 2/17/14.
 */
'use strict';

var context = require('../config/env/db');
var fs = require('fs');

var db = context.db;
var BSON = context.BSON;


var imagesExtensions = ['jpg','png','gif'];
var officeExtensions = ['ppt', 'doc', 'xls'];


/**
 * Get ogc Admin Objects
 */

exports.findAll = function(req, res) {
    db.collection('ogcFiles', function(err, collection) {
        collection.find().toArray(function(err, objects) {
            console.log('objects send from DB');
            res.send(objects);
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving object: ' + id);
    db.collection('ogcFiles', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, object) {
            res.send(object);
        });
    });
};


exports.add = function(req, res) {
    var object = req.body;
    console.log('Adding object: ' + JSON.stringify(object));
    db.collection('ogcFiles', function(err, collection) {
        collection.insert(object, {safe: true}, function(err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body;
    console.log('Updating object: ' + id);
    console.log(JSON.stringify(object));
    delete object._id;
    db.collection('ogcFiles', function(err, collection) {
        collection.update({'_id': new BSON.ObjectID(id)}, object, {safe: true}, function(err, result) {
            if (err) {
                console.log('Error updating object: ' + err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(object);
            }
        });
    });
};

exports.remove = function(req, res) {
    var id = req.params.id;
    console.log('Removing object: ' + id);
    db.collection('ogcFiles', function(err, collection) {
        collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function(err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) removed');
                res.send('Deleted Record with id : ' + id);
            }
        });
    });
};


/**
 * Add Streams
 */

exports.uploadUserPictures = function(req, res) {

    var tmp_path = req.files.file.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './app/data/images/people/' + req.files.file.name;

    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.size + ' bytes');
        });
    });
};

exports.uploadFiles = function(req, res) {

    var fileUploadResponse = {};
    fileUploadResponse.projectId = req.body.projectId;

    var tmp_path = req.files.file.path;
    // set where the file should actually exists - in this case it is in the "project files" directory
    var target_path = '/app/data/files/project/' + req.body.projectId + req.files.file.name;

    fileUploadResponse.temporaryPath = tmp_path;
    fileUploadResponse.targetPath = target_path;
    fileUploadResponse.size = req.files.file.size;
    fileUploadResponse.filename = req.files.file.name;
    // calculate extension

    var a = fileUploadResponse.filename.split(".");


    if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
        fileUploadResponse.extension = "";
    }
    else {
        fileUploadResponse.extension = a.pop();
    }

    fileUploadResponse.isImage = false;
    fileUploadResponse.isOffice = false;

    if (imagesExtensions.indexOf(fileUploadResponse.extension) >= 0) {
        fileUploadResponse.isImage = true;
    }
    else if (officeExtensions.indexOf(fileUploadResponse.extension) >= 0)  {
        fileUploadResponse.isOffice = true;
    }

    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send(fileUploadResponse);
        });
    });
};
