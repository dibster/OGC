'use strict';

var context = require('../config/env/db');

var db = context.db;

/**
 * Get Kaboode Reference Objects
 */


exports.ogcObjectTypes = function(req, res) {
    db.collection('ogcObjectTypes', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
            res.json(items);
        });
    });
};

exports.ogcFieldTypes = function(req, res) {
    db.collection('ogcFieldTypes', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
            res.json(items);
        });
    });
};

exports.ogcReloadTestData = function(req, res) {

// empty project list

// add some project test data

};

