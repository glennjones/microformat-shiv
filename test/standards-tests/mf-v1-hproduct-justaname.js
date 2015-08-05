/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hproduct/justaname
The test was built on Wed Aug 05 2015 14:24:03 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hproduct', function() {
   var htmlFragment = "<p class=\"hproduct\">Raspberry Pi</p>";
   var expected = {"items":[{"type":["h-product"],"properties":{"name":["Raspberry Pi"]}}],"rels":{},"rel-urls":{}};

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
