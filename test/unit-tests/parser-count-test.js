  
  /*
Unit test for dates
*/

assert = chai.assert;


    

describe('count', function() {
  
   it('count', function(){
       
       var  doc,
            node,
            result,
            parser;
            
        var html = '<a class="h-card" href="http://glennjones.net"><span class="p-name">Glenn</span></a><a class="h-card" href="http://janedoe.net"><span class="p-name">Jane</span></a><a class="h-event" href="http://janedoe.net"><span class="p-name">Event</span><span class="dt-start">2015-07-01</span></a>';   
            
       
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = html;
        doc.body.appendChild(node);    
        
        // standard parse
        options ={
            'node': node,
        };
        parser = new Modules.Parser();
        result = parser.count(options);
        assert.deepEqual( result, {'h-event': 1,'h-card': 2} );
        
   });
   
   
     
   it('count - no results', function(){
       
       var  doc,
            node,
            result,
            parser;
            
        var html = '<span class="p-name">Jane</span>';   
            
       
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = html;
        doc.body.appendChild(node);    
        
        // standard parse
        options ={
            'node': node,
        };
        parser = new Modules.Parser();
        result = parser.count(options);
        assert.deepEqual( result, {} );
        
   });
   
   
   
   it('count - no options', function(){
       
       var result,
           parser;

        parser = new Modules.Parser();
        result = parser.count({});
        assert.deepEqual( result, {'errors': ['No options.node to parser microformats from']} );
        
   });
   
 });