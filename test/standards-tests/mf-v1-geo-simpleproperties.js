/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.18 
Mocha integration test from: microformats-v1/geo/simpleproperties
The test was built on Sun Jun 28 2015 17:06:25 GMT+0100 (BST)
*/

assert = chai.assert;


describe('geo', function() {
   var htmlFragment = "We are meeting at \n<span class=\"geo\"> \n    <span>The Bricklayer's Arms</span>\n    (Geo: <span class=\"p-latitude\">51.513458</span>:\n    <span class=\"p-longitude\">-0.14812</span>)\n</span>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-geo"],"properties":{"latitude":["51.513458"],"longitude":["-0.14812"],"name":["The Bricklayer's Arms\n    (Geo: 51.513458:\n    -0.14812)"]}}],"rels":{},"rel-urls":{}};

   it('simpleproperties', function(){
       assert.deepEqual(found, expected);
   });
});
