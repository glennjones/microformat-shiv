/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.21 
Mocha integration test from: microformats-v1/hcalendar/time
The test was built on Thu Aug 20 2015 15:27:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hcalendar', function() {
   var htmlFragment = "<div class=\"vevent\">\n    <span class=\"summary\">The 4th Microformat party</span> will be on \n    <ul>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00-08:00</time> \n        </li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00-0800</time> \n        </li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00+0800</time> \n        </li> \n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00Z</time> \n        </li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00:00</time> \n        </li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00-08:00</time> \n        </li> \n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00+08:00</time> \n        </li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00z</time> \n        </li>\n        <li class=\"dtstart\">\n            <time class=\"value\" datetime=\"2009-06-26\">26 July</time>, from\n            <time class=\"value\">19:00</time> \n        </li>  \n        <li>\n            <time class=\"dtend\" datetime=\"2013-034\">3 February 2013</time>\n        </li>              \n    </ul>\n</div>";
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["The 4th Microformat party"],"start":["2009-06-26T19:00:00-08:00","2009-06-26T19:00:00-0800","2009-06-26T19:00:00+0800","2009-06-26T19:00:00Z","2009-06-26T19:00:00","2009-06-26T19:00-08:00","2009-06-26T19:00+08:00","2009-06-26T19:00z","2009-06-26T19:00"],"end":["2013-034"]}}],"rels":{},"rel-urls":{}};

   it('time', function(){
       var doc, dom, node, options, parser, found;
       dom = new DOMParser();
       doc = dom.parseFromString( htmlFragment, 'text/html' );
       options ={
       		'document': doc,
       		'node': doc,
       		'baseUrl': 'http://example.com'
       };
       found = Microformats.get( options );
       assert.deepEqual(found, expected);
   });
});
