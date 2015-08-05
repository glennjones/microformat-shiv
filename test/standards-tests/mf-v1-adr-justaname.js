/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/adr/justaname
The test was built on Wed Aug 05 2015 14:24:03 GMT+0100 (BST)
*/

assert = chai.assert;


describe('adr', function() {
   var htmlFragment = "<p class=\"adr\">665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A.</p>";
   var expected = {"items":[{"type":["h-adr"],"properties":{"name":["665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A."]}}],"rels":{},"rel-urls":{}};

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
