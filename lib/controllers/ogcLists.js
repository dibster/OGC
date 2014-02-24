/**
 * Created by dibster on 2/17/14.
 */
'use strict';

var context = require('../config/env/db');

var db = context.db;
var BSON = context.BSON;


/**
 * Get ogc List Objects
 */

exports.findAll = function(req, res) {
    db.collection('ogclists', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log('objects send from DB');
            res.send(items);
        });
    });
};


exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving projects by User: ' + id);
    db.collection('ogclists', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
            if (item.length === 0) {
                // set 404
                res.status(404).send('Not found');
            }
            else {
                res.send(item);
            }
        });
    });
};

exports.findByListName = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving list by name : ' + id);
    db.collection('ogclists', function(err, collection) {
        collection.find({ 'ListName': id }).toArray(function(err, item) {
            if (item.length === 0) {
                // set 404
                res.status(404).send('Not found');
            }
            else {
                res.send(item);
            }
        });
    });
};

exports.add = function(req, res) {
    var object = req.body;
    // Add a user and date created field to the object somewhere here
    db.collection('ogclists', function(err, collection) {
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
    db.collection('ogclists', function(err, collection) {
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
    db.collection('ogclists', function(err, collection) {
        collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function(err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) removed');
                res.send(req.body);
            }
        });
    });
};
