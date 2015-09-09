/*!
	unpdate-test.js
	run  $node unpdate-test.js
	Downloads github repo of microfomats tests then:
	* updates mocha tests
	* updates data.js file for testrunner
	
	Copyright (C) 2015 Glenn Jones. All Rights Reserved.
	MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
	*/


var path			= require('path'),
	request 		= require('request'),
	fs 				= require('fs-extra'),
	download 		= require('download-github-repo');


var repo = 'microformats/tests',  // glennjones/tests or microformats/tests
	tempDir = path.resolve(__dirname,'temp-tests'),
	standardsDir = 'standards-tests',
	moduleDir = 'module-tests',
	interfaceDir = 'interface-tests',
	standardsDirResolve = path.resolve(__dirname,'test', standardsDir),
	moduleDirResolve = path.resolve(__dirname,'test', moduleDir),
	interfaceDirResolve = path.resolve(__dirname,'test', interfaceDir),
	coverageTestPagePath = path.resolve(__dirname,'test/coverage.html'),
	serverTestPagePath = path.resolve(__dirname,'test/ci.html'),
	testJSPath = path.resolve(__dirname,'test/static/javascript/data.js'),
	livingStandardPath = path.resolve(__dirname,'lib/living-standard.js');


// write living standard date
writeLivingStandard( repo, livingStandardPath )


download(repo, tempDir, function(err, data){
	
	// remove current mocha js test files
	clearDirectory(function(err){
		if(err){
			console.err(err);
		}else{
			var fileList = getFileList(path.resolve(tempDir,'tests')),
				testStructure  = getGetTestStructure( fileList ),
				version = getTestSuiteVersion(),
				standardTestPathArr = [],
				dataCollection = [];
			
			// loop array of test found
			testStructure.forEach(function(item){
				
				// get data for each test
				getDataFromFiles( item, function(err, data){
					if(data){
						
						// build mocha tests
						var test = buildMochaJSString( data, item, version, repo ),
							filePath = shortenFilePath( item[0] + '-' + item[1] + '-' + item[2].replace('.json','') + '.js' );
							
						standardTestPathArr.push( filePath );
						writeFile(path.resolve(standardsDirResolve,filePath), test);
						
						// add to data collection
						data.name = shortenFilePath( item[0] + '-' + item[1] + '-' + item[2].replace('.json',''));
						dataCollection.push( data );
						
						// log each test as it written
						console.log(path.resolve(standardsDirResolve,filePath));
						
						
					}else{
						console.log(err);
					}
				});
			});
			
			// build client and server test pages
			writeFile(coverageTestPagePath, buildTestPage( standardTestPathArr, version, repo, false, true, ['standards','interface'], ''));
			writeFile(serverTestPagePath, buildTestPage( standardTestPathArr, version, repo, false, false, ['standards','interface'], ''));
			
			// build individual test pages
			writeFile(interfaceDirResolve + '/index.html', buildTestPage( standardTestPathArr, version, repo, true, false, ['interface'], '../'));
			writeFile(moduleDirResolve + '/index.html', buildTestPage( standardTestPathArr, version, repo, true, false, ['module'], '../'));
			writeFile(standardsDirResolve + '/index.html', buildTestPage( standardTestPathArr, version, repo, true, false, ['standards'], '../'));
			
			
			// build json data for testrunner
			writeFile(testJSPath, 'var testData = ' + JSON.stringify({ 
				date: new Date(), 
				repo: repo, 
				version: version, 
				data: dataCollection
			}));
			
			
			fs.removeSync(tempDir);
			console.log('done');
		}
	});
});


/**
 * get a list of file paths from a directory
 *
 * @param  {String} dir
 * @param  {Array} dir
 * @return {Array}
 */
function getFileList (dir, filesArr){
    filesArr = filesArr || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFileList(name, filesArr);
        } else {
            filesArr.push(name);
        }
    }
    return filesArr;
}




// get format directories
function getGetTestStructure( fileList ){
	var out = [];
	fileList.forEach(function(item){
		item = item.replace( path.resolve(tempDir,'tests') + '/', '' );
		if(item.indexOf('.html') === -1){
			if(item.indexOf('/') > -1){
				var items = item.split('/');
				out.push(items);	
			}
		}
	});
	return out;
}



