'use strict';

var api = require('./controllers/api'),
    ogcAdminReferences = require('./controllers/ogcAdminReferences'),
    ogcAdminObjects = require('./controllers/ogcAdminObjects'),
    ogcProjects = require('./controllers/ogcProjects'),
    ogcUsers = require('./controllers/ogcUsers'),
    ogcSearch = require('./controllers/ogcSearch'),
    ogcCopyProject = require('./controllers/ogcCopyProject'),
    ogcFiles = require('./controllers/ogcFiles'),
    ogcAdminTests = require('./controllers/ToDeleteogcAdminResetDb'),
    ogcSmartList = require('./controllers/ogcSmartLists'),
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
    
    // SmartLists

    app.get('/api/smartlists/:projectId', ogcSmartList.findAll);
    app.get('/api/smartlisttypes', ogcSmartList.findAllTypes);
    app.post('/api/smartlists/:projectId/:type', ogcSmartList.add);

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

    // Files
    app.get('/api/files', ogcFiles.findAll);
    app.get('/api/files/:id', ogcFiles.findById);
    app.post('/api/files', ogcFiles.add);
    app.put('/api/files/:id', ogcFiles.update);
    app.delete('/api/files/:id', ogcFiles.remove);

    // file streams
    app.post('/api/users/addpicture', ogcFiles.uploadUserPictures);
    app.post('/api/files/addfile', ogcFiles.uploadFiles);


    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', index.index);
};