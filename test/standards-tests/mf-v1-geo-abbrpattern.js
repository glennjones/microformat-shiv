/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.18 
Mocha integration test from: microformats-v1/geo/abbrpattern
The test was built on Sun Jun 28 2015 17:06:25 GMT+0100 (BST)
*/

assert = chai.assert;


describe('geo', function() {
   var htmlFragment = "<meta charset=\"utf-8\">\n<p class=\"geo\">\n <abbr class=\"latitude\" title=\"37.408183\">N 37° 24.491</abbr>,  \n <abbr class=\"longitude\" title=\"-122.13855\">W 122° 08.313</abbr>\n</p>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-geo"],"properties":{"latitude":["37.408183"],"longitude":["-122.13855"],"name":["N 37° 24.491,  \n W 122° 08.313"]}}],"rels":{},"rel-urls":{}};

   it('abbrpattern', function(){
       assert.deepEqual(found, expected);
   });
});
