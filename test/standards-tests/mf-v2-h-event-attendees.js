/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-event/attendees
The test was built on Wed Aug 05 2015 14:46:59 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-event', function() {
   var htmlFragment = "<meta charset=\"utf-8\">\n<div class=\"h-event\">\n    <span class=\"p-name\">CPJ Online Press Freedom Summit</span>\n    (<time class=\"dt-start\" datetime=\"2012-10-10\">10 Nov 2012</time>) in\n    <span class=\"p-location\">San Francisco</span>.\n    Attendees:\n    <ul>\n        <li class=\"p-attendee h-card\">Brian Warner</li>\n        <li class=\"p-attendee h-card\">Kyle Machulis</li>\n        <li class=\"p-attendee h-card\">Tantek Çelik</li>\n        <li class=\"p-attendee h-card\">Sid Sutter</li>\n    </ul>\n</div>\n";
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["CPJ Online Press Freedom Summit"],"start":["2012-10-10"],"location":["San Francisco"],"attendee":[{"value":"Brian Warner","type":["h-card"],"properties":{"name":["Brian Warner"]}},{"value":"Kyle Machulis","type":["h-card"],"properties":{"name":["Kyle Machulis"]}},{"value":"Tantek Çelik","type":["h-card"],"properties":{"name":["Tantek Çelik"]}},{"value":"Sid Sutter","type":["h-card"],"properties":{"name":["Sid Sutter"]}}]}}],"rels":{},"rel-urls":{}};

   it('attendees', function(){
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
