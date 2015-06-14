/*
Mocha integration test from: hcard.html
The test was built on Wed Feb 20 2013 12:57:15 GMT+0000 (GMT)
*/

var assert = chai.assert;


describe('Just a name (hcard parsing test)', function() {
   var htmlFragment = "\n<p class=\"vcard\">Frances Berriman</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Frances Berriman"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Frances Berriman");
   })

})




describe('Just a hyperlink (hcard parsing test)', function() {
   var htmlFragment = "\n<a class=\"vcard\" href=\"http://benward.me/\">Ben Ward</a>\n"
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




describe('A hyperlinked photo (hcard parsing test)', function() {
   var htmlFragment = "\n    <a class=\"vcard\" href=\"http://rohit.khare.org/\">\n   <img alt=\"Rohit Khare\" src=\"https://twimg0-a.akamaihd.net/profile_images/53307499/180px-Rohit-sq.jpg\">\n</a>\n"
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




describe('Name properties (hcard parsing test)', function() {
   var htmlFragment = "\n<div class=\"vcard\">\n    <div class=\"name\">\n        <span class=\"honorific-prefix\">Dr</span> \n        <span class=\"given-name\">John</span> \n        <abbr class=\"additional-name\" title=\"Peter\">P</abbr>  \n        <span class=\"family-name\">Doe</span> \n        <data class=\"honorific-suffix\" value=\"MSc\"></data>\n        <img class=\"honorific-suffix\" src=\"images/logo.gif\" alt=\"PHD\">\n    </div>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"honorific-prefix":["Dr"],"given-name":["John"],"additional-name":["Peter"],"family-name":["Doe"],"honorific-suffix":["MSc","PHD"],"name":["Dr John P Doe"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['honorific-prefix'][0]", function(){
      assert.equal(found.items[0].properties["honorific-prefix"][0].toString(), "Dr");
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

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "Dr John P Doe");
   })

})




describe('Class attribute format (hcard parsing test)', function() {
   var htmlFragment = "\n<p class=\"vcard\">\n    <span class=\"profile-name fn n\">\n        <span class=\" given-name \">John</span> \n        <span class=\"FAMILY-NAME\">Doe</span> \n    </span>\n</p>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["John Doe"],"given-name":["John"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "John Doe");
   })

   it("found.items[0].properties['given-name'][0]", function(){
      assert.equal(found.items[0].properties["given-name"][0].toString(), "John");
   })

})




describe('Emails (hcard parsing test)', function() {
   var htmlFragment = "\n<div class=\"vcard\">\n    <span class=\"fn\">John Doe</span> \n    <ul>\n        <li><a class=\"email\" href=\"mailto:john@example.com\">notthis@example.com</a></li>\n        <li>\n            <span class=\"email\">\n                <span class=\"type\">internet</span> \n                <a class=\"value\" href=\"mailto:john@example.com\">notthis@example.com</a>\n            </span>\n        </li> \n        <li><a class=\"email\" href=\"mailto:john@example.com?subject=parser-test\">notthis@example.com</a></li>\n        <li class=\"email\">john@example.com</li>\n    </ul>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["John Doe"],"email":["mailto:john@example.com","mailto:john@example.com","mailto:john@example.com?subject=parser-test","john@example.com"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "John Doe");
   })

   it("found.items[0].properties['email'][0]", function(){
      assert.equal(found.items[0].properties["email"][0].toString(), "mailto:john@example.com");
   })

   it("found.items[0].properties['email'][1]", function(){
      assert.equal(found.items[0].properties["email"][1].toString(), "mailto:john@example.com");
   })

   it("found.items[0].properties['email'][2]", function(){
      assert.equal(found.items[0].properties["email"][2].toString(), "mailto:john@example.com?subject=parser-test");
   })

   it("found.items[0].properties['email'][3]", function(){
      assert.equal(found.items[0].properties["email"][3].toString(), "john@example.com");
   })

})




