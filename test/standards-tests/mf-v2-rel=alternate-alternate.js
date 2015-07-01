/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/rel=alternate/alternate
The test was built on Wed Jul 01 2015 12:00:56 GMT+0100 (BST)
*/

assert = chai.assert;


describe('rel=alternate', function() {
   var htmlFragment = "<base href=\"http://example.com\">\n<link rel=\"updates alternate\" type=\"application/atom+xml\" href=\"updates.atom\" />";
   var expected = {"items":[],"rels":{"alternate":["http://example.com/updates.atom"],"updates":["http://example.com/updates.atom"]},"rel-urls":{"http://example.com/updates.atom":{"type":"application/atom+xml","rels":["updates","alternate"]}},"alternates":[{"type":"application/atom+xml","url":"http://example.com/updates.atom","rel":"updates"}]};

   it('alternate', function(){
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
