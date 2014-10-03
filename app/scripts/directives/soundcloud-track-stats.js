/**
 * @ngdoc directive
 * @name spaApp.directive:soundcloudTrackStats
 * @description
 * # soundcloudTrackStats
 */
angular
    .module( 'spaApp' )
    .directive( 'soundcloudTrackStats', function(){
        'use strict';

        var directive = {
            scope: {
                track: '='
            },

            replace: true,

            templateUrl: '/views/templates/soundcloud-player-stats.html',

            controller: ['$scope', function( $scope ) {


                //UI Helpers

                $scope.trackIconClass = function( track ) {
                    if ( track.last_rank_playback_count ) {
                        if ( track.rank_playback_count < track.last_rank_playback_count ) {
                            return 'fa-arrow-up';
                        } else if ( track.rank_playback_count > track.last_rank_playback_count ) {
                            return 'fa-arrow-down';
                        } else {
                            return 'fa-arrows-h';
                        }
                    } else {
                        return 'fa-star';
                    }
                };

                $scope.trackPlaybackDelta = function ( track ) {
                    if ( track.last_rank_playback_count ) {
                        return Math.abs( ( track.last_rank_playback_count || 99 ) - track.rank_playback_count ) || '';
                    }
                };

            } ]
        };

        return directive;
    } );
