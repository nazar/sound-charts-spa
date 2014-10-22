'use strict';

/**
 * @ngdoc overview
 * @name spaApp
 * @description
 * # spaApp
 *
 * Main module of the application.
 */
angular
    .module( 'spaApp', [
        'ngAnimate',
        'ngCookies',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngMorph',
        'nvd3ChartDirectives'
    ] )
    .config( function( $routeProvider, $locationProvider ){

        // use the HTML5 History API
        $locationProvider.html5Mode( true );

        $routeProvider
            .when( '/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            } )
            .when( '/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            } )
            .otherwise( {
                redirectTo: '/'
            } );
    } );
