/*
Mocha integration test from: rel.html
The test was built on Wed Feb 20 2013 12:57:15 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('A rel=license (rel=license parsing test)', function() {
   var htmlFragment = "\n<a rel=\"license\" href=\"http://creativecommons.org/licenses/by/2.5/\">cc by 2.5</a>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["rel"],"properties":{"license":["http://creativecommons.org/licenses/by/2.5/"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "rel");
   })

   it("found.items[0].properties['license'][0]", function(){
      assert.equal(found.items[0].properties["license"][0].toString(), "http://creativecommons.org/licenses/by/2.5/");
   })

})




describe('A rel=nofollow (rel=nofollow parsing test)', function() {
   var htmlFragment = "\n<a rel=\"nofollow\" href=\"http://microformats.org/wiki/microformats:copyrights\">Copyrights</a>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["rel"],"properties":{"nofollow":["http://microformats.org/wiki/microformats:copyrights"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "rel");
   })

   it("found.items[0].properties['nofollow'][0]", function(){
      assert.equal(found.items[0].properties["nofollow"][0].toString(), "http://microformats.org/wiki/microformats:copyrights");
   })

})




describe('A xfn elsewhere list (xfn parsing test)', function() {
   var htmlFragment = "\n<ul>\n    <li><a rel=\"me\" href=\"http://twitter.com/glennjones\">twitter</a></li>\n    <li><a rel=\"me\" href=\"http://delicious.com/glennjonesnet/\">delicious</a></li>\n    <li><a rel=\"me\" href=\"https://plus.google.com/u/0/105161464208920272734/about\">google+</a></li>\n    <li><a rel=\"me\" href=\"http://lanyrd.com/people/glennjones/\">lanyrd</a></li>\n    <li><a rel=\"me\" href=\"http://github.com/glennjones\">github</a></li>\n    <li><a rel=\"me\" href=\"http://www.flickr.com/photos/glennjonesnet/\">flickr</a></li>\n    <li><a rel=\"me\" href=\"http://www.linkedin.com/in/glennjones\">linkedin</a></li>\n    <li><a rel=\"me\" href=\"http://www.slideshare.net/glennjones/presentations\">slideshare</a></li>\n</ul>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["rel"],"properties":{"me":["http://twitter.com/glennjones","http://delicious.com/glennjonesnet/","https://plus.google.com/u/0/105161464208920272734/about","http://lanyrd.com/people/glennjones/","http://github.com/glennjones","http://www.flickr.com/photos/glennjonesnet/","http://www.linkedin.com/in/glennjones","http://www.slideshare.net/glennjones/presentations"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "rel");
   })

   it("found.items[0].properties['me'][0]", function(){
      assert.equal(found.items[0].properties["me"][0].toString(), "http://twitter.com/glennjones");
   })

   it("found.items[0].properties['me'][1]", function(){
      assert.equal(found.items[0].properties["me"][1].toString(), "http://delicious.com/glennjonesnet/");
   })

   it("found.items[0].properties['me'][2]", function(){
      assert.equal(found.items[0].properties["me"][2].toString(), "https://plus.google.com/u/0/105161464208920272734/about");
   })

   it("found.items[0].properties['me'][3]", function(){
      assert.equal(found.items[0].properties["me"][3].toString(), "http://lanyrd.com/people/glennjones/");
   })

   it("found.items[0].properties['me'][4]", function(){
      assert.equal(found.items[0].properties["me"][4].toString(), "http://github.com/glennjones");
   })

   it("found.items[0].properties['me'][5]", function(){
      assert.equal(found.items[0].properties["me"][5].toString(), "http://www.flickr.com/photos/glennjonesnet/");
   })

   it("found.items[0].properties['me'][6]", function(){
      assert.equal(found.items[0].properties["me"][6].toString(), "http://www.linkedin.com/in/glennjones");
   })

   it("found.items[0].properties['me'][7]", function(){
      assert.equal(found.items[0].properties["me"][7].toString(), "http://www.slideshare.net/glennjones/presentations");
   })

})




describe('A xfn all properties (xfn parsing test)', function() {
   var htmlFragment = "\n<ul>\n    <li><a rel=\"friend\" href=\"http://example.com/propfile/jane\">jane</a></li>\n    <li><a rel=\"acquaintance\" href=\"http://example.com/propfile/jeo\">jeo</a></li>\n    <li><a rel=\"contact\" href=\"http://example.com/propfile/lily\">lily</a></li>\n    <li><a rel=\"met\" href=\"http://example.com/propfile/oliver\">oliver</a></li>\n    <li><a rel=\"co-worker\" href=\"http://example.com/propfile/emily\">emily</a></li>\n    <li><a rel=\"colleague\" href=\"http://example.com/propfile/jack\">jack</a></li>\n    <li><a rel=\"neighbor\" href=\"http://example.com/propfile/isabella\">isabella</a></li>\n    <li><a rel=\"child\" href=\"http://example.com/propfile/harry\">harry</a></li>\n    <li><a rel=\"parent\" href=\"http://example.com/propfile/sophia\">sophia</a></li>\n    <li><a rel=\"sibling\" href=\"http://example.com/propfile/charlie\">charlie</a></li>\n    <li><a rel=\"spouse\" href=\"http://example.com/propfile/olivia\">olivia</a></li>\n    <li><a rel=\"kin\" href=\"http://example.com/propfile/james\">james</a></li>\n    <li><a rel=\"muse\" href=\"http://example.com/propfile/ava\">ava</a></li>\n    <li><a rel=\"crush\" href=\"http://example.com/propfile/joshua\">joshua</a></li>\n    <li><a rel=\"date\" href=\"http://example.com/propfile/chloe\">chloe</a></li>\n    <li><a rel=\"sweetheart\" href=\"http://example.com/propfile/alfie\">alfie</a></li>\n    <li><a rel=\"me\" href=\"http://example.com/propfile/isla\">isla</a></li>\n</ul>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["rel"],"properties":{"friend":["http://example.com/propfile/jane"],"acquaintance":["http://example.com/propfile/jeo"],"contact":["http://example.com/propfile/lily"],"met":["http://example.com/propfile/oliver"],"co-worker":["http://example.com/propfile/emily"],"colleague":["http://example.com/propfile/jack"],"neighbor":["http://example.com/propfile/isabella"],"child":["http://example.com/propfile/harry"],"parent":["http://example.com/propfile/sophia"],"sibling":["http://example.com/propfile/charlie"],"spouse":["http://example.com/propfile/olivia"],"kin":["http://example.com/propfile/james"],"muse":["http://example.com/propfile/ava"],"crush":["http://example.com/propfile/joshua"],"date":["http://example.com/propfile/chloe"],"sweetheart":["http://example.com/propfile/alfie"],"me":["http://example.com/propfile/isla"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "rel");
   })

   it("found.items[0].properties['friend'][0]", function(){
      assert.equal(found.items[0].properties["friend"][0].toString(), "http://example.com/propfile/jane");
   })

   it("found.items[0].properties['acquaintance'][0]", function(){
      assert.equal(found.items[0].properties["acquaintance"][0].toString(), "http://example.com/propfile/jeo");
   })

   it("found.items[0].properties['contact'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].toString(), "http://example.com/propfile/lily");
   })

   it("found.items[0].properties['met'][0]", function(){
      assert.equal(found.items[0].properties["met"][0].toString(), "http://example.com/propfile/oliver");
   })

   it("found.items[0].properties['co-worker'][0]", function(){
      assert.equal(found.items[0].properties["co-worker"][0].toString(), "http://example.com/propfile/emily");
   })

   it("found.items[0].properties['colleague'][0]", function(){
      assert.equal(found.items[0].properties["colleague"][0].toString(), "http://example.com/propfile/jack");
   })

   it("found.items[0].properties['neighbor'][0]", function(){
      assert.equal(found.items[0].properties["neighbor"][0].toString(), "http://example.com/propfile/isabella");
   })

   it("found.items[0].properties['child'][0]", function(){
      assert.equal(found.items[0].properties["child"][0].toString(), "http://example.com/propfile/harry");
   })

   it("found.items[0].properties['parent'][0]", function(){
      assert.equal(found.items[0].properties["parent"][0].toString(), "http://example.com/propfile/sophia");
   })

   it("found.items[0].properties['sibling'][0]", function(){
      assert.equal(found.items[0].properties["sibling"][0].toString(), "http://example.com/propfile/charlie");
   })

   it("found.items[0].properties['spouse'][0]", function(){
      assert.equal(found.items[0].properties["spouse"][0].toString(), "http://example.com/propfile/olivia");
   })

   it("found.items[0].properties['kin'][0]", function(){
      assert.equal(found.items[0].properties["kin"][0].toString(), "http://example.com/propfile/james");
   })

   it("found.items[0].properties['muse'][0]", function(){
      assert.equal(found.items[0].properties["muse"][0].toString(), "http://example.com/propfile/ava");
   })

   it("found.items[0].properties['crush'][0]", function(){
      assert.equal(found.items[0].properties["crush"][0].toString(), "http://example.com/propfile/joshua");
   })

   it("found.items[0].properties['date'][0]", function(){
      assert.equal(found.items[0].properties["date"][0].toString(), "http://example.com/propfile/chloe");
   })

   it("found.items[0].properties['sweetheart'][0]", function(){
      assert.equal(found.items[0].properties["sweetheart"][0].toString(), "http://example.com/propfile/alfie");
   })

   it("found.items[0].properties['me'][0]", function(){
      assert.equal(found.items[0].properties["me"][0].toString(), "http://example.com/propfile/isla");
   })

})




describe('A h-card xfn pattern (xfn parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-card\">\n    <p><a class=\"p-name u-url\" rel=\"me\" href=\"http://glennjones.net/\">Glenn Jones</a></p>\n    <ul>\n        <li><a rel=\"me\" href=\"http://twitter.com/glennjones\">twitter</a></li>\n        <li><a rel=\"me\" href=\"http://delicious.com/glennjonesnet/\">delicious</a></li>\n        <li><a rel=\"me\" href=\"https://plus.google.com/u/0/105161464208920272734/about\">google+</a></li>\n        <li><a rel=\"me\" href=\"http://lanyrd.com/people/glennjones/\">lanyrd</a></li>\n        <li><a rel=\"me\" href=\"http://github.com/glennjones\">github</a></li>\n        <li><a rel=\"me\" href=\"http://www.flickr.com/photos/glennjonesnet/\">flickr</a></li>\n        <li><a rel=\"me\" href=\"http://www.linkedin.com/in/glennjones\">linkedin</a></li>\n        <li><a rel=\"me\" href=\"http://www.slideshare.net/glennjones/presentations\">slideshare</a></li>\n    </ul>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Glenn Jones"],"url":["http://glennjones.net/"]},"children":[{"type":["rel"],"properties":{"me":["http://glennjones.net/","http://twitter.com/glennjones","http://delicious.com/glennjonesnet/","https://plus.google.com/u/0/105161464208920272734/about","http://lanyrd.com/people/glennjones/","http://github.com/glennjones","http://www.flickr.com/photos/glennjonesnet/","http://www.linkedin.com/in/glennjones","http://www.slideshare.net/glennjones/presentations"]}}]},{"type":["rel"],"properties":{"me":["http://glennjones.net/","http://twitter.com/glennjones","http://delicious.com/glennjonesnet/","https://plus.google.com/u/0/105161464208920272734/about","http://lanyrd.com/people/glennjones/","http://github.com/glennjones","http://www.flickr.com/photos/glennjonesnet/","http://www.linkedin.com/in/glennjones","http://www.slideshare.net/glennjones/presentations"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Glenn Jones");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://glennjones.net/");
   })

})




