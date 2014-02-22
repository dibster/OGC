/**
 * Created by dibster on 2/17/14.
 */

'use strict';

var context = require('../config/env/db');

var db = context.db;
var BSON = context.BSON;


exports.findAll = function(req, res) {
    db.collection('ogcprojects', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log('objects send from DB');
            res.send(items);
        });
    });
};


exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving projects by Id: ' + id);
    db.collection('ogcprojects', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findByUserId = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving object: ' + id);
    db.collection('ogcprojects', function(err, collection) {
        collection.find({ 'tasks.who': id }).toArray(function(err, item) {
            res.send(item);
        });
    });
};

exports.add = function(req, res) {
    var object = req.body;
    // Add a user and date created field to the object somewhere here
    db.collection('ogcprojects', function(err, collection) {
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
    db.collection('ogcprojects', function(err, collection) {
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
    db.collection('ogcprojects', function(err, collection) {
        collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function(err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) removed');
                res.send('Deleted Project with id : ' + id);
            }
        });
    });
};

// Tasks

exports.updateTask = function(req, res) {
    var id = req.params.id;
    var cd = req.params.cd;
    var updatedTask = req.body;

    db.collection('ogcprojects', function(err, collection) {
        collection.update({'_id': new BSON.ObjectID(id), 'tasks.cd' : cd}, { $set : {'tasks.$' : updatedTask}}, {safe: true}, function(err, result) {
            if (err) {
                console.log('Error updating object: ' + err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.log(result);
                res.send('Task Updated');
            }
        });
    });
};