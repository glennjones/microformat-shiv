/*
Unit test for domutils
*/

assert = chai.assert;


describe('html', function() {
    
    
   it('parse', function(){
       var html = '<a href="http://glennjones.net">Glenn Jones</a>',
           bloghtml = '<section id="content" class="body"><ol id="posts-list" class="h-feed"><li><article class="h-entry"><header><h2 class="p-namee"><a href="#" rel="bookmark" title="Permalink to this POST TITLE">This be the title</a></h2></header><footer class="post-info"><abbr class="dt-published" title="2005-10-10T14:07:00-07:00">10th October 2005</abbr><address class="h-card p-author">By <a class="u-url p-name" href="#">Enrique Ramírez</a></address></footer><div class="e-content"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis nunc vitae libero iaculis elementum. Nullam et justo <a href="#">non sapien</a> dapibus blandit nec et leo. Ut ut malesuada tellus.</p></div></article></li></ol></section>',
           node = document.createElement('div');
           
       node.innerHTML = html;
       assert.equal( microformats.parser.html.parse( document, node ), html );
       
       // make sure excludes 'data-include' marked items
       var child = document.createElement('p');
       child.setAttribute('data-include', 'true');
       node.appendChild(child);
       assert.equal( microformats.parser.html.parse( document, node ), html );
       
       node = document.createElement('div');
       node.innerHTML = bloghtml;
       assert.equal( microformats.parser.html.parse( document, node ), bloghtml );
       
       node = document.createElement('div');
       assert.equal( microformats.parser.html.parse( document, node ), '' );
       
       child = document.createElement('br');
       node.appendChild(child);
       assert.equal( microformats.parser.html.parse( document, node ), '<br />' );
       
       node = document.createComment('test comment');
       assert.equal( microformats.parser.html.parse( document, node ), '' );
       
   });
  
   // TODO move to utils
   it('sortObjects', function(){
       var arr = [{'name': 'one'},{'name': 'two'},{'name': 'three'},{'name': 'three'}];
       
       assert.deepEqual( arr.sort( microformats.parser.html.sortObjects( 'name', true ) ), [{"name":"two"},{"name":"three"},{'name': 'three'},{"name":"one"}] );
       assert.deepEqual( arr.sort( microformats.parser.html.sortObjects( 'name', false ) ), [{"name":"one"},{"name":"three"},{'name': 'three'},{"name":"two"}] );
   });
   
   
   // TODO move to domutils
   it('getElementText', function(){
       assert.equal(  microformats.parser.html.getElementText( {} ), '' );
   });
   
 

   
   
   
   
});