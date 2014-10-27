// Generated on 2014-08-19 using generator-angular 0.9.5

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function( grunt ){
    'use strict';

    // Load grunt tasks automatically
    require( 'load-grunt-tasks' )( grunt );

    // Time how long tasks take. Can help when optimizing build times
    require( 'time-grunt' )( grunt );

    var fs = require( 'fs' );

    // Configurable paths for the application
    var appConfig = {
        app: require( './bower.json' ).appPath || 'app',
        dist: 'dist'
    };

    var fallbackToIndex = function( connect, index, file ){
        return connect().use( function( req, res, next ){
            if ( req.url === file ) {
                return next();
            }
            res.end( fs.readFileSync( index ) );
        } );
    };

    // Define the configuration for all the tasks
    grunt.initConfig( {

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            less: {
                files: [
                    '<%= yeoman.app %>/styles/less/*.less'
                ],
                tasks: [
                    'less:development',
                    'autoprefixer',
                    //less takes ages via spawn (i.e. 3s) - disabling it breaks watch:livereload
                    //touch the css file for watch:to recognise - now takes 0.1s
                    'exec:touch_css'
                ],
                options: {
                    spawn: false
                }
            },
            css: {
                files: [ '<%= yeoman.app %>/styles/application.css' ]
            },
            livereload: {
                files: [ '<%= yeoman.app %>/styles/application.css' ],
                options: { livereload: true }
            }

        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 3000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },
            proxies: [
                {
                    context: '/api',
                    host: 'localhost',
                    port: 8000
                }
            ],
            livereload: {
                options: {
                    open: false,
                    middleware: function( connect ){
                        return [
                            require('grunt-connect-proxy/lib/utils').proxyRequest,
                            connect().use(
                                '/bower_components',
                                connect.static( './bower_components' )
                            ),
                            connect.static( appConfig.app ),
                            fallbackToIndex( connect, 'app/index.html', '/index.html' )
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function( connect ){
                        return [
                            connect.static( 'test' ),
                            connect().use(
                                '/bower_components',
                                connect.static( './bower_components' )
                            ),
                            connect.static( appConfig.app )
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/{,*/}*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            dist: {
                files: [
                    {
                        src: '<%= yeoman.app %>/styles/application.css',
                        dest: '<%= yeoman.app %>/styles/application.css'
                    }
                ]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            options: {
                cwd: '<%= yeoman.app %>'
            },
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: /\.\.\//
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/scripts/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: ['app/styles'],
                    dumpLineNumbers: 'all'
                },
                files: [
                    { '<%= yeoman.app %>/styles/application.css': '<%= yeoman.app %>/styles/less/application.less' }
                ]
            },
            production: {
                options: {
                    paths: ['app/styles']
                },
                files: [
                    { '<%= yeoman.app %>/styles/application.css': '<%= yeoman.app %>/styles/less/application.less' }
                ]
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
            }
        },

        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },

        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>',
                        src: ['*.html', 'views/{,*/}*.html'],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: 'scripts.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },

        compress: {
            main: {
                options: {
                    mode: 'gzip',
                    level: 9
                },
                files: [
                    {expand: true, src: ['dist/scripts/*.js'] },
                    {expand: true, src: ['dist/styles/*.css'] }
                ]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'images/{,*/}*.{webp}',
                            'fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: ['generated/*']
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: 'fonts/*',
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dist: [
                'copy:styles',
                'imagemin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },

        exec: {
            touch_css: {
                command: 'touch <%= yeoman.app %>/styles/application.css'
            },
            deploy_to_char_bit: {
                command: 'rsync --delete -vrazh -e ssh dist/ nazar@176.58.125.89:/var/www/charts.charb.it/spa/'
            }

        }
    } );


    grunt.registerTask( 'serve', 'Compile then start a connect web server', function( target ){
        if ( target === 'dist' ) {
            return grunt.task.run( ['build', 'connect:dist:keepalive'] );
        }

        grunt.task.run( [
            'clean:server',
            'configureProxies',
            'wiredep',
            'less:development',
            'connect:livereload',
            'watch'
        ] );
    } );

    grunt.registerTask( 'server', 'DEPRECATED TASK. Use the "serve" task instead', function( target ){
        grunt.log.warn( 'The `server` task has been deprecated. Use `grunt serve` to start a server.' );
        grunt.task.run( ['serve:' + target] );
    } );

    grunt.registerTask( 'test', [
        'clean:server',
        'less:development',
        'autoprefixer',
        'connect:test',
        'karma'
    ] );

    grunt.registerTask( 'build', [
        'clean:dist',
        'wiredep',
        'less:production',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'compress'
    ] );

    grunt.registerTask( 'deploy', [
        'build',
        'exec:deploy_to_char_bit'
    ] );

    grunt.registerTask( 'default', [
        'newer:blue',
        'test',
        'build'
    ] );
};
