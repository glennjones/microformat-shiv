/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-card/extendeddescription
The test was built on Wed Jul 01 2015 12:00:56 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<div class=\"h-card\">\n  <img class=\"u-photo\" alt=\"photo of Mitchell\" src=\"http://blog.mozilla.org/press/files/2012/04/mitchell-baker.jpg\" />\n  <p>\n    <a class=\"p-name u-url\" href=\"http://blog.lizardwrangler.com/\">Mitchell Baker</a>\n    (<a class=\"u-url\" href=\"https://twitter.com/MitchellBaker\">@MitchellBaker</a>)\n    <span class=\"p-org\">Mozilla Foundation</span>\n  </p>\n  <p class=\"p-note\">Mitchell is responsible for setting the direction and scope of the Mozilla Foundation and its activities.</p>\n  <p><span class=\"p-category\">Strategy</span> and <span class=\"p-category\">Leadership</span></p>\n</div>";
   var expected = {"items":[{"type":["h-card"],"properties":{"photo":["http://blog.mozilla.org/press/files/2012/04/mitchell-baker.jpg"],"url":["http://blog.lizardwrangler.com/","https://twitter.com/MitchellBaker"],"name":["Mitchell Baker"],"org":["Mozilla Foundation"],"note":["Mitchell is responsible for setting the direction and scope of the Mozilla Foundation and its activities."],"category":["Strategy","Leadership"]}}],"rels":{},"rel-urls":{}};

   it('extendeddescription', function(){
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
