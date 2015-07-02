/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-card/relativeurls
The test was built on Thu Jul 02 2015 21:37:44 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<base href=\"http://example.com\" >\n<div class=\"h-card\">\n  <a class=\"p-name u-url\" href=\"http://blog.lizardwrangler.com/\">Mitchell Baker</a> \n  (<a class=\"p-org h-card\" href=\"bios/mitchell-baker/\">Mozilla Foundation</a>)\n  <img class=\"u-photo\" src=\"bios/mitchell-baker/picture.jpeg\"/>\n</div>";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Mitchell Baker"],"url":["http://blog.lizardwrangler.com/"],"org":[{"value":"Mozilla Foundation","type":["h-card"],"properties":{"name":["Mozilla Foundation"],"url":["http://example.com/bios/mitchell-baker/"]}}],"photo":["http://example.com/bios/mitchell-baker/picture.jpeg"]}}],"rels":{},"rel-urls":{}};

   it('relativeurls', function(){
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
