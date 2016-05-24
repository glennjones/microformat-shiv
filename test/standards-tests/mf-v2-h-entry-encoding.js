/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.26 
Mocha integration test from: microformats-v2/h-entry/encoding
The test was built on Tue May 24 2016 16:01:17 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-entry', function() {
   var htmlFragment = "<div class=\"h-entry\">\n    <div class=\"p-name e-content\">x&lt;y AT&amp;T &lt;b&gt;NotBold&lt;/b&gt; <b>Bold</b></div>\n</div>";
   var expected = {"items":[{"type":["h-entry"],"properties":{"name":["x<y AT&T <b>NotBold</b> Bold"],"content":[{"value":"x<y AT&T <b>NotBold</b> Bold","html":"x&lt;y AT&amp;T &lt;b&gt;NotBold&lt;/b&gt; <b>Bold</b>"}]}}],"rels":{},"rel-urls":{}};

   it('encoding', function(){
       var doc, dom, node, options, parser, found;
       dom = new DOMParser();
       doc = dom.parseFromString( htmlFragment, 'text/html' );
       options ={
       		'document': doc,
       		'node': doc,
       		'baseUrl': 'http://example.com',
       		'dateFormat': 'html5'
       };
       found = Microformats.get( options );
       assert.deepEqual(found, expected);
   });
});
