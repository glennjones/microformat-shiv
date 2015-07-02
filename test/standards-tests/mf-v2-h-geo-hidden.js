/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-geo/hidden
The test was built on Thu Jul 02 2015 21:37:44 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-geo', function() {
   var htmlFragment = "<p>\n    <span class=\"h-geo\">The Bricklayer's Arms\n        <span class=\"p-latitude\">\n            <span class=\"value-title\" title=\"51.513458\"> </span> \n        </span>\n        <span class=\"p-longitude\">\n            <span class=\"value-title\" title=\"-0.14812\"> </span>\n        </span>\n    </span>\n</p>";
   var expected = {"items":[{"type":["h-geo"],"properties":{"latitude":["51.513458"],"longitude":["-0.14812"],"name":["The Bricklayer's Arms"]}}],"rels":{},"rel-urls":{}};

   it('hidden', function(){
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
