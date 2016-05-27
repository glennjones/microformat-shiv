var Hapi = require('hapi');
var Inert = require('inert');
var Blipp = require('blipp');



// Create a server with a host and port
var server = new Hapi.Server();

server.connection({
    host: (process.env.PORT)? '0.0.0.0' : 'localhost',
    port: parseInt(process.env.PORT, 10) || 3000
});


// log repsonses data to console
var goodOptions = {
    reporters: {
		console: [{


			module: 'good-squeeze',
			name: 'Squeeze',
			args: [{
				log: '*',
				response: '*'
			}]
		}, {
				module: 'good-console'
			}, 'stdout']
    }
};


// Register plug-in and start
server.register([
	Inert,
	Blipp,
	{
        register: require('good'),
        options: goodOptions
    }], function (err) {
		if (err) {
			console.error(err);
		} else {
			server.start(function () {
				console.info('Server started at ' + server.info.uri);
			});
		}
	});


// deal with different npm pathing
var modulesInt = parseInt(process.versions.modules, 10);
var blanketPath = '/node_modules/poncho/node_modules/blanket/'
// npm 3 or higher
if(modulesInt > 46){
	blanketPath = '/node_modules/blanket/'
}




// setup routes to serve the test directory and file routes into other modules
server.route([{
	method: ['GET'],
	path: '/microformat-shiv.js',
    handler: {
		file: {
			path: './microformat-shiv.js'
		}
	}
},{
	method: ['GET'],
	path: '/node_modules/chai/chai.js',
    handler: {
		file: {
			path: './node_modules/chai/chai.js'
		}
	}
},{
	method: ['GET'],
	path: '/node_modules/mocha/mocha.js',
    handler: {
		file: {
			path: './node_modules/mocha/mocha.js'
		}
	}
},{
	method: ['GET'],
	path: '/node_modules/mocha/mocha.css',
    handler: {
		file: {
			path: './node_modules/mocha/mocha.css'
		}
	}
},{
	method: ['GET'],
	path: '/node_modules/poncho/node_modules/blanket/dist/qunit/blanket.min.js',
    handler: {
		file: {
			path: '.' + blanketPath + 'dist/qunit/blanket.min.js'
		}
	}
},{
	method: ['GET'],
	path: '/node_modules/poncho/node_modules/blanket/src/adapters/mocha-blanket.js',
    handler: {
		file: {
			path: '.' + blanketPath + 'src/adapters/mocha-blanket.js'
		}
	}
},{
	method: 'GET',
	path: '/{path*}',
	handler: {
		directory: {
			path: './test',
			listing: true
		}
	}
},{
	method: 'GET',
	path: '/lib/{path*}',
	handler: {
		directory: {
			path: './lib',
			listing: true,
		}
	}
},{
	method: 'GET',
	path: '/url/{path*}',
	handler: {
		directory: {
			path: './url',
			listing: true,
		}
	}
},{
	method: 'GET',
	path: '/thirdparty/{path*}',
	handler: {
		directory: {
			path: './thirdparty',
			listing: true,
		}
	}
},{
	method: 'GET',
	path: '/performance/{path*}',
	handler: {
		directory: {
			path: './performance',
			listing: true,
		}
	}
}]);


/*
,{
	method: ['GET'],
	path: '/node_modules/mocha/mocha.js',
    handler: {
		file: {
			path: './node_modules/mocha/mocha.js'
		}
	}
},{
	method: ['GET'],
	path: '/node_modules/mocha/mocha.css',
    handler: {
		file: {
			path: './node_modules/mocha/mocha.css'
		}
	}
},{
	method: ['GET'],
	path: '/node_modules/poncho/node_modules/blanket/dist/qunit/blanket.min.js',
    handler: {
		file: {
			path: './node_modules/blanket/dist/qunit/blanket.min.js'
		}
	}
},{
	method: ['GET'],
	path: '/node_modules/poncho/node_modules/blanket/src/adapters/mocha-blanket.js',
    handler: {
		file: {
			path: './node_modules/blanket/src/adapters/mocha-blanket.js'
		}
	}
},
*/