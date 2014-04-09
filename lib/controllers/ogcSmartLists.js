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
                var mysmartListName = smartListName;
                var mySmartLists = {};
                mySmartLists[mysmartListName] = [];
                mySmartLists[mysmartListName].push(myObject);

                db.collection('ogcSmartLists', function(err, collection) {
                    collection.insert(mySmartLists, {safe: true}, function(err, result) {
                        if (err) {
                            res.send({'error': 'An error has occurred'});
                        } else {
                            console.log(result[0]);
                            res.send(result[0]);
                        }
                    });
                });

            }
            else {
                 console.log('item is ' + JSON.stringify(item));
                 if (typeof item[smartListName] === "undefined") {
                     res.send('new smart list , existing project');
                 }
            }
//            db.collection('ogcsmartlists', function(err, collection) {
//                collection.insert(item, {safe: true}, function(err, result) {
//                    if (err) {
//                        res.send({'error': 'An error has occurred'});
//                    } else {
//                        console.log('Success: ' + JSON.stringify(result[0]));
//                        res.send(result[0]);
//                    }
//                });
//            });
        });
    });

};


