/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v1/hentry/summarycontent
The test was built on Mon Jun 15 2015 12:42:51 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hentry', function() {
   var htmlFragment = "<meta charset=\"utf-8\">\n<div class=\"hentry\">\n    <h1><a class=\"entry-title\" href=\"http://microformats.org/2012/06/25/microformats-org-at-7\">microformats.org at 7</a></h1>\n    <div class=\"entry-content\">\n        <p class=\"entry-summary\">Last week the microformats.org community \n            celebrated its 7th birthday at a gathering hosted by Mozilla in \n            San Francisco and recognized accomplishments, challenges, and \n            opportunities.</p>\n\n        <p>The microformats tagline “humans first, machines second” \n            forms the basis of many of our \n            <a href=\"http://microformats.org/wiki/principles\">principles</a>, and \n            in that regard, we’d like to recognize a few people and \n            thank them for their years of volunteer service </p>\n    </div>  \n    <p>Updated \n        <time class=\"updated\" datetime=\"2012-06-25T17:08:26\">June 25th, 2012</time> by\n        <a class=\"author vcard\" href=\"http://tantek.com/\">Tantek</a>\n    </p>\n</div>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-entry"],"properties":{"name":["microformats.org at 7"],"content":[{"value":"Last week the microformats.org community \n            celebrated its 7th birthday at a gathering hosted by Mozilla in \n            San Francisco and recognized accomplishments, challenges, and \n            opportunities.\n\n        The microformats tagline “humans first, machines second” \n            forms the basis of many of our \n            principles, and \n            in that regard, we’d like to recognize a few people and \n            thank them for their years of volunteer service","html":"\n        <p class=\"entry-summary\">Last week the microformats.org community \n            celebrated its 7th birthday at a gathering hosted by Mozilla in \n            San Francisco and recognized accomplishments, challenges, and \n            opportunities.</p>\n\n        <p>The microformats tagline “humans first, machines second” \n            forms the basis of many of our \n            <a href=\"http://microformats.org/wiki/principles\">principles</a>, and \n            in that regard, we’d like to recognize a few people and \n            thank them for their years of volunteer service </p>\n    "}],"summary":["Last week the microformats.org community \n            celebrated its 7th birthday at a gathering hosted by Mozilla in \n            San Francisco and recognized accomplishments, challenges, and \n            opportunities."],"updated":["2012-06-25T17:08:26"],"author":[{"value":"Tantek","type":["h-card"],"properties":{"name":["Tantek"],"url":["http://tantek.com/"]}}]}}],"rels":{},"rel-urls":{}};

   it('summarycontent', function(){
       assert.deepEqual(found, expected);
   });
});
