'use strict';

module.exports = function( grunt ) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
			' Licensed <%= pkg.license %> */'
		},
		concat: {
			dist: {
				src: ['<banner:meta.banner>'].concat([
						'lib/parser.js', 
						'lib/utilities.js', 
						'lib/domparser.js',
						'lib/domutils.js',
						'lib/isodate.js',
						'lib/dates.js',
						'lib/text.js',
						'lib/html.js',
						'lib/maps/*.js'
					]),
				dest: '<%= pkg.name %>.js'
			},
			distmap: {
				src: ['<banner:meta.banner>'].concat([
						'lib/maps/*.js'
					]),
				dest: '<%= pkg.name %>-maps.js'
			}
		},
		copy: {
	        dist: {
	            files: [{
						src: '<%= pkg.name %>.js',
						dest:'examples/chrome/<%= pkg.name %>.js'
					}, {
						src: '<%= pkg.name %>.js',
						dest:'examples/firefox/data/<%= pkg.name %>.js'
					}, {
						src: '<%= pkg.name %>.js',
						dest:'examples/opera/includes/<%= pkg.name %>.js'
					}]
	        }
	    },
	    min: {
		    dist: {
		      src: ['<%= pkg.name %>.js'],
		      dest: '<%= pkg.name %>.min.js'
		    }
		},
		'jsmin-sourcemap': {
	    	all: {
		        src: ['<%= pkg.name %>.js'],
		        dest: '<%= pkg.name %>.min.js',
		        destMap: '<%= pkg.name %>.min.js.map'
	      	}
	    },
		lint: {
			files: ['gruntfile.js', 'lib/*.js']
		},
		jshint: {
			files: ['Gruntfile.js', 'lib/**/*.js'],
			options: {
				curly: true,
				eqeqeq: true,
				latedef: true,
				noarg: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				node: true,
				strict: true,
				quotmark: 'single',
				moz: true,
				predef: [ 'microformats', 'ISODate' ]
			},
			globals: {}
		},
		mocha_phantomjs: {
			options:{
				'reporter': 'list'
			},
		    all: ['test/microformats-mocha-tests.html']
		},
		mochacov: {
		    options: {
			    reporter: 'html-cov',
			    require: ['chai']
		    },
		    all: ['test/javascript/mf-*.js']
		},
		watch: {
			files: 'lib/*.js',
			tasks: ['concat', 'copy', 'jsmin-sourcemap']
		}
	});

 	// These plugins provide necessary tasks.
  	grunt.loadNpmTasks('grunt-contrib-jshint');
  	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-jsmin-sourcemap');
	grunt.loadNpmTasks('grunt-mocha-phantomjs');
	grunt.loadNpmTasks('grunt-mocha-cov');

	// Default task.
	grunt.registerTask( 'default', ['concat', 'copy', 'jsmin-sourcemap']);
	grunt.registerTask( 'test', ['mocha_phantomjs:all']);
	grunt.registerTask( 'coverage', ['mochacov']);



};