/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-org/simple
The test was built on Mon Jun 15 2015 12:42:51 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-org', function() {
   var htmlFragment = "<span class=\"h-org\">Mozilla Foundation</span>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-org"],"properties":{"name":["Mozilla Foundation"]}}],"rels":{},"rel-urls":{}};

   it('simple', function(){
       assert.deepEqual(found, expected);
   });
});
