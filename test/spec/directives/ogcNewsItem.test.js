'use strict';

describe('Directive: ogcNewsItem', function () {

    // load the directive's module
    beforeEach(module('ogcApp'));
    beforeEach(module('scripts/directives/templates/ogcNewsItem.html'));
    var element,
        scope;

    beforeEach(inject(function ($rootScope, $compile) {
        element = angular.element('<span ogc-news-item newsitem="newsItem"></span>');
        scope = $rootScope.$new();
        scope.project = {};
        scope.project.Description = 'Project Name';
        var testnewsItem = {};
        testnewsItem.item = 'This is an item';

        var e = $compile(element)(scope);
        e.scope().newsItem = testnewsItem;
        e.scope().$digest();

      }));

    it('should show a news item', inject(function () {
        expect(element.text()).toContain('This is an item');
      }));
  });
/**
 * Created by dibster on 14/03/14.
 */
