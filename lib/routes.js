'use strict';

var api = require('./controllers/api'),
    ogcAdminReferences = require('./controllers/ogcAdminReferences'),
    ogcAdminObjects = require('./controllers/ogcAdminObjects'),
    ogcAdminTests = require('./controllers/ogcAdminResetDb'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

    // Server API Routes
    app.get('/api/awesomeThings', api.awesomeThings);
    app.get('/api/admin/resetDb/:key', ogcAdminTests.reset);

    // Admin References
    app.get('/api/admin/objecttypes', ogcAdminReferences.ogcObjectTypes);
    app.get('/api/admin/fieldtypes', ogcAdminReferences.ogcFieldTypes);

    // Admin Objects
    app.get('/api/admin/objects', ogcAdminObjects.findAll);
    app.get('/api/admin/objects/:id', ogcAdminObjects.findById);
    app.post('/api/admin/objects', ogcAdminObjects.add);
    app.put('/api/admin/objects/:id', ogcAdminObjects.update);
    app.delete('/api/admin/objects/:id', ogcAdminObjects.remove);

    app.get('/api/admin/reloadTestData', ogcAdminReferences.ogcReloadTestData);

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', index.index);
};