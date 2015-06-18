/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-card/hyperlinkedphoto
The test was built on Mon Jun 15 2015 16:52:46 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<a class=\"h-card\" href=\"http://rohit.khare.org/\">\n        <img alt=\"Rohit Khare\" src=\"images/photo.gif\" />\n    </a>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Rohit Khare"],"photo":["http://example.com/images/photo.gif"],"url":["http://rohit.khare.org/"]}}],"rels":{},"rel-urls":{}};

   it('hyperlinkedphoto', function(){
       assert.deepEqual(found, expected);
   });
});
