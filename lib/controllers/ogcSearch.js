/**
 * Created by dibster on 2/17/14.
 */
'use strict';

var context = require('../config/env/db');
var _ = require('lodash');

var db = context.db;
var BSON = context.BSON;


/**
 * Find similar Projects
 */

exports.findMatchingProjects = function(req, res) {
    var currentProjectId = req.params.id;

    // get the current record
    db.collection('ogcprojects', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(currentProjectId)}, function(err, currentProject) {
            // Now get the fields for this object type
            db.collection('ogcObjects', function(err, collection) {
                collection.findOne({'name': currentProject.Type}, function(err, ObjectDefinition) {
                   // get the text fields
                   var textFields = _.filter(ObjectDefinition.fields, {'type' : 'Text'});
                   res.send(textFields);
                });
            });
        });
    });
};

