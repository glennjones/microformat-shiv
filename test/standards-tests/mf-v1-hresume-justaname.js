/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hresume/justaname
The test was built on Tue Jul 14 2015 14:14:49 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hresume', function() {
   var htmlFragment = "<p class=\"hresume\">Tim Berners-Lee, invented the World Wide Web.</p>";
   var expected = {"items":[{"type":["h-resume"],"properties":{"name":["Tim Berners-Lee, invented the World Wide Web."]}}],"rels":{},"rel-urls":{}};

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
