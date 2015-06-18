/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-geo/simpleproperties
The test was built on Mon Jun 15 2015 16:52:46 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-geo', function() {
   var htmlFragment = "<p class=\"h-geo\">We are meeting at \n    <span class=\"p-name\">The Bricklayer's Arms</span>\n    (Geo: <span class=\"p-latitude\">51.513458</span>:\n    <span class=\"p-longitude\">-0.14812</span>)\n</p>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-geo"],"properties":{"name":["The Bricklayer's Arms"],"latitude":["51.513458"],"longitude":["-0.14812"]}}],"rels":{},"rel-urls":{}};

   it('simpleproperties', function(){
       assert.deepEqual(found, expected);
   });
});
