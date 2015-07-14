/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hreview-aggregate/vevent
The test was built on Tue Jul 14 2015 14:41:35 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hreview-aggregate', function() {
   var htmlFragment = "<div class=\"hreview-aggregate\">\n    <div class=\"item vevent\">\n        <h3 class=\"summary\">Fullfrontal</h3>\n        <p class=\"description\">A one day JavaScript Conference held in Brighton</p>\n        <p><time class=\"dtstart\" datetime=\"2012-11-09\">9th November 2012</time></p>    \n    </div> \n    \n    <p class=\"rating\">\n        <span class=\"average value\">9.9</span> out of \n        <span class=\"best\">10</span> \n        based on <span class=\"count\">62</span> reviews\n    </p>\n</div>";
   var expected = {"items":[{"type":["h-review-aggregate"],"properties":{"item":[{"value":"Fullfrontal","type":["h-item","h-event"],"properties":{"name":["Fullfrontal"],"description":["A one day JavaScript Conference held in Brighton"],"start":["2012-11-09"]}}],"rating":["9.9"],"average":["9.9"],"best":["10"],"count":["62"],"name":["Fullfrontal\n        A one day JavaScript Conference held in Brighton\n        9th November 2012    \n     \n    \n    \n        9.9 out of \n        10 \n        based on 62 reviews"]}}],"rels":{},"rel-urls":{}};

   it('vevent', function(){
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
