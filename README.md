# microformat-shiv

A light weight cross browser JavaScript Microformats parser





-------------------------------------------


microformat-node is a [microformats 2](http://microformats.org/wiki/microformats-2) parser built for node.js. The library can parse both versions 1 and 2 of microformats. It is built using a thoroughly tested and fast parsing engine.

Demo API - [http://microformat2-node.jit.su/](http://microformat2-node.jit.su/)

### Supported formats
h-adr, h-card, h-entry, h-event, h-geo, h-news, h-product, h-recipe, h-resume, h-review-aggregate, h-review, adr, hCard, hEntry, hEvent, geo, hNews hProduct, hRecipe, hResume, hReview-aggregate, hReview, rel=tag, rel=licence, rel=no-follow, rel=author and XFN

[![build status](https://secure.travis-ci.org/glennjones/microformat-node.png)](http://travis-ci.org/glennjones/microformat-node)


### Install

    npm install microformat-node

or

    git clone http://github.com/glennjones/microformat-node.git
    cd microformat-node
    npm link


### Use

#### using a callback

    var microformats = require("microformat-node"),
        options = {};

    microformats.parseUrl('http://glennjones.net/about', options, function(err, data){
        // do something with data
    });


#### using a promise

    var microformats = require("microformat-node"),
        options = {};

    microformats.parseUrl('http://glennjones.net/about', options)
        .then(
            function (data) {
               // do something with data
            },
            function (error) {
               // do something with error
            }
        )

### Main parse function

#### parseUrl()

    var microformats = require("microformat-node"),
        options = {};

    microformats.parseUrl('http://glennjones.net/about', options, function(err, data){
        // do something with data
    });

#### parseHtml()

    var microformats = require("microformat-node"),
        options = {};

    var html = '<p class="vcard"><a class="fn url" href="http://glennjones.net">Glenn Jones</a></p>';
    microformats.parseHtml(html, options, function(err, data){
        // do something with data
    });


#### parseDom()
This function takes both a [Cheerio](https://github.com/MatthewMueller/cheerio) DOM and node object.

    var microformats = require("microformat-node"),
        options = {};

    microformats.parseHtml(dom, node, options function(err, data){
        // do something with data
    });


### Parsing options 

#### Example use of options
    var microformats = require("microformat-node"),
        options = {'filters': ['h-card']};

    microformats.parseUrl('http://glennjones.net/about', options, function(err, data){
        // do something with data
    });

#### Available options

* filters - (array) an array of formats to filter the output by i.e. ['h-card','h-geo']. - default is empty which displays all formats.
* version1 - (boolean) whether the output should contain version 1 microformats. - default is true
* rel - (boolean) whether the output should contain rel=*. - default is true 
* children - (boolean) whether the output should contain children. - default is true
* childrenRel - (boolean) whether the output should contain child rel=* microformats. - default is false 
* textFormat - (string) plain text output style 'normalised' or 'whitespace' default is 'normalised'
* logLevel - (int 0-4) set the level at which the parser logs events  - default is 4
* useCache - (boolean) whether a parse should use the HTML cache.  - default is false 
* cacheTimeLimit - (int) the amount of time items are kept in the cache before they are discarded. The time is set in milliseconds.  - default is 360000
* cacheItemLimit - (int) the number of items to keep in cache before some are discarded  - default is 1000
* cache - (object) an object containing an interface described in the Custom cache section of this document.
* logger - (object) an object containing an interface described in the Custom logger section of this document. 


### Response 

__Version 0.2.0 was a complete rewrite of microformat-node to conform to the new version 2 specification of microformats. If you used the older 0.1.x versions of microformat-node you will find the JSON output has changed. The output changes were designed to bring it closer to the microdata specification.__

Typical data structure. This is an example of a h-card microformat.

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
        }]
    }

Typical error structure. 

    {
        "errors": [{
                "error": "Error: Invalid protocol - xhttp://microformats.org/"
        }]
    }


## Custom cache

microformats-node uses an in-memory cache to store the HTML of web pages.

The options object contains a property called `cacheTimeLimit` that can be used to set the cache refresh time. By default, this is 3600000ms. The number of items stored in the cache can be limited using the options property `cacheItemLimit`. By default, the cache is limited to 1000 items. The 'useCache' property of the options object is set to false by default.

You can replace the cache with your own, for example, to store the cached data in a database or file system. To add you own custom cache, all you need to do is provide an object containing the following interface:

    {
        function get (url) {
            // add code to get data
            returns data
        }

        function has(url) {
            // add code to check your data store
            returns true or false
        }

        function fetch (url, callback) {
            // add code to return data
            fires callback(null, data);
        }

        function set(url, data) {
            // add code to store data
            returns object
        }

        function setCacheLimits (newCacheTimeLimit, newCacheItemLimit) {
            // can be used to collect setting from options
        }
    }

and then add this interface as the `cache` property of the options object passed into the `parseUrl()` or `parseHtml()` methods.


### Custom logger

microformats-node uses a simple logging system that writes to Node's console. You can replace the logger with your own, for example, to store warnings and errors in a database or log file. To add your own custom logger, all you need to do is provide an object containing the following interface:

    {
        function info (message) { /* code to pass on message */ }
        function log  (message) { /* code to pass on message */ }
        function warn (message) { /* code to pass on message */ }
        function error(message) { /* code to pass on message */ }
    }

and then add this interface to the `logger` property of the options object passed into the `parseUrl()`, `parseHtml()` or `parseDom()` methods.
  

### Querying demo server

Start the server binary:

    $ bin/microformat-node

Then visit the server URL

    http://localhost:8888/


### Using the server API    

You need to provide the url of the web page:

    GET http://localhost:8888/?url=http%3A%2F%2Flocalhost%3A8888%2Ftest%2F

### Viewing the tests

The module includes web pages which runs the [microfomats 2 test suite](https://github.com/microformats/tests). Once you have started the server using the details above you can view the [mocha](http://visionmedia.github.com/mocha/) tests in a browser. If you install mocha you can also run the tests from the command line.

    http://localhost:8888/test/mocha-v1.html
    http://localhost:8888/test/mocha-v2.html



### Support or Contact

Having trouble, please raise an issue at: [https://github.com/glennjones/microformat-node/issues](https://github.com/glennjones/microformat-node/issues)


### License

The project is open sourced under MIT license. See the [license.txt](https://raw.github.com/glennjones/microformat-node/master/license.txt "license.txt") file within the project source.