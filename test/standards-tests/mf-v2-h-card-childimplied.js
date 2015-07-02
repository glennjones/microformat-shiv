/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-card/childimplied
The test was built on Thu Jul 02 2015 21:37:43 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<meta charset=\"utf-8\">\n<a class=\"h-card\" href=\"http://people.opera.com/howcome/\" title=\"Håkon Wium Lie, CTO Opera\">\n  <article>\n     <h2 class=\"p-name\">Håkon Wium Lie</h2>\n     <img src=\"http://upload.wikimedia.org/wikipedia/commons/thumb/9/96/H%C3%A5kon-Wium-Lie-2009-03.jpg/215px-H%C3%A5kon-Wium-Lie-2009-03.jpg\" />\n  </article>\n</a>";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Håkon Wium Lie"],"photo":["http://upload.wikimedia.org/wikipedia/commons/thumb/9/96/H%C3%A5kon-Wium-Lie-2009-03.jpg/215px-H%C3%A5kon-Wium-Lie-2009-03.jpg"],"url":["http://people.opera.com/howcome/"]}}],"rels":{},"rel-urls":{}};

   it('childimplied', function(){
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
