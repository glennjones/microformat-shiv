/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-card/impliedurl
The test was built on Thu Jul 02 2015 21:37:44 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<a class=\"h-card\" href=\"jane.html\">Jane Doe</a>\n<area class=\"h-card\" href=\"jane.html\">Jane Doe</area>\n<div class=\"h-card\" ><a href=\"jane.html\">Jane Doe</a><p></p></div> \n<div class=\"h-card\" ><area href=\"jane.html\">Jane Doe</area><p></p></div>\n\n<div class=\"h-card\" ><a class=\"h-card\" href=\"jane.html\">Jane Doe</a><p></p></div> ";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Jane Doe"],"url":["http://example.com/jane.html"]}},{"type":["h-card"],"properties":{"name":[""],"url":["http://example.com/jane.html"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"],"url":["http://example.com/jane.html"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"],"url":["http://example.com/jane.html"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"]},"children":[{"value":"Jane Doe","type":["h-card"],"properties":{"name":["Jane Doe"],"url":["http://example.com/jane.html"]}}]}],"rels":{},"rel-urls":{}};

   it('impliedurl', function(){
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
