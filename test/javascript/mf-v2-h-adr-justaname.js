/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-adr/justaname
The test was built on Mon Jun 15 2015 16:52:46 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-adr', function() {
   var htmlFragment = "<p class=\"h-adr\">665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A.</p>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-adr"],"properties":{"name":["665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A."]}}],"rels":{},"rel-urls":{}};

   it('justaname', function(){
       assert.deepEqual(found, expected);
   });
});
