'use strict';

describe('Directive: fileList', function () {

    // load the directive's module
    beforeEach(module('ogcApp'));
    // load the html
    beforeEach(module('scripts/directives/templates/listReviews.html'));
    var element,
        scope;

    beforeEach(inject(function ($rootScope, $compile) {
        element = angular.element('<div list-reviews reviews="reviews"></div>');
        scope = $rootScope.$new();

        var testReviews = [{}];
        testReviews[0].request = 'This is a review request';
        testReviews[0].decision = '';
        testReviews[0].date = new Date();
        // compile
        //
        //
        // element
        var e = $compile(element)(scope);
        // set the isolated Scope value
        e.scope().reviews = testReviews;
        e.scope().$digest();

      }));

    it('should show a review item', inject(function () {
        expect(element.text()).toContain('This is a review');
      }));

    it('should show a date as overdue', inject(function ($compile, $rootScope) {
        var review = {};
        var today = new Date();
        var yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        review.date = yesterday;
      }));
  });
/**
 * Created by dibster on 14/03/14.
 */
