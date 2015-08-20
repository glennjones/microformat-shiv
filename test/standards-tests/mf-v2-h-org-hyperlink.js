/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.21 
Mocha integration test from: microformats-v2/h-org/hyperlink
The test was built on Thu Aug 20 2015 15:27:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-org', function() {
   var htmlFragment = "<a class=\"h-org\" href=\"http://mozilla.org/\">Mozilla Foundation</a>";
   var expected = {"items":[{"type":["h-org"],"properties":{"name":["Mozilla Foundation"],"url":["http://mozilla.org/"]}}],"rels":{},"rel-urls":{}};

   it('hyperlink', function(){
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
