var path			= require('path'),
	fs 				= require('fs-extra'),
	download 		= require('download-github-repo');


var repo = 'glennjones/tests',
	tempDir = path.resolve(__dirname,'temp-tests'),
	testDir = 'javascript',
	testDirResolve = path.resolve(__dirname,'test', testDir),
	testPagePath = path.resolve(__dirname,'test/microformat-tests.html');


download(repo, tempDir, function(err, data){
	clearDirectory(function(err){
		if(err){
			console.err(err);
		}else{
			var fileList = getFileList(path.resolve(tempDir,'tests')),
				testStructure  = getGetTestStructure( fileList ),
				version = getTestSuiteVersion(),
				relativeTestPaths = [];
			
			
			testStructure.forEach(function(item){
				getDataFromFiles( item, function(err, data){
					if(data){
						
						var test = buildTest( data, item, version, repo ),
							filePath = shortenFilePath( item[0] + '-' + item[1] + '-' + item[2].replace('.json','') + '.js' );
							
						relativeTestPaths.push( filePath );
						writeFile(path.resolve(testDirResolve,filePath), test);
						console.log(path.resolve(testDirResolve,filePath));
						
						
					}else{
						console.log(err);
					}
				});
			});
			
			var html = buildTestPage( relativeTestPaths, version );
			writeFile(testPagePath, html);
			
			
			fs.removeSync(tempDir);
			console.log('done');
		}
	});
});


// get a list of file paths
function getFileList (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFileList(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
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


// gets the test suite version
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
	

function buildTest( testData, testStructure, version, repo ){
	var out = '',
	 	fileName = testStructure[0] + '/' + testStructure[1] + '/' + testStructure[2].replace('.json',''),
	 	date = new Date().toString();
	
	
	out += '/*\r\nMicroformats Test Suite - Downloaded from github repo: ' + repo + ' version v' + version + ' \r\n';
	out += 'Mocha integration test from: ' + fileName + '\r\nThe test was built on ' + date + '\r\n*/\r\n\r\n';
	out += "assert = chai.assert;\r\n\r\n\r\n";
	
	out += "describe('" + testStructure[1]  + "', function() {\r\n";
    out += "   var htmlFragment = " + JSON.stringify(testData.html) + ";\r\n";
   	out += "   var found = helper.parseHTML(htmlFragment,'http://example.com/');\r\n";
   	out += "   var expected = " + JSON.stringify(JSON.parse(testData.json)) + ";\r\n\r\n";
	out += "   it('" + testStructure[2].replace('.json','')  + "', function(){\r\n";   
	out += "       assert.deepEqual(found, expected);\r\n";   
	out += "   });\r\n";
	out += "});\r\n";
	return out;
}


 function buildTestPage( relativeTestPaths, version ){
	var date = new Date().toString(),
		out = '';
	out += '<html><head><title>Mocha</title>\r\n';
    out += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\r\n';
    out += '<link rel="stylesheet" href="css/mocha.css" />\r\n';
    out += '<script src="../microformat-shiv.js"></script>\r\n';
    out += '<script src="javascript/mocha.js"></script>\r\n';
    out += '<script src="javascript/chai.js"></script>\r\n';
    out += '<script src="javascript/helper.js"></script>\r\n';
    out += '<script>mocha.setup("bdd")</script>\r\n';
	
	relativeTestPaths.forEach(function(item){
		out += '<script src="' + testDir + '/' + item + '"></script>\r\n';
	});
	
    out += '<script>onload = function(){mocha.run();};</script>\r\n';
    out += '</head><body>\r\n';
    out += '<h3>Microformats test suite - v' + version + '</h3>\r\n';
	out += '<p>Mocha tests built on ' + date + '. Downloaded from github repo: ' + repo + ' version v' + version + '</p>\r\n';
    out += '<div id="mocha"></div>\r\n';
    out += '</body></html>\r\n';	
	return out;
 }


// 
function shortenFilePath( filepath ){
	return 'mf-' + filepath.replace('microformats-mixed','mixed').replace('microformats-v1','v1').replace('microformats-v2','v2');
}


// delete all files with prefix mf- from current test directory
function clearDirectory( callback ){
	var fileList = getFileList (testDirResolve);
	fileList.forEach(function(filePath){
		if(filePath.indexOf('/mf-') > -1){
			fs.removeSync(filePath);
		}
	});

	callback(null);
}




// write a file
function writeFile(path, content){
	fs.writeFile(path, content, 'utf8', function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log('The file: ' + path + ' was saved');
		}
	}); 
}