/**
 * gets the test suite version number
 *
 * @return {String}
 */
function getTestSuiteVersion(){
	var pack = fs.readFileSync(path.resolve(tempDir,'package.json'), {encoding: 'utf8'});
	if(pack){
		pack = JSON.parse(pack)
		if(pack && pack.version){
			return pack.version;
		}
	}
	return '';
}


/**
 * gets JSON and HTML for a individual test from files in repo
 *
 * @param  {Array} testStructure
 * @param  {Function} callback
 */
function getDataFromFiles( testStructure, callback ){
	var jsonFile = 'tests/' + testStructure[0] + '/' + testStructure[1] + '/' + testStructure[2],
		htmlFile = jsonFile.replace('.json','.html'),
		json = fs.readFileSync(path.resolve(tempDir,jsonFile), {encoding: 'utf8'}),
		html = fs.readFileSync(path.resolve(tempDir,htmlFile), {encoding: 'utf8'});
	
	if(json && html){
		callback(null, { 'json':json, 'html': html});
	}else{
		callback('error loading files: ' + jsonFile, null);
	}
}
	

/**
 * creates javascript string for a mocha test
 *
 * @param  {Object} testData
 * @param  {Array} testStructure
 * @param  {String} version
 * @param  {String} repo
 * @return {String}
 */
function buildMochaJSString( testData, testStructure, version, repo ){
	var out = '',
	 	fileName = testStructure[0] + '/' + testStructure[1] + '/' + testStructure[2].replace('.json',''),
	 	date = new Date().toString();
	
	
	out += '/*\r\nMicroformats Test Suite - Downloaded from github repo: ' + repo + ' version v' + version + ' \r\n';
	out += 'Mocha integration test from: ' + fileName + '\r\nThe test was built on ' + date + '\r\n*/\r\n\r\n';
	out += "assert = chai.assert;\r\n\r\n\r\n";
	
	out += "describe('" + testStructure[1]  + "', function() {\r\n";
    out += "   var htmlFragment = " + JSON.stringify(testData.html) + ";\r\n";
   	out += "   var expected = " + JSON.stringify(JSON.parse(testData.json)) + ";\r\n\r\n";
	out += "   it('" + testStructure[2].replace('.json','')  + "', function(){\r\n";   
	out += "       var doc, dom, node, options, parser, found;\r\n";
    out += "       dom = new DOMParser();\r\n";
    out += "       doc = dom.parseFromString( htmlFragment, 'text/html' );\r\n";
    out += "       options ={\r\n";
    out += "       		'document': doc,\r\n";
    out += "       		'node': doc,\r\n";
    out += "       		'baseUrl': 'http://example.com',\r\n";
    out += "       		'dateFormat': 'html5'\r\n";
    out += "       };\r\n";
    out += "       found = Microformats.get( options );\r\n";
	out += "       assert.deepEqual(found, expected);\r\n";   
	out += "   });\r\n";
	out += "});\r\n";
	return out;
}



