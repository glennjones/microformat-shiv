/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.18 
Mocha integration test from: microformats-v1/hcalendar/combining
The test was built on Tue Jun 23 2015 16:14:26 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hcalendar', function() {
   var htmlFragment = "<div class=\"vevent\">\n  <a class=\"summary url\" href=\"http://indiewebcamp.com/2012\">\n    IndieWebCamp 2012\n  </a>\n  from <time class=\"dtstart\">2012-06-30</time> \n  to <time class=\"dtend\">2012-07-01</time> at \n  <span class=\"location vcard\">\n    <a class=\"fn org url\" href=\"http://geoloqi.com/\">Geoloqi</a>, \n    <span class=\"adr\">\n        <span class=\"street-address\">920 SW 3rd Ave. Suite 400</span>, \n        <span class=\"locality\">Portland</span>, \n        <abbr class=\"region\" title=\"Oregon\">OR</abbr>\n    </span>\n  </span>\n</div>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["IndieWebCamp 2012"],"url":["http://indiewebcamp.com/2012"],"start":["2012-06-30"],"end":["2012-07-01"],"location":[{"value":"Geoloqi","type":["h-card"],"properties":{"name":["Geoloqi"],"org":["Geoloqi"],"url":["http://geoloqi.com/"],"adr":[{"value":"920 SW 3rd Ave. Suite 400, \n        Portland, \n        OR","type":["h-adr"],"properties":{"street-address":["920 SW 3rd Ave. Suite 400"],"locality":["Portland"],"region":["Oregon"],"name":["920 SW 3rd Ave. Suite 400, \n        Portland, \n        OR"]}}]}}]}}],"rels":{},"rel-urls":{}};

   it('combining', function(){
       assert.deepEqual(found, expected);
   });
});
