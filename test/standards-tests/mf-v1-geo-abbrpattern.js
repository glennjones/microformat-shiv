/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.23 
Mocha integration test from: microformats-v1/geo/abbrpattern
The test was built on Wed Sep 09 2015 15:51:39 GMT+0100 (BST)
*/

assert = chai.assert;


describe('geo', function() {
   var htmlFragment = "<meta charset=\"utf-8\">\n<p class=\"geo\">\n <abbr class=\"latitude\" title=\"37.408183\">N 37° 24.491</abbr>,  \n <abbr class=\"longitude\" title=\"-122.13855\">W 122° 08.313</abbr>\n</p>";
   var expected = {"items":[{"type":["h-geo"],"properties":{"latitude":["37.408183"],"longitude":["-122.13855"]}}],"rels":{},"rel-urls":{}};

   it('abbrpattern', function(){
       var doc, dom, node, options, parser, found;
       dom = new DOMParser();
       doc = dom.parseFromString( htmlFragment, 'text/html' );
       options ={
       		'document': doc,
       		'node': doc,
       		'baseUrl': 'http://example.com',
       		'dateFormat': 'html5'
       };
       found = Microformats.get( options );
       assert.deepEqual(found, expected);
   });
});
