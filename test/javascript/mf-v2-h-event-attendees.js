/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v2/h-event/attendees
The test was built on Mon Jun 15 2015 12:42:51 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-event', function() {
   var htmlFragment = "<meta charset=\"utf-8\">\n<div class=\"h-event\">\n    <span class=\"p-name\">CPJ Online Press Freedom Summit</span>\n    (<time class=\"dt-start\" datetime=\"2012-10-10\">10 Nov 2012</time>) in\n    <span class=\"p-location\">San Francisco</span>.\n    Attendees:\n    <ul>\n        <li class=\"p-attendee h-card\">Brian Warner</li>\n        <li class=\"p-attendee h-card\">Kyle Machulis</li>\n        <li class=\"p-attendee h-card\">Tantek Çelik</li>\n        <li class=\"p-attendee h-card\">Sid Sutter</li>\n    </ul>\n</div>\n";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["CPJ Online Press Freedom Summit"],"start":["2012-10-10"],"location":["San Francisco"],"attendee":[{"value":"Brian Warner","type":["h-card"],"properties":{"name":["Brian Warner"]}},{"value":"Kyle Machulis","type":["h-card"],"properties":{"name":["Kyle Machulis"]}},{"value":"Tantek Çelik","type":["h-card"],"properties":{"name":["Tantek Çelik"]}},{"value":"Sid Sutter","type":["h-card"],"properties":{"name":["Sid Sutter"]}}]}}],"rels":{},"rel-urls":{}};

   it('attendees', function(){
       assert.deepEqual(found, expected);
   });
});
