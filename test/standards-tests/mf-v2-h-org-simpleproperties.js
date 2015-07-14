/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-org/simpleproperties
The test was built on Tue Jul 14 2015 09:20:10 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-org', function() {
   var htmlFragment = "<p class=\"h-org\">\n    <span class=\"p-organization-name\">W3C</span> - \n    <span class=\"p-organization-unit\">CSS Working Group</span>\n</p>";
   var expected = {"items":[{"type":["h-org"],"properties":{"organization-name":["W3C"],"organization-unit":["CSS Working Group"],"name":["W3C - \n    CSS Working Group"]}}],"rels":{},"rel-urls":{}};

   it('simpleproperties', function(){
       var doc, dom, node, options, parser, found;
       dom = new DOMParser();
       doc = dom.parseFromString( htmlFragment, 'text/html' )       options ={
       		'document': doc,
       		'node': doc,
       		'baseUrl': 'http://example.com'
       };
       parser = new Modules.Parser();
       found = parser.get( options );
       assert.deepEqual(found, expected);
   });
});
