/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/rel/nofollow
The test was built on Wed Aug 05 2015 14:24:03 GMT+0100 (BST)
*/

assert = chai.assert;


describe('rel', function() {
   var htmlFragment = "<a rel=\"nofollow\" href=\"http://microformats.org/wiki/microformats:copyrights\">Copyrights</a>";
   var expected = {"items":[],"rels":{"nofollow":["http://microformats.org/wiki/microformats:copyrights"]},"rel-urls":{"http://microformats.org/wiki/microformats:copyrights":{"text":"Copyrights","rels":["nofollow"]}}};

   it('nofollow', function(){
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
