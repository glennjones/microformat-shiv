/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/rel/xfn-elsewhere
The test was built on Thu Jul 02 2015 21:37:44 GMT+0100 (BST)
*/

assert = chai.assert;


describe('rel', function() {
   var htmlFragment = "<ul>\n    <li><a rel=\"me\" href=\"http://twitter.com/glennjones\">twitter</a></li>\n    <li><a rel=\"me\" href=\"http://delicious.com/glennjonesnet/\">delicious</a></li>\n    <li><a rel=\"me\" href=\"https://plus.google.com/u/0/105161464208920272734/about\">google+</a></li>\n    <li><a rel=\"me\" href=\"http://lanyrd.com/people/glennjones/\">lanyrd</a></li>\n    <li><a rel=\"me\" href=\"http://github.com/glennjones\">github</a></li>\n    <li><a rel=\"me\" href=\"http://www.flickr.com/photos/glennjonesnet/\">flickr</a></li>\n    <li><a rel=\"me\" href=\"http://www.linkedin.com/in/glennjones\">linkedin</a></li>\n    <li><a rel=\"me\" href=\"http://www.slideshare.net/glennjones/presentations\">slideshare</a></li>\n</ul>";
   var expected = {"items":[],"rels":{"me":["http://twitter.com/glennjones","http://delicious.com/glennjonesnet/","https://plus.google.com/u/0/105161464208920272734/about","http://lanyrd.com/people/glennjones/","http://github.com/glennjones","http://www.flickr.com/photos/glennjonesnet/","http://www.linkedin.com/in/glennjones","http://www.slideshare.net/glennjones/presentations"]},"rel-urls":{"http://twitter.com/glennjones":{"text":"twitter","rels":["me"]},"http://delicious.com/glennjonesnet/":{"text":"delicious","rels":["me"]},"https://plus.google.com/u/0/105161464208920272734/about":{"text":"google+","rels":["me"]},"http://lanyrd.com/people/glennjones/":{"text":"lanyrd","rels":["me"]},"http://github.com/glennjones":{"text":"github","rels":["me"]},"http://www.flickr.com/photos/glennjonesnet/":{"text":"flickr","rels":["me"]},"http://www.linkedin.com/in/glennjones":{"text":"linkedin","rels":["me"]},"http://www.slideshare.net/glennjones/presentations":{"text":"slideshare","rels":["me"]}}};

   it('xfn-elsewhere', function(){
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
