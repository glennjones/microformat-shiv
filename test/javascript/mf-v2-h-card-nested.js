/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-card/nested
The test was built on Mon Jun 15 2015 16:52:46 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<div class=\"h-card\">\n  <a class=\"p-name u-url\" href=\"http://blog.lizardwrangler.com/\">Mitchell Baker</a> \n  (<a class=\"h-org h-card\" href=\"http://mozilla.org/\">Mozilla Foundation</a>)\n</div>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Mitchell Baker"],"url":["http://blog.lizardwrangler.com/"]},"children":[{"value":"Mozilla Foundation","type":["h-org","h-card"],"properties":{"name":["Mozilla Foundation"],"url":["http://mozilla.org/"]}}]}],"rels":{},"rel-urls":{}};

   it('nested', function(){
       assert.deepEqual(found, expected);
   });
});
