/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.18 
Mocha integration test from: microformats-v2/rel/license
The test was built on Sun Jun 28 2015 17:06:25 GMT+0100 (BST)
*/

assert = chai.assert;


describe('rel', function() {
   var htmlFragment = "<a rel=\"license\" href=\"http://creativecommons.org/licenses/by/2.5/\">cc by 2.5</a>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[],"rels":{"license":["http://creativecommons.org/licenses/by/2.5/"]},"rel-urls":{"http://creativecommons.org/licenses/by/2.5/":{"text":"cc by 2.5","rels":["license"]}}};

   it('license', function(){
       assert.deepEqual(found, expected);
   });
});
