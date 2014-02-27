'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('ogcApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/admin/objects')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.objects).toBeUndefined();
    $httpBackend.flush();
    expect(scope.objects.length).toBe(4);
  });
});
