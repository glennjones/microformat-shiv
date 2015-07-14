/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hcard/format
The test was built on Tue Jul 14 2015 14:41:35 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hcard', function() {
   var htmlFragment = "<p class=\"vcard\">\n    <span class=\"profile-name fn n\">\n        <span class=\" given-name \">John</span> \n        <span class=\"FAMILY-NAME\">Doe</span> \n    </span>\n</p>";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["John \n        Doe"],"given-name":["John"]}}],"rels":{},"rel-urls":{}};

   it('format', function(){
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
