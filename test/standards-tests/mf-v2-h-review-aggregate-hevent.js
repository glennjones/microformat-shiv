/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-review-aggregate/hevent
The test was built on Wed Aug 05 2015 14:24:03 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-review-aggregate', function() {
   var htmlFragment = "<div class=\"h-review-aggregate\">\n    <div class=\"p-item h-event\">\n        <h3 class=\"p-name\">Fullfrontal</h3>\n        <p class=\"p-description\">A one day JavaScript Conference held in Brighton</p>\n        <p><time class=\"dt-start\" datetime=\"2012-11-09\">9th November 2012</time></p>    \n    </div> \n    \n    <p class=\"p-rating\">\n        <span class=\"p-average value\">9.9</span> out of \n        <span class=\"p-best\">10</span> \n        based on <span class=\"p-count\">62</span> reviews\n    </p>\n</div>";
   var expected = {"items":[{"type":["h-review-aggregate"],"properties":{"item":[{"value":"Fullfrontal","type":["h-event"],"properties":{"name":["Fullfrontal"],"description":["A one day JavaScript Conference held in Brighton"],"start":["2012-11-09"]}}],"rating":["9.9"],"average":["9.9"],"best":["10"],"count":["62"],"name":["Fullfrontal\n        A one day JavaScript Conference held in Brighton\n        9th November 2012    \n     \n    \n    \n        9.9 out of \n        10 \n        based on 62 reviews"]}}],"rels":{},"rel-urls":{}};

   it('hevent', function(){
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
