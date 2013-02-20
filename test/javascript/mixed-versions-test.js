/*
Mocha integration test from: mixed-versions.html
The test was built on Wed Feb 20 2013 12:57:15 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Roots from two versions (h-card parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-card vcard\">Frances Berriman</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Frances Berriman"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Frances Berriman");
   })

})




describe('Mixed propertries form different versions (h-card parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-card\">\n    <p>\n        <a class=\"p-name org u-url\" href=\"http://mozilla.org/\">Mozilla Foundation</a>\n    </p>\n    <p class=\"adr\">\n        <span class=\"street-address\">665 3rd St.</span>  \n        <span class=\"extended-address\">Suite 207</span>  \n        <span class=\"locality\">San Francisco</span>,  \n        <span class=\"region\">CA</span>  \n        <span class=\"postal-code\">94107</span>  \n        <span class=\"country-name\">U.S.A.</span>  \n    </p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Mozilla Foundation"],"org":["Mozilla Foundation"],"url":["http://mozilla.org/"],"adr":[{"value":"665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A.","type":["h-adr"],"properties":{"street-address":["665 3rd St."],"extended-address":["Suite 207"],"locality":["San Francisco"],"region":["CA"],"postal-code":["94107"],"country-name":["U.S.A."],"name":["665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A."]}}]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Mozilla Foundation");
   })

   it("found.items[0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["org"][0].toString(), "Mozilla Foundation");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://mozilla.org/");
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




describe('Mixed roots form different versions (h-resume parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-resume\">\n    <div class=\"p-contact vcard\">\n        <p class=\"fn\">Tim Berners-Lee</p>\n        <p class=\"title\">Director of the World Wide Web Foundation</p>\n    </div>\n    <p class=\"summary\">Invented the World Wide Web.</p><hr>\n    <div class=\"p-experience vevent h-card\">\n        <p class=\"title\">Director</p>\n        <p><a class=\"fn p-org summary url\" href=\"http://www.webfoundation.org/\">World Wide Web Foundation</a></p>\n        <p>\n            <time class=\"dtstart\" datetime=\"2009-01-18\">Jan 2009</time> – Present\n            <time class=\"duration\" datetime=\"P2Y11M\">(2 years 11 month)</time>\n        </p>\n    </div>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-resume"],"properties":{"contact":[{"value":"Tim Berners-Lee Director of the World Wide Web Foundation","type":["h-card"],"properties":{"name":["Tim Berners-Lee"],"title":["Director of the World Wide Web Foundation"]}}],"summary":["Invented the World Wide Web."],"experience":[{"value":"Director World Wide Web Foundation Jan 2009 - Present (2 years 11 month)","type":["h-event","h-card"],"properties":{"org":["World Wide Web Foundation"],"name":["World Wide Web Foundation"],"url":["http://www.webfoundation.org/"],"start":["2009-01-18"],"duration":["P2Y11M"],"title":["Director"]}}]}},{"type":["h-card"],"properties":{"name":["Tim Berners-Lee"],"title":["Director of the World Wide Web Foundation"]}},{"type":["h-event"],"properties":{"org":["World Wide Web Foundation"],"name":["World Wide Web Foundation"],"url":["http://www.webfoundation.org/"],"start":["2009-01-18"],"duration":["P2Y11M"]}},{"type":["h-card"],"properties":{"title":["Director"],"name":["World Wide Web Foundation"],"org":["World Wide Web Foundation"],"url":["http://www.webfoundation.org/"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-resume");
   })

   it("found.items[0].properties['contact'][0].value", function(){
      assert.equal(found.items[0].properties["contact"][0].value, "Tim Berners-Lee Director of the World Wide Web Foundation");
   })

   it("found.items[0].properties['contact'][0].type[0]", function(){
      assert.equal(found.items[0].properties["contact"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['contact'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["name"][0].toString(), "Tim Berners-Lee");
   })

   it("found.items[0].properties['contact'][0].properties['title'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["title"][0].toString(), "Director of the World Wide Web Foundation");
   })

   it("found.items[0].properties['summary'][0]", function(){
      assert.equal(found.items[0].properties["summary"][0].toString(), "Invented the World Wide Web.");
   })

   it("found.items[0].properties['experience'][0].value", function(){
      assert.equal(found.items[0].properties["experience"][0].value, "Director World Wide Web Foundation Jan 2009 - Present (2 years 11 month)");
   })

   it("found.items[0].properties['experience'][0].type[0]", function(){
      assert.equal(found.items[0].properties["experience"][0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['experience'][0].type[1]", function(){
      assert.equal(found.items[0].properties["experience"][0].type[1].toString(), "h-card");
   })

   it("found.items[0].properties['experience'][0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["experience"][0].properties["org"][0].toString(), "World Wide Web Foundation");
   })

   it("found.items[0].properties['experience'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["experience"][0].properties["name"][0].toString(), "World Wide Web Foundation");
   })

   it("found.items[0].properties['experience'][0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["experience"][0].properties["url"][0].toString(), "http://www.webfoundation.org/");
   })

   it("found.items[0].properties['experience'][0].properties['start'][0]", function(){
      assert.equal(found.items[0].properties["experience"][0].properties["start"][0].toString(), "2009-01-18");
   })

   it("found.items[0].properties['experience'][0].properties['duration'][0]", function(){
      assert.equal(found.items[0].properties["experience"][0].properties["duration"][0].toString(), "P2Y11M");
   })

   it("found.items[0].properties['experience'][0].properties['title'][0]", function(){
      assert.equal(found.items[0].properties["experience"][0].properties["title"][0].toString(), "Director");
   })

})




