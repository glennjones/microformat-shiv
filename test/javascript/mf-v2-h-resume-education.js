/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-resume/education
The test was built on Mon Jun 15 2015 16:52:46 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-resume', function() {
   var htmlFragment = "<div class=\"h-resume\">\n    <p class=\"p-name\">Tim Berners-Lee</p>\n    <div class=\"p-contact h-card\">\n        <p class=\"p-title\">Director of the World Wide Web Foundation</p>\n    </div>\n    <p class=\"p-summary\">Invented the World Wide Web.</p><hr />\n    <p class=\"p-education h-event h-card\">\n        <span class=\"p-name p-org\">The Queen's College, Oxford University</span>, \n        <span class=\"p-description\">BA Hons (I) Physics</span> \n        <time class=\"dt-start\" datetime=\"1973-09\">1973</time> –\n        <time class=\"dt-end\" datetime=\"1976-06\">1976</time>\n    </p>\n</div>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-resume"],"properties":{"name":["Tim Berners-Lee"],"contact":[{"value":"Director of the World Wide Web Foundation","type":["h-card"],"properties":{"title":["Director of the World Wide Web Foundation"],"name":["Director of the World Wide Web Foundation"]}}],"summary":["Invented the World Wide Web."],"education":[{"value":"The Queen's College, Oxford University","type":["h-event","h-card"],"properties":{"name":["The Queen's College, Oxford University"],"org":["The Queen's College, Oxford University"],"description":["BA Hons (I) Physics"],"start":["1973-09"],"end":["1976-06"]}}]}}],"rels":{},"rel-urls":{}};

   it('education', function(){
       assert.deepEqual(found, expected);
   });
});
