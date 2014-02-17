'use strict';

var api = require('./controllers/api'),
    ogcAdminReferences = require('./controllers/ogcAdminReferences'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
    app.get('/api/awesomeThings', api.awesomeThings);
    app.get('/api/admin/objecttypes', ogcAdminReferences.ogcObjectTypes);
    app.get('/api/admin/fieldtypes', ogcAdminReferences.ogcFieldTypes);


  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};