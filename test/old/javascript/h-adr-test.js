/*
Mocha integration test from: h-adr.html
The test was built on Wed Feb 20 2013 12:57:14 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Just a name (h-adr parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-adr\">665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A.</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-adr"],"properties":{"name":["665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A."]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-adr");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A.");
   })

})




describe('Broken into properties (h-adr parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-adr\">\n    <span class=\"p-street-address\">665 3rd St.</span>  \n    <span class=\"p-extended-address\">Suite 207</span>  \n    <span class=\"p-locality\">San Francisco</span>,  \n    <span class=\"p-region\">CA</span>  \n    <span class=\"p-postal-code\">94107</span>  \n    <span class=\"p-country-name\">U.S.A.</span>  \n</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-adr"],"properties":{"street-address":["665 3rd St."],"extended-address":["Suite 207"],"locality":["San Francisco"],"region":["CA"],"postal-code":["94107"],"country-name":["U.S.A."],"name":["665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A."]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-adr");
   })

   it("found.items[0].properties['street-address'][0]", function(){
      assert.equal(found.items[0].properties["street-address"][0].toString(), "665 3rd St.");
   })

   it("found.items[0].properties['extended-address'][0]", function(){
      assert.equal(found.items[0].properties["extended-address"][0].toString(), "Suite 207");
   })

   it("found.items[0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["locality"][0].toString(), "San Francisco");
   })

   it("found.items[0].properties['region'][0]", function(){
      assert.equal(found.items[0].properties["region"][0].toString(), "CA");
   })

   it("found.items[0].properties['postal-code'][0]", function(){
      assert.equal(found.items[0].properties["postal-code"][0].toString(), "94107");
   })

   it("found.items[0].properties['country-name'][0]", function(){
      assert.equal(found.items[0].properties["country-name"][0].toString(), "U.S.A.");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A.");
   })

})




describe('With geo data (h-adr parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-adr\">\n    <span class=\"p-name\">Bricklayer's Arms</span>\n    <span class=\"p-label\"> \n        <span class=\"p-street-address\">3 Charlotte Road</span>,  \n        <span class=\"p-locality\">City of London</span>,  \n        <span class=\"p-postal-code\">EC2A 3PE</span>, \n        <span class=\"p-country-name\">UK</span> \n    </span> – \n    Geo:(<span class=\"p-geo\">51.526421;-0.081067</span>) \n</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-adr"],"properties":{"name":["Bricklayer's Arms"],"label":["3 Charlotte Road, City of London, EC2A 3PE, UK"],"street-address":["3 Charlotte Road"],"locality":["City of London"],"postal-code":["EC2A 3PE"],"country-name":["UK"],"geo":["51.526421;-0.081067"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-adr");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Bricklayer's Arms");
   })

   it("found.items[0].properties['label'][0]", function(){
      assert.equal(found.items[0].properties["label"][0].toString(), "3 Charlotte Road, City of London, EC2A 3PE, UK");
   })

   it("found.items[0].properties['street-address'][0]", function(){
      assert.equal(found.items[0].properties["street-address"][0].toString(), "3 Charlotte Road");
   })

   it("found.items[0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["locality"][0].toString(), "City of London");
   })

   it("found.items[0].properties['postal-code'][0]", function(){
      assert.equal(found.items[0].properties["postal-code"][0].toString(), "EC2A 3PE");
   })

   it("found.items[0].properties['country-name'][0]", function(){
      assert.equal(found.items[0].properties["country-name"][0].toString(), "UK");
   })

   it("found.items[0].properties['geo'][0]", function(){
      assert.equal(found.items[0].properties["geo"][0].toString(), "51.526421;-0.081067");
   })

})




describe('With geo url (h-adr parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-adr\">\n    <a class=\"p-name u-geo\" href=\"geo:51.526421;-0.081067;crs=wgs84;u=40\">Bricklayer's Arms</a>, \n    <span class=\"p-locality\">London</span> \n</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-adr"],"properties":{"name":["Bricklayer's Arms"],"geo":["geo:51.526421;-0.081067;crs=wgs84;u=40"],"locality":["London"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-adr");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Bricklayer's Arms");
   })

   it("found.items[0].properties['geo'][0]", function(){
      assert.equal(found.items[0].properties["geo"][0].toString(), "geo:51.526421;-0.081067;crs=wgs84;u=40");
   })

   it("found.items[0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["locality"][0].toString(), "London");
   })

})




