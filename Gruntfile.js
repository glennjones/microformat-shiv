

module.exports = function( grunt ) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
			'   Built: <%= grunt.template.today("yyyy-mm-dd hh:mm") %> - ' + '<%= pkg.homepage %>\n' +
			'   Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
			'   Licensed <%= pkg.license %> \n*/\n\n\n',
			version: '	modules.version = \'<%= pkg.version %>\';'
		},
		buildfile: {
			version: {
				dest: 'lib/version.js',
				content: '<%= meta.version %>'
			}
		},
		example: {
		    'compiled.js': ['lib/*.js'],
		 },
		concat: {
			standard: {
				options: {
					banner: '/*\n <%= meta.banner %>',
					process: function(src, filename) {
					  console.log(filename);
					  if(filename.indexOf('maps') > -1){
						  src = src.replace('modules.maps = (modules.maps)? modules.maps : {};','');
					  }
					  if(filename.indexOf('umd') === -1){
						  src = src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '');
						  src = src.replace('var Modules = (function (modules) {','');
						  src = src.replace('return modules;','');
						  src = src.replace('} (Modules || {}));','');
						  if(src.indexOf('*/') > -1){
						  	src = '\n	' + src.substr(src.indexOf('*/')+2).trim() + '\n';
						  }
					  }
					  if(filename.indexOf('parser.js') === -1){
					  	src = src.replace('var Modules', 'Modules');
					  }
					  return src;
			        },
				},
				files:{
					'<%= pkg.name %>.js': [
						'umd/umd-start.js',
						'lib/version.js',
						'lib/living-standard.js',
						'lib/parser.js',
						'lib/parser-implied.js',
						'lib/parser-includes.js',
						'lib/parser-rels.js',
						'lib/utilities.js',
						'lib/domutils.js',
						'lib/url.js',
						'lib/isodate.js',
						'lib/dates.js',
						'lib/text.js',
						'lib/html.js',
						'lib/maps/*.js',
						'umd/umd-end.js',
						'lib/domparser.js'
					]
				}
			},
			modern: {
				options: {
					banner: '/*\n   Modern\n <%= meta.banner %>',
					process: function(src, filename) {
					  console.log(filename);
					  if(filename.indexOf('maps') > -1){
						  src = src.replace('modules.maps = (modules.maps)? modules.maps : {};','');
					  }
					  if(filename.indexOf('umd') === -1){
						  src = src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '');
						  src = src.replace('var Modules = (function (modules) {','');
						  src = src.replace('return modules;','');
						  src = src.replace('} (Modules || {}));','');
						  if(src.indexOf('*/') > -1){
						  	src = '\n	' + src.substr(src.indexOf('*/')+2).trim() + '\n';
						  }
					  }
					  if(filename.indexOf('parser.js') === -1){
					  	src = src.replace('var Modules', 'Modules');
					  }
					  return src;
			        },
				},
				files:{
					'modern/<%= pkg.name %>-modern.js': [
						'umd/umd-start.js',
						'lib/version.js',
						'lib/living-standard.js',
						'lib/parser.js',
						'lib/parser-implied.js',
						'lib/parser-includes.js',
						'lib/parser-rels.js',
						'lib/utilities.js',
						'lib/domutils.js',
						'lib/url.js',
						'lib/isodate.js',
						'lib/dates.js',
						'lib/text.js',
						'lib/html.js',
						'lib/maps/*.js',
						'umd/umd-end.js'
					]
				}
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
	    uglify: {
			options: {
		      banner: '/*\n <%= meta.banner %>',
			  sourceMap: true,
        	  sourceMapName: '<%= pkg.name %>.min.js.map'
		    },
		    dist: {
				files: [{
					src: '<%= pkg.name %>.js',
                	dest: '<%= pkg.name %>.min.js'
				}]
		    }
		},
		jshint: {
			files: ['lib/**/*.js','Gruntfile.js','<%= pkg.name %>.js'],
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
				quotmark: 'single',
				moz: true,
				predef: [ 'Microformats', 'define', 'modules', 'URI' ]
			},
			globals: {}
		},
		mocha_phantomjs: {
			options:{
	      		'reporter': 'list',
			},
		    all: ['test/mocha-tests.html']
		},
		watch: {
			files: ['lib/**/*.js','umd/**/*.js','Gruntfile.js','package.json'],
			tasks: ['buildfile', 'concat:standard', 'concat:modern', 'copy', 'uglify']
		}
	});


 	// These plugins provide necessary tasks.
  	grunt.loadNpmTasks('grunt-contrib-jshint');
  	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-mocha-phantomjs');


	// very simple files creator
	grunt.task.registerMultiTask('buildfile', function() {
	    grunt.file.write(this.data.dest, this.data.content, {encoding: 'utf8'});
		grunt.log.writeln('File ' + this.data.dest +  'created');
	});


	// Default task.
	grunt.registerTask( 'default', ['buildfile', 'concat:standard', 'concat:modern', 'copy', 'uglify']);
	grunt.registerTask( 'test', ['mocha_phantomjs:all']);
	grunt.registerTask( 'umd', ['umd:default']);





};