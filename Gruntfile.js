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
						'lib/domutils.js',
						'lib/isodate.js',
						'lib/dates.js',
						'lib/text.js',
						'lib/html.js',
						'lib/maps/*.js'
					]),
				dest: '<%= pkg.name %>.js'
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
			files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: false,
				node: true,
				strict: false,
				quotmark: 'single'
			},
			globals: {}
		},
		mocha_phantomjs: {
			options:{
				'reporter': 'list'
			},
		    all: ['test/microformats-mocha-tests.html']
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

	// Default task.
	grunt.registerTask( 'default', ['concat', 'copy', 'jsmin-sourcemap']);
	grunt.registerTask( 'test', ['mocha_phantomjs:all']);



};