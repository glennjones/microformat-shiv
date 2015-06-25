/*
    InnerText Parser 
    extracts plain text from DOM nodes
    Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt

    The text parser works like textContent but with five additional parsing rules 
    * It excluded the content from tag in the "excludeTags" list ie noframes script etc
    * It adds a single space behind the text string of any node considered block level
    * It removes all line return/feeds and tabs
    * It turns all whitespace into single spaces
    * It trims the final output
*/
'use strict';


function Text(){
    this.textFormat = 'whitespacetrimmed'; // normalised or whitespace or whitespacetrimmed - used as default
    this.blockLevelTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'pre', 'table',
        'address', 'article', 'aside', 'blockquote', 'caption', 'col', 'colgroup', 'dd', 'div', 
        'dt', 'dir', 'fieldset', 'figcaption', 'figure', 'footer', 'form',  'header', 'hgroup', 'hr', 
        'li', 'map', 'menu', 'nav', 'optgroup', 'option', 'section', 'tbody', 'testarea', 
        'tfoot', 'th', 'thead', 'tr', 'td', 'ul', 'ol', 'dl', 'details'];

    this.excludeTags = ['noframe', 'noscript', 'script', 'style', 'frames', 'frameset'];
} 


Text.prototype = {

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
             out = this.trimEnds( out );
          }
          
          //return entities.decode( out, 2 );
          return this.decodeEntities( dom, out );
       }else{
          return ''; 
       }
    },
    
    
    // normalise text 
    normalise: function( dom, text ){
        text = text.replace( /&nbsp;/g, ' ') ;    // exchanges html entity for space into space char
        text = this.removeWhiteSpace( text );     // removes linefeeds, tabs and addtional spaces
        text = this.decodeEntities( dom, text );  // decode HTML entities
        text = text.replace( '–', '-' );          // correct dash decoding
        return this.trim( text );
    },
    
    
    // removes whitespace, tabs and returns from start and end of text
    trimEnds: function( text ){
        var out = '';
        if(text && text.length){
            var i = text.length,
                x = 0;
            
            // turn all whitespace chars at end into spaces
            while (i--) {
                if(this.isOnlyWhiteSpace(text[i])){
                    text = this.replaceCharAt( text, i, ' ' );
                }else{
                    break;
                }
            }
            
            // turn all whitespace chars at start into spaces
            i = text.length;
            while (x < i) {
                if(this.isOnlyWhiteSpace(text[x])){
                    text = this.replaceCharAt( text, i, ' ' );
                }else{
                    break;
                }
                x++;
            }
        }
        return this.trim(text);
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
            out += this.getElementText( node ); 
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
    },    


    // get the text from a node in the dom
    getElementText: function( node ){
        if(node.nodeValue){
            return node.nodeValue;
        }else{
            return '';
        }
    },


    // remove spaces at front and back of string
    trim: function( str ) {
        return str.replace(/^\s+|\s+$/g, '');
    },


    // removes white space from a string
    removeWhiteSpace: function( str ){
        return str.replace(/[\t\n\r ]+/g, ' ');
    },
    
    // is a string only contain white space chars
    isOnlyWhiteSpace: function( str ){
        return !(/[^\t\n\r ]/.test( str ));
    },

    // use dom to resolve any entity encoding issues
    decodeEntities: function( dom, str ){
        return dom.createTextNode( str ).nodeValue;
    },
    
    // replaces a character in a string and return the new string
    replaceCharAt: function( str, index, character ) {
        return str.substr(0, index) + character + str.substr(index+character.length);
    }

};


microformats.parser.text = new Text();

/*
microformats.parser.text.parse = function(dom, node, textFormat){
    var text = new Text();
    return text.parse(dom, node, textFormat);
}; 


microformats.parser.text.textContent = function(dom, htmlStr, textFormat){
    var text = new Text();
    return text.textContent( dom, htmlStr, textFormat );
};
*/



