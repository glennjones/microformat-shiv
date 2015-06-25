/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-org/hyperlink
The test was built on Tue Jun 23 2015 16:14:26 GMT+0100 (BST)
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
