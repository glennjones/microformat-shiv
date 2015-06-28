/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.18 
Mocha integration test from: microformats-v1/hreview/photo
The test was built on Sun Jun 28 2015 17:06:25 GMT+0100 (BST)
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
