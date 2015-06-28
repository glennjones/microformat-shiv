/*
    InnerText Parser 
    extracts plain text from DOM nodes
    Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
    Dependencies  utilities.js, domutils.js

    The text parser works like textContent but with five additional parsing rules 
    * It excluded the content from tag in the "excludeTags" list ie noframes script etc
    * It adds a single space behind the text string of any node considered block level
    * It removes all line return/feeds and tabs
    * It turns all whitespace into single spaces
    * It trims the final output
*/


var Modules = (function (m) {
    
    
    m.text = {
        
        // normalised or whitespace or whitespacetrimmed - used as default 
        textFormat: 'whitespacetrimmed', 
        
        blockLevelTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'pre', 'table',
            'address', 'article', 'aside', 'blockquote', 'caption', 'col', 'colgroup', 'dd', 'div', 
            'dt', 'dir', 'fieldset', 'figcaption', 'figure', 'footer', 'form',  'header', 'hgroup', 'hr', 
            'li', 'map', 'menu', 'nav', 'optgroup', 'option', 'section', 'tbody', 'testarea', 
            'tfoot', 'th', 'thead', 'tr', 'td', 'ul', 'ol', 'dl', 'details'],

        excludeTags: ['noframe', 'noscript', 'script', 'style', 'frames', 'frameset'],
 
    
        // gets the text from dom node 
        parse: function(dom, node, textFormat){
            var out;
            this.textFormat = (textFormat)? textFormat : this.textFormat;
            if(this.textFormat === 'normalised'){
                out = this.walkTreeForText( node );
                if(out !== undefined){
                    return this.normalise( dom, out );
                }else{
                    return '';
                }
            }else{
               return this.textContent( dom, node.textContent, this.textFormat );
            }
        },
        
        
        // get text from html string  
        parseText: function( dom, text, textFormat ){
           var node = document.createElement('div');
           node.innerHTML = text;
           return this.parse( dom, node, textFormat );
        },
        
        
        // whitespace or whitespacetrimmed
        textContent: function( dom, text, textFormat ){
           this.textFormat = (textFormat)? textFormat : this.textFormat;
           if(text){
              var out = '',
                  regex = /(<([^>]+)>)/ig;
                
              out = text.replace(regex, '');   
              if(this.textFormat === 'whitespacetrimmed') {    
                 out = m.utils.trimWhitespace( out );
              }
              
              //return entities.decode( out, 2 );
              return m.domUtils.decodeEntities( dom, out );
           }else{
              return ''; 
           }
        },
        
        
        // normalise text 
        normalise: function( dom, text ){
            text = text.replace( /&nbsp;/g, ' ') ;    // exchanges html entity for space into space char
            text = m.utils.removeWhiteSpace( text );     // removes linefeeds, tabs and addtional spaces
            text = m.domUtils.decodeEntities( dom, text );  // decode HTML entities
            text = text.replace( '–', '-' );          // correct dash decoding
            return m.utils.trim( text );
        },
        
    
        // extracts the text nodes in the dom tree
        walkTreeForText: function( node ) {
            var out = '',
                j = 0;
    
            if(node.tagName && this.excludeTags.indexOf( node.tagName.toLowerCase() ) > -1){
                return out;
            }
    
            // if node is a text node get its text
            if(node.nodeType && node.nodeType === 3){
                out += m.domUtils.getElementText( node ); 
            }
    
            // get the text of the child nodes
            if(node.childNodes && node.childNodes.length > 0){
                for (j = 0; j < node.childNodes.length; j++) {
                    var text = this.walkTreeForText( node.childNodes[j] );
                    if(text !== undefined){
                        out += text;
                    }
                }
            }
    
            // if its a block level tag add an additional space at the end
            if(node.tagName && this.blockLevelTags.indexOf( node.tagName.toLowerCase() ) !== -1){
                out += ' ';
            } 
            
            return (out === '')? undefined : out ;
        }
        
    };
   
    return m;

} (Modules || {}));