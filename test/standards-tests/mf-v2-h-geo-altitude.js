/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-geo/altitude
The test was built on Tue Jul 14 2015 09:20:10 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-geo', function() {
   var htmlFragment = "<p>My favourite hill in the lakes is \n    <span class=\"h-geo\">\n        <span class=\"p-name\">Pen-y-ghent</span> \n        (Geo: <span class=\"p-latitude\">54.155278</span>,\n        <span class=\"p-longitude\">-2.249722</span>). It\n        raises to <span class=\"p-altitude\">694</span>m.\n  </span>\n</p>";
   var expected = {"items":[{"type":["h-geo"],"properties":{"name":["Pen-y-ghent"],"latitude":["54.155278"],"longitude":["-2.249722"],"altitude":["694"]}}],"rels":{},"rel-urls":{}};

   it('altitude', function(){
       var doc, dom, node, options, parser, found;
       dom = new DOMParser();
       doc = dom.parseFromString( htmlFragment, 'text/html' )       options ={
       		'document': doc,
       		'node': doc,
       		'baseUrl': 'http://example.com'
       };
       parser = new Modules.Parser();
       found = parser.get( options );
       assert.deepEqual(found, expected);
   });
});
