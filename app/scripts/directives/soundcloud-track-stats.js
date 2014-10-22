/**
 * @ngdoc directive
 * @name spaApp.directive:soundcloudTrackStats
 * @description
 * # soundcloudTrackStats
 */
angular
    .module( 'spaApp' )
    .directive( 'soundcloudTrackStats', function( TrackResource ){
        'use strict';

        var directive = {
            scope: {
                track: '='
            },

            replace: true,

            templateUrl: '/views/templates/soundcloud-player-stats.html',

            controller: ['$scope', function( $scope ) {

                $scope.morphSettings = {
                    closeEl: '.close',
                    overlay: {
                        templateUrl: '/views/track-stat-charts.html',
                        scroll: false
                    }
                };


                //UI Helpers

                $scope.trackIconClass = function() {
                    var track = $scope.track;

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

                $scope.trackPlaybackDelta = function () {
                    var track = $scope.track;

                    if ( track.last_rank_playback_count ) {
                        return Math.abs( ( track.last_rank_playback_count || 99 ) - track.rank_playback_count ) || '';
                    }
                };

                $scope.canShowInfo = function() {
                    return $scope.track.last_rank_playback_count;
                };



                $scope.xAxisTickFormatFunction = function(){
                    return function(d){
                        return d3.time.format('%b-%d')(new Date(d));
                    };
                };

                $scope.yAxisTickFormatFunction = function(){
                    return function(d){
                        return parseInt(d * -1, 10);
                    };
                };

                ///////////////////////////
                //// Event triggers

                $scope.loadTrackSnapshots = function() {
                    TrackResource.snapshots( $scope.track )
                        .then( assignSnapshots );
                };



                /////////////////////
                ////// Private

                function assignSnapshots( results ) {

                    function chartRankValues() {
                        return _.map( results.data, function( snapshot ) {
                            return [
                                new Date( snapshot.snapshotDate ),
                                snapshot.rankPlaybackCount * -1
                            ];
                        } );
                    }

                    $scope.chartDataRanks = [
                        {
                            key: ' Track Rank ',
                            values: chartRankValues()
                        }
                    ];
                }


            } ]
        };

        return directive;
    } );
