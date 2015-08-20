/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.21 
Mocha integration test from: microformats-v2/h-card/impliedphoto
The test was built on Thu Aug 20 2015 15:27:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<img class=\"h-card\" alt=\"Jane Doe\" src=\"jane.jpeg\"/>\n<object class=\"h-card\" data=\"jane.jpeg\"/>Jane Doe</object>\n\n<div class=\"h-card\"><img alt=\"Jane Doe\" src=\"jane.jpeg\"/></div> \n<div class=\"h-card\"><object data=\"jane.jpeg\"/>Jane Doe</object></div> \n\n<div class=\"h-card\"><span><img alt=\"Jane Doe\" src=\"jane.jpeg\"/></span></div> \n<div class=\"h-card\"><span><object data=\"jane.jpeg\"/>Jane Doe</object></span></div> \n\n<div class=\"h-card\"><img class=\"h-card\" alt=\"Jane Doe\" src=\"jane.jpeg\"/>Jane Doe</div> \n<div class=\"h-card\"><span class=\"h-card\"><object data=\"jane.jpeg\"/>Jane Doe</object></span></div> ";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}},{"type":["h-card"],"properties":{"name":["Jane Doe"]},"children":[{"type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}}]},{"type":["h-card"],"properties":{"name":["Jane Doe"]},"children":[{"value":"Jane Doe","type":["h-card"],"properties":{"name":["Jane Doe"],"photo":["http://example.com/jane.jpeg"]}}]}],"rels":{},"rel-urls":{}};

   it('impliedphoto', function(){
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
