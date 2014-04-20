'use strict';

var url = 'http://localhost:9000/';

angular.module('ogcApp')
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
      })
      .service('PrepareSmartListRecord', function() {
        this.getRecord = function(formData, type) {
            var jsonRecord = {'ListType' : type};
            formData.forEach(function(field) {
                if (field.content !== null) {
                  var fieldname = field.name;
                  jsonRecord[fieldname] = field.content;
                }
              });
            return jsonRecord;
          };
      });