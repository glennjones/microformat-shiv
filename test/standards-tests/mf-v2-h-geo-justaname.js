/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-geo/justaname
The test was built on Thu Jul 02 2015 21:37:44 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-geo', function() {
   var htmlFragment = "<p>On my way to The Bricklayer's Arms\n    (Geo: <span class=\"h-geo\">51.513458;-0.14812</span>)\n</p>";
   var expected = {"items":[{"type":["h-geo"],"properties":{"name":["51.513458;-0.14812"]}}],"rels":{},"rel-urls":{}};

   it('justaname', function(){
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
