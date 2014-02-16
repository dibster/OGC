'use strict';

var db = require('../config/env/db');

/**
 * Get awesome things
 */
exports.types = function(req, res) {
    db.collection('things', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
            res.json(items);
        });
    });
};