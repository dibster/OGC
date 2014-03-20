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
                    var textFieldArray = _.filter(ObjectDefinition.fields, function(field) { return field.type === 'Text' || field.type === 'Note'; });

                   // get text values from current project as strings for text search process

                   var fieldNames = _.pluck(textFieldArray,"name");

                   var textSearchString = "";
                   var numberOfFields = fieldNames.length;

                   for (var i=0;i<numberOfFields;i++) {
                        textSearchString = textSearchString + ' ' + currentProject[fieldNames[i]];
                   }
                   console.log(textSearchString);

                    // do the search

                   db.command({text:"ogcprojects" , search: "Battlefield 4 Description of Battlefield 4" },function (err, searchResults) {
                           res.send(searchResults);
                   });

                });
            });
        });
    });
};

