/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/geo/justaname
The test was built on Tue Jul 14 2015 14:14:49 GMT+0100 (BST)
*/

assert = chai.assert;


describe('geo', function() {
   var htmlFragment = "<p>On my way to The Bricklayer's Arms\n    (Geo: <span class=\"geo\">51.513458;-0.14812</span>)\n</p>";
   var expected = {"items":[{"type":["h-geo"],"properties":{"name":["51.513458;-0.14812"]}}],"rels":{},"rel-urls":{}};

   it('justaname', function(){
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
