'use strict';

describe('Directive: fileList', function () {

    // load the directive's module
    beforeEach(module('ogcApp'));
    // load the html
    beforeEach(module('scripts/directives/templates/listFiles.html'));
    var element,
        scope;

    beforeEach(inject(function ($rootScope, $compile) {
        element = angular.element('<div list-files files="files"></div>');
        scope = $rootScope.$new();

        var testFiles = [{}];
        testFiles[0].name = 'This is a file';
        testFiles[0].date = new Date();
        // compile
        //
        //
        // element
        var e = $compile(element)(scope);
        // set the isolated Scope value
        e.scope().files = testFiles;
        e.scope().$digest();

    }));

    it('should show a file item', inject(function () {
        expect(element.text()).toContain('This is a file');
    }));
});
/**
 * Created by dibster on 14/03/14.
 */
