/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hcard/email
The test was built on Tue Jun 30 2015 19:18:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hcard', function() {
   var htmlFragment = "<div class=\"vcard\">\n    <span class=\"fn\">John Doe</span> \n    <ul>\n        <li><a class=\"email\" href=\"mailto:john@example.com\">notthis@example.com</a></li>\n        <li>\n            <span class=\"email\">\n                <span class=\"type\">internet</span> \n                <a class=\"value\" href=\"mailto:john@example.com\">notthis@example.com</a>\n            </span>\n        </li> \n        <li><a class=\"email\" href=\"mailto:john@example.com?subject=parser-test\">notthis@example.com</a></li>\n        <li class=\"email\">john@example.com</li>\n    </ul>\n</div>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["John Doe"],"email":["mailto:john@example.com","mailto:john@example.com","mailto:john@example.com?subject=parser-test","john@example.com"]}}],"rels":{},"rel-urls":{}};

   it('email', function(){
       assert.deepEqual(found, expected);
   });
});
