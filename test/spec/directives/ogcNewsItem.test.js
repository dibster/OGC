'use strict';

describe('Directive: ogcNewsItem', function () {

    // load the directive's module
    beforeEach(module('ogcApp'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
        scope.project = {};
        scope.project.Description = 'Project Name';

      }));

    it('should show a news item', inject(function ($compile) {
        element = angular.element('<span ogc-news-item newsitem="Thisisanewsitem"></span>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('{{newsItem.item}}');
      }));
  });
/**
 * Created by dibster on 14/03/14.
 */
