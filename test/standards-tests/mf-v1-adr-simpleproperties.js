/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/adr/simpleproperties
The test was built on Wed Aug 05 2015 14:46:59 GMT+0100 (BST)
*/

assert = chai.assert;


describe('adr', function() {
   var htmlFragment = "<p class=\"adr\">\n    <span class=\"street-address\">665 3rd St.</span>  \n    <span class=\"extended-address\">Suite 207</span>  \n    <span class=\"locality\">San Francisco</span>,  \n    <span class=\"region\">CA</span>  \n    <span class=\"postal-code\">94107</span>  \n    <span class=\"country-name\">U.S.A.</span>  \n</p>";
   var expected = {"items":[{"type":["h-adr"],"properties":{"street-address":["665 3rd St."],"extended-address":["Suite 207"],"locality":["San Francisco"],"region":["CA"],"postal-code":["94107"],"country-name":["U.S.A."],"name":["665 3rd St.  \n    Suite 207  \n    San Francisco,  \n    CA  \n    94107  \n    U.S.A."]}}],"rels":{},"rel-urls":{}};

   it('simpleproperties', function(){
       var doc, dom, node, options, parser, found;
       dom = new DOMParser();
       doc = dom.parseFromString( htmlFragment, 'text/html' );
       options ={
       		'document': doc,
       		'node': doc,
       		'baseUrl': 'http://example.com'
       };
       found = Microformats.get( options );
       assert.deepEqual(found, expected);
   });
});
