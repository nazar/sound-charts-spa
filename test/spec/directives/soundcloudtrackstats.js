'use strict';

describe('Directive: soundcloudTrackStats', function () {

  // load the directive's module
  beforeEach(module('spaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<soundcloud-track-stats></soundcloud-track-stats>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the soundcloudTrackStats directive');
  }));
});
