/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.21 
Mocha integration test from: microformats-v2/h-card/hyperlinkedphoto
The test was built on Thu Aug 20 2015 15:27:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<a class=\"h-card\" href=\"http://rohit.khare.org/\">\n        <img alt=\"Rohit Khare\" src=\"images/photo.gif\" />\n    </a>";
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
