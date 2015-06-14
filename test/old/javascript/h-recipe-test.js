/*
Mocha integration test from: h-recipe.html
The test was built on Wed Feb 20 2013 12:57:15 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Minimum properties (h-recipe parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-recipe\">  \n    <p class=\"p-name\">Toast</p>\n    <ul>\n        <li class=\"e-ingredient\">Slice of bread</li>\n        <li class=\"e-ingredient\">Butter</li>\n    </ul>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-recipe"],"properties":{"name":["Toast"],"ingredient":["Slice of bread","Butter"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-recipe");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Toast");
   })

   it("found.items[0].properties['ingredient'][0]", function(){
      assert.equal(found.items[0].properties["ingredient"][0].toString(), "Slice of bread");
   })

   it("found.items[0].properties['ingredient'][1]", function(){
      assert.equal(found.items[0].properties["ingredient"][1].toString(), "Butter");
   })

})




describe('Broken into properties (h-recipe parsing test)', function() {
   var htmlFragment = "\n<section class=\"hrecipe\">\n    <h1 class=\"p-name\">Yorkshire Puddings</h1>      \n    <p class=\"p-summary\">Makes <span class=\"p-yield\">6 good sized Yorkshire puddings</span>, the way my mum taught me</p>\n\n\n    <p><img class=\"u-photo\" src=\"http://codebits.glennjones.net/semantic/yorkshire-puddings.jpg\"></p>\n\n    <span class=\"p-review h-review-aggregate\">\n        <span class=\"p-rating\">\n            <span class=\"p-average\">4.5</span> stars out 5 based on </span>\n            <span class=\"p-count\">35</span> reviews</span>\n         \n    \n\n    <div id=\"ingredients-container\">\n        <h3>Ingredients</h3>\n        <ul>\n            <li class=\"e-ingredient\">1 egg</li>\n            <li class=\"e-ingredient\">75g plain flour</li>\n            <li class=\"e-ingredient\">70ml milk</li>\n            <li class=\"e-ingredient\">60ml water</li>\n            <li class=\"e-ingredient\">Pinch of salt</li>\n        </ul>\n    </div>\n\n    <h3>Time</h3>\n    <ul>\n        <li class=\"prepTime\">Preparation <span class=\"value-title\" title=\"PT0H10M\">10 mins</span></li>\n        <li class=\"cookTime\">Cook <span class=\"value-title\" title=\"PT0H25M\">25 mins</span></li>\n    </ul> \n\n\n    <h3>Instructions</h3>\n    <div class=\"e-instructions\">\n        <ol>\n            <li>Pre-heat oven to 230C or gas mark 8. Pour the vegetable oil evenly into 2 x 4-hole \n            Yorkshire pudding tins and place in the oven to heat through.</li> \n            \n            <li>To make the batter, add all the flour into a bowl and beat in the eggs until smooth. \n            Gradually add the milk and water while beating the mixture. It should be smooth and \n            without lumps. Finally add a pinch of salt.</li>\n            \n            <li>Make sure the oil is piping hot before pouring the batter evenly into the tins. \n            Place in the oven for 20-25 minutes until pudding have risen and look golden brown</li>\n        </ol>\n    </div>\n\n    <h3>Nutrition</h3>\n    <ul id=\"nutrition-list\">\n        <li class=\"nutrition\">Calories: <span class=\"calories\">125</span></li>\n        <li class=\"nutrition\">Fat: <span class=\"fat\">3.2g</span></li>\n        <li class=\"nutrition\">Cholesterol: <span class=\"cholesterol\">77mg</span></li>\n    </ul>\n    <p>(Amount per pudding)</p>\n\n    <p>\n        Published on <time class=\"dt-published\" datetime=\"2011-10-27\">27 Oct 2011</time> by \n        <span class=\"p-author h-card\">\n            <a class=\"p-name u-url\" href=\"http://glennjones.net\">Glenn Jones</a>\n        </span>\n    </p>\n    <a href=\"http://www.flickr.com/photos/dithie/4106528495/\">Photo by dithie</a>\n    </section>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-recipe"],"properties":{"name":["Yorkshire Puddings"],"summary":["Makes 6 good sized Yorkshire puddings, the way my mum taught me"],"yield":["6 good sized Yorkshire puddings"],"photo":["http://codebits.glennjones.net/semantic/yorkshire-puddings.jpg"],"review":[{"value":"4.5 stars out 5 based on 35 reviews","type":["h-review-aggregate"],"properties":{"rating":["4.5 stars out 5 based on"],"average":["4.5"],"count":["35"],"name":["4.5 stars out 5 based on 35 reviews"]}}],"ingredient":["1 egg","75g plain flour","70ml milk","60ml water","Pinch of salt"],"instructions":["\n        <ol>\n            <li>Pre-heat oven to 230C or gas mark 8. Pour the vegetable oil evenly into 2 x 4-hole \n            Yorkshire pudding tins and place in the oven to heat through.</li> \n            \n            <li>To make the batter, add all the flour into a bowl and beat in the eggs until smooth. \n            Gradually add the milk and water while beating the mixture. It should be smooth and \n            without lumps. Finally add a pinch of salt.</li>\n            \n            <li>Make sure the oil is piping hot before pouring the batter evenly into the tins. \n            Place in the oven for 20-25 minutes until pudding have risen and look golden brown</li>\n        </ol>\n    "],"nutrition":["Calories: 125","Fat: 3.2g","Cholesterol: 77mg"],"published":["2011-10-27"],"author":[{"value":"Glenn Jones","type":["h-card"],"properties":{"name":["Glenn Jones"],"url":["http://glennjones.net"]}}]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-recipe");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Yorkshire Puddings");
   })

   it("found.items[0].properties['summary'][0]", function(){
      assert.equal(found.items[0].properties["summary"][0].toString(), "Makes 6 good sized Yorkshire puddings, the way my mum taught me");
   })

   it("found.items[0].properties['yield'][0]", function(){
      assert.equal(found.items[0].properties["yield"][0].toString(), "6 good sized Yorkshire puddings");
   })

   it("found.items[0].properties['photo'][0]", function(){
      assert.equal(found.items[0].properties["photo"][0].toString(), "http://codebits.glennjones.net/semantic/yorkshire-puddings.jpg");
   })

   it("found.items[0].properties['review'][0].value", function(){
      assert.equal(found.items[0].properties["review"][0].value, "4.5 stars out 5 based on 35 reviews");
   })

   it("found.items[0].properties['review'][0].type[0]", function(){
      assert.equal(found.items[0].properties["review"][0].type[0].toString(), "h-review-aggregate");
   })

   it("found.items[0].properties['review'][0].properties['rating'][0]", function(){
      assert.equal(found.items[0].properties["review"][0].properties["rating"][0].toString(), "4.5 stars out 5 based on");
   })

   it("found.items[0].properties['review'][0].properties['average'][0]", function(){
      assert.equal(found.items[0].properties["review"][0].properties["average"][0].toString(), "4.5");
   })

   it("found.items[0].properties['review'][0].properties['count'][0]", function(){
      assert.equal(found.items[0].properties["review"][0].properties["count"][0].toString(), "35");
   })

   it("found.items[0].properties['review'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["review"][0].properties["name"][0].toString(), "4.5 stars out 5 based on 35 reviews");
   })

   it("found.items[0].properties['ingredient'][0]", function(){
      assert.equal(found.items[0].properties["ingredient"][0].toString(), "1 egg");
   })

   it("found.items[0].properties['ingredient'][1]", function(){
      assert.equal(found.items[0].properties["ingredient"][1].toString(), "75g plain flour");
   })

   it("found.items[0].properties['ingredient'][2]", function(){
      assert.equal(found.items[0].properties["ingredient"][2].toString(), "70ml milk");
   })

   it("found.items[0].properties['ingredient'][3]", function(){
      assert.equal(found.items[0].properties["ingredient"][3].toString(), "60ml water");
   })

   it("found.items[0].properties['ingredient'][4]", function(){
      assert.equal(found.items[0].properties["ingredient"][4].toString(), "Pinch of salt");
   })

   it("found.items[0].properties['instructions'][0]", function(){
      assert.equal(found.items[0].properties["instructions"][0].toString(), "\n        <ol>\n            <li>Pre-heat oven to 230C or gas mark 8. Pour the vegetable oil evenly into 2 x 4-hole \n            Yorkshire pudding tins and place in the oven to heat through.</li> \n            \n            <li>To make the batter, add all the flour into a bowl and beat in the eggs until smooth. \n            Gradually add the milk and water while beating the mixture. It should be smooth and \n            without lumps. Finally add a pinch of salt.</li>\n            \n            <li>Make sure the oil is piping hot before pouring the batter evenly into the tins. \n            Place in the oven for 20-25 minutes until pudding have risen and look golden brown</li>\n        </ol>\n    ");
   })

   it("found.items[0].properties['nutrition'][0]", function(){
      assert.equal(found.items[0].properties["nutrition"][0].toString(), "Calories: 125");
   })

   it("found.items[0].properties['nutrition'][1]", function(){
      assert.equal(found.items[0].properties["nutrition"][1].toString(), "Fat: 3.2g");
   })

   it("found.items[0].properties['nutrition'][2]", function(){
      assert.equal(found.items[0].properties["nutrition"][2].toString(), "Cholesterol: 77mg");
   })

   it("found.items[0].properties['published'][0]", function(){
      assert.equal(found.items[0].properties["published"][0].toString(), "2011-10-27");
   })

   it("found.items[0].properties['author'][0].value", function(){
      assert.equal(found.items[0].properties["author"][0].value, "Glenn Jones");
   })

   it("found.items[0].properties['author'][0].type[0]", function(){
      assert.equal(found.items[0].properties["author"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['author'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["author"][0].properties["name"][0].toString(), "Glenn Jones");
   })

   it("found.items[0].properties['author'][0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["author"][0].properties["url"][0].toString(), "http://glennjones.net");
   })

})




