/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-adr/geourl
The test was built on Sun Jun 28 2015 17:06:25 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-adr', function() {
   var htmlFragment = "<p class=\"h-adr\">\n    <a class=\"p-name u-geo\" href=\"geo:51.526421;-0.081067;crs=wgs84;u=40\">Bricklayer's Arms</a>, \n    <span class=\"p-locality\">London</span> \n</p>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-adr"],"properties":{"name":["Bricklayer's Arms"],"geo":["geo:51.526421;-0.081067;crs=wgs84;u=40"],"locality":["London"],"url":["geo:51.526421;-0.081067;crs=wgs84;u=40"]}}],"rels":{},"rel-urls":{}};

   it('geourl', function(){
       assert.deepEqual(found, expected);
   });
});
