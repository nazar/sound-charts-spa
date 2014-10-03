/**
 * @ngdoc function
 * @name spaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spaApp
 */
angular.module( 'spaApp' )
    .controller( 'MainCtrl', function( $scope, TrackResource ){
        'use strict';

        //listeners
        $scope.$on( 'soundcloud-player:playing', currentlyPlayingHandler );
        $scope.$on( 'soundcloud-player:finished', trackFinishedPlayingHandler );

        $scope.$on( 'soundcloud-playing:play', playerPlayHandler );
        $scope.$on( 'soundcloud-playing:pause', playerPauseHandler );
        $scope.$on( 'soundcloud-playing:play-previous', playerPreviousHandler );
        $scope.$on( 'soundcloud-playing:play-next', playerNextHandler );


        TrackResource.top100()
            .then( function( res ){
                $scope.tracks = res.data;
                $scope.currentTrack = res.data[0];
            } );


        //UI Helpers


        ////////////////////
        /// PRIVATE

        // handlers

        function currentlyPlayingHandler( e, track ) {
            $scope.currentTrack = track;
        }

        function trackFinishedPlayingHandler( e, track ) {
            playTrack( getNextTrack( track ) );
        }

        function playerPlayHandler( e, track ) {
            $scope.$broadcast( 'soundcloud-player:play', track );
        }

        function playerPauseHandler( e, track ) {
            $scope.$broadcast( 'soundcloud-player:pause', track );
        }

        function playerPreviousHandler() {
            playTrack( getPreviousTrack() );
        }

        function playerNextHandler() {
            playTrack( getNextTrack() );
        }


        //utils

        function playTrack( track ) {
            track && $scope.$broadcast( 'soundcloud-player:play', track );
        }

        function getPreviousTrack( useTrack ) {
            var track = useTrack || $scope.currentTrack;

            return $scope.tracks[ _.indexOf( $scope.tracks, track ) - 1 ];
        }

        function getNextTrack( useTrack ) {
            var track = useTrack || $scope.currentTrack;

            return $scope.tracks[ _.indexOf( $scope.tracks, track ) + 1 ];
        }


    } );
