/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-card/relativeurls
The test was built on Wed Aug 05 2015 14:24:03 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<base href=\"http://example.com\" >\n<div class=\"h-card\">\n  <a class=\"p-name u-url\" href=\"http://blog.lizardwrangler.com/\">Mitchell Baker</a> \n  (<a class=\"p-org h-card\" href=\"bios/mitchell-baker/\">Mozilla Foundation</a>)\n  <img class=\"u-photo\" src=\"bios/mitchell-baker/picture.jpeg\"/>\n</div>";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Mitchell Baker"],"url":["http://blog.lizardwrangler.com/"],"org":[{"value":"Mozilla Foundation","type":["h-card"],"properties":{"name":["Mozilla Foundation"],"url":["http://example.com/bios/mitchell-baker/"]}}],"photo":["http://example.com/bios/mitchell-baker/picture.jpeg"]}}],"rels":{},"rel-urls":{}};

   it('relativeurls', function(){
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
