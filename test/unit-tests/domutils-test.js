/*
Unit test for domutils
*/

assert = chai.assert;


describe('domutils', function() {
    
    
   it('innerHTML', function(){
       var html = '<a href="http://glennjones.net">Glenn Jones</a>',
           node = document.createElement('div');
           
       node.innerHTML = html;
       assert.equal( Modules.domUtils.innerHTML( document, node ), html );
   });
   
   
   it('hasAttribute', function(){
       var node = document.createElement('a');
           
       node.href = 'http://glennjones.net';
       assert.isTrue( Modules.domUtils.hasAttribute( document, node, 'href' ) );
       assert.isFalse( Modules.domUtils.hasAttribute( document, node, 'class' ) );
   });
   
   
   it('getAttribute', function(){
       var node = document.createElement('a');
           
       node.href = 'http://glennjones.net';
       assert.equal( Modules.domUtils.getAttribute( document, node, 'href' ),  'http://glennjones.net' );
   });
   
   
   it('setAttribute', function(){
       var node = document.createElement('a');
           
       Modules.domUtils.setAttribute(document, node, 'href', 'http://glennjones.net')
       assert.equal( Modules.domUtils.getAttribute( document, node, 'href' ),  'http://glennjones.net' );
   });
   
   
   it('removeAttribute', function(){
       var node = document.createElement('a');
           
       node.href = 'http://glennjones.net';
       Modules.domUtils.removeAttribute(document, node, 'href')
       assert.isFalse( Modules.domUtils.hasAttribute( document, node, 'href' ) );
   });
   

   it('getAttributeList', function(){
       var node = document.createElement('a');
           
       node.rel = 'next';
       assert.deepEqual( Modules.domUtils.getAttributeList( document, node, 'rel'),  ['next'] );
       node.rel = 'next bookmark';
       assert.deepEqual( Modules.domUtils.getAttributeList( document, node, 'rel'),  ['next','bookmark'] );
   });
   
   
   it('hasAttributeValue', function(){
       var node = document.createElement('a');
           
       node.href = 'http://glennjones.net';
       node.rel = 'next bookmark';
       assert.isTrue( Modules.domUtils.hasAttributeValue( document, node, 'href', 'http://glennjones.net' ) );
       assert.isFalse( Modules.domUtils.hasAttributeValue( document, node, 'href', 'http://codebits.glennjones.net' ) );
       assert.isFalse( Modules.domUtils.hasAttributeValue( document, node, 'class', 'p-name' ) );
       assert.isTrue( Modules.domUtils.hasAttributeValue( document, node, 'rel', 'bookmark' ) );
       assert.isFalse( Modules.domUtils.hasAttributeValue( document, node, 'rel', 'previous' ) );
   });
   
   /*
   it('hasAttributeValueByPrefix', function(){
       var node = document.createElement('a');
           
       node.className = 'p-location h-geo';
       node.rel = 'next bookmark';
       assert.isTrue( Modules.domUtils.hasAttributeValueByPrefix( document, node, 'class', 'p-' ) );
       //assert.isTrue( Modules.domUtils.hasAttributeValueByPrefix( document, node, 'class', 'h-' ) );
       //assert.isFalse( Modules.domUtils.hasAttributeValueByPrefix( document, node, 'class', 'u-' ) );
       //assert.isFalse( Modules.domUtils.hasAttributeValue( document, node, 'rel', 'p-' ) );
       //assert.isFalse( Modules.domUtils.hasAttributeValue( document, node, 'href', 'p-' ) );
   });
   */
   
   it('getNodesByAttribute', function(){
       var node = document.createElement('ul');
       node.innerHTML = '<li class="h-card">one</li><li>two</li><li class="h-card">three</li>';
           
       assert.equal( Modules.domUtils.getNodesByAttribute( document, node, 'class' ).length, 2 );
       assert.equal( Modules.domUtils.getNodesByAttribute( document, node, 'href' ).length, 0 );
   });
   
   
   it('getNodesByAttributeValue', function(){
       var node = document.createElement('ul');
       node.innerHTML = '<li class="h-card">one</li><li>two</li><li class="h-card">three</li><li class="p-name">four</li>';
           
       assert.equal( Modules.domUtils.getNodesByAttributeValue( document, node, 'class', 'h-card' ).length, 2 );
       assert.equal( Modules.domUtils.getNodesByAttributeValue( document, node, 'class', 'p-name' ).length, 1 );
       assert.equal( Modules.domUtils.getNodesByAttributeValue( document, node, 'class', 'u-url' ).length, 0 );
   });
   

   it('getAttrValFromTagList', function(){
       var node = document.createElement('a');
           
       node.href = 'http://glennjones.net';
           
       assert.equal( Modules.domUtils.getAttrValFromTagList( document, node, ['a','area'], 'href' ), 'http://glennjones.net' );
       assert.equal( Modules.domUtils.getAttrValFromTagList( document, node, ['a','area'], 'class' ), null );
       assert.equal( Modules.domUtils.getAttrValFromTagList( document, node, ['p'], 'href' ), null );
   });
   
   
   it('isSingleDescendant', function(){
       var html = '<a class="u-url" href="http://glennjones.net">Glenn Jones</a>',
           node = document.createElement('div');
           
       node.innerHTML = html,
       
       // one instance of a element   
       assert.equal( Modules.domUtils.isSingleDescendant( document, node, ['a', 'link']).outerHTML, html );
       assert.equal( Modules.domUtils.isSingleDescendant( document, node, ['img','area']), null );
       
       // two instances of a element  
       node.appendChild(document.createElement('a'));
       assert.equal( Modules.domUtils.isSingleDescendant( document, node, ['a', 'link']), null );
       

   });


   it('isOnlySingleDescendantOfType', function(){
       var html = '<a class="u-url" href="http://glennjones.net">Glenn Jones</a>',
           node = document.createElement('div');
           
       node.innerHTML = html,
       
       // one instance of a element   
       assert.equal( Modules.domUtils.isOnlySingleDescendantOfType( document, node, ['a', 'link']).outerHTML, html );
       assert.equal( Modules.domUtils.isOnlySingleDescendantOfType( document, node, ['img','area']), null );
       
       node.appendChild(document.createElement('p'));
       assert.equal( Modules.domUtils.isOnlySingleDescendantOfType( document, node, ['a', 'link']).outerHTML, html );
       
       // two instances of a element  
       node.appendChild(document.createElement('a'));
       assert.equal( Modules.domUtils.isOnlySingleDescendantOfType( document, node, ['a', 'link']), null );
       

   });
   
   
   it('appendChild', function(){
       var node = document.createElement('div'),
           child = document.createElement('a');
           
       Modules.domUtils.appendChild( document, node, child ); 
       assert.equal( node.innerHTML, '<a></a>' );
   });
   
   
   it('removeChild', function(){
       var node = document.createElement('div'),
           child = document.createElement('a');
           
       node.appendChild(child)    
      
       assert.equal( node.innerHTML, '<a></a>' );     
       Modules.domUtils.removeChild( document, child ); 
       assert.equal( node.innerHTML, '' );
   });
   
   
   it('clone', function(){
       var node = document.createElement('div');
           
       node.innerHTML = 'text content';
       assert.equal( Modules.domUtils.clone( document, node ).outerHTML, '<div>text content</div>' );
   });
   
   
   it('resolveUrl', function(){
       assert.equal( Modules.domUtils.resolveUrl( document, 'docs/index.html', 'http://example.org' ), 'http://example.org/docs/index.html' );
       assert.equal( Modules.domUtils.resolveUrl( document, '../index.html', 'http://example.org/docs/' ), 'http://example.org/index.html' );
       assert.equal( Modules.domUtils.resolveUrl( document, '/', 'http://example.org/' ), 'http://example.org/' );
       assert.equal( Modules.domUtils.resolveUrl( document, 'http://glennjones.net/', 'http://example.org/' ), 'http://glennjones.net/' );
   });
   
   

   it('getElementText', function(){
       assert.equal(  Modules.domUtils.getElementText( {} ), '' );
   });
   


 
   
   
});