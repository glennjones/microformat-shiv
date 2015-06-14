/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v1/hreview-aggregate/justahyperlink
The test was built on Sun Jun 14 2015 13:24:56 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hreview-aggregate', function() {
   var htmlFragment = "<p class=\"hreview-aggregate\">\n    <span class=\"item\">\n        <a class=\"fn url\" href=\"http://example.com/mediterraneanwraps\">Mediterranean Wraps</a>\n    </span> - Rated: \n    <span class=\"rating\">4.5</span> out of 5 (<span class=\"count\">6</span> reviews)\n</p>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-review-aggregate"],"properties":{"item":[{"value":"Mediterranean Wraps","type":["h-item"],"properties":{"name":["Mediterranean Wraps"],"url":["http://example.com/mediterraneanwraps"]}}],"rating":["4.5"],"count":["6"],"name":["Mediterranean Wraps\n     - Rated: \n    4.5 out of 5 (6 reviews)"]}}],"rels":{},"rel-urls":{}};

   it('justahyperlink', function(){
       assert.deepEqual(found, expected);
   });
});
