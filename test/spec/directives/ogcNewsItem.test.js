'use strict';

describe('Directive: ogcNewsItem', function () {

    // load the directive's module
    beforeEach(module('ogcApp'));
    beforeEach(module('scripts/directives/templates/ogcNewsItem.html'));
    var element,
        scope;

    beforeEach(inject(function ($rootScope, $compile) {
        element = angular.element('<span ogc-news-item newsitems="newsItems"></span>');
        scope = $rootScope.$new();

        var testNewsItems = [{}];
        testNewsItems[0].item = 'This is an item';
        testNewsItems[0].cd = '2014-03-17T09:18:02.515Z';
        console.log(JSON.stringify(testNewsItems));
        // compile
        //
        //
        // element
        var e = $compile(element)(scope);
        // set the isolated Scope value
        e.scope().newsItems = testNewsItems;
        e.scope().$digest();

      }));

    it('should show a news item', inject(function () {
        expect(element.text()).toContain('This is an item');
      }));
  });
/**
 * Created by dibster on 14/03/14.
 */
