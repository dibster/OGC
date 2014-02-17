/**
 * Created by dibster on 2/16/14.
 */

'use strict';

var mongo  = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('ogc', server);

module.exports = db;