/**
 * creates html string for test page
 *
 * @param  {Object} testData
 * @param  {String} version
 * @param  {String} repo
 * @param  {Boolean} clientJS
 * @param  {Boolean} coverage
 * @return {String}
 */
 function buildTestPage( standardTestPathArr, version, repo, clientJS, coverage, testDirectories, dirPath ){
	var date = new Date().toString(),
		out = '';
		
	out += '<html><head><title>Mocha</title>\r\n';
    out += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\r\n';
	
	if(clientJS === true && coverage === false){
	    out += '<link rel="stylesheet" href="' + dirPath  + 'static/css/mocha.css" />\r\n';
		out += '<script src="' + dirPath  + 'static/javascript/chai.js"></script>\r\n';
	    out += '<script src="' + dirPath  + 'static/javascript/mocha.js"></script>\r\n';
	}else{
		out += '<link rel="stylesheet" href="' + dirPath  + '../node_modules/mocha/mocha.css" />\r\n';
		out += '<script src="' + dirPath  + '../node_modules/chai/chai.js"></script>\r\n';
	    out += '<script src="' + dirPath  + '../node_modules/mocha/mocha.js"></script>\r\n';
		
		// this file is need for testing early browser make sure it not in files used by firefox
		out += '<script src="' + dirPath  + '../thirdparty/es5-shim.min.js"></script>\r\n';	
	}
	out += '<link rel="stylesheet" href="' + dirPath  + 'static/css/mocha-custom.css" />\r\n\r\n';
	out += '<script src="' + dirPath  + 'static/javascript/DOMParser.js"></script>\r\n\r\n';
	
	
	// load either full version of shiv or just the modules that make it
	if(testDirectories.indexOf('module') > -1){
		out += '<script data-cover src="' + dirPath  + '../lib/utilities.js"></script>\r\n';
		out += '<script data-cover src="' + dirPath  + '../lib/domutils.js"></script>\r\n';
		out += '<script data-cover src="' + dirPath  + '../lib/url.js"></script>\r\n';
		out += '<script data-cover src="' + dirPath  + '../lib/html.js"></script>\r\n';
		out += '<script data-cover src="' + dirPath  + '../lib/text.js"></script>\r\n';
		out += '<script data-cover src="' + dirPath  + '../lib/dates.js"></script>\r\n';
		out += '<script data-cover src="' + dirPath  + '../lib/isodate.js"></script>\r\n\r\n';
	}else{
		out += '<script data-cover src="' + dirPath  + '../microformat-shiv.js"></script>\r\n\r\n';	
	}
	
	
	// this is need for firefox marionette tests runner
	if(clientJS === true && coverage === false){
		out += '<script>\r\n';
		out += 'var uncaughtError;\r\n\r\n';
					
		out += 'window.addEventListener("error", function(error) {\r\n';
		out += 'uncaughtError = error;\r\n';
		out += '});\r\n\r\n';
					
		out += 'var consoleWarn = console.warn;\r\n';
		out += 'var caughtWarnings = [];\r\n\r\n';
					
		out += 'console.warn = function() {\r\n';
		out += 'var args = Array.slice(arguments);\r\n';
		out += 'caughtWarnings.push(args);\r\n';
		out += 'consoleWarn.apply(console, args);\r\n';
		out += '};\r\n';
					
		out += '</script>\r\n\r\n';
	}
	
	
    out += '<script>\r\n';
	out += 'chai.config.includeStack = true;\r\n';
    out += 'mocha.setup({ui: \'bdd\', timeout: 10000});\r\n';
	out += '</script>\r\n\r\n';
	
	
	// add standards tests
	if(testDirectories.indexOf('standards') > -1){
		standardTestPathArr.forEach(function(item){
			out += '<script src="' + dirPath  + standardsDir + '/' + item + '"></script>\r\n';
		});
	}
	
	
	// add interface tests
	if(testDirectories.indexOf('interface') > -1){
		out += '\r\n';
		out += '<script src="' + dirPath  + 'interface-tests/get-test.js"></script>\r\n';
		out += '<script src="' + dirPath  + 'interface-tests/getParent-test.js"></script>\r\n';
		out += '<script src="' + dirPath  + 'interface-tests/count-test.js"></script>\r\n';
		out += '<script src="' + dirPath  + 'interface-tests/isMicroformat-test.js"></script>\r\n';
		out += '<script src="' + dirPath  + 'interface-tests/hasMicroformats-test.js"></script>\r\n\r\n';
		out += '<script src="' + dirPath  + 'interface-tests/experimental-test.js"></script>\r\n\r\n';
	}
	
	
	// add module tests
	if(testDirectories.indexOf('module') > -1){
		out += '\r\n';
		out += '<script src="' + dirPath  + 'module-tests/dates-test.js"></script>\r\n';
		out += '<script src="' + dirPath  + 'module-tests/domUtils-test.js"></script>\r\n';
		out += '<script src="' + dirPath  + 'module-tests/html-test.js"></script>\r\n';
		out += '<script src="' + dirPath  + 'module-tests/isodate-test.js"></script>\r\n';
		out += '<script src="' + dirPath  + 'module-tests/text-test.js"></script>\r\n\r\n';
		out += '<script src="' + dirPath  + 'module-tests/url-test.js"></script>\r\n\r\n';
		out += '<script src="' + dirPath  + 'module-tests/utilities-test.js"></script>\r\n\r\n';
	}
	
	
    out += '</head><body>\r\n';
    out += '<h3 class="capitalize">Microformats-shiv: ' + testDirectories.join(', ') + ' tests</h3>\r\n';
	if(testDirectories.indexOf('standards') > -1){
		out += '<p>Standards tests built on ' + date + '. Downloaded from github repo: ' + repo + ' version v' + version + '</p>\r\n';
	}
    out += '<div id="mocha"></div>\r\n';
    out += '</body>\r\n';


	if(clientJS === true){
	
			// this is need for firefox marionette tests runner
			out += '<script>\r\n';
			out += 'describe("Uncaught Error Check", function() {\r\n';
			out += 'it("should load the tests without errors", function() {\r\n';
			out += 'chai.expect(uncaughtError && uncaughtError.message).to.be.undefined;\r\n';
			out += '});\r\n';
			out += '});\r\n\r\n';
	
			out += 'describe("Unexpected Warnings Check", function() {\r\n';
			out += 'it("should long only the warnings we expect", function() {\r\n';
			out += 'chai.expect(caughtWarnings.length).to.eql(0);\r\n';
			out += '});\r\n';
			out += '});\r\n\r\n';
	
			// mocha.run creates div for firefox marionette
			out += 'mocha.run(function () {\r\n';
			out += 'var completeNode = document.createElement("p");\r\n';
			out += 'completeNode.setAttribute("id", "complete");\r\n';
			out += 'completeNode.appendChild(document.createTextNode("Complete"));\r\n';
			out += 'document.getElementById("mocha").appendChild(completeNode);\r\n';
			out += '});\r\n\r\n';
			
			out += '</script>\r\n';
			
		}
	
	if(coverage === true){
		// mocha-blanket.js injects mocha.run
		out += '\r\n<script src="' + dirPath  + '../node_modules/poncho/node_modules/blanket/dist/qunit/blanket.min.js"> </script>\r\n';
    	out += '<script src="' + dirPath  + '../node_modules/poncho/node_modules/blanket/src/adapters/mocha-blanket.js"></script>\r\n\r\n';
	
	}else{
		if(clientJS === false){
			// standard mocha.run or mochaPhantomJS.run
			out += '<script>window.onload= function(){\r\n';
			out += 'if (window.mochaPhantomJS) {\r\n';
			out += 'mochaPhantomJS.run();\r\n';
			out += '}else{\r\n';
			out += 'mocha.run();\r\n';
			out += '}\r\n';
			out += '};</script>\r\n';	
		}
	}
	

	
	out += '</body></html>\r\n';	
	return out;
 }


