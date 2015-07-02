/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-card/impliedphoto
The test was built on Thu Jul 02 2015 21:37:44 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<img class=\"h-card\" alt=\"Jane Doe\" src=\"jane.jpeg\"/>\n<object class=\"h-card\" data=\"jane.jpeg\"/>Jane Doe</object>\n\n<div class=\"h-card\"><img alt=\"Jane Doe\" src=\"jane.jpeg\"/></div> \n<div class=\"h-card\"><object data=\"jane.jpeg\"/>Jane Doe</object></div> \n\n<div class=\"h-card\"><span><img alt=\"Jane Doe\" src=\"jane.jpeg\"/></span></div> \n<div class=\"h-card\"><span><object data=\"jane.jpeg\"/>Jane Doe</object></span></div> \n\n<div class=\"h-card\"><img class=\"h-card\" alt=\"Jane Doe\" src=\"jane.jpeg\"/>Jane Doe</div> \n<div class=\"h-card\"><span class=\"h-card\"><object data=\"jane.jpeg\"/>Jane Doe</object></span></div> ";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"]},"children":[{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}}]},{"type":["h-card"],"properties":{"name":["Jane Doe"]},"children":[{"value":"Jane Doe","type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}}]}],"rels":{},"rel-urls":{}};

   it('impliedphoto', function(){
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
