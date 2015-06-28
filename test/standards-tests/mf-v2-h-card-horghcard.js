/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-card/horghcard
The test was built on Sun Jun 28 2015 17:06:25 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<div class=\"h-card\">\n  <a class=\"p-name u-url\" href=\"http://blog.lizardwrangler.com/\">Mitchell Baker</a> \n  (<a class=\"p-org h-card h-org\" href=\"http://mozilla.org/\">Mozilla Foundation</a>)\n</div>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Mitchell Baker"],"url":["http://blog.lizardwrangler.com/"],"org":[{"value":"Mozilla Foundation","type":["h-card","h-org"],"properties":{"name":["Mozilla Foundation"],"url":["http://mozilla.org/"]}}]}}],"rels":{},"rel-urls":{}};

   it('horghcard', function(){
       assert.deepEqual(found, expected);
   });
});
