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

    .factory('ObjectFieldTypes', function($resource){
        return $resource(url + 'api/admin/fieldtypes', {});
      });

