/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-adr/simpleproperties
The test was built on Sun Jun 14 2015 13:24:56 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-adr', function() {
   var htmlFragment = "<p class=\"h-adr\">\n    <span class=\"p-street-address\">665 3rd St.</span>  \n    <span class=\"p-extended-address\">Suite 207</span>  \n    <span class=\"p-locality\">San Francisco</span>,  \n    <span class=\"p-region\">CA</span>  \n    <span class=\"p-postal-code\">94107</span>  \n    <span class=\"p-country-name\">U.S.A.</span>  \n</p>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-adr"],"properties":{"street-address":["665 3rd St."],"extended-address":["Suite 207"],"locality":["San Francisco"],"region":["CA"],"postal-code":["94107"],"country-name":["U.S.A."],"name":["665 3rd St.  \n    Suite 207  \n    San Francisco,  \n    CA  \n    94107  \n    U.S.A."]}}],"rels":{},"rel-urls":{}};

   it('simpleproperties', function(){
       assert.deepEqual(found, expected);
   });
});
