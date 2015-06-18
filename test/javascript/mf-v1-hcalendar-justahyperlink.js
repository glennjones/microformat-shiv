/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v1/hcalendar/justahyperlink
The test was built on Mon Jun 15 2015 16:52:46 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hcalendar', function() {
   var htmlFragment = "<a class=\"vevent\" href=\"http://indiewebcamp.com/2012\">IndieWebCamp 2012</a>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["IndieWebCamp 2012"],"url":["http://indiewebcamp.com/2012"]}}],"rels":{},"rel-urls":{}};

   it('justahyperlink', function(){
       assert.deepEqual(found, expected);
   });
});
