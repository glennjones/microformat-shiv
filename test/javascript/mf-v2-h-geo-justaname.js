/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-geo/justaname
The test was built on Mon Jun 15 2015 16:52:46 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-geo', function() {
   var htmlFragment = "<p>On my way to The Bricklayer's Arms\n    (Geo: <span class=\"h-geo\">51.513458;-0.14812</span>)\n</p>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-geo"],"properties":{"name":["51.513458;-0.14812"]}}],"rels":{},"rel-urls":{}};

   it('justaname', function(){
       assert.deepEqual(found, expected);
   });
});
