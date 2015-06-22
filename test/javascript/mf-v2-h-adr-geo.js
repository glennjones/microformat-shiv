/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-adr/geo
The test was built on Mon Jun 22 2015 14:02:25 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-adr', function() {
   var htmlFragment = "<p class=\"h-adr\">\n    <span class=\"p-name\">Bricklayer's Arms</span>\n    <span class=\"p-label\"> \n        <span class=\"p-street-address\">3 Charlotte Road</span>,  \n        <span class=\"p-locality\">City of London</span>,  \n        <span class=\"p-postal-code\">EC2A 3PE</span>, \n        <span class=\"p-country-name\">UK</span> \n    </span> – \n    Geo:(<span class=\"p-geo\">51.526421;-0.081067</span>) \n</p>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-adr"],"properties":{"name":["Bricklayer's Arms"],"label":["3 Charlotte Road,  \n        City of London,  \n        EC2A 3PE, \n        UK"],"street-address":["3 Charlotte Road"],"locality":["City of London"],"postal-code":["EC2A 3PE"],"country-name":["UK"],"geo":["51.526421;-0.081067"]}}],"rels":{},"rel-urls":{}};

   it('geo', function(){
       assert.deepEqual(found, expected);
   });
});
