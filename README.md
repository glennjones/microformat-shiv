# microformat-shiv

microformat-shiv is a light-weight cross browser javascript [microformats 2](http://microformats.org/wiki/microformats-2) parser. Browsers should come with APIs to parse semantic content such as microformats, unfortunately this has yet to happen.

* A light-weight cross browser JavaScript 
* [Example browser extensions](https://github.com/glennjones/microformat-shiv/tree/master/examples) for Chrome, Firefox and Opera
* Well tested, passes all microformats 2 testsuite
* Parses older microformats 1 formats


### Supported formats
h-adr, h-card, h-entry, h-event, h-geo, h-news, h-product, h-recipe, h-resume, h-review-aggregate, h-review, adr, hCard, hEntry, hEvent, geo, hNews hProduct, hRecipe, hResume, hReview-aggregate, hReview, rel=tag, rel=licence, rel=no-follow, rel=author and XFN


### Use

#### simple

    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var items;

        items = microformats.getItems()
        // do something with data `items`
    </script>
    


#### using options

    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var items,
            options;
        
        options = {'filters': ['h-card']};
        var items = microformats.getItems( options )
        // do something with data `items`
    </script>


#### targeting just part of a page

    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var items,
            options;
        
        options = {
            'filters': ['h-card'],
            'node': document.getElementById('target')
        };
        var items = microformats.getItems( options )
        // do something with data `items`
    </script>    


#### Available options
* document - (DOM element) a reference to a document - default is the current browser document.
* node - (DOM element) a reference to an element to be used as the root to parse from - default is the current browser document
* filters - (array) an array of formats to filter the output by i.e. ['h-card','h-geo'] - default is empty which displays all formats
* version1 - (boolean) whether the output should contain version 1 microformats - default is true
* rel - (boolean) whether the output should contain rel=* - default is true 
* children - (boolean) whether the output should contain children - default is true
* childrenRel - (boolean) whether the output should contain child rel=* microformats - default is false 
* textFormat - (string) plain text output style 'normalised' or 'whitespace' default is 'normalised'



### Response 

__Version 0.3.0 was a complete rewrite of the microformat-shiv library to conform to the new version 2 specification of microformats. If you used the older 0.2.x versions of microformat-shiv you will find the JSON output has changed. The output changes were designed to bring it closer to the microdata specification.__

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



### Counts
There is a simple method called getCounts, which will return the number of each type of microformat found. It does not do a full parse so it is much quicker method that can be used to add notifications to the UI. It currently does not count rel=* microformats.

    <script type="text/javascript">
        var counts;
        
        var counts = microformats.getCounts()
        // do something with data 
    </script>    


### Mocha.js tests

The library includes web pages which run the [microfomats 2 test suite](https://github.com/microformats/tests).The tests are built using Mocha.js and you can run them directly from the files in this repo.

    \\test\mocha-v1.html
    \\test\mocha-v2.html



### Support or Contact

Having trouble, please raise an issue at: [https://github.com/glennjones/microformat-shiv/issues](https://github.com/glennjones/microformat-shiv/issues)


### License

The project is open sourced under MIT license. See the [license.txt](https://raw.github.com/glennjones/microformat-shic/master/license.txt "license.txt") file within the project source.