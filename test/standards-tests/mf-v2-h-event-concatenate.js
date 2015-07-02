/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-event/concatenate
The test was built on Thu Jul 02 2015 21:37:44 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-event', function() {
   var htmlFragment = "<span class=\"h-event\">\n <span class=\"p-name\">The 4th Microformat party</span> will be on \n <span class=\"dt-start\">\n  <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n  <time class=\"value\">19:00</time></span> to \n <span class=\"dt-end\"><time class=\"value\">22:00</time></span>.\n</span>";
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["The 4th Microformat party"],"start":["2009-06-26T19:00"],"end":["2009-06-26T22:00"]}}],"rels":{},"rel-urls":{}};

   it('concatenate', function(){
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
