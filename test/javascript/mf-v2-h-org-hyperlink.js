/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-org/hyperlink
The test was built on Mon Jun 15 2015 16:52:46 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-org', function() {
   var htmlFragment = "<a class=\"h-org\" href=\"http://mozilla.org/\">Mozilla Foundation</a>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-org"],"properties":{"name":["Mozilla Foundation"],"url":["http://mozilla.org/"]}}],"rels":{},"rel-urls":{}};

   it('hyperlink', function(){
       assert.deepEqual(found, expected);
   });
});
