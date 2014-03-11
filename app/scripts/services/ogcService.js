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

    .factory('ProjectTypes', function($resource){
        return $resource(url + 'api/projects/types', {});
      })

    .factory('Projects', function($resource){
        return $resource(url + 'api/projects/:id', {id:'@_id'}, {update:{method: 'PUT'}});
      })

    .factory('ObjectFieldTypes', function($resource){
        return $resource(url + 'api/admin/fieldtypes', {});
      })

    .factory('hashTags', function($resource){
        return $resource(url + 'api/hashtags', {});
      })

    .service('PrepareRecord', function() {
        this.getRecord = function(formData, type) {
            var jsonRecord = {'Type' : type};
            formData.forEach(function(field) {
                if (field.content !== null) {
                  var fieldname = field.name;
                  jsonRecord[fieldname] = field.content;
                }
              });
            return jsonRecord;
          };
      });