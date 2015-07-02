/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/rel/varying-text-duplicate-rels
The test was built on Thu Jul 02 2015 21:37:44 GMT+0100 (BST)
*/

assert = chai.assert;


describe('rel', function() {
   var htmlFragment = "This is a contrived example - not found links like this in the wild:\n<a href=\"http://ma.tt/category/asides/\" rel=\"category tag\">Asides</a>\n<a href=\"http://ma.tt/category/asides/\" rel=\"category tag\">B-sides</a>\n<a href=\"http://ma.tt/category/asides/\" rel=\"category tag\">seasides</a>";
   var expected = {"rels":{"category":["http://ma.tt/category/asides/"],"tag":["http://ma.tt/category/asides/"]},"items":[],"rel-urls":{"http://ma.tt/category/asides/":{"rels":["category","tag"],"text":"Asides"}}};

   it('varying-text-duplicate-rels', function(){
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
