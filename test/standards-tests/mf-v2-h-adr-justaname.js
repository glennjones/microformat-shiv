/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-adr/justaname
The test was built on Thu Jul 02 2015 21:37:43 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-adr', function() {
   var htmlFragment = "<p class=\"h-adr\">665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A.</p>";
   var expected = {"items":[{"type":["h-adr"],"properties":{"name":["665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A."]}}],"rels":{},"rel-urls":{}};

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
