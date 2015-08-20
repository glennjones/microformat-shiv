/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.21 
Mocha integration test from: microformats-v1/geo/simpleproperties
The test was built on Thu Aug 20 2015 15:27:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('geo', function() {
   var htmlFragment = "We are meeting at \n<span class=\"geo\"> \n    <span>The Bricklayer's Arms</span>\n    (Geo: <span class=\"p-latitude\">51.513458</span>:\n    <span class=\"p-longitude\">-0.14812</span>)\n</span>";
   var expected = {"items":[{"type":["h-geo"],"properties":{"latitude":["51.513458"],"longitude":["-0.14812"],"name":["The Bricklayer's Arms\n    (Geo: 51.513458:\n    -0.14812)"]}}],"rels":{},"rel-urls":{}};

   it('simpleproperties', function(){
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
