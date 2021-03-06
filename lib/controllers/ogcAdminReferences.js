'use strict';

var context = require('../config/env/db');

var db = context.db;

/**
 * Get OGC Reference Objects
 */

exports.ogcObjectTypes = function(req, res) {
    db.collection('ogcObjectTypes', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
            res.json(items);
        });
    });
};

/**
 * Get OGC Project Channel Types
 */

exports.ogcChannelTypes = function(req, res) {
    db.collection('ogcChannelTypes', function(err, collection) {
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


