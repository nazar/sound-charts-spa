'use strict';

describe('Service: analytics', function () {

  // load the service's module
  beforeEach(module('spaApp'));

  // instantiate service
  var analytics;
  beforeEach(inject(function (_analytics_) {
    analytics = _analytics_;
  }));

  it('should do something', function () {
    expect(!!analytics).toBe(true);
  });

});
