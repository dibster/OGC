/**
 * Created by dibster on 2/17/14.
 */
'use strict';

var context = require('../config/env/db');
var fs = require('fs');

var db = context.db;
//var BSON = context.BSON;


/**
 * Add a File
 */

exports.uploadUserPictures = function(req, res) {
//    console.log(req.body);
//    console.log(req.files);

    var tmp_path = req.files.file.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './app/data/images/people/' + req.files.file.name;

    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.size + ' bytes');
        });
    });
};

