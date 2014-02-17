'use strict';

var db = require('../config/env/db');

/**
 * Get Kaboode Reference Objects
 */
exports.kaboodleObjectTypes = function(req, res) {
    db.collection('kaboodletypes', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
            res.json(items);
        });
    });
};

exports.kaboodleFieldTypes = function(req, res) {
    db.collection('kaboodlefieldtypes', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
            res.json(items);
        });
    });
};

