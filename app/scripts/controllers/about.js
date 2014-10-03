'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
