'use strict';

describe('Directive Controller : listReviewsCtrl', function(){

    var scope, $httpBackend, routeParams;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(module('ogcApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'http://localhost:9000/api/files/5').respond({id: 5, name: 'file1', projectId : 5});
        $httpBackend.when('PUT', 'http://localhost:9000/api/files/5').respond({id: 5, name: 'Campaign', news : [{item : 'This is a news Item'}]});

        //create an empty scope
        scope = $rootScope.$new();

        // add route Parameters
        routeParams = {};
        routeParams.id = 5;
        //declare the controller and inject our empty scope
        $controller('listReviewsCtrl', {$scope: scope, $routeParams : routeParams} );
      }));

    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
      }));

    // tests start here

    it('should check the review date processing', function(){
        var today = new Date();

        // check dates the same
        var review = {};
        review.date = today;
        var result = scope.dateIsOverDue(review);
        expect(result).toBe(false);

        // check review date yesterday, should return true
        var yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        var reviewyesterday = {};
        reviewyesterday.date = yesterday;
        reviewyesterday.decision='';
        result = scope.dateIsOverDue(reviewyesterday);
        expect(result).toBe(true);

        // should be false if decision given
        reviewyesterday.decision='Approved';
        result = scope.dateIsOverDue(reviewyesterday);
        expect(result).toBe(false);

      });

    it('should set the review status', function(){
        var review = {request : 'please review', cd : 'now'},
            comment = 'Ok',
            decision = 'Approved';

        scope.reviews = [{request : 'please review', cd : 'now'},{request : 'please review', cd : 'yesterday'}];

        review.request = 'Please review this file';
        scope.setReviewStatus(review,comment,decision);

        expect(scope.reviews[0].decision).toBe('Approved');

      });

  });
