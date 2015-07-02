  
/*
Unit test for isMicroformat
*/

assert = chai.assert;


describe('isMicroformat', function() {
  
   it('true - v2', function(){
       
       var  doc,
            node,
            parser;
            
        var html = '<a class="h-card" href="http://glennjones.net"><span class="p-name">Glenn</span></a>';   
            
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        doc.body.appendChild( node );
        node.innerHTML = html;
        node = doc.querySelector( 'a' ); 

        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.isMicroformat instead 
        parser = new Modules.Parser();
        assert.isTrue( parser.isMicroformat( node ) );
        
   });
   
   
   it('true - v1', function(){
       
       var  doc,
            node,
            parser;
            
        var html = '<a class="vcard" href="http://glennjones.net"><span class="fn">Glenn</span></a>';   
            
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        doc.body.appendChild( node );
        node.innerHTML = html;
        node = doc.querySelector( 'a' ); 

        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.isMicroformat instead 
        parser = new Modules.Parser();
        assert.isTrue( parser.isMicroformat( node ) );
        
   });
   
   
     
   it('false - property', function(){
       
       var  doc,
            node,
            parser;
            
        var html = '<span class="p-name">Glenn</span>';   
            
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        doc.body.appendChild( node );
        node.innerHTML = html;
        node = doc.querySelector( 'span' ); 

        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.isMicroformat instead 
        parser = new Modules.Parser();
        assert.isFalse( parser.isMicroformat( node ) );
        
   });
   
   
   it('false - no class', function(){
       
       var  doc,
            node,
            parser;
            
        var html = '<span>Glenn</span>';   
            
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        doc.body.appendChild( node );
        node.innerHTML = html;
        node = doc.querySelector( 'span' ); 

        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.isMicroformat instead 
        parser = new Modules.Parser();
        assert.isFalse( parser.isMicroformat( node ) );
        
   });
   
   
   it('false - no node', function(){
       
       var  doc,
            node,
            parser;
            
        var html = '<span>Glenn</span>';   
            
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        doc.body.appendChild( node );
        node.innerHTML = html;
        node = doc.querySelector( 'span' ); 

        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.isMicroformat instead 
        parser = new Modules.Parser();
        assert.isFalse( parser.isMicroformat( ) );
        
   });
   
   
   it('false - undefined node', function(){
       
       var  doc,
            node,
            parser;
            
        var html = '<span>Glenn</span>';   
            
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        doc.body.appendChild( node );
        node.innerHTML = html;
        node = doc.querySelector( 'span' ); 

        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.isMicroformat instead 
        parser = new Modules.Parser();
        assert.isFalse( parser.isMicroformat( undefined ) );
        
   });
   
 });