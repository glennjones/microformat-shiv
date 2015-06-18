

window.onload = function() {
	var test  = testData.data[0],
        versionElt = document.querySelector('#version');
    
    versionElt.innerHTML = 'v' + testData.version;
    
    buildTest( test );
    buildList( testData );		
}


function displayTest(e){
     var label = e.target.innerHTML;
     var i = testData.data.length;
     while (i--) {
         if(testData.data[i].name === label){
             buildTest( testData.data[i] );
             break;
         }
     }
}


function buildTest( test ){
	var testDetailElt = document.querySelector('.test-detail'),
        nameElt = document.querySelector('#test-name'),
    	htmlElt = document.querySelector('#test-html pre code'),
    	jsonElt = document.querySelector('#test-json pre code'),
    	parserElt = document.querySelector('#parser-json pre code'),
    	diffElt = document.querySelector('#test-diff pre code');
	
	nameElt.innerHTML = test.name;	
	htmlElt.innerHTML = htmlEscape( test.html );	
	jsonElt.innerHTML = htmlEscape( test.json );	
	
	// parse html
	var div,
        options;
    
    div = document.createElement('div');
	div.innerHTML = test.html;
    options ={
        'node': div,
        'baseUrl': 'http://example.com'
    }
    var mfJSON = microformats.getItems( options );
	parserElt.innerHTML = htmlEscape( js_beautify( JSON.stringify(mfJSON) ) );
    
    // diff json
    var diff = DeepDiff(JSON.parse(test.json),  mfJSON);
    if(diff !== undefined){
       diffElt.innerHTML = htmlEscape( js_beautify( JSON.stringify(diff) ) ); 
    }else{
       diffElt.innerHTML = ''; 
    }
    
    
    if(diff !== undefined){
        nameElt.classList.add('failed');
        testDetailElt.classList.add('test-failed');
        testDetailElt.classList.remove('test-passed');
    }else{
        nameElt.classList.remove('failed');
        testDetailElt.classList.remove('test-failed');
        testDetailElt.classList.add('test-passed');
    }
    
    testDetailElt.style.display = 'block';
    
    //prettyPrint();
}



function passTest( test ){
    var div,
        options;
    
    // parse html   
    div = document.createElement('div');
	div.innerHTML = test.html;
    options ={
        'node': div,
        'baseUrl': 'http://example.com'
    }
    var mfJSON = microformats.getItems( options );
    
    // diff json
    var diff = DeepDiff(JSON.parse(test.json),  mfJSON);
    return (diff === undefined);    
}




function buildList( tests ){
    var total = tests.data.length,
        passed = 0,
        testResultListElt = document.querySelector('.test-result-list');
    
    tests.data.forEach(function(item){
        var li = document.createElement('li');
        li.innerHTML = item.name;
        testResultListElt.appendChild(li);
        
        if( passTest( item ) === false ){
            li.classList.add('failed')
        }else{
            passed ++;
        }
        
        li.addEventListener('click', function(e){
            e.preventDefault();
            displayTest(e);
        });
        
    });
    updateCounts( {
        'total': total,
        'passed': passed,
        'percentPassed': ((100/total) * passed).toFixed(1)
    } )
}


function updateCounts( data ){
    var testCountsElt = document.querySelector('.test-counts');
    testCountsElt.innerHTML = 'Passed: ' + data.passed  + '/' + data.total  + ' - ' + data.percentPassed  + '% of microformats tests';
}


function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

// I needed the opposite function today, so adding here too:
function htmlUnescape(value){
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}