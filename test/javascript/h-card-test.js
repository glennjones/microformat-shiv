/*
Mocha integration test from: h-card.html
The test was built on Wed Feb 20 2013 12:57:14 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Just a name (h-card parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-card\">Frances Berriman</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Frances Berriman"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Frances Berriman");
   })

})




describe('Just a hyperlink (h-card parsing test)', function() {
   var htmlFragment = "\n<a class=\"h-card\" href=\"http://benward.me/\">Ben Ward</a>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Ben Ward"],"url":["http://benward.me/"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Ben Ward");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://benward.me/");
   })

})




describe('A hyperlinked photo (h-card parsing test)', function() {
   var htmlFragment = "\n    <a class=\"h-card\" href=\"http://rohit.khare.org/\">\n   <img alt=\"Rohit Khare\" src=\"https://twimg0-a.akamaihd.net/profile_images/53307499/180px-Rohit-sq.jpg\">\n</a>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Rohit Khare"],"photo":["https://twimg0-a.akamaihd.net/profile_images/53307499/180px-Rohit-sq.jpg"],"url":["http://rohit.khare.org/"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Rohit Khare");
   })

   it("found.items[0].properties['photo'][0]", function(){
      assert.equal(found.items[0].properties["photo"][0].toString(), "https://twimg0-a.akamaihd.net/profile_images/53307499/180px-Rohit-sq.jpg");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://rohit.khare.org/");
   })

})




describe('Single child implied pattern (h-card parsing test)', function() {
   var htmlFragment = "\n<a class=\"h-card\" href=\"http://people.opera.com/howcome/\" title=\"Håkon Wium Lie, CTO Opera\">\n  <article>\n     <h2 class=\"p-name\">Håkon Wium Lie</h2>\n     <img src=\"http://upload.wikimedia.org/wikipedia/commons/thumb/9/96/H%C3%A5kon-Wium-Lie-2009-03.jpg/215px-H%C3%A5kon-Wium-Lie-2009-03.jpg\">\n  </article>\n</a>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Håkon Wium Lie"],"photo":["http://upload.wikimedia.org/wikipedia/commons/thumb/9/96/H%C3%A5kon-Wium-Lie-2009-03.jpg/215px-H%C3%A5kon-Wium-Lie-2009-03.jpg"],"url":["http://people.opera.com/howcome/"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Håkon Wium Lie");
   })

   it("found.items[0].properties['photo'][0]", function(){
      assert.equal(found.items[0].properties["photo"][0].toString(), "http://upload.wikimedia.org/wikipedia/commons/thumb/9/96/H%C3%A5kon-Wium-Lie-2009-03.jpg/215px-H%C3%A5kon-Wium-Lie-2009-03.jpg");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://people.opera.com/howcome/");
   })

})




describe('An extended description (h-card parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-card\">\n  <img class=\"u-photo\" alt=\"photo of Mitchell\" src=\"http://blog.mozilla.org/press/files/2012/04/mitchell-baker.jpg\">\n  <p>\n    <a class=\"p-name u-url\" href=\"http://blog.lizardwrangler.com/\">Mitchell Baker</a>\n    (<a class=\"u-url\" href=\"https://twitter.com/MitchellBaker\">@MitchellBaker</a>)\n    <span class=\"p-org\">Mozilla Foundation</span>\n  </p>\n  <p class=\"p-note\">Mitchell is responsible for setting the direction and scope of the Mozilla Foundation and its activities.</p>\n  <p><span class=\"p-category\">Strategy</span> and <span class=\"p-category\">Leadership</span></p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"photo":["http://blog.mozilla.org/press/files/2012/04/mitchell-baker.jpg"],"url":["http://blog.lizardwrangler.com/","https://twitter.com/MitchellBaker"],"name":["Mitchell Baker"],"org":["Mozilla Foundation"],"note":["Mitchell is responsible for setting the direction and scope of the Mozilla Foundation and its activities."],"category":["Strategy","Leadership"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['photo'][0]", function(){
      assert.equal(found.items[0].properties["photo"][0].toString(), "http://blog.mozilla.org/press/files/2012/04/mitchell-baker.jpg");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://blog.lizardwrangler.com/");
   })

   it("found.items[0].properties['url'][1]", function(){
      assert.equal(found.items[0].properties["url"][1].toString(), "https://twitter.com/MitchellBaker");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Mitchell Baker");
   })

   it("found.items[0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["org"][0].toString(), "Mozilla Foundation");
   })

   it("found.items[0].properties['note'][0]", function(){
      assert.equal(found.items[0].properties["note"][0].toString(), "Mitchell is responsible for setting the direction and scope of the Mozilla Foundation and its activities.");
   })

   it("found.items[0].properties['category'][0]", function(){
      assert.equal(found.items[0].properties["category"][0].toString(), "Strategy");
   })

   it("found.items[0].properties['category'][1]", function(){
      assert.equal(found.items[0].properties["category"][1].toString(), "Leadership");
   })

})




describe('Organization marked-up with h-card (h-card parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-card\">\n  <a class=\"p-name u-url\" href=\"http://blog.lizardwrangler.com/\">Mitchell Baker</a> \n  (<a class=\"p-org h-card\" href=\"http://mozilla.org/\">Mozilla Foundation</a>)\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"url":["http://blog.lizardwrangler.com/"],"name":["Mitchell Baker"],"org":[{"value":"Mozilla Foundation","type":["h-card"],"properties":{"name":["Mozilla Foundation"],"url":["http://mozilla.org/"]}}]}},{"type":["h-card"],"properties":{"name":["Mozilla Foundation"],"url":["http://mozilla.org/"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://blog.lizardwrangler.com/");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Mitchell Baker");
   })

   it("found.items[0].properties['org'][0].value", function(){
      assert.equal(found.items[0].properties["org"][0].value, "Mozilla Foundation");
   })

   it("found.items[0].properties['org'][0].type[0]", function(){
      assert.equal(found.items[0].properties["org"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['org'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["org"][0].properties["name"][0].toString(), "Mozilla Foundation");
   })

   it("found.items[0].properties['org'][0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["org"][0].properties["url"][0].toString(), "http://mozilla.org/");
   })

})




describe('Organization marked-up with h-card and h-org (h-card parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-card\">\n  <a class=\"p-name u-url\" href=\"http://blog.lizardwrangler.com/\">Mitchell Baker</a> \n  (<a class=\"p-org h-card h-org\" href=\"http://mozilla.org/\">Mozilla Foundation</a>)\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Mitchell Baker"],"url":["http://blog.lizardwrangler.com/"],"org":[{"value":"Mozilla Foundation","type":["h-card","h-org"],"properties":{"name":["Mozilla Foundation"],"url":["http://mozilla.org/"]}}]}},{"type":["h-card"],"properties":{"name":["Mozilla Foundation"],"url":["http://mozilla.org/"]}},{"type":["h-org"],"properties":{"name":["Mozilla Foundation"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Mitchell Baker");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://blog.lizardwrangler.com/");
   })

   it("found.items[0].properties['org'][0].value", function(){
      assert.equal(found.items[0].properties["org"][0].value, "Mozilla Foundation");
   })

   it("found.items[0].properties['org'][0].type[0]", function(){
      assert.equal(found.items[0].properties["org"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['org'][0].type[1]", function(){
      assert.equal(found.items[0].properties["org"][0].type[1].toString(), "h-org");
   })

   it("found.items[0].properties['org'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["org"][0].properties["name"][0].toString(), "Mozilla Foundation");
   })

   it("found.items[0].properties['org'][0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["org"][0].properties["url"][0].toString(), "http://mozilla.org/");
   })

})




describe('Additional nested microformats (h-card parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-card\">\n  <a class=\"p-name u-url\" href=\"http://blog.lizardwrangler.com/\">Mitchell Baker</a> \n  (<a class=\"h-org h-card\" href=\"http://mozilla.org/\">Mozilla Foundation</a>)\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Mitchell Baker"],"url":["http://blog.lizardwrangler.com/"]},"children":[{"type":["h-card","h-org"],"properties":{"name":["Mozilla Foundation"],"url":["http://mozilla.org/"]}}]},{"type":["h-card"],"properties":{"name":["Mozilla Foundation"],"url":["http://mozilla.org/"]}},{"type":["h-org"],"properties":{"name":["Mozilla Foundation"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Mitchell Baker");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://blog.lizardwrangler.com/");
   })

})




describe('p-property (h-card parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-card\">\n    <!-- innerText and value pattern -->\n    <span class=\"p-name\">\n        <span class=\"p-given-name value\">John</span> \n        <abbr class=\"p-additional-name\" title=\"Peter\">P</abbr>  \n        <span class=\"p-family-name value \">Doe</span> \n    </span>\n    <data class=\"p-honorific-suffix\" value=\"MSc\"></data>\n    \n    <!-- theses should return no value -->\n    <br class=\"p-honorific-suffix\">BSc<br>\n    <hr class=\"p-honorific-suffix\">BA\n    \n    <!-- image and area tags -->\n    <img class=\"p-honorific-suffix\" src=\"images/logo.gif\" alt=\"PHD\">\n    <img src=\"images/logo.gif\" alt=\"company logos\" usemap=\"#logomap\">\n    <map name=\"logomap\">\n        <area class=\"p-org\" shape=\"rect\" coords=\"0,0,82,126\" href=\"madgex.htm\" alt=\"Madgex\">\n        <area class=\"p-org\" shape=\"circle\" coords=\"90,58,3\" href=\"mozilla.htm\" alt=\"Mozilla\">\n    </map>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["John Doe"],"given-name":["John"],"additional-name":["Peter"],"family-name":["Doe"],"honorific-suffix":["MSc","PHD"],"org":["Madgex","Mozilla"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "John Doe");
   })

   it("found.items[0].properties['given-name'][0]", function(){
      assert.equal(found.items[0].properties["given-name"][0].toString(), "John");
   })

   it("found.items[0].properties['additional-name'][0]", function(){
      assert.equal(found.items[0].properties["additional-name"][0].toString(), "Peter");
   })

   it("found.items[0].properties['family-name'][0]", function(){
      assert.equal(found.items[0].properties["family-name"][0].toString(), "Doe");
   })

   it("found.items[0].properties['honorific-suffix'][0]", function(){
      assert.equal(found.items[0].properties["honorific-suffix"][0].toString(), "MSc");
   })

   it("found.items[0].properties['honorific-suffix'][1]", function(){
      assert.equal(found.items[0].properties["honorific-suffix"][1].toString(), "PHD");
   })

   it("found.items[0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["org"][0].toString(), "Madgex");
   })

   it("found.items[0].properties['org'][1]", function(){
      assert.equal(found.items[0].properties["org"][1].toString(), "Mozilla");
   })

})




