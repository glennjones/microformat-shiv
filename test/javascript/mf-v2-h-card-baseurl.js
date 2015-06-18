/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-card/baseurl
The test was built on Mon Jun 15 2015 16:52:46 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<base href=\"http://example.org\"/>\n<div class=\"h-card\">\n  <a class=\"p-name u-url\" href=\"http://blog.lizardwrangler.com/\">Mitchell Baker</a> \n  (<a class=\"p-org h-card\" href=\"bios/mitchell-baker/\">Mozilla Foundation</a>)\n  <img class=\"u-photo\" src=\"images/photo.gif\"/>\n</div>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Mitchell Baker"],"url":["http://blog.lizardwrangler.com/"],"org":[{"value":"Mozilla Foundation","type":["h-card"],"properties":{"name":["Mozilla Foundation"],"url":["http://example.org/bios/mitchell-baker/"]}}],"photo":["http://example.org/images/photo.gif"]}}],"rels":{},"rel-urls":{}};

   it('baseurl', function(){
       assert.deepEqual(found, expected);
   });
});
