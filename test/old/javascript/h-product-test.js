/*
Mocha integration test from: h-product.html
The test was built on Wed Feb 20 2013 12:57:15 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Just a name (h-product parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-product\">Raspberry Pi</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-product"],"properties":{"name":["Raspberry Pi"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-product");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Raspberry Pi");
   })

})




describe('Just a hyperlink (h-product parsing test)', function() {
   var htmlFragment = "\n<a class=\"h-product\" href=\"http://www.raspberrypi.org/\">Raspberry Pi</a>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-product"],"properties":{"name":["Raspberry Pi"],"url":["http://www.raspberrypi.org/"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-product");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Raspberry Pi");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://www.raspberrypi.org/");
   })

})




describe('With h-review (h-product parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-product\">\n    <h2 class=\"p-name\">Raspberry Pi</h2>\n    <img class=\"u-photo\" src=\"http://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/RaspberryPi.jpg/320px-RaspberryPi.jpg\">\n    <p class=\"e-description\">The Raspberry Pi is a credit-card sized computer that plugs into your TV and a keyboard. It’s a capable little PC which can be used for many of the things that your desktop PC does, like spreadsheets, word-processing and games. It also plays high-definition video. We want to see it being used by kids all over the world to learn programming.</p>\n    <a class=\"u-url\" href=\"http://www.raspberrypi.org/\">More info about the Raspberry Pi</a>\n    <p class=\"p-price\">£29.95</p>\n    <p class=\"p-review h-review\"><span class=\"p-rating\">4.5</span> out of 5</p>\n    <p>Categories: <span class=\"p-category\">Computer</span>, <span class=\"p-category\">Education</span></p>\n</div>\n\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-product"],"properties":{"name":["Raspberry Pi"],"photo":["http://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/RaspberryPi.jpg/320px-RaspberryPi.jpg"],"description":["The Raspberry Pi is a credit-card sized computer that plugs into your TV and a keyboard. It’s a capable little PC which can be used for many of the things that your desktop PC does, like spreadsheets, word-processing and games. It also plays high-definition video. We want to see it being used by kids all over the world to learn programming."],"url":["http://www.raspberrypi.org/"],"price":["£29.95"],"category":["Computer","Education"],"review":[{"value":"4.5 out of 5","type":["h-review"],"properties":{"rating":["4.5"],"name":["4.5 out of 5"]}}]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-product");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Raspberry Pi");
   })

   it("found.items[0].properties['photo'][0]", function(){
      assert.equal(found.items[0].properties["photo"][0].toString(), "http://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/RaspberryPi.jpg/320px-RaspberryPi.jpg");
   })

   it("found.items[0].properties['description'][0]", function(){
      assert.equal(found.items[0].properties["description"][0].toString(), "The Raspberry Pi is a credit-card sized computer that plugs into your TV and a keyboard. It’s a capable little PC which can be used for many of the things that your desktop PC does, like spreadsheets, word-processing and games. It also plays high-definition video. We want to see it being used by kids all over the world to learn programming.");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://www.raspberrypi.org/");
   })

   it("found.items[0].properties['price'][0]", function(){
      assert.equal(found.items[0].properties["price"][0].toString(), "£29.95");
   })

   it("found.items[0].properties['category'][0]", function(){
      assert.equal(found.items[0].properties["category"][0].toString(), "Computer");
   })

   it("found.items[0].properties['category'][1]", function(){
      assert.equal(found.items[0].properties["category"][1].toString(), "Education");
   })

   it("found.items[0].properties['review'][0].value", function(){
      assert.equal(found.items[0].properties["review"][0].value, "4.5 out of 5");
   })

   it("found.items[0].properties['review'][0].type[0]", function(){
      assert.equal(found.items[0].properties["review"][0].type[0].toString(), "h-review");
   })

   it("found.items[0].properties['review'][0].properties['rating'][0]", function(){
      assert.equal(found.items[0].properties["review"][0].properties["rating"][0].toString(), "4.5");
   })

   it("found.items[0].properties['review'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["review"][0].properties["name"][0].toString(), "4.5 out of 5");
   })

})




describe('With h-review-aggregate (h-product parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-product\">\n    <h2 class=\"p-name\">Raspberry Pi</h2>\n    <img class=\"u-photo\" src=\"http://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/RaspberryPi.jpg/320px-RaspberryPi.jpg\">\n    <p class=\"e-description\">The Raspberry Pi is a credit-card sized computer that plugs into your TV and a keyboard. It’s a capable little PC which can be used for many of the things that your desktop PC does, like spreadsheets, word-processing and games. It also plays high-definition video. We want to see it being used by kids all over the world to learn programming.</p>\n    <a class=\"u-url\" href=\"http://www.raspberrypi.org/\">More info about the Raspberry Pi</a>\n    <p class=\"p-price\">£29.95</p>\n    <p class=\"p-review h-review-aggregate\">\n        <span class=\"p-rating h-rating\">\n            <span class=\"p-average\">9.2</span> out of \n            <span class=\"p-best\">10</span> \n            based on <span class=\"p-count\">178</span> reviews\n        </span>\n    </p>\n    <p>Categories: <span class=\"p-category\">Computer</span>, <span class=\"p-category\">Education</span></p>\n    <p class=\"p-brand h-card\">From: \n        <span class=\"p-name p-org\">The Raspberry Pi Foundation</span> - \n        <span class=\"p-locality\">Cambridge</span> \n        <span class=\"p-country-name\">UK</span>\n    </p>\n</div>\n\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-product"],"properties":{"name":["Raspberry Pi"],"photo":["http://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/RaspberryPi.jpg/320px-RaspberryPi.jpg"],"description":["The Raspberry Pi is a credit-card sized computer that plugs into your TV and a keyboard. It’s a capable little PC which can be used for many of the things that your desktop PC does, like spreadsheets, word-processing and games. It also plays high-definition video. We want to see it being used by kids all over the world to learn programming."],"url":["http://www.raspberrypi.org/"],"price":["£29.95"],"review":[{"value":"9.2 out of 10 based on 178 reviews","type":["h-review-aggregate"],"properties":{"rating":[{"value":"9.2 out of 10 based on 178 reviews","type":["h-rating"],"properties":{"average":["9.2"],"best":["10"],"count":["178"],"name":["9.2 out of 10 based on 178 reviews"]}}],"name":["9.2 out of 10 based on 178 reviews"]}}],"category":["Computer","Education"],"brand":[{"value":"From: The Raspberry Pi Foundation - Cambridge UK","type":["h-card"],"properties":{"name":["The Raspberry Pi Foundation"],"org":["The Raspberry Pi Foundation"],"locality":["Cambridge"],"country-name":["UK"]}}]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-product");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Raspberry Pi");
   })

   it("found.items[0].properties['photo'][0]", function(){
      assert.equal(found.items[0].properties["photo"][0].toString(), "http://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/RaspberryPi.jpg/320px-RaspberryPi.jpg");
   })

   it("found.items[0].properties['description'][0]", function(){
      assert.equal(found.items[0].properties["description"][0].toString(), "The Raspberry Pi is a credit-card sized computer that plugs into your TV and a keyboard. It’s a capable little PC which can be used for many of the things that your desktop PC does, like spreadsheets, word-processing and games. It also plays high-definition video. We want to see it being used by kids all over the world to learn programming.");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://www.raspberrypi.org/");
   })

   it("found.items[0].properties['price'][0]", function(){
      assert.equal(found.items[0].properties["price"][0].toString(), "£29.95");
   })

   it("found.items[0].properties['review'][0].value", function(){
      assert.equal(found.items[0].properties["review"][0].value, "9.2 out of 10 based on 178 reviews");
   })

   it("found.items[0].properties['review'][0].type[0]", function(){
      assert.equal(found.items[0].properties["review"][0].type[0].toString(), "h-review-aggregate");
   })

   it("found.items[0].properties['review'][0].properties['rating'][0].value", function(){
      assert.equal(found.items[0].properties["review"][0].properties["rating"][0].value, "9.2 out of 10 based on 178 reviews");
   })

   it("found.items[0].properties['review'][0].properties['rating'][0].type[0]", function(){
      assert.equal(found.items[0].properties["review"][0].properties["rating"][0].type[0].toString(), "h-rating");
   })

   it("found.items[0].properties['review'][0].properties['rating'][0].properties['average'][0]", function(){
      assert.equal(found.items[0].properties["review"][0].properties["rating"][0].properties["average"][0].toString(), "9.2");
   })

   it("found.items[0].properties['review'][0].properties['rating'][0].properties['best'][0]", function(){
      assert.equal(found.items[0].properties["review"][0].properties["rating"][0].properties["best"][0].toString(), "10");
   })

   it("found.items[0].properties['review'][0].properties['rating'][0].properties['count'][0]", function(){
      assert.equal(found.items[0].properties["review"][0].properties["rating"][0].properties["count"][0].toString(), "178");
   })

   it("found.items[0].properties['review'][0].properties['rating'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["review"][0].properties["rating"][0].properties["name"][0].toString(), "9.2 out of 10 based on 178 reviews");
   })

   it("found.items[0].properties['review'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["review"][0].properties["name"][0].toString(), "9.2 out of 10 based on 178 reviews");
   })

   it("found.items[0].properties['category'][0]", function(){
      assert.equal(found.items[0].properties["category"][0].toString(), "Computer");
   })

   it("found.items[0].properties['category'][1]", function(){
      assert.equal(found.items[0].properties["category"][1].toString(), "Education");
   })

   it("found.items[0].properties['brand'][0].value", function(){
      assert.equal(found.items[0].properties["brand"][0].value, "From: The Raspberry Pi Foundation - Cambridge UK");
   })

   it("found.items[0].properties['brand'][0].type[0]", function(){
      assert.equal(found.items[0].properties["brand"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['brand'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["brand"][0].properties["name"][0].toString(), "The Raspberry Pi Foundation");
   })

   it("found.items[0].properties['brand'][0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["brand"][0].properties["org"][0].toString(), "The Raspberry Pi Foundation");
   })

   it("found.items[0].properties['brand'][0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["brand"][0].properties["locality"][0].toString(), "Cambridge");
   })

   it("found.items[0].properties['brand'][0].properties['country-name'][0]", function(){
      assert.equal(found.items[0].properties["brand"][0].properties["country-name"][0].toString(), "UK");
   })

})




