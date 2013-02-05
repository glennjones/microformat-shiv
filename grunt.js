module.exports = function( grunt ) {
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
	      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
	        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
	        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
	        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
	        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
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
		        	'lib/maps/*.js'
	        	]),
	        dest: 'dist/<%= pkg.name %>.js'
	      }
	    },
		lint: {
			files: ['grunt.js', 'lib/*.js', 'lib/maps/*.js']
		},
		jshint: {
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
		mochaTest: {
			files: ['test/*-test.js']
		},
		watch: {
			files: 'lib/*.js',
			tasks: 'concat'
		}
	});
	// Default task.
	grunt.registerTask( 'default', 'concat');
};