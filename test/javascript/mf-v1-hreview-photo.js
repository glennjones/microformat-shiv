/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v1/hreview/photo
The test was built on Mon Jun 15 2015 16:52:46 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hreview', function() {
   var htmlFragment = "<base href=\"http://example.com\">\n<img class=\"hreview\" src=\"images/photo.gif\" alt=\"Crepes on Cole\" />";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-review"],"properties":{"name":["Crepes on Cole"],"photo":["http://example.com/images/photo.gif"]}}],"rels":{},"rel-urls":{}};

   it('photo', function(){
       assert.deepEqual(found, expected);
   });
});
