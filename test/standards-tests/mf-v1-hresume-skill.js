/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hresume/skill
The test was built on Tue Jul 14 2015 14:14:49 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hresume', function() {
   var htmlFragment = "<div class=\"hresume\"> \n    <p>\n        <span class=\"contact vcard\"><span class=\"fn\">Tim Berners-Lee</span></span>, \n        <span class=\"summary\">invented the World Wide Web</span>.\n    </p>\n    Skills:     \n    <ul>\n        <li><a class=\"skill\" rel=\"tag\" href=\"http://example.com/skills/informationsystems\">information systems</a></li>\n        <li><a class=\"skill\" rel=\"tag\" href=\"http://example.com/skills/advocacy\">advocacy</a></li>\n        <li><a class=\"skill\" rel=\"tag\" href=\"http://example.com/skills/leadership\">leadership</a></li>\n    </ul>\n</div>";
   var expected = {"items":[{"type":["h-resume"],"properties":{"contact":[{"value":"Tim Berners-Lee","type":["h-card"],"properties":{"name":["Tim Berners-Lee"]}}],"summary":["invented the World Wide Web"],"skill":["information systems","advocacy","leadership"],"name":["Tim Berners-Lee, \n        invented the World Wide Web.\n    \n    Skills:     \n    \n        information systems\n        advocacy\n        leadership"]}}],"rels":{"tag":["http://example.com/skills/informationsystems","http://example.com/skills/advocacy","http://example.com/skills/leadership"]},"rel-urls":{"http://example.com/skills/informationsystems":{"text":"information systems","rels":["tag"]},"http://example.com/skills/advocacy":{"text":"advocacy","rels":["tag"]},"http://example.com/skills/leadership":{"text":"leadership","rels":["tag"]}}};

   it('skill', function(){
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
