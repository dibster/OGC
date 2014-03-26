'use strict';

var api = require('./controllers/api'),
    ogcAdminReferences = require('./controllers/ogcAdminReferences'),
    ogcAdminObjects = require('./controllers/ogcAdminObjects'),
    ogcProjects = require('./controllers/ogcProjects'),
    ogcLists = require('./controllers/ogcLists'),
    ogcUsers = require('./controllers/ogcUsers'),
    ogcSearch = require('./controllers/ogcSearch'),
    ogcCopyProject = require('./controllers/ogcCopyProject'),
    ogcAdminTests = require('./controllers/ToDeleteogcAdminResetDb'),
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
    app.get('/api/admin/objects/findbytype/:type', ogcAdminObjects.findObjectDefinitionByType);

    // Projects
    app.get('/api/projects/types', ogcProjects.findAllTypes);
    app.get('/api/projects', ogcProjects.findAll);
    app.get('/api/projects/type/:type', ogcProjects.findAllByType);
    app.get('/api/projects/:id', ogcProjects.findById);
    app.post('/api/projects', ogcProjects.add);
    app.put('/api/projects/:id', ogcProjects.update);
    app.delete('/api/projects/:id', ogcProjects.remove);
    
    // Lists
    app.get('/api/lists', ogcLists.findAll);
    app.get('/api/lists/:id', ogcLists.findById);
    app.post('/api/lists', ogcLists.add);
    app.put('/api/lists/:id', ogcLists.update);
    app.delete('/api/lists/:id', ogcLists.remove);
    app.get('/api/listbyname/:id', ogcLists.findByListName);

    // Projects for a user
    app.get('/api/projectsforuser/:id', ogcProjects.findByUserId);

    // Search for similar items
    app.get('/api/match/project/:id', ogcSearch.findMatchingProjects);

    // Copy project
    app.put('/api/project/copy/:id', ogcCopyProject.copyProject);

    // Tasks
    app.put('/api/projects/:id/tasks/:cd', ogcProjects.updateTask);

    // Users
    app.get('/api/users', ogcUsers.findAll);
    app.get('/api/users/:id', ogcUsers.findById);
    app.post('/api/users', ogcUsers.add);
    app.put('/api/users/:id', ogcUsers.update);
    app.delete('/api/users/:id', ogcUsers.remove);
        
    
    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', index.index);
};