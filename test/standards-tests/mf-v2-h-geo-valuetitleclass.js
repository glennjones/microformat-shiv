/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-geo/valuetitleclass
The test was built on Tue Jun 30 2015 19:18:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-geo', function() {
   var htmlFragment = "<meta charset=\"utf-8\">\n<p>\n    <span class=\"h-geo\">\n        <span class=\"p-latitude\">\n            <span class=\"value-title\" title=\"51.513458\">N 51° 51.345</span>, \n        </span>\n        <span class=\"p-longitude\">\n            <span class=\"value-title\" title=\"-0.14812\">W -0° 14.812</span>\n        </span>\n    </span>\n</p>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-geo"],"properties":{"latitude":["51.513458"],"longitude":["-0.14812"],"name":["N 51° 51.345, \n        \n        \n            W -0° 14.812"]}}],"rels":{},"rel-urls":{}};

   it('valuetitleclass', function(){
       assert.deepEqual(found, expected);
   });
});
