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
                // % complete will be
                //
                // Closed Tasks / All Tasks * 100
                var allTasks = projectTasks.length;

                // get counts for closed
                var closedTasks = 0;
                for (var i = 0;i<allTasks;i++) {
                  if (projectTasks[i].status === 'Closed') {
                    closedTasks++;
                  }
                }

                var percentComplete = closedTasks / allTasks * 100;

                return Math.round(percentComplete);
              },
            statusType : function(projectTasks) {

                // if tasks overdue return danger
                // else if tasks due today return warning
                // else return nothing

                var returnStatus = '';
                var today = new Date();
                var isoDate = today.toISOString();
                var numberOfTasks = projectTasks.length;
                for (var i = 0;i<numberOfTasks;i++) {
                  if (projectTasks[i].status === '') {
                    if (projectTasks[i].date < isoDate) {
                      return 'danger';
                    }
                    if (projectTasks[i].date.substring(0,11) === isoDate.substring(0,11)) {
                      returnStatus = 'warning';
                    }
                  }
                }

                return returnStatus;
              }
          };
      })

    .factory('CurrentProject', function(){
        return {};
      });

