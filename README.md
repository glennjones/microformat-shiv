# microformat-shiv

[![build status](https://secure.travis-ci.org/glennjones/microformat-shiv.png)](http://travis-ci.org/glennjones/microformat-shiv)
[![Codacy Badge](https://www.codacy.com/project/badge/520b9cab36254761b100c33d3e3899e3)](https://www.codacy.com/app/glennjonesnet/microformat-shiv)
[![MIT license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.github.com/glennjones/microformat-shic/master/license.txt)



microformat-shiv is a cross browser javascript [microformats](http://microformats.org/wiki/microformats-2) parser. Browsers should come with APIs to parse semantic content such as microformats, unfortunately this has yet to happen.

* A light-weight cross browser JavaScript 
* [Example browser extensions](https://github.com/glennjones/microformat-shiv/tree/master/examples) for Chrome, Firefox and Opera
* Well tested, passes all microformats v2 testsuite
* Parses older microformats v1 formats


### Supported formats
The parser will find any microformats in yor HTML even custom strutures you define yourselve. A list of some of the formats its can parse:

`h-adr`, `h-card`, `h-feed`, `h-entry`, `h-event`, `h-geo`, `h-news`, `h-product`, `h-recipe`, `h-resume`, `h-review-aggregate`, `h-review`, `adr`, `hCard`, `hEntry`, `hEvent`, `geo`, `hNews`, `hProduct`, `hRecipe`, `hResume`, `hReview-aggregate`, `hReview`, `rel=tag`, `rel=licence`, `rel=no-follow`, `rel=author`, `XFN` and more



### Use

#### simple
```javascript
    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var items;

        items = Microformats.get()
        // do something with data `items`
    </script>
```    


#### using options
```javascript
    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var items,
            options;
        
        options = {'filters': ['h-card']};
        var items = microformats.get( options )
        // do something with data `items`
    </script>
``` 

#### targeting just part of a page
```javascript
    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var items,
            options;
        
        options = {
            'filters': ['h-card'],
            'node': document.getElementById('target')
        };
        var items = Microformats.get( options )
        // do something with data `items`
    </script>    
```  

#### Available options
* `node` - (DOM element) the element to be parse - default is the current browser document
* `filter` - (Array) a list of microformat to only return - i.e. `['h-card']` - always adds `rels`
* `textFormat` - (String) text style `whitespacetrimmed` or `normalised` default is `whitespacetrimmed`
* `dateFormat` - (String) the ISO date profile for output `auto`, `w3c` `rfc3339` or `html5` default is `auto`
* `add` - (Array) of version 1 definition objects


#### Text style option - `textFormat`
__I would recommended always setting `textFormat` option to `normalised`. This is not part of the microformat 
parsing rules, but in most cases provides more usable output.__


### Response 
Typical data structure. This is an example of a `h-card` microformat.
```javascript
    {
        "items": [{
            "type": ["h-card"],
             "properties": {
                "url": ["http://blog.lizardwrangler.com/"],
                "name": ["Mitchell Baker"],
                "org": ["Mozilla Foundation"],
                "note": ["Mitchell is responsible for setting the direction Mozilla ..."],
                "category": ["Strategy", "Leadership"]
             }
        }],
        "rels": {},
        "rel-urls": {}
    }
```  
Typical error structure. 
```javascript
    {
        "items":[],
        "rels": {},
        "rel-urls": {}
        "errors":["No options.node was provided and no global document object could be found."]
    }
```  

### Count
The `count` method returns the number of each type of microformat found in the document/node. It does not do a full parse so it is much quicker 
method that can be used to add notifications to the UI. It currently does not count `rel=*` microformats.
```javascript
    <script type="text/javascript">
        var counts;
        
        var counts = Microformats.count()
        // do something with data 
    </script>    
```  
Typical error structure. 
```javascript
    {
        'h-event': 1,
        'h-card': 2
    }
```  

### isMicroformat
The `isMicroformat` method returns weather a node has a valid microformats class.
```javascript
    <script type="text/javascript">
        var node = document.getElementById('target')
        
        var isVaild = Microformats.isMicroformat( node );
        // do something with data 
    </script>    
```  

### Version and livingStandard
The library has two properties to help identify now up todate its is:

*  `version` (String) is this the libraries only interanl version number
*  `livingStandard` (String ISO Date) as microformats does not have minor or semantic versioning the library provides the date test from https://github.com/microformats/tests where last sync.


### Microformats version 1 definitions object
The library has a large number of built in version 1 microformats definitions, but you can add new ones if you wish. Example of a definitions object
```javascript
    {
		root: 'hpayment',
		name: 'h-payment',
		properties: {
			'amount': {}
		}
	}
```  
Custom version 2 formats are automatticlly pick up by the parser without the need to add new definitions

### Unit and integration tests

The library includes web pages which run the [microfomats test suite](https://github.com/microformats/tests).The tests are built using Mocha.js and you can run them directly from node.js.

To run the test server download and install node.js and npm. From the command line move the project directory and excute the following commands:
```  
    $ npm install
    $ node app
```      
Within a browser entry the following web address

*  http://localhost:3000/mocha-tests-client.html
    
    
### Test Coverage tools
The tests page also has coverage report for the sub modules that the library uses:

*  http://localhost:3000/mocha-tests-client.html 

```  
    $ ./node_modules/.bin/poncho --reporter lcov test/mocha-tests-server.html
```  

or

```  
    $ ./node_modules/.bin/poncho --reporter lcov test/mocha-tests-server.html | ./node_modules/codacy-coverage/bin/codacy-coverage.js
```  

### Other tests and debugging tools
There are also three other tests tools:

* http://localhost:3000/test/testrunner.html (clients side version microfomats test suite testrunner)
* http://localhost:3000/test/parse.html (clients side form to for parsing and debugging)
* http://localhost:3000/test/parse-umd.html (clients side form to test the full umd wrapped version of the code)
* http://localhost:3000/test/count.html (clients side form to test count function)

### Support or Contact

Having trouble, please raise an issue at: [https://github.com/glennjones/microformat-shiv/issues](https://github.com/glennjones/microformat-shiv/issues)


### License

The project is open sourced under MIT license. See the [license.txt](https://raw.github.com/glennjones/microformat-shic/master/license.txt "license.txt") file within the project source.