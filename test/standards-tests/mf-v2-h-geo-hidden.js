/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-geo/hidden
The test was built on Tue Jul 14 2015 14:14:50 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-geo', function() {
   var htmlFragment = "<p>\n    <span class=\"h-geo\">The Bricklayer's Arms\n        <span class=\"p-latitude\">\n            <span class=\"value-title\" title=\"51.513458\"> </span> \n        </span>\n        <span class=\"p-longitude\">\n            <span class=\"value-title\" title=\"-0.14812\"> </span>\n        </span>\n    </span>\n</p>";
   var expected = {"items":[{"type":["h-geo"],"properties":{"latitude":["51.513458"],"longitude":["-0.14812"],"name":["The Bricklayer's Arms"]}}],"rels":{},"rel-urls":{}};

   it('hidden', function(){
       var doc, dom, node, options, parser, found;
       dom = new DOMParser();
       doc = dom.parseFromString( htmlFragment, 'text/html' );
       options ={
       		'document': doc,
       		'node': doc,
       		'baseUrl': 'http://example.com'
       };
       found = Microformats.get( options );
       assert.deepEqual(found, expected);
   });
});
