'use strict';

var api = require('./controllers/api'),
    ogcAdminReferences = require('./controllers/ogcAdminReferences'),
    ogcAdminObjects = require('./controllers/ogcAdminObjects'),
    ogcProjects = require('./controllers/ogcProjects'),
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
    app.get('/api/admin/objects/:id/fields', ogcAdminObjects.findAllFields);
    app.get('/api/admin/objects/:id/views', ogcAdminObjects.findAllViews);

    // Projects
    app.get('/api/projects', ogcProjects.findAll);
    app.get('/api/projects/:id', ogcProjects.findById);
    app.post('/api/projects', ogcProjects.add);
    app.put('/api/projects/:id', ogcProjects.update);
    app.delete('/api/projects/:id', ogcProjects.remove);

    // Projects for a user
    app.get('/api/projectsforuser/:id', ogcProjects.findByUser);

    // Tasks
    app.get('/api/projects/:id/tasks', ogcProjects.findAllTasks);
    app.get('/api/projects/:id/tasks/:cd', ogcProjects.findTasksById);
    app.post('/api/projects/:id/tasks/:cd', ogcProjects.addTask);
    app.put('/api/projects/:id/tasks/:cd', ogcProjects.updateTask);
    app.delete('/api/projects/:id/tasks/:cd', ogcProjects.removeTask);

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', index.index);
};