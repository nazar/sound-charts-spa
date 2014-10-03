'use strict';

describe('Directive: soundcloudPlayer', function () {

  // load the directive's module
  beforeEach(module('spaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<soundcloud-player></soundcloud-player>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the soundcloudPlayer directive');
  }));
});
