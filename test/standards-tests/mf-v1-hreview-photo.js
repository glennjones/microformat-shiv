/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hreview/photo
The test was built on Wed Aug 05 2015 14:46:59 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hreview', function() {
   var htmlFragment = "<base href=\"http://example.com\">\n<img class=\"hreview\" src=\"images/photo.gif\" alt=\"Crepes on Cole\" />";
   var expected = {"items":[{"type":["h-review"],"properties":{"name":["Crepes on Cole"],"photo":["http://example.com/images/photo.gif"]}}],"rels":{},"rel-urls":{}};

   it('photo', function(){
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
