/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-review-aggregate/justahyperlink
The test was built on Thu Jul 02 2015 21:37:44 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-review-aggregate', function() {
   var htmlFragment = "<div class=\"h-review-aggregate\">\n    <h3 class=\"p-item h-item\">Mediterranean Wraps</h3>\n     <span class=\"p-summary\">\n        Customers flock to this small restaurant for their \n        tasty falafel and shawerma wraps and welcoming staff.\n    </span>\n    <span class=\"p-rating\">4.5</span> out of 5 \n</div>";
   var expected = {"items":[{"type":["h-review-aggregate"],"properties":{"item":[{"value":"Mediterranean Wraps","type":["h-item"],"properties":{"name":["Mediterranean Wraps"]}}],"summary":["Customers flock to this small restaurant for their \n        tasty falafel and shawerma wraps and welcoming staff."],"rating":["4.5"],"name":["Mediterranean Wraps\n     \n        Customers flock to this small restaurant for their \n        tasty falafel and shawerma wraps and welcoming staff.\n    \n    4.5 out of 5"]}}],"rels":{},"rel-urls":{}};

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
