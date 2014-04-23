'use strict';

var url = 'http://localhost:9000/';

angular.module('ogcApp')
    .factory('Objects', function ($resource) {
        // return the API
        return $resource(url + 'api/admin/objects/:id', {id:'@_id'}, {update:{method: 'PUT'}});
      })

    .factory('ObjectTypes', function($resource){
        return $resource(url + 'api/admin/objecttypes', {});
      })

    .factory('ObjectDefinitionForType', function($resource){
        return $resource(url + 'api/admin/objects/findbytype/:type', {});
      })

    .factory('ProjectTypes', function($resource){
        return $resource(url + 'api/projects/types', {});
      })

    .factory('ListTypes', function($resource){
        return $resource(url + 'api/smartlisttypes', {});
      })

    .factory('SmartLists', function($resource){
        return $resource(url + 'api/smartlists/:id/:type', {});
      })

    .factory('SimilarProjects', function($resource){
        return $resource(url + 'api/match/project/:id', {});
      })

    .factory('Projects', function($resource){
        return $resource(url + 'api/projects/:id', {id:'@_id'}, {update:{method: 'PUT'}});
      })

    .factory('Files', function($resource){
        return $resource(url + 'api/files/:id', {id:'@_id'}, {update:{method: 'PUT'}});
      })

    .factory('CopyProject', function($resource){
        return $resource(url + 'api/project/copy/:id', {id:'@_id'}, {update:{method: 'PUT'}});
      })

    .factory('ObjectFieldTypes', function($resource){
        return $resource(url + 'api/admin/fieldtypes', {});
      })

    .factory('hashTags', function($resource){
        return $resource(url + 'api/hashtags', {});
      })

    .factory('SearchResults', function(){
        return {};
      })

    .factory('SayToConsole', function(){
        return {
            hello : function(word) {
                console.log('hello ' + word);
              },
            bye : function(word) {
                console.log('bye ' + word);
              }
          };
      })

    .factory('ProjectStatus', function(){
        return {
            percentComplete : function(projectTasks) {
                console.log('number of tasks : ' + projectTasks.length);
                return 10;
              },
            statusType : function(projectTasks) {
                return 'danger';
              }
          };
      })

    .factory('CurrentProject', function(){
        return {};
      });

