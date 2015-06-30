/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hcalendar/attendees
The test was built on Tue Jun 30 2015 19:18:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hcalendar', function() {
   var htmlFragment = "<meta charset=\"utf-8\">\n<div class=\"vevent\">\n    <span class=\"summary\">CPJ Online Press Freedom Summit</span>\n    (<time class=\"dtstart\" datetime=\"2012-10-10\">10 Nov 2012</time>) in\n    <span class=\"location\">San Francisco</span>.\n    Attendees:\n    <ul>\n        <li class=\"attendee vcard\">Brian Warner</li>\n        <li class=\"attendee vcard\">Kyle Machulis</li>\n        <li class=\"attendee vcard\">Tantek Çelik</li>\n        <li class=\"attendee vcard\">Sid Sutter</li>\n    </ul>\n</div>\n";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["CPJ Online Press Freedom Summit"],"start":["2012-10-10"],"location":["San Francisco"],"attendee":[{"value":"Brian Warner","type":["h-card"],"properties":{"name":["Brian Warner"]}},{"value":"Kyle Machulis","type":["h-card"],"properties":{"name":["Kyle Machulis"]}},{"value":"Tantek Çelik","type":["h-card"],"properties":{"name":["Tantek Çelik"]}},{"value":"Sid Sutter","type":["h-card"],"properties":{"name":["Sid Sutter"]}}]}}],"rels":{},"rel-urls":{}};

   it('attendees', function(){
       assert.deepEqual(found, expected);
   });
});
