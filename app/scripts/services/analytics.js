/**
 * @ngdoc service
 * @name spaApp.analytics
 * @description
 * # GA analytics services
 */
angular
    .module( 'spaApp' )
    .factory( 'analytics', function analytics(){
        'use strict';

        var factory = {

            trackEvent: function( category, action, optLabel ) {
                var packet;

                packet = _.compact( ['_trackEvent', category, action, optLabel] );

                safeTrack( function() {
                    _gaq.push( packet );

                } );
            }


        };

        /**
         * function that safetly calls _gaq._trackevent. _gaq might not always be available (i.e. blocked)
         */
        function safeTrack( cb ) {
            try {
                if ( _gaq ) {
                    cb();
                }
            } catch(e) {
            }
        }


        return factory;

    } );
