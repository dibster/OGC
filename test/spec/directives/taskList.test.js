'use strict';

describe('Directive: taskList', function () {

    // load the directive's module
    beforeEach(module('ogcApp'));
    // load the html
    beforeEach(module('scripts/directives/templates/listTasks.html'));
    var element,
        scope;

    beforeEach(inject(function ($rootScope, $compile) {
        element = angular.element('<div list-tasks tasks="tasks"></div>');
        scope = $rootScope.$new();

        var testTasks = [{}];
        testTasks[0].name = 'This is a task';
        testTasks[0].date = new Date();
        // compile
        //
        //
        // element
        var e = $compile(element)(scope);
        // set the isolated Scope value
        e.scope().tasks = testTasks;
        e.scope().$digest();

      }));

    it('should show a news item', inject(function () {
        expect(element.text()).toContain('This is a task');
      }));
  });
/**
 * Created by dibster on 14/03/14.
 */
