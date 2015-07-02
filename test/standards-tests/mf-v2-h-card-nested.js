/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-card/nested
The test was built on Thu Jul 02 2015 21:37:44 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<div class=\"h-card\">\n  <a class=\"p-name u-url\" href=\"http://blog.lizardwrangler.com/\">Mitchell Baker</a> \n  (<a class=\"h-org h-card\" href=\"http://mozilla.org/\">Mozilla Foundation</a>)\n</div>";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Mitchell Baker"],"url":["http://blog.lizardwrangler.com/"]},"children":[{"value":"Mozilla Foundation","type":["h-org","h-card"],"properties":{"name":["Mozilla Foundation"],"url":["http://mozilla.org/"]}}]}],"rels":{},"rel-urls":{}};

   it('nested', function(){
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
