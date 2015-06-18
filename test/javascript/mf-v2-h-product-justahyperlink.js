/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-product/justahyperlink
The test was built on Mon Jun 15 2015 16:52:46 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-product', function() {
   var htmlFragment = "<a class=\"h-product\" href=\"http://www.raspberrypi.org/\">Raspberry Pi</a>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-product"],"properties":{"name":["Raspberry Pi"],"url":["http://www.raspberrypi.org/"]}}],"rels":{},"rel-urls":{}};

   it('justahyperlink', function(){
       assert.deepEqual(found, expected);
   });
});
