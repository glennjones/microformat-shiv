/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.21 
Mocha integration test from: microformats-v2/h-org/simple
The test was built on Thu Aug 20 2015 15:27:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-org', function() {
   var htmlFragment = "<span class=\"h-org\">Mozilla Foundation</span>";
   var expected = {"items":[{"type":["h-org"],"properties":{"name":["Mozilla Foundation"]}}],"rels":{},"rel-urls":{}};

   it('simple', function(){
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
