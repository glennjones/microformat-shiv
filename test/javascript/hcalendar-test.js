/*
Mocha integration test from: hcalendar.html
The test was built on Wed Feb 20 2013 12:57:15 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Just a name (hcalendar parsing test)', function() {
   var htmlFragment = "\n<a class=\"vevent\" href=\"http://indiewebcamp.com/2012\">IndieWebCamp 2012</a>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["IndieWebCamp 2012"],"url":["http://indiewebcamp.com/2012"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "IndieWebCamp 2012");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://indiewebcamp.com/2012");
   })

})




describe('Just a hyperlink (hcalendar parsing test)', function() {
   var htmlFragment = "\n<a class=\"vevent\" href=\"http://indiewebcamp.com/2012\">IndieWebCamp 2012</a>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["IndieWebCamp 2012"],"url":["http://indiewebcamp.com/2012"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "IndieWebCamp 2012");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://indiewebcamp.com/2012");
   })

})




describe('hcalendar with attendees (hcalendar parsing test)', function() {
   var htmlFragment = "\n<div class=\"vevent\">       \n    <span class=\"summary\">CPJ Online Press Freedom Summit</span> \n    (<time class=\"dtstart\" datetime=\"2012-10-10\">10 Nov 2012</time>) in \n    <span class=\"location\">San Francisco</span>. \n    Attendees:\n    <ul>\n        <li class=\"attendee vcard\">Brian Warner</li>\n        <li class=\"attendee vcard\">Kyle Machulis</li>\n        <li class=\"attendee vcard\">Tantek Çelik</li>\n        <li class=\"attendee vcard\">Sid Sutter</li>\n    </ul>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["CPJ Online Press Freedom Summit"],"start":["2012-10-10"],"location":["San Francisco"],"attendee":[{"value":"Brian Warner","type":["h-card"],"properties":{"name":["Brian Warner"]}},{"value":"Kyle Machulis","type":["h-card"],"properties":{"name":["Kyle Machulis"]}},{"value":"Tantek Çelik","type":["h-card"],"properties":{"name":["Tantek Çelik"]}},{"value":"Sid Sutter","type":["h-card"],"properties":{"name":["Sid Sutter"]}}]}},{"type":["h-card"],"properties":{"name":["Brian Warner"]}},{"type":["h-card"],"properties":{"name":["Kyle Machulis"]}},{"type":["h-card"],"properties":{"name":["Tantek Çelik"]}},{"type":["h-card"],"properties":{"name":["Sid Sutter"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "CPJ Online Press Freedom Summit");
   })

   it("found.items[0].properties['start'][0]", function(){
      assert.equal(found.items[0].properties["start"][0].toString(), "2012-10-10");
   })

   it("found.items[0].properties['location'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].toString(), "San Francisco");
   })

   it("found.items[0].properties['attendee'][0].value", function(){
      assert.equal(found.items[0].properties["attendee"][0].value, "Brian Warner");
   })

   it("found.items[0].properties['attendee'][0].type[0]", function(){
      assert.equal(found.items[0].properties["attendee"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['attendee'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["attendee"][0].properties["name"][0].toString(), "Brian Warner");
   })

})




describe('Event with location (hcalendar parsing test)', function() {
   var htmlFragment = "\n<div class=\"vevent\">\n  <a class=\"summary url\" href=\"http://indiewebcamp.com/2012\">\n    IndieWebCamp 2012\n  </a>\n  from <time class=\"dtstart\">2012-06-30</time> \n  to <time class=\"dtend\">2012-07-01</time> at \n  <span class=\"location vcard\">\n    <a class=\"fn org url\" href=\"http://geoloqi.com/\">Geoloqi</a>, \n    <span class=\"adr\">\n        <span class=\"street-address\">920 SW 3rd Ave. Suite 400</span>, \n        <span class=\"locality\">Portland</span>, \n        <abbr class=\"region\" title=\"Oregon\">OR</abbr>\n    </span>\n  </span>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["IndieWebCamp 2012"],"url":["http://indiewebcamp.com/2012"],"start":["2012-06-30"],"end":["2012-07-01"],"location":[{"value":"Geoloqi, 920 SW 3rd Ave. Suite 400, Portland, OR","type":["h-card"],"properties":{"name":["Geoloqi"],"org":["Geoloqi"],"url":["http://geoloqi.com/"],"adr":[{"value":"920 SW 3rd Ave. Suite 400, Portland, OR","type":["h-adr"],"properties":{"street-address":["920 SW 3rd Ave. Suite 400"],"locality":["Portland"],"region":["Oregon"],"name":["920 SW 3rd Ave. Suite 400, Portland, OR"]}}]}}]}},{"type":["h-card"],"properties":{"name":["Geoloqi"],"org":["Geoloqi"],"url":["http://geoloqi.com/"],"street-address":["920 SW 3rd Ave. Suite 400"],"locality":["Portland"],"region":["Oregon"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "IndieWebCamp 2012");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://indiewebcamp.com/2012");
   })

   it("found.items[0].properties['start'][0]", function(){
      assert.equal(found.items[0].properties["start"][0].toString(), "2012-06-30");
   })

   it("found.items[0].properties['end'][0]", function(){
      assert.equal(found.items[0].properties["end"][0].toString(), "2012-07-01");
   })

   it("found.items[0].properties['location'][0].value", function(){
      assert.equal(found.items[0].properties["location"][0].value, "Geoloqi, 920 SW 3rd Ave. Suite 400, Portland, OR");
   })

   it("found.items[0].properties['location'][0].type[0]", function(){
      assert.equal(found.items[0].properties["location"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['location'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["name"][0].toString(), "Geoloqi");
   })

   it("found.items[0].properties['location'][0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["org"][0].toString(), "Geoloqi");
   })

   it("found.items[0].properties['location'][0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["url"][0].toString(), "http://geoloqi.com/");
   })

   it("found.items[0].properties['location'][0].properties['adr'][0].value", function(){
      assert.equal(found.items[0].properties["location"][0].properties["adr"][0].value, "920 SW 3rd Ave. Suite 400, Portland, OR");
   })

   it("found.items[0].properties['location'][0].properties['adr'][0].type[0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["adr"][0].type[0].toString(), "h-adr");
   })

   it("found.items[0].properties['location'][0].properties['adr'][0].properties['street-address'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["adr"][0].properties["street-address"][0].toString(), "920 SW 3rd Ave. Suite 400");
   })

   it("found.items[0].properties['location'][0].properties['adr'][0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["adr"][0].properties["locality"][0].toString(), "Portland");
   })

   it("found.items[0].properties['location'][0].properties['adr'][0].properties['region'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["adr"][0].properties["region"][0].toString(), "Oregon");
   })

   it("found.items[0].properties['location'][0].properties['adr'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["adr"][0].properties["name"][0].toString(), "920 SW 3rd Ave. Suite 400, Portland, OR");
   })

})




describe('Concatenate multiple datetime elements (hcalendar parsing test)', function() {
   var htmlFragment = "\n<div class=\"vevent\">\n <span class=\"summary\">The 4th Microformat party</span> will be on \n <span class=\"dtstart\">\n  <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n  <time class=\"value\">19:00</time></span> to \n <span class=\"dtend\"><time class=\"value\">22:00</time></span>.\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["The 4th Microformat party"],"start":["2009-06-26T19:00:00"],"end":["2009-06-26T22:00:00"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "The 4th Microformat party");
   })

   it("found.items[0].properties['start'][0]", function(){
      assert.equal(found.items[0].properties["start"][0].toString(), "2009-06-26T19:00:00");
   })

   it("found.items[0].properties['end'][0]", function(){
      assert.equal(found.items[0].properties["end"][0].toString(), "2009-06-26T22:00:00");
   })

})




describe('Time formats (hcalendar parsing test)', function() {
   var htmlFragment = "\n<div class=\"vevent\">\n    <span class=\"summary\">The 4th Microformat party</span> will be on \n    <ul>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00-08:00</time> \n        </li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00-0800</time> \n        </li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00+0800</time> \n        </li> \n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00Z</time> \n        </li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00</time> \n        </li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00-08:00</time> \n        </li> \n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00+08:00</time> \n        </li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00Z</time> \n        </li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00</time> \n        </li>  \n        <li>\n            <time class=\"dtend\" datetime=\"2013-034\">3 February 2013</time>\n        </li>              \n    </ul>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["The 4th Microformat party"],"start":["2009-06-26T19:00:00-0800","2009-06-26T19:00:00-0800","2009-06-26T19:00:00+0800","2009-06-26T19:00:00Z","2009-06-26T19:00:00","2009-06-26T19:00:00-0800","2009-06-26T19:00:00+0800","2009-06-26T19:00:00Z","2009-06-26T19:00:00"],"end":["2013-034"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "The 4th Microformat party");
   })

   it("found.items[0].properties['start'][0]", function(){
      assert.equal(found.items[0].properties["start"][0].toString(), "2009-06-26T19:00:00-0800");
   })

   it("found.items[0].properties['start'][1]", function(){
      assert.equal(found.items[0].properties["start"][1].toString(), "2009-06-26T19:00:00-0800");
   })

   it("found.items[0].properties['start'][2]", function(){
      assert.equal(found.items[0].properties["start"][2].toString(), "2009-06-26T19:00:00+0800");
   })

   it("found.items[0].properties['start'][3]", function(){
      assert.equal(found.items[0].properties["start"][3].toString(), "2009-06-26T19:00:00Z");
   })

   it("found.items[0].properties['start'][4]", function(){
      assert.equal(found.items[0].properties["start"][4].toString(), "2009-06-26T19:00:00");
   })

   it("found.items[0].properties['start'][5]", function(){
      assert.equal(found.items[0].properties["start"][5].toString(), "2009-06-26T19:00:00-0800");
   })

   it("found.items[0].properties['start'][6]", function(){
      assert.equal(found.items[0].properties["start"][6].toString(), "2009-06-26T19:00:00+0800");
   })

   it("found.items[0].properties['start'][7]", function(){
      assert.equal(found.items[0].properties["start"][7].toString(), "2009-06-26T19:00:00Z");
   })

   it("found.items[0].properties['start'][8]", function(){
      assert.equal(found.items[0].properties["start"][8].toString(), "2009-06-26T19:00:00");
   })

   it("found.items[0].properties['end'][0]", function(){
      assert.equal(found.items[0].properties["end"][0].toString(), "2013-034");
   })

})




describe('Meridiem time formats (am pm) (hcalendar parsing test)', function() {
   var htmlFragment = "\n<div class=\"vevent\">\n    <span class=\"summary\">The 4th Microformat party</span> will be on \n    <ul>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">07:00:00pm \n        </span></li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">07:00:00am \n        </span></li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">07:00pm \n        </span></li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">07pm \n        </span></li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">7pm \n        </span></li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">7:00pm \n        </span></li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">07:00p.m. \n        </span></li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">07:00PM \n        </span></li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">7:00am \n        </span></li>\n    </ul>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["The 4th Microformat party"],"start":["2009-06-26T19:00:00","2009-06-26T07:00:00","2009-06-26T19:00:00","2009-06-26T19:00:00","2009-06-26T19:00:00","2009-06-26T19:00:00","2009-06-26T19:00:00","2009-06-26T19:00:00","2009-06-26T07:00:00"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "The 4th Microformat party");
   })

   it("found.items[0].properties['start'][0]", function(){
      assert.equal(found.items[0].properties["start"][0].toString(), "2009-06-26T19:00:00");
   })

   it("found.items[0].properties['start'][1]", function(){
      assert.equal(found.items[0].properties["start"][1].toString(), "2009-06-26T07:00:00");
   })

   it("found.items[0].properties['start'][2]", function(){
      assert.equal(found.items[0].properties["start"][2].toString(), "2009-06-26T19:00:00");
   })

   it("found.items[0].properties['start'][3]", function(){
      assert.equal(found.items[0].properties["start"][3].toString(), "2009-06-26T19:00:00");
   })

   it("found.items[0].properties['start'][4]", function(){
      assert.equal(found.items[0].properties["start"][4].toString(), "2009-06-26T19:00:00");
   })

   it("found.items[0].properties['start'][5]", function(){
      assert.equal(found.items[0].properties["start"][5].toString(), "2009-06-26T19:00:00");
   })

   it("found.items[0].properties['start'][6]", function(){
      assert.equal(found.items[0].properties["start"][6].toString(), "2009-06-26T19:00:00");
   })

   it("found.items[0].properties['start'][7]", function(){
      assert.equal(found.items[0].properties["start"][7].toString(), "2009-06-26T19:00:00");
   })

   it("found.items[0].properties['start'][8]", function(){
      assert.equal(found.items[0].properties["start"][8].toString(), "2009-06-26T07:00:00");
   })

})




