/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-event/dates
The test was built on Thu Jul 02 2015 21:37:44 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-event', function() {
   var htmlFragment = "<section class=\"h-event\">\n\t<p><span class=\"p-name\">The 4th Microformat party</span> will be on:</p>\n\t<ul>\n\t\t<li><time class=\"dt-start\" datetime=\"2009-06-26T19:00-08:00\">26 July</time></li>\n\t\t<li><time class=\"dt-start\" datetime=\"2009-06-26T19:00-08\">26 July</time></li>\n\t\t<li><time class=\"dt-start\" datetime=\"2009-06-26T19:00-0800\">26 July</time></li>\n\t\t<li><time class=\"dt-start\" datetime=\"2009-06-26T19:00+0800\">26 July</time></li>\n\t\t<li><time class=\"dt-start\" datetime=\"2009-06-26T19:00+08:00\">26 July</time></li>\n\t\t<li><time class=\"dt-start\" datetime=\"2009-06-26T19:00Z\">26 July</time></li>\n\t\t<li><time class=\"dt-start\" datetime=\"2009-06-26t19:00-08:00\">26 July</time></li>\n\t\t<li><time class=\"dt-start\" datetime=\"2009-06-26 19:00:00-08:00\">26 July</time></li>\n\t</ul>\n</section>";
   var expected = {"items":[{"type":["h-event"],"properties":{"name":["The 4th Microformat party"],"start":["2009-06-26T19:00-08:00","2009-06-26T19:00-08","2009-06-26T19:00-0800","2009-06-26T19:00+0800","2009-06-26T19:00+08:00","2009-06-26T19:00Z","2009-06-26t19:00-08:00","2009-06-26 19:00:00-08:00"]}}],"rels":{},"rel-urls":{}};

   it('dates', function(){
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
