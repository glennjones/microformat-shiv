/*
Mocha integration test from: includes.html
The test was built on Wed Feb 20 2013 12:57:15 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('itemref include pattern - h-card (h-card parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-card\" itemref=\"mozilla-org mozilla-adr\">\n    <span class=\"p-name\">Brendan Eich</span>\n</div>\n<div class=\"h-card\" itemref=\"mozilla-org mozilla-adr\">\n    <span class=\"p-name\">Mitchell Baker</span>\n</div>\n\n<p id=\"mozilla-org\" class=\"p-org\">Mozilla</p>\n<p id=\"mozilla-adr\" class=\"p-adr h-adr\">\n    <span class=\"p-street-address\">665 3rd St.</span>  \n    <span class=\"p-extended-address\">Suite 207</span>  \n    <span class=\"p-locality\">San Francisco</span>,  \n    <span class=\"p-region\">CA</span>  \n    <span class=\"p-postal-code\">94107</span>  \n    <span class=\"p-country-name\">U.S.A.</span>  \n</p>    \n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Brendan Eich"],"org":["Mozilla"],"adr":[{"value":"665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A.","type":["h-adr"],"properties":{"street-address":["665 3rd St."],"extended-address":["Suite 207"],"locality":["San Francisco"],"region":["CA"],"postal-code":["94107"],"country-name":["U.S.A."],"name":["665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A."]}}]}},{"type":["h-card"],"properties":{"name":["Mitchell Baker"],"org":["Mozilla"],"adr":[{"value":"665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A.","type":["h-adr"],"properties":{"street-address":["665 3rd St."],"extended-address":["Suite 207"],"locality":["San Francisco"],"region":["CA"],"postal-code":["94107"],"country-name":["U.S.A."],"name":["665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A."]}}]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Brendan Eich");
   })

   it("found.items[0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["org"][0].toString(), "Mozilla");
   })

   it("found.items[0].properties['adr'][0].value", function(){
      assert.equal(found.items[0].properties["adr"][0].value, "665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A.");
   })

   it("found.items[0].properties['adr'][0].type[0]", function(){
      assert.equal(found.items[0].properties["adr"][0].type[0].toString(), "h-adr");
   })

   it("found.items[0].properties['adr'][0].properties['street-address'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["street-address"][0].toString(), "665 3rd St.");
   })

   it("found.items[0].properties['adr'][0].properties['extended-address'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["extended-address"][0].toString(), "Suite 207");
   })

   it("found.items[0].properties['adr'][0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["locality"][0].toString(), "San Francisco");
   })

   it("found.items[0].properties['adr'][0].properties['region'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["region"][0].toString(), "CA");
   })

   it("found.items[0].properties['adr'][0].properties['postal-code'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["postal-code"][0].toString(), "94107");
   })

   it("found.items[0].properties['adr'][0].properties['country-name'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["country-name"][0].toString(), "U.S.A.");
   })

   it("found.items[0].properties['adr'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["name"][0].toString(), "665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A.");
   })

})




describe('itemref include pattern - h-event (h-card parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-event\" itemref=\"io-session07\">\n    <span class=\"p-name\">Monetizing Android Apps</span> - spaekers: \n    <span class=\"p-speaker\">Chrix Finne</span>, \n    <span class=\"p-speaker\">Kenneth Lui</span> - \n    <span itemref=\"io-location\" class=\"p-location h-adr\">\n        <span class=\"p-extended-address\">Room 10</span>\n    </span>  \n</div>\n<div class=\"h-event\" itemref=\"io-session07\">\n    <span class=\"p-name\">New Low-Level Media APIs in Android</span> - spaekers: \n    <span class=\"p-speaker\">Dave Burke</span> -\n    <span itemref=\"io-location\" class=\"p-location h-adr\">\n        <span class=\"p-extended-address\">Room 11</span>\n    </span>  \n</div>\n\n<p id=\"io-session07\">\n    Session 01 is between: \n    <time class=\"dt-start\" datetime=\"2012-06-27T15:45:00-0800\">3:45PM</time> to \n    <time class=\"dt-end\" datetime=\"2012-06-27T16:45:00-0800\">4:45PM</time> \n</p>   \n<p id=\"io-location\">\n    <span class=\"p-extended-address\">Moscone Center</span>,   \n    <span class=\"p-locality\">San Francisco</span>  \n</p> \n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["Monetizing Android Apps"],"speaker":["Chrix Finne","Kenneth Lui"],"location":[{"value":"Room 10 Moscone Center, San Francisco","type":["h-adr"],"properties":{"extended-address":["Room 10","Moscone Center"],"locality":["San Francisco"],"name":["Room 10 Moscone Center, San Francisco"]}}],"start":["2012-06-27T15:45:00-0800"],"end":["2012-06-27T16:45:00-0800"]}},{"type":["h-event"],"properties":{"name":["New Low-Level Media APIs in Android"],"speaker":["Dave Burke"],"location":[{"value":"Room 11 Moscone Center, San Francisco","type":["h-adr"],"properties":{"extended-address":["Room 11","Moscone Center"],"locality":["San Francisco"],"name":["Room 11 Moscone Center, San Francisco"]}}],"start":["2012-06-27T15:45:00-0800"],"end":["2012-06-27T16:45:00-0800"]}},{"type":["h-adr"],"properties":{"extended-address":["Room 10","Moscone Center"],"locality":["San Francisco"],"name":["Room 10 Moscone Center, San Francisco"]}},{"type":["h-adr"],"properties":{"extended-address":["Room 11","Moscone Center"],"locality":["San Francisco"],"name":["Room 11 Moscone Center, San Francisco"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Monetizing Android Apps");
   })

   it("found.items[0].properties['speaker'][0]", function(){
      assert.equal(found.items[0].properties["speaker"][0].toString(), "Chrix Finne");
   })

   it("found.items[0].properties['speaker'][1]", function(){
      assert.equal(found.items[0].properties["speaker"][1].toString(), "Kenneth Lui");
   })

   it("found.items[0].properties['location'][0].value", function(){
      assert.equal(found.items[0].properties["location"][0].value, "Room 10 Moscone Center, San Francisco");
   })

   it("found.items[0].properties['location'][0].type[0]", function(){
      assert.equal(found.items[0].properties["location"][0].type[0].toString(), "h-adr");
   })

   it("found.items[0].properties['location'][0].properties['extended-address'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["extended-address"][0].toString(), "Room 10");
   })

   it("found.items[0].properties['location'][0].properties['extended-address'][1]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["extended-address"][1].toString(), "Moscone Center");
   })

   it("found.items[0].properties['location'][0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["locality"][0].toString(), "San Francisco");
   })

   it("found.items[0].properties['location'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["name"][0].toString(), "Room 10 Moscone Center, San Francisco");
   })

   it("found.items[0].properties['start'][0]", function(){
      assert.equal(found.items[0].properties["start"][0].toString(), "2012-06-27T15:45:00-0800");
   })

   it("found.items[0].properties['end'][0]", function(){
      assert.equal(found.items[0].properties["end"][0].toString(), "2012-06-27T16:45:00-0800");
   })

})




describe('Table header include pattern (h-card parsing test)', function() {
   var htmlFragment = "\n<table>\n    <tr>\n        <th id=\"org\"><a class=\"u-url p-org\" href=\"http://dev.opera.com/\">Opera</a></th>\n    </tr>\n    <tr>\n        <td class=\"h-card\" headers=\"org\"><span class=\"p-name\">Chris Mills</span></td>\n    </tr>\n    <tr>\n        <td class=\"h-card\" headers=\"org\"><span class=\"p-name\">Erik Möller</span></td>\n    </tr>\n  </table>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Chris Mills"],"url":["http://dev.opera.com/"],"org":["Opera"]}},{"type":["h-card"],"properties":{"name":["Erik Möller"],"url":["http://dev.opera.com/"],"org":["Opera"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Chris Mills");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://dev.opera.com/");
   })

   it("found.items[0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["org"][0].toString(), "Opera");
   })

})




describe('Hyperlink header include pattern (h-card parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-card\">\n    <span class=\"p-name\">Ben Ward</span>\n    <a class=\"include\" href=\"#twitter\">Twitter</a>\n</div>\n<div class=\"h-card\">\n    <span class=\"p-name\">Dan Webb</span>\n    <a class=\"include\" href=\"#twitter\">Twitter</a>\n</div>\n\n<div id=\"twitter\">\n    <p class=\"p-org\">Twitter</p>\n    <p class=\"p-adr h-adr\">\n        <span class=\"p-street-address\">1355 Market St</span>,\n        <span class=\"p-locality\">San Francisco</span>, \n        <span class=\"p-region\">CA</span>\n        <span class=\"p-postal-code\">94103</span>\n    </p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Ben Ward"],"org":["Twitter"],"adr":[{"value":"1355 Market St, San Francisco, CA 94103","type":["h-adr"],"properties":{"street-address":["1355 Market St"],"locality":["San Francisco"],"region":["CA"],"postal-code":["94103"],"name":["1355 Market St, San Francisco, CA 94103"]}}]}},{"type":["h-card"],"properties":{"name":["Dan Webb"],"org":["Twitter"],"adr":[{"value":"1355 Market St, San Francisco, CA 94103","type":["h-adr"],"properties":{"street-address":["1355 Market St"],"locality":["San Francisco"],"region":["CA"],"postal-code":["94103"],"name":["1355 Market St, San Francisco, CA 94103"]}}]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Ben Ward");
   })

   it("found.items[0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["org"][0].toString(), "Twitter");
   })

   it("found.items[0].properties['adr'][0].value", function(){
      assert.equal(found.items[0].properties["adr"][0].value, "1355 Market St, San Francisco, CA 94103");
   })

   it("found.items[0].properties['adr'][0].type[0]", function(){
      assert.equal(found.items[0].properties["adr"][0].type[0].toString(), "h-adr");
   })

   it("found.items[0].properties['adr'][0].properties['street-address'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["street-address"][0].toString(), "1355 Market St");
   })

   it("found.items[0].properties['adr'][0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["locality"][0].toString(), "San Francisco");
   })

   it("found.items[0].properties['adr'][0].properties['region'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["region"][0].toString(), "CA");
   })

   it("found.items[0].properties['adr'][0].properties['postal-code'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["postal-code"][0].toString(), "94103");
   })

   it("found.items[0].properties['adr'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["name"][0].toString(), "1355 Market St, San Francisco, CA 94103");
   })

})




describe('Object include pattern (h-card parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-event\">\n    <span class=\"p-name\">HTML5 & CSS3 latest features in action!</span> - \n    <span class=\"p-speaker\">David Rousset</span> -\n    <time class=\"dt-start\" datetime=\"2012-10-30T11:45:00-08:00\">Tue 11:45am</time>\n    <object data=\"#buildconf\" class=\"include\" type=\"text/html\" height=\"0\" width=\"0\"></object>\n</div>\n<div class=\"h-event\">\n    <span class=\"p-name\">Building High-Performing JavaScript for Modern Engines</span> -\n    <span class=\"p-speaker\">John-David Dalton</span> and \n    <span class=\"p-speaker\">Amanda Silver</span> -\n    <time class=\"dt-start\" datetime=\"2012-10-31T11:15:00-08:00\">Wed 11:15am</time>\n    <object data=\"#buildconf\" class=\"include\" type=\"text/html\" height=\"0\" width=\"0\"></object>\n</div>\n\n\n<div id=\"buildconf\">\n    <p class=\"p-summary\">Build Conference</p>\n    <p class=\"p-location h-adr\">\n        <span class=\"p-locality\">Redmond</span>, \n        <span class=\"p-region\">Washington</span>, \n        <span class=\"p-country-name\">USA</span>\n    </p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["HTML5 & CSS3 latest features in action!"],"speaker":["David Rousset"],"summary":["Build Conference"],"start":["2012-10-30T11:45:00-0800"],"location":[{"value":"Redmond, Washington, USA","type":["h-adr"],"properties":{"locality":["Redmond"],"region":["Washington"],"country-name":["USA"],"name":["Redmond, Washington, USA"]}}]}},{"type":["h-event"],"properties":{"name":["Building High-Performing JavaScript for Modern Engines"],"speaker":["John-David Dalton","Amanda Silver"],"summary":["Build Conference"],"start":["2012-10-31T11:15:00-0800"],"location":[{"value":"Redmond, Washington, USA","type":["h-adr"],"properties":{"locality":["Redmond"],"region":["Washington"],"country-name":["USA"],"name":["Redmond, Washington, USA"]}}]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "HTML5 & CSS3 latest features in action!");
   })

   it("found.items[0].properties['speaker'][0]", function(){
      assert.equal(found.items[0].properties["speaker"][0].toString(), "David Rousset");
   })

   it("found.items[0].properties['summary'][0]", function(){
      assert.equal(found.items[0].properties["summary"][0].toString(), "Build Conference");
   })

   it("found.items[0].properties['start'][0]", function(){
      assert.equal(found.items[0].properties["start"][0].toString(), "2012-10-30T11:45:00-0800");
   })

   it("found.items[0].properties['location'][0].value", function(){
      assert.equal(found.items[0].properties["location"][0].value, "Redmond, Washington, USA");
   })

   it("found.items[0].properties['location'][0].type[0]", function(){
      assert.equal(found.items[0].properties["location"][0].type[0].toString(), "h-adr");
   })

   it("found.items[0].properties['location'][0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["locality"][0].toString(), "Redmond");
   })

   it("found.items[0].properties['location'][0].properties['region'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["region"][0].toString(), "Washington");
   })

   it("found.items[0].properties['location'][0].properties['country-name'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["country-name"][0].toString(), "USA");
   })

   it("found.items[0].properties['location'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["location"][0].properties["name"][0].toString(), "Redmond, Washington, USA");
   })

})




