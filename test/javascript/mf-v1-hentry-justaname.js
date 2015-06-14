/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v1/hentry/justaname
The test was built on Sun Jun 14 2015 13:24:56 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hentry', function() {
   var htmlFragment = "<a class=\"hentry\" href=\"http://microformats.org/2012/06/25/microformats-org-at-7\">microformats.org at 7</a>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-entry"],"properties":{"name":["microformats.org at 7"],"url":["http://microformats.org/2012/06/25/microformats-org-at-7"]}}],"rels":{},"rel-urls":{}};

   it('justaname', function(){
       assert.deepEqual(found, expected);
   });
});
