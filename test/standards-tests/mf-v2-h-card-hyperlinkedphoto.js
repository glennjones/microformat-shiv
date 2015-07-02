/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-card/hyperlinkedphoto
The test was built on Thu Jul 02 2015 21:37:43 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<a class=\"h-card\" href=\"http://rohit.khare.org/\">\n        <img alt=\"Rohit Khare\" src=\"images/photo.gif\" />\n    </a>";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Rohit Khare"],"photo":["http://example.com/images/photo.gif"],"url":["http://rohit.khare.org/"]}}],"rels":{},"rel-urls":{}};

   it('hyperlinkedphoto', function(){
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
