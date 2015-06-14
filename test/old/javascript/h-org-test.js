/*
Mocha integration test from: h-org.html
The test was built on Wed Feb 20 2013 12:57:14 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Simple org (h-org parsing test)', function() {
   var htmlFragment = "\n<span class=\"h-org\">Mozilla Foundation</span>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-org"],"properties":{"name":["Mozilla Foundation"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-org");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Mozilla Foundation");
   })

})




describe('Just a hyperlink (h-org parsing test)', function() {
   var htmlFragment = "\n<a class=\"h-org\" href=\"http://mozilla.org/\">Mozilla Foundation</a>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-org"],"properties":{"name":["Mozilla Foundation"],"url":["http://mozilla.org/"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-org");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Mozilla Foundation");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://mozilla.org/");
   })

})




describe('Simple properties (h-org parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-org\">\n    <span class=\"p-organization-name\">W3C</span> - \n    <span class=\"p-organization-unit\">CSS Working Group</span>\n</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-org"],"properties":{"organization-name":["W3C"],"organization-unit":["CSS Working Group"],"name":["W3C - CSS Working Group"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-org");
   })

   it("found.items[0].properties['organization-name'][0]", function(){
      assert.equal(found.items[0].properties["organization-name"][0].toString(), "W3C");
   })

   it("found.items[0].properties['organization-unit'][0]", function(){
      assert.equal(found.items[0].properties["organization-unit"][0].toString(), "CSS Working Group");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "W3C - CSS Working Group");
   })

})




