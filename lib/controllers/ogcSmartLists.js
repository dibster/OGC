/**
 * Created by dibster on 2/17/14.
 */

'use strict';

var context = require('../config/env/db');
var _ = require('lodash');


var db = context.db;
var BSON = context.BSON;
var datetimeNow = new Date();
var timeStamp = {'cd' : datetimeNow, 'md' : datetimeNow};

exports.findAllTypes = function(req, res) {
    console.log('in findalltypes' + req);
    db.collection('ogcObjects', function(err, collection) {
        collection.find({'type': 'List'}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findAll = function(req, res) {
    var projectId = req.params.projectId;
    console.log('in method' + projectId);
    db.collection('ogcSmartLists', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(projectId)}, function(err, item) {
            if (err) {
                res.send(err);
            }
            if (typeof item === 'undefined') {
                // set 404
                res.status(404).send('Not found');
            }
            else {
                console.log('found one');
                res.send(item);
            }
        });
    });
};


exports.add = function(req, res) {
    var smartListObject = req.body;
    var projectId = req.params.projectId;
    var smartListName = req.params.type;
    var newRecord = {};

    // get the record, because we need to check to see if the smartlist exists

    db.collection('ogcSmartLists', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(projectId)}, function(err, item) {
            console.log(err);
            if (item  === null) {
                // add a new SmartList Object for this project
                console.log('brand new' + projectId);
                var myObject = smartListObject;
                myObject.index = 0;
                var mysmartListName = smartListName;
                var mySmartLists = {};
                mySmartLists[mysmartListName] = [];
                // Add Timestamp to object
                newRecord = _.merge(myObject,timeStamp);
                mySmartLists[mysmartListName].push(newRecord);
                mySmartLists._id = new BSON.ObjectID(projectId);
                console.log('adding new item with id : ' + projectId);
                db.collection('ogcSmartLists', function(err, collection) {
                    collection.insert(mySmartLists,{safe: true}, function(err, result) {
                        if (err) {
                            res.send({'error': 'An error has occurred'});
                        } else {
                            res.send(result[0]);
                        }
                    });
                });

            }
            else if (typeof item[smartListName] === "undefined") {
                smartListObject.index = 0;
                item[smartListName] = [];
                newRecord = _.merge(smartListObject,timeStamp);
                item[smartListName].push(newRecord);
                console.log('add new :' + smartListName);
                db.collection('ogcSmartLists', function(err, collection) {
                    collection.update({'_id': new BSON.ObjectID(projectId)}, item, {safe: true}, function(err) {
                        if (err) {
                            res.send({'error': 'An error has occurred'});
                        } else {
                            res.send(item);
                        }
                    });
                });
            }
            else {
                smartListObject.index = item[smartListName].length;
                newRecord = _.merge(smartListObject,timeStamp);
                item[smartListName].push(newRecord);
                console.log('update :' + smartListName);

                db.collection('ogcSmartLists', function(err, collection) {
                    collection.update({'_id': new BSON.ObjectID(projectId)}, item, {safe: true}, function(err) {
                        if (err) {
                            res.send({'error': 'An error has occurred'});
                        } else {
                            res.send(item);
                        }
                    });
                });
            }

        });
    });

};


