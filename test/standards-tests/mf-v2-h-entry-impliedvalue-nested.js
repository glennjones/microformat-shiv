/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-entry/impliedvalue-nested
The test was built on Tue Jul 14 2015 14:14:50 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-entry', function() {
   var htmlFragment = "<div class=\"h-entry\">\n      <div class=\"u-in-reply-to h-cite\">\n            <span class=\"p-author h-card\">\n                  <span class=\"p-name\">Example Author</span>\n                  <a class=\"u-url\" href=\"http://example.com\">Home</a>\n            </span>\n            <a class=\"p-name u-url\" href=\"http://example.com/post\">Example Post</a>\n      </div>\n</div>";
   var expected = {"items":[{"type":["h-entry"],"properties":{"in-reply-to":[{"type":["h-cite"],"properties":{"name":["Example Post"],"url":["http://example.com/post"],"author":[{"type":["h-card"],"properties":{"url":["http://example.com"],"name":["Example Author"]},"value":"Example Author"}]},"value":"http://example.com/post"}],"name":["Example Author\n                  Home\n            \n            Example Post"]}}],"rels":{},"rel-urls":{}};

   it('impliedvalue-nested', function(){
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