describe('Single occurrence properties (hcard parsing test)', function() {
   var htmlFragment = "\n    <div class=\"vcard\">\n        <!-- This may not be the best semantic use of HTML element -->\n        <div class=\"fn n\"><span class=\"given-name sort-string\">John</span> Doe</div>\n        <div>Birthday: <abbr class=\"bday\" title=\"2000-01-01T00:00:00-08:00\">January 1st, 2000</abbr></div>\n        <div>Role: <span class=\"role\">Designer</span></div>\n        <div>Location: <abbr class=\"geo\" title=\"30.267991;-97.739568\">Brighton</abbr></div>\n        <div>Time zone: <abbr class=\"tz\" title=\"-05:00\">Eastern Standard Time</abbr></div>\n        \n        <div>Profile details:\n            <div>Profile id: <span class=\"uid\">http://example.com/profiles/johndoe</span></div>\n            <div>Details are: <span class=\"class\">Public</span></div>\n            <div>Last updated: <abbr class=\"rev\" title=\"2008-01-01T13:45:00\">January 1st, 2008 - 13:45</abbr></div>\n        </div>\n    </div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["John Doe"],"given-name":["John"],"sort-string":["John"],"bday":["2000-01-01T00:00:00-0800"],"role":["Designer"],"geo":[{"value":"Brighton","type":["h-geo"],"properties":{"name":["30.267991;-97.739568"]}}],"tz":["-05:00"],"uid":["http://example.com/profiles/johndoe"],"class":["Public"],"rev":["2008-01-01T13:45:00"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "John Doe");
   })

   it("found.items[0].properties['given-name'][0]", function(){
      assert.equal(found.items[0].properties["given-name"][0].toString(), "John");
   })

   it("found.items[0].properties['sort-string'][0]", function(){
      assert.equal(found.items[0].properties["sort-string"][0].toString(), "John");
   })

   it("found.items[0].properties['bday'][0]", function(){
      assert.equal(found.items[0].properties["bday"][0].toString(), "2000-01-01T00:00:00-0800");
   })

   it("found.items[0].properties['role'][0]", function(){
      assert.equal(found.items[0].properties["role"][0].toString(), "Designer");
   })

   it("found.items[0].properties['geo'][0].value", function(){
      assert.equal(found.items[0].properties["geo"][0].value, "Brighton");
   })

   it("found.items[0].properties['geo'][0].type[0]", function(){
      assert.equal(found.items[0].properties["geo"][0].type[0].toString(), "h-geo");
   })

   it("found.items[0].properties['geo'][0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["geo"][0].properties["name"][0].toString(), "30.267991;-97.739568");
   })

   it("found.items[0].properties['tz'][0]", function(){
      assert.equal(found.items[0].properties["tz"][0].toString(), "-05:00");
   })

   it("found.items[0].properties['uid'][0]", function(){
      assert.equal(found.items[0].properties["uid"][0].toString(), "http://example.com/profiles/johndoe");
   })

   it("found.items[0].properties['class'][0]", function(){
      assert.equal(found.items[0].properties["class"][0].toString(), "Public");
   })

   it("found.items[0].properties['rev'][0]", function(){
      assert.equal(found.items[0].properties["rev"][0].toString(), "2008-01-01T13:45:00");
   })

})




