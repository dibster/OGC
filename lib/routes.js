'use strict';

var api = require('./controllers/api'),
    references = require('./controllers/references'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
    app.get('/api/awesomeThings', api.awesomeThings);
    app.get('/api/references', references.types);


  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};