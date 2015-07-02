/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/geo/valuetitleclass
The test was built on Thu Jul 02 2015 21:37:43 GMT+0100 (BST)
*/

assert = chai.assert;


describe('geo', function() {
   var htmlFragment = "<meta charset=\"utf-8\">\n<p>\n    <span class=\"geo\">\n        <span class=\"latitude\">\n            <span class=\"value-title\" title=\"51.513458\">N 51° 51.345</span>, \n        </span>\n        <span class=\"longitude\">\n            <span class=\"value-title\" title=\"-0.14812\">W -0° 14.812</span>\n        </span>\n    </span>\n</p>";
   var expected = {"items":[{"type":["h-geo"],"properties":{"latitude":["51.513458"],"longitude":["-0.14812"],"name":["N 51° 51.345, \n        \n        \n            W -0° 14.812"]}}],"rels":{},"rel-urls":{}};

   it('valuetitleclass', function(){
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
