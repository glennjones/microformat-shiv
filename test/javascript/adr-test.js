/*
Mocha integration test from: adr.html
The test was built on Wed Feb 20 2013 12:57:15 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Just a name (adr parsing test)', function() {
   var htmlFragment = "\n<p class=\"adr\">665 3rd St. Suite 207 San Francisco, CA 94107 U.S.A.</p>\n"
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
   var htmlFragment = "\n<p class=\"adr\">\n    <span class=\"street-address\">665 3rd St.</span>  \n    <span class=\"extended-address\">Suite 207</span>  \n    <span class=\"locality\">San Francisco</span>,  \n    <span class=\"region\">CA</span>  \n    <span class=\"postal-code\">94107</span>  \n    <span class=\"country-name\">U.S.A.</span>  \n</p>\n"
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




