/*
Mocha integration test from: geo.html
The test was built on Wed Feb 20 2013 12:57:15 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Just a name (geo parsing test)', function() {
   var htmlFragment = "\n<p>On my way to The Bricklayer's Arms\n    (Geo: <span class=\"geo\">51.513458;-0.14812</span>)\n</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-geo"],"properties":{"name":["51.513458;-0.14812"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-geo");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "51.513458;-0.14812");
   })

})




describe('Broken into properties (geo parsing test)', function() {
   var htmlFragment = "\nWe are meeting at \n<span class=\"geo\"> \n    <span>The Bricklayer's Arms</span>\n    (Geo: <span class=\"p-latitude\">51.513458</span>:\n    <span class=\"p-longitude\">-0.14812</span>)\n</span>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-geo"],"properties":{"latitude":["51.513458"],"longitude":["-0.14812"],"name":["The Bricklayer's Arms (Geo: 51.513458: -0.14812)"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-geo");
   })

   it("found.items[0].properties['latitude'][0]", function(){
      assert.equal(found.items[0].properties["latitude"][0].toString(), "51.513458");
   })

   it("found.items[0].properties['longitude'][0]", function(){
      assert.equal(found.items[0].properties["longitude"][0].toString(), "-0.14812");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "The Bricklayer's Arms (Geo: 51.513458: -0.14812)");
   })

})




describe('Value-title class pattern (geo parsing test)', function() {
   var htmlFragment = "\n<p>\n    <span class=\"geo\">\n        <span class=\"latitude\">\n            <span class=\"value-title\" title=\"51.513458\">N 51° 51.345</span>, \n        </span>\n        <span class=\"longitude\">\n            <span class=\"value-title\" title=\"-0.14812\">W -0° 14.812</span>\n        </span>\n    </span>\n</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-geo"],"properties":{"latitude":["51.513458"],"longitude":["-0.14812"],"name":["N 51° 51.345, W -0° 14.812"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-geo");
   })

   it("found.items[0].properties['latitude'][0]", function(){
      assert.equal(found.items[0].properties["latitude"][0].toString(), "51.513458");
   })

   it("found.items[0].properties['longitude'][0]", function(){
      assert.equal(found.items[0].properties["longitude"][0].toString(), "-0.14812");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "N 51° 51.345, W -0° 14.812");
   })

})




describe('Hidden value-title pattern (geo parsing test)', function() {
   var htmlFragment = "\n<p>\n    <span class=\"geo\">The Bricklayer's Arms\n        <span class=\"latitude\">\n            <span class=\"value-title\" title=\"51.513458\"> </span> \n        </span>\n        <span class=\"longitude\">\n            <span class=\"value-title\" title=\"-0.14812\"> </span>\n        </span>\n    </span>\n</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-geo"],"properties":{"latitude":["51.513458"],"longitude":["-0.14812"],"name":["The Bricklayer's Arms"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-geo");
   })

   it("found.items[0].properties['latitude'][0]", function(){
      assert.equal(found.items[0].properties["latitude"][0].toString(), "51.513458");
   })

   it("found.items[0].properties['longitude'][0]", function(){
      assert.equal(found.items[0].properties["longitude"][0].toString(), "-0.14812");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "The Bricklayer's Arms");
   })

})




describe('The <abbr> tag pattern (geo parsing test)', function() {
   var htmlFragment = "\n<p class=\"geo\">\n <abbr class=\"latitude\" title=\"37.408183\">N 37° 24.491</abbr>,  \n <abbr class=\"longitude\" title=\"-122.13855\">W 122° 08.313</abbr>\n</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-geo"],"properties":{"latitude":["37.408183"],"longitude":["-122.13855"],"name":["N 37° 24.491, W 122° 08.313"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-geo");
   })

   it("found.items[0].properties['latitude'][0]", function(){
      assert.equal(found.items[0].properties["latitude"][0].toString(), "37.408183");
   })

   it("found.items[0].properties['longitude'][0]", function(){
      assert.equal(found.items[0].properties["longitude"][0].toString(), "-122.13855");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "N 37° 24.491, W 122° 08.313");
   })

})




