/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-recipe/minimum
The test was built on Mon Jun 15 2015 12:42:51 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-recipe', function() {
   var htmlFragment = "<div class=\"h-recipe\">  \n    <p class=\"p-name\">Toast</p>\n    <ul>\n        <li class=\"e-ingredient\">Slice of bread</li>\n        <li class=\"e-ingredient\">Butter</li>\n    </ul>\n</div>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-recipe"],"properties":{"name":["Toast"],"ingredient":[{"value":"Slice of bread","html":"Slice of bread"},{"value":"Butter","html":"Butter"}]}}],"rels":{},"rel-urls":{}};

   it('minimum', function(){
       assert.deepEqual(found, expected);
   });
});
