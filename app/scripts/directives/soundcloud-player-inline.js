angular
    .module( 'spaApp' )
    .directive( 'soundcloudPlayerInline', function( $timeout, analytics ){
        'use strict';

        var directive = {

            templateUrl: '/views/templates/soundcloud-player-inline.html',
            replace: true,
            scope: {
                track: '='
            },

            /**
             * Soundcloud widget expects an Iframe to inject the player into.
             */
            link: function( scope, element, attrs ){
                var $widget;

                scope.loaded = false;
                scope.loading = false;

                if ( attrs.loadPlayer === 'true' ) {
                    scope.loading = true;
                    loadSoundcloudWidget();
                }


                // Listeners

                scope.$on( 'soundcloud-player:play', playTrackHandler );
                scope.$on( 'soundcloud-player:re-play', rePlayTrackHandler );
                scope.$on( 'soundcloud-player:pause', pauseTrackHandler );

                // Handlers

                /**
                 * Create the soundcloud player and start playing the track
                 */
                scope.playTrack = function( $event ){
                    $event.stopPropagation();
                    !scope.loading && initiAndPlayTrack();
                };

                // UI Helpers
                scope.imageUrl = function(){
                    var image;

                    if ( scope.track && scope.track.image_url) {
                        if ( element.height() > 150 ) {
                            image =  scope.track.image_url.replace( 'large', 't300x300' );
                        } else {
                            image = scope.track.image_url;
                        }
                    }

                    return image;
                };

                scope.trackLabel = function() {
                    return scope.track.label;
                };

                scope.trackName = function() {
                    return scope.track.name;
                };

                ///////////////////
                /// Tis PRIVATEs

                ////////////////////
                /// Private Handlers

                function playTrackHandler( e, track ) {
                    trackSignalIsForMe( track, function() {
                        if ( scope.loaded  ) {
                            $widget.play();
                        } else {
                            initiAndPlayTrack();
                        }
                    } );
                }

                function rePlayTrackHandler( e, track ) {
                    trackSignalIsForMe( track, function() {
                        $widget && $widget.play();
                    } );
                }

                function pauseTrackHandler( e, track ) {
                    trackSignalIsForMe( track, function() {
                        $widget && $widget.pause();
                    } );
                }

                function initiAndPlayTrack() {
                    scope.loading = true;
                    loadSoundcloudWidget( {
                        onLoaded: function(){
                            $widget.play();
                        }
                    } );
                }

                /**
                 * If not done so already, injects Soundcloud widget into the element and starts playing the track
                 */
                function loadSoundcloudWidget( options ){
                    var $iframe;

                    if ( !$widget ) {
                        $iframe = $( element )
                            .find( '.player-container' )
                            .append( '<iframe class="soundcloud-iframe" width="100%" height="100%" frameborder="no" scrolling="no" src="https://w.soundcloud.com/player/?url"></iframe>' )
                            .find( 'iframe' )
                            .get( 0 );

                        $widget = SC.Widget( $iframe );

                        //bind SC events
                        $widget.bind( SC.Widget.Events.PLAY, EventsPlayHandler );
                        $widget.bind( SC.Widget.Events.PAUSE, EventsPauseHandler );
                        $widget.bind( SC.Widget.Events.FINISH, EventsFinishHandler );


                        //load teh track
                        $widget.load( scope.track.uri, {
                            show_user: true,
                            visual: false,
                            show_comments: false,
                            show_playcount: true,

                            sharing: true,
                            liking: true,
                            buying: true,
                            download: true,

                            callback: function(){
                                $timeout( function() {
                                    scope.loaded = true;
                                    scope.loading = false;
                                    options && options.onLoaded();
                                } );
                            }
                        } );
                    }
                }

                function EventsPlayHandler() {
                    playerAnalytics( 'Started Playing', scope.track );

                    $timeout( function() {
                        scope.track.status = 'playing';
                        scope.$emit( 'soundcloud-player:playing', scope.track );
                    } );
                }

                function EventsPauseHandler() {
                    playerAnalytics( 'Paused Playing', scope.track );

                    $timeout( function() {
                        scope.track.status = 'paused';
                        scope.$emit( 'soundcloud-player:paused', scope.track );
                    } );
                }

                function EventsFinishHandler() {
                    playerAnalytics( 'Finished Playing', scope.track );

                    $timeout( function() {
                        scope.track.status = 'finished';
                        scope.$emit( 'soundcloud-player:finished', scope.track );
                    } );
                }

                function trackSignalIsForMe( track, cb ) {
                    if ( scope.track.id === track.id ) {
                        cb();
                    }
                }

                function playerAnalytics( action, track ) {
                    var trackId = track.id +':'+ track.name;

                    analytics.trackEvent( 'Player', action, trackId );
                }

            }


        };

        return directive;

    } );
