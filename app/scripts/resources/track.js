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
            }

        };


        ///// RETURN

        return methods;
    } );
