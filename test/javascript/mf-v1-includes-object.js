/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v1/includes/object
The test was built on Mon Jun 15 2015 12:42:51 GMT+0100 (BST)
*/

assert = chai.assert;


describe('includes', function() {
   var htmlFragment = "<div class=\"vevent\">\n    <span class=\"name\">HTML5 & CSS3 latest features in action!</span> - \n    <span class=\"speaker\">David Rousset</span> -\n    <time class=\"dtstart\" datetime=\"2012-10-30T11:45:00-08:00\">Tue 11:45am</time>\n    <object data=\"#buildconf\" class=\"include\" type=\"text/html\" height=\"0\" width=\"0\"></object>\n</div>\n<div class=\"vevent\">\n    <span class=\"name\">Building High-Performing JavaScript for Modern Engines</span> -\n    <span class=\"speaker\">John-David Dalton</span> and \n    <span class=\"speaker\">Amanda Silver</span> -\n    <time class=\"dtstart\" datetime=\"2012-10-31T11:15:00-08:00\">Wed 11:15am</time>\n    <object data=\"#buildconf\" class=\"include\" type=\"text/html\" height=\"0\" width=\"0\"></object>\n</div>\n\n\n<div id=\"buildconf\">\n    <p class=\"summary\">Build Conference</p>\n    <p class=\"location adr\">\n        <span class=\"locality\">Redmond</span>, \n        <span class=\"region\">Washington</span>, \n        <span class=\"country-name\">USA</span>\n    </p>\n</div>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-event"],"properties":{"start":["2012-10-30T11:45:00-08:00"],"name":["Build Conference"],"location":[{"value":"Redmond, \n        Washington, \n        USA","type":["h-adr"],"properties":{"locality":["Redmond"],"region":["Washington"],"country-name":["USA"],"name":["Redmond, \n        Washington, \n        USA"]}}],"photo":["http://example.com/#buildconf"]}},{"type":["h-event"],"properties":{"start":["2012-10-31T11:15:00-08:00"],"name":["Build Conference"],"location":[{"value":"Redmond, \n        Washington, \n        USA","type":["h-adr"],"properties":{"locality":["Redmond"],"region":["Washington"],"country-name":["USA"],"name":["Redmond, \n        Washington, \n        USA"]}}],"photo":["http://example.com/#buildconf"]}},{"type":["h-adr"],"properties":{"locality":["Redmond"],"region":["Washington"],"country-name":["USA"],"name":["Redmond, \n        Washington, \n        USA"]}}],"rels":{},"rel-urls":{}};

   it('object', function(){
       assert.deepEqual(found, expected);
   });
});
