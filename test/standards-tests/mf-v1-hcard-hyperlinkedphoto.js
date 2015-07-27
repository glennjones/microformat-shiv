/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hcard/hyperlinkedphoto
The test was built on Tue Jul 14 2015 14:41:35 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hcard', function() {
   var htmlFragment = "<a class=\"vcard\" href=\"http://rohit.khare.org/\">\n        <img alt=\"Rohit Khare\" src=\"images/photo.gif\" />\n</a>";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Rohit Khare"],"photo":["http://example.com/images/photo.gif"],"url":["http://rohit.khare.org/"]}}],"rels":{},"rel-urls":{}};

   it('hyperlinkedphoto', function(){
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