/**
 * shortens filename removing 'microformats-'
 *
 * @param  {String} filepath
 * @return {string}
 */
function shortenFilePath( filepath ){
	return 'mf-' + filepath.replace('microformats-mixed','mixed').replace('microformats-v1','v1').replace('microformats-v2','v2');
}


/**
 * delete all files with prefix mf- from 'standardsDirResolve' directory
 *
 * @param  {Function} callback
 */
function clearDirectory( callback ){
	var fileList = getFileList (standardsDirResolve);
	fileList.forEach(function(filePath){
		if(filePath.indexOf('/mf-') > -1){
			fs.removeSync(filePath);
		}
	});

	callback(null);
}



/**
 * write a file
 *
 * @param  {String} repo
 * @param  {String} content
 */
function writeFile(path, content){
	fs.writeFile(path, content, 'utf8', function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log('The file: ' + path + ' was saved');
		}
	}); 
}



/**
 * get the last commit date from github repo
 *
 * @param  {String} repo
 * @param  {Function} callback
 */
function getLastCommitDate( repo, callback ){
	
	var options = {
	  url: 'https://api.github.com/repos/' + repo + '/commits?per_page=1',
	  headers: {
	    'User-Agent': 'request'
	  }
	};
	
	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		var date = null,
			json = JSON.parse(body);
			if(json && json.length && json[0].commit && json[0].commit.author ){
				date = json[0].commit.author.date;
			}
	    callback(null, date);
	  }else{
		  console.log(error, response, body);
		  callback('fail to get last commit date', null); 
	  }
	});
}


/**
 * write the living standard .js file
 *
 * @param  {String} repo
 * @param  {String} livingStandardPath
 */
function writeLivingStandard( repo, livingStandardPath ){
	getLastCommitDate( repo, function( err, date ){
		var out = '	modules.livingStandard = \'' + date + '\';';
		writeFile(livingStandardPath, out);
	});
}