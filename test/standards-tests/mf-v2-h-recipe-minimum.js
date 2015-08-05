/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-recipe/minimum
The test was built on Wed Aug 05 2015 14:24:03 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-recipe', function() {
   var htmlFragment = "<div class=\"h-recipe\">  \n    <p class=\"p-name\">Toast</p>\n    <ul>\n        <li class=\"e-ingredient\">Slice of bread</li>\n        <li class=\"e-ingredient\">Butter</li>\n    </ul>\n</div>";
   var expected = {"items":[{"type":["h-recipe"],"properties":{"name":["Toast"],"ingredient":[{"value":"Slice of bread","html":"Slice of bread"},{"value":"Butter","html":"Butter"}]}}],"rels":{},"rel-urls":{}};

   it('minimum', function(){
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
