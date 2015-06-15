/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v1/hreview/hyperlink
The test was built on Mon Jun 15 2015 12:42:51 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hreview', function() {
   var htmlFragment = "<a class=\"hreview\" href=\"https://plus.google.com/116941523817079328322/about\">Crepes on Cole</a>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-review"],"properties":{"name":["Crepes on Cole"],"url":["https://plus.google.com/116941523817079328322/about"]}}],"rels":{},"rel-urls":{}};

   it('hyperlink', function(){
       assert.deepEqual(found, expected);
   });
});
