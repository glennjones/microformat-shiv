/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-event/combining
The test was built on Mon Jun 15 2015 16:52:46 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-event', function() {
   var htmlFragment = "<div class=\"h-event\">\n  <a class=\"p-name u-url\" href=\"http://indiewebcamp.com/2012\">\n    IndieWebCamp 2012\n  </a>\n  from <time class=\"dt-start\">2012-06-30</time> \n  to <time class=\"dt-end\">2012-07-01</time> at \n  <span class=\"p-location h-card\">\n    <a class=\"p-name p-org u-url\" href=\"http://geoloqi.com/\">Geoloqi</a>, \n    <span class=\"p-street-address\">920 SW 3rd Ave. Suite 400</span>, \n    <span class=\"p-locality\">Portland</span>, \n    <abbr class=\"p-region\" title=\"Oregon\">OR</abbr>\n  </span>\n</div>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["IndieWebCamp 2012"],"url":["http://indiewebcamp.com/2012"],"start":["2012-06-30"],"end":["2012-07-01"],"location":[{"value":"Geoloqi","type":["h-card"],"properties":{"name":["Geoloqi"],"org":["Geoloqi"],"url":["http://geoloqi.com/"],"street-address":["920 SW 3rd Ave. Suite 400"],"locality":["Portland"],"region":["Oregon"]}}]}}],"rels":{},"rel-urls":{}};

   it('combining', function(){
       assert.deepEqual(found, expected);
   });
});