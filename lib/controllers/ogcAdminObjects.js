/**
 * Created by dibster on 2/17/14.
 */
'use strict';

var context = require('../config/env/db');

var db = context.db;
var BSON = context.BSON;


/**
 * Get ogc Admin Objects
 */

exports.findAll = function(req, res) {
    db.collection('ogcObjects', function(err, collection) {
        collection.find().toArray(function(err, objects) {
            console.log('objects send from DB');
            res.send(objects);
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving object: ' + id);
    db.collection('ogcObjects', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, object) {
            res.send(object);
        });
    });
};

exports.findObjectDefinitionByType = function(req, res) {
    var type = req.params.type;
    console.log('Retrieving views by type: ' + type);
    db.collection('ogcObjects', function(err, collection) {
        collection.findOne({'name': type}, function(err, object) {
            res.send(object);
        });
    });
};

exports.add = function(req, res) {
    var object = req.body;
    console.log('Adding object: ' + JSON.stringify(object));
    db.collection('ogcObjects', function(err, collection) {
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
    db.collection('ogcObjects', function(err, collection) {
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
    db.collection('ogcObjects', function(err, collection) {
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

// All Fields for an Object
exports.findAllFields = function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.collection('ogcObjects', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)},{fields: {fields:1}}, function(err, item) {
            res.send(item);
        });
    });
};
// All Views for an Object
exports.findAllViews = function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.collection('ogcObjects', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)},{fields: {views:1}}, function(err, items) {
            res.send(items);
        });
    });
};

