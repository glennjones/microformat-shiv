/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hcard/name
The test was built on Wed Aug 05 2015 14:24:03 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hcard', function() {
   var htmlFragment = "<base href=\"http://example.com\">\n<div class=\"vcard\">\n    <div class=\"name\">\n        <span class=\"honorific-prefix\">Dr</span> \n        <span class=\"given-name\">John</span> \n        <abbr class=\"additional-name\" title=\"Peter\">P</abbr>  \n        <span class=\"family-name\">Doe</span> \n        <data class=\"honorific-suffix\" value=\"MSc\"></data>\n        <img class=\"honorific-suffix\" src=\"images/logo.gif\" alt=\"PHD\" />\n    </div>\n</div>";
   var expected = {"items":[{"type":["h-card"],"properties":{"honorific-prefix":["Dr"],"given-name":["John"],"additional-name":["Peter"],"family-name":["Doe"],"honorific-suffix":["MSc","PHD"],"name":["Dr \n        John \n        P  \n        Doe"],"photo":["http://example.com/images/logo.gif"]}}],"rels":{},"rel-urls":{}};

   it('name', function(){
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
