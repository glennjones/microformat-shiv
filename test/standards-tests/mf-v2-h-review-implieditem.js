/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-review/implieditem
The test was built on Tue Jun 23 2015 16:14:26 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-review', function() {
   var htmlFragment = "<div class=\"h-review\">\n    <a class=\"p-item h-item\" href=\"http://example.com/crepeoncole\">Crepes on Cole</a>\n    <p><span class=\"p-rating\">4.7</span> out of 5 stars</p>\n</div>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-review"],"properties":{"item":[{"value":"Crepes on Cole","type":["h-item"],"properties":{"name":["Crepes on Cole"],"url":["http://example.com/crepeoncole"]}}],"rating":["4.7"],"name":["Crepes on Cole\n    4.7 out of 5 stars"]}}],"rels":{},"rel-urls":{}};

   it('implieditem', function(){
       assert.deepEqual(found, expected);
   });
});
