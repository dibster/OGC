'use strict';

var api = require('./controllers/api'),
    adminreferences = require('./controllers/adminreferences'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
    app.get('/api/awesomeThings', api.awesomeThings);
    app.get('/api/admin/objecttypes', adminreferences.kaboodleObjectTypes);
    app.get('/api/admin/fieldtypes', adminreferences.kaboodleFieldTypes);


  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};