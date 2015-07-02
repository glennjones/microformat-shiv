/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hproduct/justahyperlink
The test was built on Thu Jul 02 2015 21:37:43 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hproduct', function() {
   var htmlFragment = "<a class=\"hproduct\" href=\"http://www.raspberrypi.org/\">Raspberry Pi</a>";
   var expected = {"items":[{"type":["h-product"],"properties":{"name":["Raspberry Pi"],"url":["http://www.raspberrypi.org/"]}}],"rels":{},"rel-urls":{}};

   it('justahyperlink', function(){
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
