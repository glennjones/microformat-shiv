/*
Mocha integration test from: h-review.html
The test was built on Wed Feb 20 2013 12:57:15 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Just a name (h-review parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-review\">Crepes on Cole</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-review"],"properties":{"name":["Crepes on Cole"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-review");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Crepes on Cole");
   })

})




describe('Just a hyperlink (h-review parsing test)', function() {
   var htmlFragment = "\n<a class=\"h-review\" href=\"https://plus.google.com/116941523817079328322/about\">Crepes on Cole</a>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-review"],"properties":{"name":["Crepes on Cole"],"url":["https://plus.google.com/116941523817079328322/about"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-review");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Crepes on Cole");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "https://plus.google.com/116941523817079328322/about");
   })

})




describe('Just a photo (h-review parsing test)', function() {
   var htmlFragment = "\n<img class=\"h-review\" src=\"images/photo.gif\" alt=\"Crepes on Cole\">\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-review"],"properties":{"name":["Crepes on Cole"],"photo":["http://example.com/images/photo.gif"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-review");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Crepes on Cole");
   })

   it("found.items[0].properties['photo'][0]", function(){
      assert.equal(found.items[0].properties["photo"][0].toString(), "http://example.com/images/photo.gif");
   })

})




describe('With implied item name and url (h-review parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-review\">\n    <a class=\"p-item h-item\" href=\"http://example.com/crepeoncole\">Crepes on Cole</a>\n    <p><span class=\"rating\">4.7</span> out of 5 stars</p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-review"],"properties":{"item":[{"value":"Crepes on Cole","type":["h-item"],"properties":{"name":["Crepes on Cole"],"url":["http://example.com/crepeoncole"]}}],"rating":["4.7"],"name":["Crepes on Cole 4.7 out of 5 stars"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-review");
   })

   it("found.items[0].properties['item'][0].value", function(){
      assert.equal(found.items[0].properties["item"][0].value, "Crepes on Cole");
   })

   it("found.items[0].properties['item'][0].type[0]", function(){
      assert.equal(found.items[0].properties["item"][0].type[0].toString(), "h-item");
   })

   it("found.items[0].properties['item'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["name"][0].toString(), "Crepes on Cole");
   })

   it("found.items[0].properties['item'][0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["url"][0].toString(), "http://example.com/crepeoncole");
   })

   it("found.items[0].properties['rating'][0]", function(){
      assert.equal(found.items[0].properties["rating"][0].toString(), "4.7");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Crepes on Cole 4.7 out of 5 stars");
   })

})




describe('With item (h-review parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-review\">\n    <p class=\"p-item h-item\">\n        <img class=\"u-photo\" src=\"images/photo.gif\">\n        <a class=\"p-name u-url\" href=\"http://example.com/crepeoncole\">Crepes on Cole</a>\n    </p>\n    <p><span class=\"p-rating\">5</span> out of 5 stars</p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-review"],"properties":{"item":[{"value":"Crepes on Cole","type":["h-item"],"properties":{"photo":["http://example.com/images/photo.gif"],"name":["Crepes on Cole"],"url":["http://example.com/crepeoncole"]}}],"rating":["5"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-review");
   })

   it("found.items[0].properties['item'][0].value", function(){
      assert.equal(found.items[0].properties["item"][0].value, "Crepes on Cole");
   })

   it("found.items[0].properties['item'][0].type[0]", function(){
      assert.equal(found.items[0].properties["item"][0].type[0].toString(), "h-item");
   })

   it("found.items[0].properties['item'][0].properties['photo'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["photo"][0].toString(), "http://example.com/images/photo.gif");
   })

   it("found.items[0].properties['item'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["name"][0].toString(), "Crepes on Cole");
   })

   it("found.items[0].properties['item'][0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["url"][0].toString(), "http://example.com/crepeoncole");
   })

   it("found.items[0].properties['rating'][0]", function(){
      assert.equal(found.items[0].properties["rating"][0].toString(), "5");
   })

})




describe('With vcard item (h-review parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-review\">\n    <span><span class=\"p-rating\">5</span> out of 5 stars</span>\n    <h4 class=\"p-name\">Crepes on Cole is awesome</h4>\n    <span class=\"p-reviewer h-card\">\n        Reviewer: <span class=\"p-name\">Tantek</span> - \n    </span>\n    <time class=\"dt-reviewed\" datetime=\"2005-04-18\">April 18, 2005</time>\n    <div class=\"e-description\">\n        <p class=\"p-item h-card\">\n        <span class=\"p-name p-org\">Crepes on Cole</span> is one of the best little \n        creperies in <span class=\"p-adr h-adr\"><span class=\"p-locality\">San Francisco</span></span>.\n        Excellent food and service. Plenty of tables in a variety of sizes \n        for parties large and small.  Window seating makes for excellent \n        people watching to/from the N-Judah which stops right outside.  \n        I've had many fun social gatherings here, as well as gotten \n        plenty of work done thanks to neighborhood WiFi.\n        </p>\n    </div>\n    <p>Visit date: <span>April 2005</span></p>\n    <p>Food eaten: <a class=\"p-category\" href=\"http://en.wikipedia.org/wiki/crepe\">crepe</a></p>\n    <p>Permanent link for review: <a class=\"u-url\" href=\"http://example.com/crepe\">http://example.com/crepe</a></p>\n    <p><a rel=\"license\" href=\"http://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License\">Creative Commons Attribution-ShareAlike License</a></p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-review"],"properties":{"rating":["5"],"name":["Crepes on Cole is awesome"],"reviewer":[{"value":"Reviewer: Tantek -","type":["h-card"],"properties":{"name":["Tantek"]}}],"description":["\n        <p class=\"p-item h-card\">\n        <span class=\"p-name p-org\">Crepes on Cole</span> is one of the best little \n        creperies in <span class=\"p-adr h-adr\"><span class=\"p-locality\">San Francisco</span></span>.\n        Excellent food and service. Plenty of tables in a variety of sizes \n        for parties large and small.  Window seating makes for excellent \n        people watching to/from the N-Judah which stops right outside.  \n        I've had many fun social gatherings here, as well as gotten \n        plenty of work done thanks to neighborhood WiFi.\n        </p>\n    "],"item":[{"value":"Crepes on Cole is one of the best little creperies in San Francisco. Excellent food and service. Plenty of tables in a variety of sizes for parties large and small. Window seating makes for excellent people watching to/from the N-Judah which stops right outside. I've had many fun social gatherings here, as well as gotten plenty of work done thanks to neighborhood WiFi.","type":["h-card"],"properties":{"name":["Crepes on Cole"],"org":["Crepes on Cole"],"adr":[{"value":"San Francisco","type":["h-adr"],"properties":{"locality":["San Francisco"],"name":["San Francisco"]}}]}}],"category":["crepe"],"url":["http://example.com/crepe"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-review");
   })

   it("found.items[0].properties['rating'][0]", function(){
      assert.equal(found.items[0].properties["rating"][0].toString(), "5");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Crepes on Cole is awesome");
   })

   it("found.items[0].properties['reviewer'][0].value", function(){
      assert.equal(found.items[0].properties["reviewer"][0].value, "Reviewer: Tantek -");
   })

   it("found.items[0].properties['reviewer'][0].type[0]", function(){
      assert.equal(found.items[0].properties["reviewer"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['reviewer'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["reviewer"][0].properties["name"][0].toString(), "Tantek");
   })

   it("found.items[0].properties['description'][0]", function(){
      assert.equal(found.items[0].properties["description"][0].toString(), "\n        <p class=\"p-item h-card\">\n        <span class=\"p-name p-org\">Crepes on Cole</span> is one of the best little \n        creperies in <span class=\"p-adr h-adr\"><span class=\"p-locality\">San Francisco</span></span>.\n        Excellent food and service. Plenty of tables in a variety of sizes \n        for parties large and small.  Window seating makes for excellent \n        people watching to/from the N-Judah which stops right outside.  \n        I've had many fun social gatherings here, as well as gotten \n        plenty of work done thanks to neighborhood WiFi.\n        </p>\n    ");
   })

   it("found.items[0].properties['item'][0].value", function(){
      assert.equal(found.items[0].properties["item"][0].value, "Crepes on Cole is one of the best little creperies in San Francisco. Excellent food and service. Plenty of tables in a variety of sizes for parties large and small. Window seating makes for excellent people watching to/from the N-Judah which stops right outside. I've had many fun social gatherings here, as well as gotten plenty of work done thanks to neighborhood WiFi.");
   })

   it("found.items[0].properties['item'][0].type[0]", function(){
      assert.equal(found.items[0].properties["item"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['item'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["name"][0].toString(), "Crepes on Cole");
   })

   it("found.items[0].properties['item'][0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["org"][0].toString(), "Crepes on Cole");
   })

   it("found.items[0].properties['item'][0].properties['adr'][0].value", function(){
      assert.equal(found.items[0].properties["item"][0].properties["adr"][0].value, "San Francisco");
   })

   it("found.items[0].properties['item'][0].properties['adr'][0].type[0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["adr"][0].type[0].toString(), "h-adr");
   })

   it("found.items[0].properties['item'][0].properties['adr'][0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["adr"][0].properties["locality"][0].toString(), "San Francisco");
   })

   it("found.items[0].properties['item'][0].properties['adr'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["adr"][0].properties["name"][0].toString(), "San Francisco");
   })

   it("found.items[0].properties['category'][0]", function(){
      assert.equal(found.items[0].properties["category"][0].toString(), "crepe");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://example.com/crepe");
   })

})




