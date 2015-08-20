/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.21 
Mocha integration test from: microformats-v2/h-card/childimplied
The test was built on Thu Aug 20 2015 15:27:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<meta charset=\"utf-8\">\n<a class=\"h-card\" href=\"http://people.opera.com/howcome/\" title=\"Håkon Wium Lie, CTO Opera\">\n  <article>\n     <h2 class=\"p-name\">Håkon Wium Lie</h2>\n     <img src=\"http://upload.wikimedia.org/wikipedia/commons/thumb/9/96/H%C3%A5kon-Wium-Lie-2009-03.jpg/215px-H%C3%A5kon-Wium-Lie-2009-03.jpg\" />\n  </article>\n</a>";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Håkon Wium Lie"],"photo":["http://upload.wikimedia.org/wikipedia/commons/thumb/9/96/H%C3%A5kon-Wium-Lie-2009-03.jpg/215px-H%C3%A5kon-Wium-Lie-2009-03.jpg"],"url":["http://people.opera.com/howcome/"]}}],"rels":{},"rel-urls":{}};

   it('childimplied', function(){
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
