/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-news/all
The test was built on Mon Jun 15 2015 12:42:51 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-news', function() {
   var htmlFragment = "<div class=\"h-news\">\n    <div class=\"p-entry h-entry\">\n        <h1><a class=\"p-name u-url\" href=\"http://microformats.org/2012/06/25/microformats-org-at-7\">microformats.org at 7</a></h1>\n        <div class=\"e-content\">\n            <p class=\"p-summary\">Last week the microformats.org community \n                celebrated its 7th birthday at a gathering hosted by Mozilla in \n                San Francisco and recognized accomplishments, challenges, and \n                opportunities.</p>\n\n            <p>The microformats tagline “humans first, machines second” \n                forms the basis of many of our \n                <a href=\"http://microformats.org/wiki/principles\">principles</a>, and \n                in that regard, we’d like to recognize a few people and \n                thank them for their years of volunteer service </p>\n        </div>  \n        <p>Updated \n            <time class=\"dt-updated\" datetime=\"2012-06-25T17:08:26\">June 25th, 2012</time> by\n            <a class=\"p-author h-card\" href=\"http://tantek.com/\">Tantek</a>\n        </p>\n    </div>\n\n    <p>\n        <span class=\"p-dateline h-adr\">\n            <span class=\"p-locality\">San Francisco</span>, \n            <span class=\"p-region\">CA</span> \n        </span>\n        (Geo: <span class=\"p-geo\">37.774921;-122.445202</span>) \n        <span class=\"p-source-org h-card\">\n            <a class=\"p-name u-url\" href=\"http://microformats.org/\">microformats.org</a>\n        </span>\n    </p>\n    <p>\n        <a class=\"u-principles\" href=\"http://microformats.org/wiki/Category:public_domain_license\">Publishing policy</a>\n    </p>\n</div>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-news"],"properties":{"entry":[{"value":"microformats.org at 7","type":["h-entry"],"properties":{"name":["microformats.org at 7"],"url":["http://microformats.org/2012/06/25/microformats-org-at-7"],"content":[{"value":"Last week the microformats.org community \n                celebrated its 7th birthday at a gathering hosted by Mozilla in \n                San Francisco and recognized accomplishments, challenges, and \n                opportunities.\n\n            The microformats tagline “humans first, machines second” \n                forms the basis of many of our \n                principles, and \n                in that regard, we’d like to recognize a few people and \n                thank them for their years of volunteer service","html":"\n            <p class=\"p-summary\">Last week the microformats.org community \n                celebrated its 7th birthday at a gathering hosted by Mozilla in \n                San Francisco and recognized accomplishments, challenges, and \n                opportunities.</p>\n\n            <p>The microformats tagline “humans first, machines second” \n                forms the basis of many of our \n                <a href=\"http://microformats.org/wiki/principles\">principles</a>, and \n                in that regard, we’d like to recognize a few people and \n                thank them for their years of volunteer service </p>\n        "}],"summary":["Last week the microformats.org community \n                celebrated its 7th birthday at a gathering hosted by Mozilla in \n                San Francisco and recognized accomplishments, challenges, and \n                opportunities."],"updated":["2012-06-25T17:08:26"],"author":[{"value":"Tantek","type":["h-card"],"properties":{"name":["Tantek"],"url":["http://tantek.com/"]}}]}}],"dateline":[{"value":"San Francisco, \n            CA","type":["h-adr"],"properties":{"locality":["San Francisco"],"region":["CA"],"name":["San Francisco, \n            CA"]}}],"geo":["37.774921;-122.445202"],"source-org":[{"value":"microformats.org","type":["h-card"],"properties":{"name":["microformats.org"],"url":["http://microformats.org/"]}}],"principles":["http://microformats.org/wiki/Category:public_domain_license"],"name":["microformats.org at 7\n        \n            Last week the microformats.org community \n                celebrated its 7th birthday at a gathering hosted by Mozilla in \n                San Francisco and recognized accomplishments, challenges, and \n                opportunities.\n\n            The microformats tagline “humans first, machines second” \n                forms the basis of many of our \n                principles, and \n                in that regard, we’d like to recognize a few people and \n                thank them for their years of volunteer service \n          \n        Updated \n            June 25th, 2012 by\n            Tantek\n        \n    \n\n    \n        \n            San Francisco, \n            CA \n        \n        (Geo: 37.774921;-122.445202) \n        \n            microformats.org\n        \n    \n    \n        Publishing policy"]}}],"rels":{},"rel-urls":{}};

   it('all', function(){
       assert.deepEqual(found, expected);
   });
});
