describe('utilities', function() {
    
  
    
   it('isString', function(){     
       assert.isTrue( microformats.parser.utils.isString( 'abc' ) );
       assert.isFalse( microformats.parser.utils.isString( 123 ) );
       assert.isFalse( microformats.parser.utils.isString( 1.23 ) );
       assert.isFalse( microformats.parser.utils.isString( {'abc': 'abc'} ) );
       assert.isFalse( microformats.parser.utils.isString( ['abc'] ) );
       assert.isFalse( microformats.parser.utils.isString( true ) );
   });
   
   
   it('isArray', function(){
       assert.isTrue( microformats.parser.utils.isArray( ['abc'] ) );
       assert.isFalse( microformats.parser.utils.isArray( 123 ) );
       assert.isFalse( microformats.parser.utils.isArray( 1.23 ) );  
       assert.isFalse( microformats.parser.utils.isArray( 'abc' ) );
       assert.isFalse( microformats.parser.utils.isArray( {'abc': 'abc'} ) );
       assert.isFalse( microformats.parser.utils.isArray( true ) );
   });
   
   
   it('isNumber', function(){
       assert.isTrue( microformats.parser.utils.isNumber( 123 ) );
       assert.isTrue( microformats.parser.utils.isNumber( 1.23 ) );  
       assert.isFalse( microformats.parser.utils.isNumber( 'abc' ) );
       assert.isFalse( microformats.parser.utils.isNumber( {'abc': 'abc'} ) );
       assert.isFalse( microformats.parser.utils.isNumber( ['abc'] ) );
       assert.isFalse( microformats.parser.utils.isNumber( true ) );
   });


   it('startWith', function(){
       assert.isTrue( microformats.parser.utils.startWith( 'p-name', 'p-' ) );
       assert.isFalse( microformats.parser.utils.startWith( 'p-name', 'name' ) );
       assert.isFalse( microformats.parser.utils.startWith( 'p-name', 'u-' ) );
   });
   
   
   it('trim', function(){
       assert.equal( microformats.parser.utils.trim( ' Glenn Jones ' ), 'Glenn Jones' );
       assert.equal( microformats.parser.utils.trim( 'Glenn Jones' ), 'Glenn Jones' );
       assert.equal( microformats.parser.utils.trim( undefined ), '' );
   });
   
  
   it('replaceCharAt', function(){
       assert.equal( microformats.parser.utils.replaceCharAt( 'Glenn Jones', 5, '-' ), 'Glenn-Jones' );
       assert.equal( microformats.parser.utils.replaceCharAt( 'Glenn Jones', 50, '-' ), 'Glenn Jones' );
   });   
   
   
   it('isOnlyWhiteSpace', function(){
       assert.isTrue( microformats.parser.utils.isOnlyWhiteSpace( '  ') );
       assert.isTrue( microformats.parser.utils.isOnlyWhiteSpace( '  \n\r') );
       assert.isFalse( microformats.parser.utils.isOnlyWhiteSpace( '  text\n\r') );
   });
   
   
   it('removeWhiteSpace', function(){
       assert.equal( microformats.parser.utils.removeWhiteSpace( '  '), ' ' );
       assert.equal( microformats.parser.utils.removeWhiteSpace( '  \n\r'), ' ' );
       assert.equal( microformats.parser.utils.removeWhiteSpace( '  text\n\r'), ' text ' );
   }); 
   
   
   it('hasProperties', function(){
       assert.isTrue( microformats.parser.utils.hasProperties( {name: 'glennjones'} ) );
       assert.isFalse( microformats.parser.utils.hasProperties( {} ) );
   });
   

   
   
});