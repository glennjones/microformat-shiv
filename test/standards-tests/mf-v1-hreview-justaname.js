/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.21 
Mocha integration test from: microformats-v1/hreview/justaname
The test was built on Thu Aug 20 2015 15:27:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hreview', function() {
   var htmlFragment = "<p class=\"hreview\">Crepes on Cole</p>";
   var expected = {"items":[{"type":["h-review"],"properties":{"name":["Crepes on Cole"]}}],"rels":{},"rel-urls":{}};

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
