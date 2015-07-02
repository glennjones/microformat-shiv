/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hcalendar/justahyperlink
The test was built on Thu Jul 02 2015 21:37:43 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hcalendar', function() {
   var htmlFragment = "<a class=\"vevent\" href=\"http://indiewebcamp.com/2012\">IndieWebCamp 2012</a>";
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["IndieWebCamp 2012"],"url":["http://indiewebcamp.com/2012"]}}],"rels":{},"rel-urls":{}};

   it('justahyperlink', function(){
       var doc, node, options, parser, found;
       doc = document.implementation.createHTMLDocument('New Document');
       node =  document.createElement('div');
       node.innerHTML = htmlFragment;
       doc.body.appendChild(node);
       options ={
       		'document': doc,
       		'node': node,
       		'baseUrl': 'http://example.com'
       };
       parser = new Modules.Parser();
       found = parser.get( options );
       assert.deepEqual(found, expected);
   });
});
