/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-entry/urlincontent
The test was built on Wed Jul 01 2015 12:00:56 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-entry', function() {
   var htmlFragment = "<div class=\"h-entry\">\n    <h1><a class=\"p-name\">Expanding URLs within HTML content</a></h1>\n    <div class=\"e-content\">\n        <ul>\n            <li><a href=\"http://www.w3.org/\">Should not change: http://www.w3.org/</a></li>\n            <li><a href=\"http://example.com/\">Should not change: http://example.com/</a></li>\n            <li><a href=\"test.html\">File relative: test.html = http://example.com/test.html</a></li>\n            <li><a href=\"/test/test.html\">Directory relative: /test/test.html = http://example.com/test/test.html</a></li>\n            <li><a href=\"/test.html\">Relative to root: /test.html = http://example.com/test.html</a></li>\n        </ul>\n        <img src=\"images/photo.gif\" />\n    </div>  \n</div>";
   var expected = {"items":[{"type":["h-entry"],"properties":{"name":["Expanding URLs within HTML content"],"content":[{"value":"Should not change: http://www.w3.org/\n            Should not change: http://example.com/\n            File relative: test.html = http://example.com/test.html\n            Directory relative: /test/test.html = http://example.com/test/test.html\n            Relative to root: /test.html = http://example.com/test.html","html":"\n        <ul>\n            <li><a href=\"http://www.w3.org/\">Should not change: http://www.w3.org/</a></li>\n            <li><a href=\"http://example.com/\">Should not change: http://example.com/</a></li>\n            <li><a href=\"http://example.com/test.html\">File relative: test.html = http://example.com/test.html</a></li>\n            <li><a href=\"http://example.com/test/test.html\">Directory relative: /test/test.html = http://example.com/test/test.html</a></li>\n            <li><a href=\"http://example.com/test.html\">Relative to root: /test.html = http://example.com/test.html</a></li>\n        </ul>\n        <img src=\"http://example.com/images/photo.gif\" />\n    "}]}}],"rels":{},"rel-urls":{}};

   it('urlincontent', function(){
       var doc, node, options, parser, found;
       doc = document.implementation.createHTMLDocument('New Document');
       node =  document.createElement('div');
       node.innerHTML = htmlFragment;
       doc.body.appendChild(node);
       options ={
       		'document': doc,
       		'node': node,
       		'baseUrl': 'http://example.com'
       };
       parser = new Modules.Parser();
       found = parser.get( options );
       assert.deepEqual(found, expected);
   });
});
