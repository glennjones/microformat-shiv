describe('text', function() {
    
    
    //normalised or whitespace or whitespacetrimmed
    
   it('parse', function(){
       var html = '\n   <a href="http://glennjones.net">Glenn\n Jones  \n</a>   \n',
           node = document.createElement('div');
                
       node.innerHTML = html;
       assert.equal( Modules.text.parse( document, node, 'whitespacetrimmed' ), 'Glenn\n Jones' );
       assert.equal( Modules.text.parse( document, node, 'whitespace' ), '\n   Glenn\n Jones  \n   \n' );
       assert.equal( Modules.text.parse( document, node, 'normalised' ), 'Glenn Jones' );
       
       // exclude tags
       node.innerHTML = '<script>test</script>text';
       assert.equal( Modules.text.parse( document, node, 'normalised' ), 'text' );
       
       // block level 
       node.innerHTML = '<p>test</p>text';
       //assert.equal( Modules.text.parse( document, node, 'normalised' ), 'test text' );
       
       // node with no text data
       node = document.createComment('test comment');
       assert.equal( Modules.text.parse( document, node, 'normalised' ), '' );
       
   });
   
   
   // TODO re-assign textContent calls to textContent
   it('parseText', function(){
       var text = '\n   <a href="http://glennjones.net">Glenn\n Jones  \n</a>   \n';
                
       assert.equal( Modules.text.parseText( document, text, 'whitespacetrimmed' ), 'Glenn\n Jones' );
       assert.equal( Modules.text.parseText( document, text, 'whitespace' ), '\n   Glenn\n Jones  \n   \n' );
       assert.equal( Modules.text.parseText( document, text, 'normalised' ), 'Glenn Jones' );
   });
  
   
   it('textContent', function(){      
       assert.equal( Modules.text.textContent( document, null, 'whitespacetrimmed' ), '' );
   });

   

   
  
});