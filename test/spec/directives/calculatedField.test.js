'use strict';

describe('Directive: calculatedField', function () {

    // load the directive's module
    beforeEach(module('ogcApp'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
        scope.project = {};
        scope.project.Description = 'Project Name';

      }));

    it('should do a calculation', inject(function ($compile) {
        element = angular.element('<span ogc-calculated calculation="Description.length" project="project"></span>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('{{result}}');
      }));
  });
