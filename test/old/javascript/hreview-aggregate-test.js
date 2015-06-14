/*
Mocha integration test from: hreview-aggregate.html
The test was built on Wed Feb 20 2013 12:57:15 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Minimum properties (hreview-aggregate parsing test)', function() {
   var htmlFragment = "\n<p class=\"hreview-aggregate\">\n    <span class=\"item\">\n        <a class=\"fn url\" href=\"http://example.com/mediterraneanwraps\">Mediterranean Wraps</a>\n    </span> - Rated: \n    <span class=\"rating\">4.5</span> out of 5 (<span class=\"count\">6</span> reviews)\n</p>   \n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-review-aggregate"],"properties":{"item":[{"value":"","type":["h-item"],"properties":{"name":["Mediterranean Wraps"],"url":["http://example.com/mediterraneanwraps"]}}],"rating":["4.5"],"count":["6"],"name":["Mediterranean Wraps - Rated: 4.5 out of 5 (6 reviews)"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-review-aggregate");
   })

   it("found.items[0].properties['item'][0].type[0]", function(){
      assert.equal(found.items[0].properties["item"][0].type[0].toString(), "h-item");
   })

   it("found.items[0].properties['item'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["name"][0].toString(), "Mediterranean Wraps");
   })

   it("found.items[0].properties['item'][0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["url"][0].toString(), "http://example.com/mediterraneanwraps");
   })

   it("found.items[0].properties['rating'][0]", function(){
      assert.equal(found.items[0].properties["rating"][0].toString(), "4.5");
   })

   it("found.items[0].properties['count'][0]", function(){
      assert.equal(found.items[0].properties["count"][0].toString(), "6");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Mediterranean Wraps - Rated: 4.5 out of 5 (6 reviews)");
   })

})




describe('With item as a vcard (hreview-aggregate parsing test)', function() {
   var htmlFragment = "\n<div class=\"hreview-aggregate\">\n    <div class=\"item vcard\">\n        <h3 class=\"fn org\">Mediterranean Wraps</h3>    \n        <p>\n            <span class=\"adr\">\n                <span class=\"street-address\">433 S California Ave</span>, \n                <span class=\"locality\">Palo Alto</span>, \n                <span class=\"region\">CA</span></span> - \n            \n            <span class=\"tel\">(650) 321-8189</span>\n        </p>\n    </div> \n    <p class=\"rating\">\n        <span class=\"average value\">9.2</span> out of \n        <span class=\"best\">10</span> \n        based on <span class=\"count\">17</span> reviews\n    </p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-review-aggregate"],"properties":{"item":[{"value":"Mediterranean Wraps 433 S California Ave, Palo Alto, CA - (650) 321-8189","type":["h-item","h-card"],"properties":{"name":["Mediterranean Wraps"],"adr":[{"value":"433 S California Ave, Palo Alto, CA","type":["h-adr"],"properties":{"street-address":["433 S California Ave"],"locality":["Palo Alto"],"region":["CA"]}}],"tel":["(650) 321-8189"]}}],"rating":["9.2"],"average":["9.2"],"best":["10"],"count":["17"],"name":["Mediterranean Wraps 433 S California Ave, Palo Alto, CA - (650) 321-8189 9.2 out of 10 based on 17 reviews"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-review-aggregate");
   })

   it("found.items[0].properties['item'][0].value", function(){
      assert.equal(found.items[0].properties["item"][0].value, "Mediterranean Wraps 433 S California Ave, Palo Alto, CA - (650) 321-8189");
   })

   it("found.items[0].properties['item'][0].type[0]", function(){
      assert.equal(found.items[0].properties["item"][0].type[0].toString(), "h-item");
   })

   it("found.items[0].properties['item'][0].type[1]", function(){
      assert.equal(found.items[0].properties["item"][0].type[1].toString(), "h-card");
   })

   it("found.items[0].properties['item'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["name"][0].toString(), "Mediterranean Wraps");
   })

   it("found.items[0].properties['item'][0].properties['adr'][0].value", function(){
      assert.equal(found.items[0].properties["item"][0].properties["adr"][0].value, "433 S California Ave, Palo Alto, CA");
   })

   it("found.items[0].properties['item'][0].properties['adr'][0].type[0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["adr"][0].type[0].toString(), "h-adr");
   })

   it("found.items[0].properties['item'][0].properties['adr'][0].properties['street-address'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["adr"][0].properties["street-address"][0].toString(), "433 S California Ave");
   })

   it("found.items[0].properties['item'][0].properties['adr'][0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["adr"][0].properties["locality"][0].toString(), "Palo Alto");
   })

   it("found.items[0].properties['item'][0].properties['adr'][0].properties['region'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["adr"][0].properties["region"][0].toString(), "CA");
   })

   it("found.items[0].properties['item'][0].properties['tel'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["tel"][0].toString(), "(650) 321-8189");
   })

   it("found.items[0].properties['rating'][0]", function(){
      assert.equal(found.items[0].properties["rating"][0].toString(), "9.2");
   })

   it("found.items[0].properties['average'][0]", function(){
      assert.equal(found.items[0].properties["average"][0].toString(), "9.2");
   })

   it("found.items[0].properties['best'][0]", function(){
      assert.equal(found.items[0].properties["best"][0].toString(), "10");
   })

   it("found.items[0].properties['count'][0]", function(){
      assert.equal(found.items[0].properties["count"][0].toString(), "17");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Mediterranean Wraps 433 S California Ave, Palo Alto, CA - (650) 321-8189 9.2 out of 10 based on 17 reviews");
   })

})




describe('With item as a vevent (hreview-aggregate parsing test)', function() {
   var htmlFragment = "\n<div class=\"hreview-aggregate\">\n    <div class=\"item vevent\">\n        <h3 class=\"summary\">Fullfrontal</h3>\n        <p class=\"description\">A one day JavaScript Conference held in Brighton</p>\n        <p><time class=\"dtstart\" datetime=\"2012-11-09\">9th November 2012</time></p>    \n    </div> \n    \n    <p class=\"rating\">\n        <span class=\"average value\">9.9</span> out of \n        <span class=\"best\">10</span> \n        based on <span class=\"count\">62</span> reviews\n    </p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-review-aggregate"],"properties":{"item":[{"value":"Fullfrontal A one day JavaScript Conference held in Brighton 9th November 2012","type":["h-item","h-event"],"properties":{"name":["Fullfrontal"],"description":["A one day JavaScript Conference held in Brighton"],"start":["2012-11-09"]}}],"rating":["9.9"],"average":["9.9"],"best":["10"],"count":["62"],"name":["Fullfrontal A one day JavaScript Conference held in Brighton 9th November 2012 9.9 out of 10 based on 62 reviews"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-review-aggregate");
   })

   it("found.items[0].properties['item'][0].value", function(){
      assert.equal(found.items[0].properties["item"][0].value, "Fullfrontal A one day JavaScript Conference held in Brighton 9th November 2012");
   })

   it("found.items[0].properties['item'][0].type[0]", function(){
      assert.equal(found.items[0].properties["item"][0].type[0].toString(), "h-item");
   })

   it("found.items[0].properties['item'][0].type[1]", function(){
      assert.equal(found.items[0].properties["item"][0].type[1].toString(), "h-event");
   })

   it("found.items[0].properties['item'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["name"][0].toString(), "Fullfrontal");
   })

   it("found.items[0].properties['item'][0].properties['description'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["description"][0].toString(), "A one day JavaScript Conference held in Brighton");
   })

   it("found.items[0].properties['item'][0].properties['start'][0]", function(){
      assert.equal(found.items[0].properties["item"][0].properties["start"][0].toString(), "2012-11-09");
   })

   it("found.items[0].properties['rating'][0]", function(){
      assert.equal(found.items[0].properties["rating"][0].toString(), "9.9");
   })

   it("found.items[0].properties['average'][0]", function(){
      assert.equal(found.items[0].properties["average"][0].toString(), "9.9");
   })

   it("found.items[0].properties['best'][0]", function(){
      assert.equal(found.items[0].properties["best"][0].toString(), "10");
   })

   it("found.items[0].properties['count'][0]", function(){
      assert.equal(found.items[0].properties["count"][0].toString(), "62");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Fullfrontal A one day JavaScript Conference held in Brighton 9th November 2012 9.9 out of 10 based on 62 reviews");
   })

})




