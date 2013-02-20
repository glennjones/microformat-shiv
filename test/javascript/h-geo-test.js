/*
Mocha integration test from: h-geo.html
The test was built on Wed Feb 20 2013 12:57:14 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Just a name (h-geo parsing test)', function() {
   var htmlFragment = "\n<p>On my way to The Bricklayer's Arms\n    (Geo: <span class=\"h-geo\">51.513458;-0.14812</span>)\n</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-geo"],"properties":{"name":["51.513458;-0.14812"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-geo");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "51.513458;-0.14812");
   })

})




describe('Broken into properties (h-geo parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-geo\">We are meeting at \n    <span class=\"p-name\">The Bricklayer's Arms</span>\n    (Geo: <span class=\"p-latitude\">51.513458</span>:\n    <span class=\"p-longitude\">-0.14812</span>)\n</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-geo"],"properties":{"name":["The Bricklayer's Arms"],"latitude":["51.513458"],"longitude":["-0.14812"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-geo");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "The Bricklayer's Arms");
   })

   it("found.items[0].properties['latitude'][0]", function(){
      assert.equal(found.items[0].properties["latitude"][0].toString(), "51.513458");
   })

   it("found.items[0].properties['longitude'][0]", function(){
      assert.equal(found.items[0].properties["longitude"][0].toString(), "-0.14812");
   })

})




describe('Geo with a altitude property (h-geo parsing test)', function() {
   var htmlFragment = "\n<p>My favourite hill in the lakes is \n    <span class=\"h-geo\">\n        <span class=\"p-name\">Pen-y-ghent</span> \n        (Geo: <span class=\"p-latitude\">54.155278</span>,\n        <span class=\"p-longitude\">-2.249722</span>). It\n        raises to <span class=\"p-altitude\">694</span>m.\n  </span>\n</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-geo"],"properties":{"name":["Pen-y-ghent"],"latitude":["54.155278"],"longitude":["-2.249722"],"altitude":["694"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-geo");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Pen-y-ghent");
   })

   it("found.items[0].properties['latitude'][0]", function(){
      assert.equal(found.items[0].properties["latitude"][0].toString(), "54.155278");
   })

   it("found.items[0].properties['longitude'][0]", function(){
      assert.equal(found.items[0].properties["longitude"][0].toString(), "-2.249722");
   })

   it("found.items[0].properties['altitude'][0]", function(){
      assert.equal(found.items[0].properties["altitude"][0].toString(), "694");
   })

})




describe('Value-title class pattern (h-geo parsing test)', function() {
   var htmlFragment = "\n<p>\n    <span class=\"h-geo\">\n        <span class=\"p-latitude\">\n            <span class=\"value-title\" title=\"51.513458\">N 51° 51.345</span>, \n        </span>\n        <span class=\"p-longitude\">\n            <span class=\"value-title\" title=\"-0.14812\">W -0° 14.812</span>\n        </span>\n    </span>\n</p>\n"
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




describe('The <abbr> tag pattern (h-geo parsing test)', function() {
   var htmlFragment = "\n<p>\n    <span class=\"h-geo\">The Bricklayer's Arms\n        <span class=\"p-latitude\">\n            <span class=\"value-title\" title=\"51.513458\"> </span> \n        </span>\n        <span class=\"p-longitude\">\n            <span class=\"value-title\" title=\"-0.14812\"> </span>\n        </span>\n    </span>\n</p>\n"
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




describe('The <abbr> Tag Pattern (h-geo parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-geo\">\n <abbr class=\"p-latitude\" title=\"37.408183\">N 37° 24.491</abbr>,  \n <abbr class=\"p-longitude\" title=\"-122.13855\">W 122° 08.313</abbr>\n</p>\n"
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




