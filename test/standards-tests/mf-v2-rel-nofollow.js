/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.18 
Mocha integration test from: microformats-v2/rel/nofollow
The test was built on Tue Jun 23 2015 16:14:26 GMT+0100 (BST)
*/

assert = chai.assert;


describe('rel', function() {
   var htmlFragment = "<a rel=\"nofollow\" href=\"http://microformats.org/wiki/microformats:copyrights\">Copyrights</a>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[],"rels":{"nofollow":["http://microformats.org/wiki/microformats:copyrights"]},"rel-urls":{"http://microformats.org/wiki/microformats:copyrights":{"text":"Copyrights","rels":["nofollow"]}}};

   it('nofollow', function(){
       assert.deepEqual(found, expected);
   });
});
