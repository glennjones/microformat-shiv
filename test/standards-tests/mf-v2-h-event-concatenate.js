/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-event/concatenate
The test was built on Wed Aug 05 2015 14:24:03 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-event', function() {
   var htmlFragment = "<span class=\"h-event\">\n <span class=\"p-name\">The 4th Microformat party</span> will be on \n <span class=\"dt-start\">\n  <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n  <time class=\"value\">19:00</time></span> to \n <span class=\"dt-end\"><time class=\"value\">22:00</time></span>.\n</span>";
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["The 4th Microformat party"],"start":["2009-06-26T19:00"],"end":["2009-06-26T22:00"]}}],"rels":{},"rel-urls":{}};

   it('concatenate', function(){
       var doc, dom, node, options, parser, found;
       dom = new DOMParser();
       doc = dom.parseFromString( htmlFragment, 'text/html' );
       options ={
       		'document': doc,
       		'node': doc,
       		'baseUrl': 'http://example.com'
       };
       found = Microformats.get( options );
       assert.deepEqual(found, expected);
   });
});
