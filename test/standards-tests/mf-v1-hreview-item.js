/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hreview/item
The test was built on Thu Jul 02 2015 21:37:43 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hreview', function() {
   var htmlFragment = "<base href=\"http://example.com\">\n<div class=\"hreview\">\n    <p class=\"item\">\n        <img class=\"photo\" src=\"images/photo.gif\" />\n        <a class=\"fn url\" href=\"http://example.com/crepeoncole\">Crepes on Cole</a>\n    </p>\n    <p><span class=\"rating\">5</span> out of 5 stars</p>\n</div>";
   var expected = {"items":[{"type":["h-review"],"properties":{"item":[{"value":"Crepes on Cole","type":["h-item"],"properties":{"photo":["http://example.com/images/photo.gif"],"name":["Crepes on Cole"],"url":["http://example.com/crepeoncole"]}}],"rating":["5"],"name":["Crepes on Cole\n    \n    5 out of 5 stars"]}}],"rels":{},"rel-urls":{}};

   it('item', function(){
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
