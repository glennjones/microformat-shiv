/*
Mocha integration test from: h-event.html
The test was built on Wed Feb 20 2013 12:57:14 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Just a name (h-event parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-event\">IndieWebCamp 2012</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["IndieWebCamp 2012"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "IndieWebCamp 2012");
   })

})




describe('Just a hyperlink (h-event parsing test)', function() {
   var htmlFragment = "\n<a class=\"h-event\" href=\"http://indiewebcamp.com/2012\">IndieWebCamp 2012</a>\n"
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




describe('h-event with attendees (h-event parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-event\">       \n    <span class=\"p-name\">CPJ Online Press Freedom Summit</span> \n    (<time class=\"dt-start\" datetime=\"2012-10-10\">10 Nov 2012</time>) in \n    <span class=\"p-location\">San Francisco</span>. \n    Attendees:\n    <ul>\n        <li class=\"p-attendee h-card\">Brian Warner</li>\n        <li class=\"p-attendee h-card\">Kyle Machulis</li>\n        <li class=\"p-attendee h-card\">Tantek Çelik</li>\n        <li class=\"p-attendee h-card\">Sid Sutter</li>\n    </ul>\n</div>\n"
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




describe('Event with location (h-event parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-event\">\n  <a class=\"p-name u-url\" href=\"http://indiewebcamp.com/2012\">\n    IndieWebCamp 2012\n  </a>\n  from <time class=\"dt-start\">2012-06-30</time> \n  to <time class=\"dt-end\">2012-07-01</time> at \n  <span class=\"p-location h-card\">\n    <a class=\"p-name p-org u-url\" href=\"http://geoloqi.com/\">Geoloqi</a>, \n    <span class=\"p-street-address\">920 SW 3rd Ave. Suite 400</span>, \n    <span class=\"p-locality\">Portland</span>, \n    <abbr class=\"p-region\" title=\"Oregon\">OR</abbr>\n  </span>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["IndieWebCamp 2012"],"url":["http://indiewebcamp.com/2012"],"start":["2012-06-30"],"end":["2012-07-01"],"location":[{"value":"Geoloqi, 920 SW 3rd Ave. Suite 400, Portland, OR","type":["h-card"],"properties":{"name":["Geoloqi"],"org":["Geoloqi"],"url":["http://geoloqi.com/"],"street-address":["920 SW 3rd Ave. Suite 400"],"locality":["Portland"],"region":["Oregon"]}}]}},{"type":["h-card"],"properties":{"name":["Geoloqi"],"org":["Geoloqi"],"url":["http://geoloqi.com/"],"street-address":["920 SW 3rd Ave. Suite 400"],"locality":["Portland"],"region":["Oregon"]}}]}

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

   it("found.items[0].properties['location'][0].properties['street-address'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["street-address"][0].toString(), "920 SW 3rd Ave. Suite 400");
   })

   it("found.items[0].properties['location'][0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["locality"][0].toString(), "Portland");
   })

   it("found.items[0].properties['location'][0].properties['region'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["region"][0].toString(), "Oregon");
   })

})




describe('Concatenate multiple datetime elements (h-event parsing test)', function() {
   var htmlFragment = "\n<span class=\"h-event\">\n <span class=\"p-name\">The 4th Microformat party</span> will be on \n <span class=\"dt-start\">\n  <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n  <time class=\"value\">19:00</time></span> to \n <span class=\"dt-end\"><time class=\"value\">22:00</time></span>.\n</span>\n"
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




describe('Time formats (h-event parsing test)', function() {
   var htmlFragment = "\n<span class=\"h-event\">\n    <span class=\"p-name\">The 4th Microformat party</span> will be on \n    <ul>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00-08:00</time> \n        </li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00-0800</time> \n        </li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00+0800</time> \n        </li> \n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00Z</time> \n        </li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00</time> \n        </li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00-08:00</time> \n        </li> \n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00+08:00</time> \n        </li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00Z</time> \n        </li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00</time> \n        </li>  \n        <li>\n            <time class=\"dt-end\" datetime=\"2013-034\">3 February 2013</time>\n        </li>              \n    </ul>\n</span>\n"
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




describe('Meridiem time formats (am pm) (h-event parsing test)', function() {
   var htmlFragment = "\n<span class=\"h-event\">\n    <span class=\"p-name\">The 4th Microformat party</span> will be on \n    <ul>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">07:00:00pm \n        </span></li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">07:00:00am \n        </span></li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">07:00pm \n        </span></li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">07pm \n        </span></li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">7pm \n        </span></li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">7:00pm \n        </span></li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">07:00p.m. \n        </span></li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">07:00PM \n        </span></li>\n        <li class=\"dt-start\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <span class=\"value\">7:00am \n        </span></li>\n    </ul>\n</span>\n"
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




describe('dt-property (h-event parsing test)', function() {
   var htmlFragment = "\n<span class=\"h-event\">\n    <span class=\"p-name\">The party</span> will be on \n    <!-- value and value-title patterns -->\n    <p class=\"dt-start\">\n      <span class=\"value-title\" title=\"2013-03-14\"> </span>\n      March 14th 2013\n    </p>\n    <p class=\"dt-start\">\n        <time class=\"value\" datetime=\"2013-06-25\">25 July</time>, from\n        <span class=\"value\">07:00:00am \n    </span></p>   \n    <!-- elements with datetime attribute -->\n    <p>\n        <time class=\"dt-start\" datetime=\"2013-06-26\">26 June</time>\n        \n        <ins class=\"dt-start\" datetime=\"2013-06-27\">Just added</ins>, \n        <del class=\"dt-start\" datetime=\"2013-06-28\">Removed</del>\n    </p>\n    <abbr class=\"dt-start\" title=\"2013-06-29\">June 29</abbr> \n    <data class=\"dt-start\" value=\"2013-07-01\"></data>\n    <p class=\"dt-start\">2013-07-02</p>\n    \n</span>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["The party"],"start":["2013-03-14","2013-06-25T07:00:00","2013-06-26","2013-06-27","2013-06-28","2013-06-29","2013-07-01","2013-07-02"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "The party");
   })

   it("found.items[0].properties['start'][0]", function(){
      assert.equal(found.items[0].properties["start"][0].toString(), "2013-03-14");
   })

   it("found.items[0].properties['start'][1]", function(){
      assert.equal(found.items[0].properties["start"][1].toString(), "2013-06-25T07:00:00");
   })

   it("found.items[0].properties['start'][2]", function(){
      assert.equal(found.items[0].properties["start"][2].toString(), "2013-06-26");
   })

   it("found.items[0].properties['start'][3]", function(){
      assert.equal(found.items[0].properties["start"][3].toString(), "2013-06-27");
   })

   it("found.items[0].properties['start'][4]", function(){
      assert.equal(found.items[0].properties["start"][4].toString(), "2013-06-28");
   })

   it("found.items[0].properties['start'][5]", function(){
      assert.equal(found.items[0].properties["start"][5].toString(), "2013-06-29");
   })

   it("found.items[0].properties['start'][6]", function(){
      assert.equal(found.items[0].properties["start"][6].toString(), "2013-07-01");
   })

   it("found.items[0].properties['start'][7]", function(){
      assert.equal(found.items[0].properties["start"][7].toString(), "2013-07-02");
   })

})




