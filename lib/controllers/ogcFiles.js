/**
 * Created by dibster on 2/17/14.
 */
'use strict';

var context = require('../config/env/db');

var db = context.db;
var BSON = context.BSON;


/**
 * Add a File
 */

exports.uploadUserPictures = function(req, res) {
    console.log(req.body);
    console.log(req.files);
};