describe('Multiple occurrence properties (hcard parsing test)', function() {
   var htmlFragment = "\n<div class=\"vcard\">\n    <!-- This may not be the best semantic use of HTML element -->\n    <div class=\"fn n\"><span class=\"given-name\">John</span> <span class=\"family-name\">Doe</span></div>\n    <a class=\"sound\" href=\"http://www.madgex.com/johndoe.mpeg\">Pronunciation of my name</a>\n    <div><img class=\"photo\" src=\"images/photo.gif\" alt=\"Photo of John Doe\"></div>\n\n    <p>Nicknames:</p>\n    <ul>\n        <li class=\"nickname\">Man with no name</li>\n        <li class=\"nickname\">Lost boy</li>\n    </ul>\n\n    <p>About:</p>\n    <p class=\"note\">John Doe is one of those names you always have issues with.</p>\n    <p class=\"note\">It can be a real problem booking a hotel room with the name John Doe.</p>\n\n    <p>Companies:</p>\n    <div>\n        <img class=\"logo\" src=\"images/logo.gif\" alt=\"Madgex company logo\">\n        <img class=\"logo\" src=\"images/logo.gif\" alt=\"Web Feet Media company logo\">\n    </div>\n    <ul>\n        <li><a class=\"url org\" href=\"http://www.madgex.com/\">Madgex</a> <span class=\"title\">Creative Director</span></li>\n        <li><a class=\"url org\" href=\"http://www.webfeetmedia.com/\">Web Feet Media Ltd</a> <span class=\"title\">Owner</span></li>\n    </ul>\n    \n    <p>Tags: \n    <a rel=\"tag\" class=\"category\" href=\"http://en.wikipedia.org/wiki/design\">design</a>, \n    <a rel=\"tag\" class=\"category\" href=\"http://en.wikipedia.org/wiki/development\">development</a> and\n    <a rel=\"tag\" class=\"category\" href=\"http://en.wikipedia.org/wiki/web\">web</a>\n    </p>\n    \n    <p>Phone numbers:</p>\n    <ul>\n        <li class=\"tel\">\n            <span class=\"type\">Work</span> (<span class=\"type\">pref</span>erred):\n            <span class=\"value\">+1 415 555 100</span>\n        </li>\n        <li class=\"tel\"><span class=\"type\">Home</span>: <span class=\"value\">+1 415 555 200</span></li>\n        <li class=\"tel\"><span class=\"type\">Postal</span>: <span class=\"value\">+1 415 555 300</span></li>\n    </ul>\n    \n    <p>Emails:</p>\n    <ul>\n        <li><a class=\"email\" href=\"mailto:john.doe@madgex.com\">John Doe at Madgex</a></li>\n        <li><a class=\"email\" href=\"mailto:john.doe@webfeetmedia.com\">John Doe at Web Feet Media</a></li>\n    </ul>\n    <p>John Doe uses <span class=\"mailer\">PigeonMail 2.1</span> or <span class=\"mailer\">Outlook 2007</span> for email.</p>\n\n    <p>Addresses:</p>\n    <ul>\n        <li class=\"label\">\n            <span class=\"adr\">\n                <span class=\"type\">Work</span>: \n                <span class=\"street-address\">North Street</span>, \n                <span class=\"locality\">Brighton</span>, \n                <span class=\"country-name\">United Kingdom</span>\n            </span>\n            \n        </li>\n        <li class=\"label\">\n            <span class=\"adr\">\n                <span class=\"type\">Home</span>: \n                <span class=\"street-address\">West Street</span>, \n                <span class=\"locality\">Brighton</span>, \n                <span class=\"country-name\">United Kingdom</span>\n            </span>\n        </li>\n    </ul>\n    \n    <p>In emergency contact: <span class=\"agent\">Jane Doe</span> or <span class=\"agent vcard\">Dave Doe</span>.</p>\n    <p>Key: <span class=\"key\">hd02$Gfu*d%dh87KTa2=23934532479</span></p>\n</div>\n"
   var found = helper.parseHTML(htmlFragment,'http://example.com/')
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["John Doe"],"given-name":["John"],"family-name":["Doe"],"sound":["http://www.madgex.com/johndoe.mpeg"],"photo":["http://example.com/images/photo.gif"],"nickname":["Man with no name","Lost boy"],"note":["John Doe is one of those names you always have issues with.","It can be a real problem booking a hotel room with the name John Doe."],"url":["http://www.madgex.com/","http://www.webfeetmedia.com/"],"org":["Madgex","Web Feet Media Ltd"],"title":["Creative Director","Owner"],"category":["design","development","web"],"tel":["+1 415 555 100","+1 415 555 200","+1 415 555 300"],"email":["mailto:john.doe@madgex.com","mailto:john.doe@webfeetmedia.com"],"mailer":["PigeonMail 2.1","Outlook 2007"],"adr":[{"value":"Work: North Street, Brighton, United Kingdom","type":["h-adr"],"properties":{"street-address":["North Street"],"locality":["Brighton"],"country-name":["United Kingdom"]}},{"value":"Home: West Street, Brighton, United Kingdom","type":["h-adr"],"properties":{"street-address":["West Street"],"locality":["Brighton"],"country-name":["United Kingdom"]}}],"label":["Work: North Street, Brighton, United Kingdom","Home: West Street, Brighton, United Kingdom"],"agent":["Jane Doe",{"value":"Dave Doe","type":["h-card"],"properties":{"name":["Dave Doe"]}}],"key":["hd02$Gfu*d%dh87KTa2=23934532479"]}}]}

   it("found.items[0].type[0]", function(){
      assert.equal(found.items[0].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["name"][0].toString(), "John Doe");
   })

   it("found.items[0].properties['given-name'][0]", function(){
      assert.equal(found.items[0].properties["given-name"][0].toString(), "John");
   })

   it("found.items[0].properties['family-name'][0]", function(){
      assert.equal(found.items[0].properties["family-name"][0].toString(), "Doe");
   })

   it("found.items[0].properties['sound'][0]", function(){
      assert.equal(found.items[0].properties["sound"][0].toString(), "http://www.madgex.com/johndoe.mpeg");
   })

   it("found.items[0].properties['photo'][0]", function(){
      assert.equal(found.items[0].properties["photo"][0].toString(), "http://example.com/images/photo.gif");
   })

   it("found.items[0].properties['nickname'][0]", function(){
      assert.equal(found.items[0].properties["nickname"][0].toString(), "Man with no name");
   })

   it("found.items[0].properties['nickname'][1]", function(){
      assert.equal(found.items[0].properties["nickname"][1].toString(), "Lost boy");
   })

   it("found.items[0].properties['note'][0]", function(){
      assert.equal(found.items[0].properties["note"][0].toString(), "John Doe is one of those names you always have issues with.");
   })

   it("found.items[0].properties['note'][1]", function(){
      assert.equal(found.items[0].properties["note"][1].toString(), "It can be a real problem booking a hotel room with the name John Doe.");
   })

   it("found.items[0].properties['url'][0]", function(){
      assert.equal(found.items[0].properties["url"][0].toString(), "http://www.madgex.com/");
   })

   it("found.items[0].properties['url'][1]", function(){
      assert.equal(found.items[0].properties["url"][1].toString(), "http://www.webfeetmedia.com/");
   })

   it("found.items[0].properties['org'][0]", function(){
      assert.equal(found.items[0].properties["org"][0].toString(), "Madgex");
   })

   it("found.items[0].properties['org'][1]", function(){
      assert.equal(found.items[0].properties["org"][1].toString(), "Web Feet Media Ltd");
   })

   it("found.items[0].properties['title'][0]", function(){
      assert.equal(found.items[0].properties["title"][0].toString(), "Creative Director");
   })

   it("found.items[0].properties['title'][1]", function(){
      assert.equal(found.items[0].properties["title"][1].toString(), "Owner");
   })

   it("found.items[0].properties['category'][0]", function(){
      assert.equal(found.items[0].properties["category"][0].toString(), "design");
   })

   it("found.items[0].properties['category'][1]", function(){
      assert.equal(found.items[0].properties["category"][1].toString(), "development");
   })

   it("found.items[0].properties['category'][2]", function(){
      assert.equal(found.items[0].properties["category"][2].toString(), "web");
   })

   it("found.items[0].properties['tel'][0]", function(){
      assert.equal(found.items[0].properties["tel"][0].toString(), "+1 415 555 100");
   })

   it("found.items[0].properties['tel'][1]", function(){
      assert.equal(found.items[0].properties["tel"][1].toString(), "+1 415 555 200");
   })

   it("found.items[0].properties['tel'][2]", function(){
      assert.equal(found.items[0].properties["tel"][2].toString(), "+1 415 555 300");
   })

   it("found.items[0].properties['email'][0]", function(){
      assert.equal(found.items[0].properties["email"][0].toString(), "mailto:john.doe@madgex.com");
   })

   it("found.items[0].properties['email'][1]", function(){
      assert.equal(found.items[0].properties["email"][1].toString(), "mailto:john.doe@webfeetmedia.com");
   })

   it("found.items[0].properties['mailer'][0]", function(){
      assert.equal(found.items[0].properties["mailer"][0].toString(), "PigeonMail 2.1");
   })

   it("found.items[0].properties['mailer'][1]", function(){
      assert.equal(found.items[0].properties["mailer"][1].toString(), "Outlook 2007");
   })

   it("found.items[0].properties['adr'][0].value", function(){
      assert.equal(found.items[0].properties["adr"][0].value, "Work: North Street, Brighton, United Kingdom");
   })

   it("found.items[0].properties['adr'][0].type[0]", function(){
      assert.equal(found.items[0].properties["adr"][0].type[0].toString(), "h-adr");
   })

   it("found.items[0].properties['adr'][0].properties['street-address'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["street-address"][0].toString(), "North Street");
   })

   it("found.items[0].properties['adr'][0].properties['locality'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["locality"][0].toString(), "Brighton");
   })

   it("found.items[0].properties['adr'][0].properties['country-name'][0]", function(){
      assert.equal(found.items[0].properties["adr"][0].properties["country-name"][0].toString(), "United Kingdom");
   })

   it("found.items[0].properties['label'][0]", function(){
      assert.equal(found.items[0].properties["label"][0].toString(), "Work: North Street, Brighton, United Kingdom");
   })

   it("found.items[0].properties['label'][1]", function(){
      assert.equal(found.items[0].properties["label"][1].toString(), "Home: West Street, Brighton, United Kingdom");
   })

   it("found.items[0].properties['agent'][0]", function(){
      assert.equal(found.items[0].properties["agent"][0].toString(), "Jane Doe");
   })

   it("found.items[0].properties['agent'][1].value", function(){
      assert.equal(found.items[0].properties["agent"][1].value, "Dave Doe");
   })

   it("found.items[0].properties['agent'][1].type[0]", function(){
      assert.equal(found.items[0].properties["agent"][1].type[0].toString(), "h-card");
   })

   it("found.items[0].properties['agent'][1].properties['name'][0]", function(){
      assert.equal(found.items[0].properties["agent"][1].properties["name"][0].toString(), "Dave Doe");
   })

   it("found.items[0].properties['key'][0]", function(){
      assert.equal(found.items[0].properties["key"][0].toString(), "hd02$Gfu*d%dh87KTa2=23934532479");
   })

})




