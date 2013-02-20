/*
Mocha integration test from: hresume.html
The test was built on Wed Feb 20 2013 12:57:15 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Just a name (h-resume parsing test)', function() {
   var htmlFragment = "\n<p class=\"h-resume\">Tim Berners-Lee, invented the World Wide Web.</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-resume"],"properties":{"name":["Tim Berners-Lee, invented the World Wide Web."]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-resume");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Tim Berners-Lee, invented the World Wide Web.");
   })

})




describe('Contact (h-resume parsing test)', function() {
   var htmlFragment = "\n<div class=\"hresume\">\n    <div class=\"contact vcard\">\n        <p class=\"fn\">Tim Berners-Lee</p>\n        <p class=\"org\">MIT</p>\n        <p class=\"adr\">\n            <span class=\"street-address\">32 Vassar Street</span>, \n            <span class=\"extended-address\">Room 32-G524</span>, \n            <span class=\"locality\">Cambridge</span>,  \n            <span class=\"region\">MA</span> \n            <span class=\"postal-code\">02139</span>, \n            <span class=\"country-name\">USA</span>.  \n            (<span class=\"type\">Work</span>)\n        </p>\n        <p>Tel:<span class=\"tel\">+1 (617) 253 5702</span></p>\n        <p>Email:<a class=\"email\" href=\"mailto:timbl@w3.org\">timbl@w3.org</a></p>\n    </div>\n    <p class=\"summary\">Invented the World Wide Web.</p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-resume"],"properties":{"contact":[{"value":"Tim Berners-Lee MIT 32 Vassar Street, Room 32-G524, Cambridge, MA 02139, USA. (Work) Tel:+1 (617) 253 5702 Email:timbl@w3.org","type":["h-card"],"properties":{"name":["Tim Berners-Lee"],"org":["MIT"],"adr":[{"value":"32 Vassar Street, Room 32-G524, Cambridge, MA 02139, USA. (Work)","type":["h-adr"],"properties":{"street-address":["32 Vassar Street"],"extended-address":["Room 32-G524"],"locality":["Cambridge"],"region":["MA"],"postal-code":["02139"],"country-name":["USA"],"name":["32 Vassar Street, Room 32-G524, Cambridge, MA 02139, USA. (Work)"]}}],"tel":["+1 (617) 253 5702"],"email":["mailto:timbl@w3.org"]}}],"summary":["Invented the World Wide Web."]}},{"type":["h-card"],"properties":{"name":["Tim Berners-Lee"],"org":["MIT"],"adr":[{"value":"32 Vassar Street, Room 32-G524, Cambridge, MA 02139, USA. (Work)","type":["h-adr"],"properties":{"street-address":["32 Vassar Street"],"extended-address":["Room 32-G524"],"locality":["Cambridge"],"region":["MA"],"postal-code":["02139"],"country-name":["USA"],"name":["32 Vassar Street, Room 32-G524, Cambridge, MA 02139, USA. (Work)"]}}],"tel":["+1 (617) 253 5702"],"email":["mailto:timbl@w3.org"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-resume");
   })

   it("found.items[0].properties['contact'][0].value", function(){
      assert.equal(found.items[0].properties["contact"][0].value, "Tim Berners-Lee MIT 32 Vassar Street, Room 32-G524, Cambridge, MA 02139, USA. (Work) Tel:+1 (617) 253 5702 Email:timbl@w3.org");
   })

   it("found.items[0].properties['contact'][0].type[0]", function(){
      assert.equal(found.items[0].properties["contact"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['contact'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["name"][0].toString(), "Tim Berners-Lee");
   })

   it("found.items[0].properties['contact'][0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["org"][0].toString(), "MIT");
   })

   it("found.items[0].properties['contact'][0].properties['adr'][0].value", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["adr"][0].value, "32 Vassar Street, Room 32-G524, Cambridge, MA 02139, USA. (Work)");
   })

   it("found.items[0].properties['contact'][0].properties['adr'][0].type[0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["adr"][0].type[0].toString(), "h-adr");
   })

   it("found.items[0].properties['contact'][0].properties['adr'][0].properties['street-address'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["adr"][0].properties["street-address"][0].toString(), "32 Vassar Street");
   })

   it("found.items[0].properties['contact'][0].properties['adr'][0].properties['extended-address'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["adr"][0].properties["extended-address"][0].toString(), "Room 32-G524");
   })

   it("found.items[0].properties['contact'][0].properties['adr'][0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["adr"][0].properties["locality"][0].toString(), "Cambridge");
   })

   it("found.items[0].properties['contact'][0].properties['adr'][0].properties['region'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["adr"][0].properties["region"][0].toString(), "MA");
   })

   it("found.items[0].properties['contact'][0].properties['adr'][0].properties['postal-code'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["adr"][0].properties["postal-code"][0].toString(), "02139");
   })

   it("found.items[0].properties['contact'][0].properties['adr'][0].properties['country-name'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["adr"][0].properties["country-name"][0].toString(), "USA");
   })

   it("found.items[0].properties['contact'][0].properties['adr'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["adr"][0].properties["name"][0].toString(), "32 Vassar Street, Room 32-G524, Cambridge, MA 02139, USA. (Work)");
   })

   it("found.items[0].properties['contact'][0].properties['tel'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["tel"][0].toString(), "+1 (617) 253 5702");
   })

   it("found.items[0].properties['contact'][0].properties['email'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["email"][0].toString(), "mailto:timbl@w3.org");
   })

   it("found.items[0].properties['summary'][0]", function(){
      assert.equal(found.items[0].properties["summary"][0].toString(), "Invented the World Wide Web.");
   })

})




describe('Work experience (h-resume parsing test)', function() {
   var htmlFragment = "\n<div class=\"hresume\">\n    <div class=\"contact vcard\">\n        <p class=\"fn\">Tim Berners-Lee</p>\n        <p class=\"title\">Director of the World Wide Web Foundation</p>\n    </div>\n    <p class=\"summary\">Invented the World Wide Web.</p><hr>\n    <div class=\"experience vevent vcard\">\n        <p class=\"title\">Director</p>\n        <p><a class=\"fn summary org url\" href=\"http://www.webfoundation.org/\">World Wide Web Foundation</a></p>\n        <p>\n            <time class=\"dtstart\" datetime=\"2009-01-18\">Jan 2009</time> – Present\n            <time class=\"duration\" datetime=\"P2Y11M\">(2 years 11 month)</time>\n        </p>\n    </div>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-resume"],"properties":{"contact":[{"value":"Tim Berners-Lee Director of the World Wide Web Foundation","type":["h-card"],"properties":{"name":["Tim Berners-Lee"],"title":["Director of the World Wide Web Foundation"]}}],"summary":["Invented the World Wide Web."],"experience":[{"value":"Director World Wide Web Foundation Jan 2009 - Present (2 years 11 month)","type":["h-event","h-card"],"properties":{"title":["Director"],"name":["World Wide Web Foundation"],"org":["World Wide Web Foundation"],"url":["http://www.webfoundation.org/"],"start":["2009-01-18"],"duration":["P2Y11M"]}}]}},{"type":["h-card"],"properties":{"name":["Tim Berners-Lee"],"title":["Director of the World Wide Web Foundation"]}},{"type":["h-event"],"properties":{"name":["World Wide Web Foundation"],"url":["http://www.webfoundation.org/"],"start":["2009-01-18"],"duration":["P2Y11M"]}},{"type":["h-card"],"properties":{"title":["Director"],"name":["World Wide Web Foundation"],"org":["World Wide Web Foundation"],"url":["http://www.webfoundation.org/"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-resume");
   })

   it("found.items[0].properties['contact'][0].value", function(){
      assert.equal(found.items[0].properties["contact"][0].value, "Tim Berners-Lee Director of the World Wide Web Foundation");
   })

   it("found.items[0].properties['contact'][0].type[0]", function(){
      assert.equal(found.items[0].properties["contact"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['contact'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["name"][0].toString(), "Tim Berners-Lee");
   })

   it("found.items[0].properties['contact'][0].properties['title'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["title"][0].toString(), "Director of the World Wide Web Foundation");
   })

   it("found.items[0].properties['summary'][0]", function(){
      assert.equal(found.items[0].properties["summary"][0].toString(), "Invented the World Wide Web.");
   })

   it("found.items[0].properties['experience'][0].value", function(){
      assert.equal(found.items[0].properties["experience"][0].value, "Director World Wide Web Foundation Jan 2009 - Present (2 years 11 month)");
   })

   it("found.items[0].properties['experience'][0].type[0]", function(){
      assert.equal(found.items[0].properties["experience"][0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['experience'][0].type[1]", function(){
      assert.equal(found.items[0].properties["experience"][0].type[1].toString(), "h-card");
   })

   it("found.items[0].properties['experience'][0].properties['title'][0]", function(){
      assert.equal(found.items[0].properties["experience"][0].properties["title"][0].toString(), "Director");
   })

   it("found.items[0].properties['experience'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["experience"][0].properties["name"][0].toString(), "World Wide Web Foundation");
   })

   it("found.items[0].properties['experience'][0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["experience"][0].properties["org"][0].toString(), "World Wide Web Foundation");
   })

   it("found.items[0].properties['experience'][0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["experience"][0].properties["url"][0].toString(), "http://www.webfoundation.org/");
   })

   it("found.items[0].properties['experience'][0].properties['start'][0]", function(){
      assert.equal(found.items[0].properties["experience"][0].properties["start"][0].toString(), "2009-01-18");
   })

   it("found.items[0].properties['experience'][0].properties['duration'][0]", function(){
      assert.equal(found.items[0].properties["experience"][0].properties["duration"][0].toString(), "P2Y11M");
   })

})




describe('Educational experience (h-resume parsing test)', function() {
   var htmlFragment = "\n<div class=\"hresume\">\n    <div class=\"contact vcard\">\n        <p class=\"fn\">Tim Berners-Lee</p>\n        <p class=\"title\">Director of the World Wide Web Foundation</p>\n    </div>\n    <p class=\"summary\">Invented the World Wide Web.</p><hr>\n    <p class=\"education vevent vcard\">\n        <span class=\"fn summary org\">The Queen's College, Oxford University</span>, \n        <span class=\"description\">BA Hons (I) Physics</span> \n        <time class=\"dtstart\" datetime=\"1973-09\">1973</time> –\n        <time class=\"dtend\" datetime=\"1976-06\">1976</time>\n    </p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-resume"],"properties":{"contact":[{"value":"Tim Berners-Lee Director of the World Wide Web Foundation","type":["h-card"],"properties":{"name":["Tim Berners-Lee"],"title":["Director of the World Wide Web Foundation"]}}],"summary":["Invented the World Wide Web."],"education":[{"value":"The Queen's College, Oxford University, BA Hons (I) Physics 1973 - 1976","type":["h-event","h-card"],"properties":{"name":["The Queen's College, Oxford University"],"org":["The Queen's College, Oxford University"],"description":["BA Hons (I) Physics"],"start":["1973-09"],"end":["1976-06"]}}]}},{"type":["h-card"],"properties":{"name":["Tim Berners-Lee"],"title":["Director of the World Wide Web Foundation"]}},{"type":["h-event"],"properties":{"name":["The Queen's College, Oxford University"],"description":["BA Hons (I) Physics"],"start":["1973-09"],"end":["1976-06"]}},{"type":["h-card"],"properties":{"name":["The Queen's College, Oxford University"],"org":["The Queen's College, Oxford University"],"description":["BA Hons (I) Physics"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-resume");
   })

   it("found.items[0].properties['contact'][0].value", function(){
      assert.equal(found.items[0].properties["contact"][0].value, "Tim Berners-Lee Director of the World Wide Web Foundation");
   })

   it("found.items[0].properties['contact'][0].type[0]", function(){
      assert.equal(found.items[0].properties["contact"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['contact'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["name"][0].toString(), "Tim Berners-Lee");
   })

   it("found.items[0].properties['contact'][0].properties['title'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["title"][0].toString(), "Director of the World Wide Web Foundation");
   })

   it("found.items[0].properties['summary'][0]", function(){
      assert.equal(found.items[0].properties["summary"][0].toString(), "Invented the World Wide Web.");
   })

   it("found.items[0].properties['education'][0].value", function(){
      assert.equal(found.items[0].properties["education"][0].value, "The Queen's College, Oxford University, BA Hons (I) Physics 1973 - 1976");
   })

   it("found.items[0].properties['education'][0].type[0]", function(){
      assert.equal(found.items[0].properties["education"][0].type[0].toString(), "h-event");
   })

   it("found.items[0].properties['education'][0].type[1]", function(){
      assert.equal(found.items[0].properties["education"][0].type[1].toString(), "h-card");
   })

   it("found.items[0].properties['education'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["education"][0].properties["name"][0].toString(), "The Queen's College, Oxford University");
   })

   it("found.items[0].properties['education'][0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["education"][0].properties["org"][0].toString(), "The Queen's College, Oxford University");
   })

   it("found.items[0].properties['education'][0].properties['description'][0]", function(){
      assert.equal(found.items[0].properties["education"][0].properties["description"][0].toString(), "BA Hons (I) Physics");
   })

   it("found.items[0].properties['education'][0].properties['start'][0]", function(){
      assert.equal(found.items[0].properties["education"][0].properties["start"][0].toString(), "1973-09");
   })

   it("found.items[0].properties['education'][0].properties['end'][0]", function(){
      assert.equal(found.items[0].properties["education"][0].properties["end"][0].toString(), "1976-06");
   })

})




describe('Skills (h-resume parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-resume\">\n    \n    <p>\n        <span class=\"contact vcard\"><span class=\"fn\">Tim Berners-Lee</span></span>, \n        <span class=\"summary\">invented the World Wide Web</span>.\n    </p>\n    Skills:     \n    <ul>\n        <li><a class=\"skill\" rel=\"tag\" href=\"http://example.com/skills/informationsystems\">information systems</a></li>\n        <li><a class=\"skill\" rel=\"tag\" href=\"http://example.com/skills/advocacy\">advocacy</a></li>\n        <li><a class=\"skill\" rel=\"tag\" href=\"http://example.com/skills/informationsystems\">leadership</a></li>\n    <ul>   \n</ul></ul></div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-resume"],"properties":{"contact":[{"value":"Tim Berners-Lee","type":["h-card"],"properties":{"name":["Tim Berners-Lee"]}}],"summary":["invented the World Wide Web"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-resume");
   })

   it("found.items[0].properties['contact'][0].value", function(){
      assert.equal(found.items[0].properties["contact"][0].value, "Tim Berners-Lee");
   })

   it("found.items[0].properties['contact'][0].type[0]", function(){
      assert.equal(found.items[0].properties["contact"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['contact'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["name"][0].toString(), "Tim Berners-Lee");
   })

   it("found.items[0].properties['summary'][0]", function(){
      assert.equal(found.items[0].properties["summary"][0].toString(), "invented the World Wide Web");
   })

})




describe('Affiliations (h-resume parsing test)', function() {
   var htmlFragment = "\n<div class=\"h-resume\">\n    <p>\n        <span class=\"contact vcard\"><span class=\"fn\">Tim Berners-Lee</span></span>, \n        <span class=\"summary\">invented the World Wide Web</span>.\n    </p>\n    Belongs to following groups:\n    <p>   \n        <a class=\"affiliation vcard\" href=\"http://www.w3.org/\">\n            <img class=\"fn photo\" alt=\"W3C\" src=\"http://www.w3.org/Icons/WWW/w3c_home_nb.png\">\n        </a>\n    </p>   \n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-resume"],"properties":{"contact":[{"value":"Tim Berners-Lee","type":["h-card"],"properties":{"name":["Tim Berners-Lee"]}}],"summary":["invented the World Wide Web"],"affiliation":[{"value":"","type":["h-card"],"properties":{"name":["W3C"],"photo":["http://www.w3.org/Icons/WWW/w3c_home_nb.png"],"url":["http://www.w3.org/"]}}]}},{"type":["h-card"],"properties":{"name":["W3C"],"photo":["http://www.w3.org/Icons/WWW/w3c_home_nb.png"],"url":["http://www.w3.org/"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-resume");
   })

   it("found.items[0].properties['contact'][0].value", function(){
      assert.equal(found.items[0].properties["contact"][0].value, "Tim Berners-Lee");
   })

   it("found.items[0].properties['contact'][0].type[0]", function(){
      assert.equal(found.items[0].properties["contact"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['contact'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["contact"][0].properties["name"][0].toString(), "Tim Berners-Lee");
   })

   it("found.items[0].properties['summary'][0]", function(){
      assert.equal(found.items[0].properties["summary"][0].toString(), "invented the World Wide Web");
   })

   it("found.items[0].properties['affiliation'][0].type[0]", function(){
      assert.equal(found.items[0].properties["affiliation"][0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['affiliation'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["affiliation"][0].properties["name"][0].toString(), "W3C");
   })

   it("found.items[0].properties['affiliation'][0].properties['photo'][0]", function(){
      assert.equal(found.items[0].properties["affiliation"][0].properties["photo"][0].toString(), "http://www.w3.org/Icons/WWW/w3c_home_nb.png");
   })

   it("found.items[0].properties['affiliation'][0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["affiliation"][0].properties["url"][0].toString(), "http://www.w3.org/");
   })

})




