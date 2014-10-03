/**
 * @ngdoc directive
 * @name spaApp.directive:soundcloudPlayer
 * @description
 * # soundcloudPlayer
 */
angular
    .module( 'spaApp' )
    .directive( 'soundcloudCurrentlyPlaying', function(){
        'use strict';

        var directive = {
            templateUrl: '/views/templates/soundcloud-currently-playing.html',
            replace: true,
            scope: {
                tracks: '=',
                currentTrack: '='
            },

            controller: ['$scope', function( $scope ){
                //Event handlers

                $scope.playTrack = function( e ){
                    e.stopPropagation();
                    $scope.$emit( 'soundcloud-playing:play', $scope.currentTrack );
                };

                $scope.pauseTrack = function( e ){
                    e.stopPropagation();
                    $scope.$emit( 'soundcloud-playing:pause', $scope.currentTrack );
                };

                $scope.playPrevious = function( e ){
                    e.stopPropagation();
                    $scope.$emit( 'soundcloud-playing:play-previous' );
                };

                $scope.playNext = function( e ){
                    e.stopPropagation();
                    $scope.$emit( 'soundcloud-playing:play-next' );
                };


                //UI Helpers
                $scope.trackName = function(){
                    return $scope.currentTrack && $scope.currentTrack.name;
                };

                $scope.trackIsPlaying = function(){
                    return $scope.currentTrack && $scope.currentTrack.status === 'playing';
                };

                $scope.trackIsFirst = function(){
                    return _.first( $scope.tracks ).id === $scope.currentTrack.id;
                };

                $scope.trackIsLast = function(){
                    return _.last( $scope.tracks ).id === $scope.currentTrack.id;
                };


                ////////////////////////
                ///Tis Private

            } ]
        };

        return directive;
    } );
