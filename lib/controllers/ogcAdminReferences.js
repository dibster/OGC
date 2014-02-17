'use strict';

var db = require('../config/env/db');

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

exports.ogcTestData = function(req, res) {
    res.json('Added Test Data');
};

