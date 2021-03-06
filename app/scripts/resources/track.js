'use strict';

angular
    .module( 'spaApp' )
    .factory( 'TrackResource', function( $http ){

        var methods;


        ///////////////////////
        //////// PUBLIC methods
        ///////////////////////


        methods = {

            top100: function () {
                return $http.get( '/api/charts/latest?limit=100' );
            },

            snapshots: function( track ) {
                return $http.get( [ '/api/tracks', track.id, 'snapshots' ].join('/') );
            }

        };


        ///// RETURN

        return methods;
    } );
