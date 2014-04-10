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

exports.findAll = function(req, res) {
    var projectId = req.params.projectId;
    console.log('in method' + projectId);
    db.collection('ogcSmartLists', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(projectId)}, function(err, item) {
            if (err) {
                res.send(err);
            }
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
    var smartListObject = req.body;
    var projectId = req.params.projectId;
    var smartListName = req.params.type;
    var newRecord = {};



    // get the record, because we need to check to see if the smartlist exists

    db.collection('ogcSmartLists', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(projectId)}, function(err, item) {

            if (item  === null) {
                // add a new SmartList Object for this project
                var myObject = smartListObject;
                myObject.index = 0;
                var mysmartListName = smartListName;
                var mySmartLists = {};
                mySmartLists[mysmartListName] = [];
                // Add Timestamp to object
                newRecord = _.merge(myObject,timeStamp);
                mySmartLists[mysmartListName].push(newRecord);

                db.collection('ogcSmartLists', function(err, collection) {
                    collection.insert(mySmartLists, {safe: true}, function(err, result) {
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


