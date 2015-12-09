var lrSnippet = require('connect-livereload')({port: 35729});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

//Less to type
var bow = 'bower_components/';

module.exports = function(grunt) {

	//Load all grunt tasks required
	require('load-grunt-tasks')(grunt);

	//Configuration
	var portConfig = {
		site: '.',
		port: 8000
	};

  var apacheConfig = {
    port: 9000 
  };

	grunt.initConfig({

		watch: {
			options: {
				livereload: true
			},
			sass: {
				files: 'styles/**/*.scss',
				tasks: ['sass']
			},
			html: {
				files: '*.html'
			},
      php: {
        files: ['*.php', 'partials/*.php']
      },
			js: {
				files: ['scripts/*.js', 'scripts/{modules,pages,utils}/*.js'],
				tasks: ['uglify']
			},
			images: {
				files: 'images/src/*.{png,jpg,gif,ico}',
				tasks: ['imagemin:local']
			},
      svg: {
        files: 'images/src/*.svg',
        tasks: ['svgmin']
      }
		},

		connect: {
			options: {
				port: portConfig.port,
				hostname: 'localhost',
			},
			livereload: {
				middleware: function(connect) {
					return [
						lrSnippet,
						mountFolder(connect, portConfig.site)
					];
				}
			}
		},

		copy: {
			local: {
				files: [
					{
						expand: true,
						cwd: './'+bow+'normalize-css',
						src: ['normalize.css'],
						dest: 'styles/partials/',
						rename: function(dest, src) {
							return dest + '_reset.scss';
						}
					}
				]
			},
      dist: {
        files: [
          {
            expand: true,
            cwd: 'images/',
            src: ['*.{png,jpg,ico,svg,gif}'],
            dest: 'dist/images/'
          },
          {
            expand: true,
            cwd: './',
            src: ['*.html'],
            dest: 'dist/'
          },
          {
            expand: true,
            cwd: 'scripts/build/',
            src: ['build.js'],
            dest: 'dist/scripts/build/'
          },
          {
            expand: true,
            cwd: 'styles/build/',
            src: ['build.css'],
            dest: 'dist/styles/build/'
          }
        ]
      }
		},

		open: {
			server: {
				path: 'http://localhost:'+apacheConfig.port
			}
		},

		sass: {
      local: {
        options: {
          style: "compressed"
        },
        files: {
          'styles/build/build.css' : 'styles/target.scss',
        }
      }
    },

		uglify: {
			local: {
				src: [
          bow+'jquery/jquery.min.js', 
          bow+'nasa/dist/Nasa.min.js',
          'scripts/{modules,pages,utils}/*.js',
          'scripts/launchfile.js'
        ],
				dest:	'scripts/build/build.js'
			}
		},

		imagemin: {
      local: {
        files: [{
          expand: true,
          cwd: 'images/src/',
          src: ['*.{png,jpg,jpeg,ico}'],
          dest: 'images/'
        }]
      }
    },

    svgmin: {
    	local: {
    		files: [{
    			expand: true,
    			cwd: 'images/src/',
    			src: ['*.svg'],
    			dest: 'images/',
    			ext: '.svg'
    		}]
    	}
    }

	});

	//Task to start server
	grunt.registerTask('serve', function() {
		grunt.task.run([
			'sass',
			'uglify:local',
			'imagemin:local',
			'svgmin',
			'connect',
			'open',
			'watch'
		]);
	});

  grunt.registerTask('start', function() {
    grunt.task.run([
			'sass',
			'uglify:local',
			'imagemin:local',
			'svgmin',
			'watch'
    ]); 
  });

  grunt.registerTask('build', function() {
    console.log("Building...");
    grunt.task.run([
      'sass',
      'uglify:local',
      'imagemin:local',
      'svgmin',
      'copy:local',
      'copy:dist'
    ]);
  });

	//Make sure everything is where it needs to be
	grunt.registerTask('update', function() {
		grunt.task.run([
			'sass',
			'uglify:dist',
			'imagemin:local',
			'svgmin',
			'copy:local'
		]);
	});

	//Default task
	grunt.registerTask('default', ['sass', 'uglify:dist', 'imagemin', 'svgmin', 'copy:local']);

}
