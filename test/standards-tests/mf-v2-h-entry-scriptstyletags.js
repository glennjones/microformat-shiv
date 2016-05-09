/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.26 
Mocha integration test from: microformats-v2/h-entry/scriptstyletags
The test was built on Mon May 09 2016 13:03:31 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-entry', function() {
   var htmlFragment = "<section class=\"h-entry\" href=\"glenn.html\">\n     <span class=\"p-name\">A post<script>x = 1</script><style>p {color: #fff};</style></span>\n     <div class=\"e-content\">text <strong>bold</strong><script>x = 1</script><style>strong {color: #fff};</style></span></div>\n</section>\n";
   var expected = {"items":[{"type":["h-entry"],"properties":{"name":["A post"],"content":[{"value":"text bold","html":"text <strong>bold</strong><script>x = 1</script><style>strong {color: #fff};</style>"}]}}],"rels":{},"rel-urls":{}};

   it('scriptstyletags', function(){
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
