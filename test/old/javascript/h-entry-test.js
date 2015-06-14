/*
Mocha integration test from: h-entry.html
The test was built on Wed Feb 20 2013 12:57:14 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Just a name (h-entry parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-entry\">microformats.org at 7</p>\n\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-entry"],"properties":{"name":["microformats.org at 7"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-entry");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "microformats.org at 7");
   })

})




describe('Just a hyperlink (h-entry parsing test)', function() {
   var htmlFragment = "\n<a class=\"h-entry\" href=\"http://microformats.org/2012/06/25/microformats-org-at-7\">microformats.org at 7</a>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-entry"],"properties":{"name":["microformats.org at 7"],"url":["http://microformats.org/2012/06/25/microformats-org-at-7"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-entry");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "microformats.org at 7");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://microformats.org/2012/06/25/microformats-org-at-7");
   })

})




describe('Entry with summary and content (h-entry parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-entry\">\n    <h1><a class=\"p-name u-url\" href=\"http://microformats.org/2012/06/25/microformats-org-at-7\">microformats.org at 7</a></h1>\n    <div class=\"e-content\">\n        <p class=\"p-summary\">Last week the microformats.org community \n            celebrated its 7th birthday at a gathering hosted by Mozilla in \n            San Francisco and recognized accomplishments, challenges, and \n            opportunities.</p>\n\n        <p>The microformats tagline “humans first, machines second” \n            forms the basis of many of our \n            <a href=\"http://microformats.org/wiki/principles\">principles</a>, and \n            in that regard, we’d like to recognize a few people and \n            thank them for their years of volunteer service </p>\n    </div>  \n    <p>Updated \n        <time class=\"dt-updated\" datetime=\"2012-06-25T17:08:26\">June 25th, 2012</time> by\n        <a class=\"p-author h-card\" href=\"http://tantek.com/\">Tantek</a>\n    </p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-entry"],"properties":{"url":["http://microformats.org/2012/06/25/microformats-org-at-7"],"name":["microformats.org at 7"],"content":["\n        <p class=\"p-summary\">Last week the microformats.org community \n            celebrated its 7th birthday at a gathering hosted by Mozilla in \n            San Francisco and recognized accomplishments, challenges, and \n            opportunities.</p>\n\n        <p>The microformats tagline “humans first, machines second” \n            forms the basis of many of our \n            <a href=\"http://microformats.org/wiki/principles\">principles</a>, and \n            in that regard, we’d like to recognize a few people and \n            thank them for their years of volunteer service </p>\n    "],"summary":["Last week the microformats.org community celebrated its 7th birthday at a gathering hosted by Mozilla in San Francisco and recognized accomplishments, challenges, and opportunities."],"updated":["2012-06-25T17:08:26"],"author":[{"value":"Tantek","type":["h-card"],"properties":{"name":["Tantek"],"url":["http://tantek.com/"]}}]}},{"type":["h-card"],"properties":{"name":["Tantek"],"url":["http://tantek.com/"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-entry");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://microformats.org/2012/06/25/microformats-org-at-7");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "microformats.org at 7");
   })

   it("found.items[0].properties['content'][0]", function(){
      assert.equal(found.items[0].properties["content"][0].toString(), "\n        <p class=\"p-summary\">Last week the microformats.org community \n            celebrated its 7th birthday at a gathering hosted by Mozilla in \n            San Francisco and recognized accomplishments, challenges, and \n            opportunities.</p>\n\n        <p>The microformats tagline “humans first, machines second” \n            forms the basis of many of our \n            <a href=\"http://microformats.org/wiki/principles\">principles</a>, and \n            in that regard, we’d like to recognize a few people and \n            thank them for their years of volunteer service </p>\n    ");
   })

   it("found.items[0].properties['summary'][0]", function(){
      assert.equal(found.items[0].properties["summary"][0].toString(), "Last week the microformats.org community celebrated its 7th birthday at a gathering hosted by Mozilla in San Francisco and recognized accomplishments, challenges, and opportunities.");
   })

   it("found.items[0].properties['updated'][0]", function(){
      assert.equal(found.items[0].properties["updated"][0].toString(), "2012-06-25T17:08:26");
   })

   it("found.items[0].properties['author'][0].value", function(){
      assert.equal(found.items[0].properties["author"][0].value, "Tantek");
   })

   it("found.items[0].properties['author'][0].type[0]", function(){
      assert.equal(found.items[0].properties["author"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['author'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["author"][0].properties["name"][0].toString(), "Tantek");
   })

   it("found.items[0].properties['author'][0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["author"][0].properties["url"][0].toString(), "http://tantek.com/");
   })

})




describe('u-property (h-entry parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-entry\">\n    <p class=\"p-name\">microformats.org at 7</p>\n\n    <!-- value and value-title patterns -->\n    <p class=\"u-url\">\n      <span class=\"value-title\" title=\"http://microformats.org/\"> </span>\n      Article permalink\n    </p>\n    <p class=\"u-url\">\n        <span class=\"value\">http://microformats.org/</span> - \n        <span class=\"value\">2012/06/25/microformats-org-at-7</span> \n    </p> \n\n    <p><a class=\"u-url\" href=\"http://microformats.org/2012/06/25/microformats-org-at-7\">Article permalink</a></p>\n\n    <img src=\"images/logo.gif\" alt=\"company logos\" usemap=\"#logomap\">\n    <map name=\"logomap\">\n        <area class=\"u-url\" shape=\"rect\" coords=\"0,0,82,126\" href=\"http://microformats.org/\" alt=\"microformats.org\">\n    </map>\n\n    <img class=\"u-photo\" src=\"images/logo.gif\" alt=\"company logos\">\n\n    <object class=\"u-url\" data=\"http://microformats.org/wiki/microformats2-parsing\"></object>\n\n    <abbr class=\"u-url\" title=\"http://microformats.org/wiki/value-class-pattern\">value-class-pattern</abbr> \n    <data class=\"u-url\" value=\"http://microformats.org/wiki/\"></data>\n    <p class=\"u-url\">http://microformats.org/discuss</p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-entry"],"properties":{"name":["microformats.org at 7"],"url":["http://microformats.org/","http://microformats.org/2012/06/25/microformats-org-at-7","http://microformats.org/2012/06/25/microformats-org-at-7","http://microformats.org/","http://microformats.org/wiki/microformats2-parsing","http://microformats.org/wiki/value-class-pattern","http://microformats.org/wiki/","http://microformats.org/discuss"],"photo":["http://example.com/images/logo.gif"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-entry");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "microformats.org at 7");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://microformats.org/");
   })

   it("found.items[0].properties['url'][1]", function(){
      assert.equal(found.items[0].properties["url"][1].toString(), "http://microformats.org/2012/06/25/microformats-org-at-7");
   })

   it("found.items[0].properties['url'][2]", function(){
      assert.equal(found.items[0].properties["url"][2].toString(), "http://microformats.org/2012/06/25/microformats-org-at-7");
   })

   it("found.items[0].properties['url'][3]", function(){
      assert.equal(found.items[0].properties["url"][3].toString(), "http://microformats.org/");
   })

   it("found.items[0].properties['url'][4]", function(){
      assert.equal(found.items[0].properties["url"][4].toString(), "http://microformats.org/wiki/microformats2-parsing");
   })

   it("found.items[0].properties['url'][5]", function(){
      assert.equal(found.items[0].properties["url"][5].toString(), "http://microformats.org/wiki/value-class-pattern");
   })

   it("found.items[0].properties['url'][6]", function(){
      assert.equal(found.items[0].properties["url"][6].toString(), "http://microformats.org/wiki/");
   })

   it("found.items[0].properties['url'][7]", function(){
      assert.equal(found.items[0].properties["url"][7].toString(), "http://microformats.org/discuss");
   })

   it("found.items[0].properties['photo'][0]", function(){
      assert.equal(found.items[0].properties["photo"][0].toString(), "http://example.com/images/logo.gif");
   })

})




