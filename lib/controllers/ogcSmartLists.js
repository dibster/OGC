/**
 * Created by dibster on 2/17/14.
 */

'use strict';

var context = require('../config/env/db');
var _ = require('lodash');


var db = context.db;
var BSON = context.BSON;

exports.add = function(req, res) {
    var smartListObject = req.body;
    var projectId = req.params.projectId;
    var smartListName = req.params.type;
    // Add Timestamp Date
//    var datetimeNow = new Date();
//    var timeStamp = {'cd' : datetimeNow, 'md' : datetimeNow};
//    var newRecord = _.merge(smartListObject,timeStamp);

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
                mySmartLists[mysmartListName].push(myObject);

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
                item[smartListName].push(smartListObject);

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
                item[smartListName].push(smartListObject);
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


