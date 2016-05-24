
[![build status](https://img.shields.io/travis/glennjones/microformat-shiv.svg?style=flat-square)](http://travis-ci.org/glennjones/microformat-shiv)
[![Coverage Status](https://img.shields.io/coveralls/glennjones/microformat-shiv/master.svg?style=flat-square)](https://coveralls.io/r/glennjones/microformat-shiv)
[![Codacy Badge](https://img.shields.io/codacy/520b9cab36254761b100c33d3e3899e3.svg?style=flat-square)](https://www.codacy.com/app/glennjonesnet/microformat-shiv)
[![MIT license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.github.com/glennjones/microformat-shic/master/license.txt)

microformat-shiv
================
A cross browser JavaScript microformats parser, which can also be used to build [browser extensions](https://github.com/glennjones/microformat-shiv/tree/master/examples).

Installation
------------

Using Bower:

```sh
$ bower install microformat-shiv
```

Methods
-----
* Parsing
    * [`get`](#get)
    * [`getParent`](#getParent)
* Discovery
    * [`count`](#count)
    * [`isMicroformat`](#isMicroformat)
    * [`hasMicroformats`](#hasMicroformats)


get
-----

Simple parse of a HTML document or a selected part of a HTML document.
```javascript
    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var items;

        items = Microformats.get()
        // do something with data `items`
    </script>
```

Using options
```javascript
    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var items,
            options;

        options = {'filters': ['h-card']};
        var items = Microformats.get( options )
        // do something with data `items`
    </script>
```

Targeting just part of a HTML document
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

Parsing a HTML string
```javascript
    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var items,
            options;

        options = {
            'baseUrl': 'http://glennjones.net',
            'html': '<a class="h-card" href="/about.html">Glenn</a>'
        };
        var items = Microformats.get( options )
        // do something with data `items`
    </script>
```
Note: The `baseUrl` is optional and is used to resolve relative URLs


Options
-------
* `html` - (String) the HTML to be parsed (only `get` and `count` methods);
* `node` - (DOM element) the element to be parsed - the default is the current browser document
* `baseUrl` - (String) optional URL used to resolve relative URLs
* `filter` - (Array) microformat types returned - i.e. `['h-card']` - always adds `rels`
* `textFormat` - (String) text style `whitespacetrimmed` or `normalised` default is `whitespacetrimmed`
* `dateFormat` - (String) the ISO date profile `auto`, `w3c` `rfc3339` or `html5` default is `auto`
* `add` - (Array) adds microformat version 1 definitions

__I would recommend always setting the `textFormat` option to `normalised`. This is not part of the microformat parsing rules, but in most cases provides more usable output.__

Experimental options
-------
These options are part of ongoing specification development. They maybe removed or renamed in the future.
* `lang` (Boolean) Parses and adds the language value to e-* default is false
* `parseLatLonGeo` (Boolean)  Parse geo date written as latlon i.e. 30.267991;-97.739568
default is `false`


Output
-------
JSON output. This is an example of a parsed `h-card` microformat.
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
JSON output with error.
```javascript
    {
        "items":[],
        "rels": {},
        "rel-urls": {}
        "errors":["No options.node was provided and no global document object could be found."]
    }
```

getParent
-----

Given an HTML DOM node it will return its first parent microformat.
```javascript
    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var items,
            node = document.getElementById('target');

        items = Microformats.getParent( node )
        // do something with data `items`
    </script>
```
The `getParent` method takes the same `options` as the `get` method. The one difference is how the `options.filters` property affects the output. Adding a filter list to `getParent` will allow the search for a parent to pass through microformats you do not want to target.

```javascript
    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var items,
            options = {'filters': ['h-entry']},
            node = document.getElementById('target');

        items = Microformats.getParent( node, options )
        // do something with data `items`
    </script>
```


Count
-----
The `count` method returns the number of each microformat type found. It does not do a full parse so it is much quicker
than `get` and can be used for tasks such as adding notifications to the UI. The method can take an `options` object as a parameter.
```javascript
    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var counts = Microformats.count()
        // do something with counts data
    </script>
```
Output
```javascript
    {
        'h-event': 1,
        'h-card': 2,
        'rels': 6
    }
```

isMicroformat
-------------
The `isMicroformat` method returns whether a node has a valid microformats class. It currently does not consider
`rel=*` a microformat. The method can take an `options` object as a second parameter.
```javascript
    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var node = document.getElementById('target');
        var isVaild = Microformats.isMicroformat( node );
        // do something with isVaild boolean
    </script>
```


hasMicroformats
-------------
The `hasMicroformats` method returns whether a document or node has any valid microformats class. It currently does
not take `rel=*` microformats into account. The method can take an `options` object as a second parameter.
```javascript
    <script src="microformat-shiv.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var isVaild,
            node = document.getElementById('target');

        isVaild = Microformats.isMicroformat( node );
        // do something with isVaild boolean
    </script>
```



Version and livingStandard
--------------------------
The library has two properties to help identify how up-to-date it is:

*  `version` (String) internal version number
*  `livingStandard` (String ISO Date) the current https://github.com/microformats/tests used.


Browser support
---------------
Desktop

* Firefox 45-11
* Chrome 48-14
* Opera 30-19 (Version 18 > passes 84% of tests)
* Safari 9-6 (Version 5 passes 97% of tests)
* IE 11-9
* Edge

Mobile
----------------------
* iOS 9-5.1 (Version 4 passes 97% of tests)
* Andriod 5-4 (The only versions I could test)
* Android Firefox 39 (The only versions I could test)
* Android Chrome 43	(The only versions I could test)

Note some earlier browsers will need the ES5-shim.js file.


Microformats definitions object
-------------------------------
The library has all the version 1 definitions built-in, but you can add new definitions using `options.add` if you wish. Below is an example of a definitions object. More can be found in the directory `lib/maps`. You do not need to add new definition objects if you are using microformats version 2.
```javascript
    {
		root: 'hpayment',
		name: 'h-payment',
		properties: {
			'amount': {},
			'currency': {}
		}
	}
```

Standard vs Modern
-------------------------------
The library code comes in two versions `microformats-shiv.js` and `microformat-shiv-modern.js`. The modern version used by Mozilla in Firefox does not include the polyfills for
[DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser).
This version of the library can only be used with modern browser which support these features.


License
-------

[MIT][] © [Glenn Jones][]

[MIT]: ./License.md
[Glenn Jones]: https://github.com/glennjones


