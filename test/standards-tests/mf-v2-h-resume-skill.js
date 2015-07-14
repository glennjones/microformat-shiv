/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-resume/skill
The test was built on Tue Jul 14 2015 14:41:35 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-resume', function() {
   var htmlFragment = "<div class=\"h-resume\">\n    <p>\n        <span class=\"p-name\">Tim Berners-Lee</span>, \n        <span class=\"p-summary\">invented the World Wide Web</span>.\n    </p>\n    Skills:     \n    <ul>\n        <li class=\"p-skill\">information systems</li>\n        <li class=\"p-skill\">advocacy</li>\n        <li class=\"p-skill\">leadership</li>\n    <ul>   \n</ul></ul></div>";
   var expected = {"items":[{"type":["h-resume"],"properties":{"name":["Tim Berners-Lee"],"summary":["invented the World Wide Web"],"skill":["information systems","advocacy","leadership"]}}],"rels":{},"rel-urls":{}};

   it('skill', function(){
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
