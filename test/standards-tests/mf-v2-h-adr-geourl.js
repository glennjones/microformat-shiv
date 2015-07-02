/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-adr/geourl
The test was built on Thu Jul 02 2015 21:37:43 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-adr', function() {
   var htmlFragment = "<p class=\"h-adr\">\n    <a class=\"p-name u-geo\" href=\"geo:51.526421;-0.081067;crs=wgs84;u=40\">Bricklayer's Arms</a>, \n    <span class=\"p-locality\">London</span> \n</p>";
   var expected = {"items":[{"type":["h-adr"],"properties":{"name":["Bricklayer's Arms"],"geo":["geo:51.526421;-0.081067;crs=wgs84;u=40"],"locality":["London"],"url":["geo:51.526421;-0.081067;crs=wgs84;u=40"]}}],"rels":{},"rel-urls":{}};

   it('geourl', function(){
       var doc, node, options, parser, found;
       doc = document.implementation.createHTMLDocument('New Document');
       node =  document.createElement('div');
       node.innerHTML = htmlFragment;
       doc.body.appendChild(node);
       options ={
       		'document': doc,
       		'node': node,
       		'baseUrl': 'http://example.com'
       };
       parser = new Modules.Parser();
       found = parser.get( options );
       assert.deepEqual(found, expected);
   });
});
