/*
    HTML Parser 
    extracts HTML from DOM nodes
    Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-node/master/license.txt

    Used to create a HTML string from DOM, rather than .outerHTML or .html().
    Was created to get around issue of not been able to remove nodes with 'data-include' attr

*/
'use strict';


function Html(){
    this.voidElt = ['area', 'base', 'br', 'col', 'hr', 'img', 'input', 'link', 'meta', 'param', 'command', 'keygen', 'source'];
} 


Html.prototype = {
    
    domUtils: microformats.parser.domUtils,

    // gets the text from dom node 
    parse: function(dom, node ){
        var out = '',
            j = 0;

        // we don not want the outer container
        if(node.childNodes && node.childNodes.length > 0){
            for (j = 0; j < node.childNodes.length; j++) {
                var text = this.walkTreeForHtml( dom, node.childNodes[j] );
                if(text !== undefined){
                    out += text;
                }
            }
        }

        return out;
    },



    // extracts the text nodes in the tree
    walkTreeForHtml: function( dom, node ) {
        var out = '',
            j = 0;

        // if node is a text node get its text
        if(node.nodeType && node.nodeType === 3){
            out += this.getElementText( node ); 
        }

    
        // exclude text which has been added with uf include pattern  - 
        if(node.nodeType && node.nodeType === 1 && this.domUtils.hasAttribute(dom, node, 'data-include') === false){

            // begin tag
            out += '<' + node.tagName.toLowerCase();  

            // add attributes
            var attrs = this.getOrderedAttributes(node);
            for (j = 0; j < attrs.length; j++) {
                out += ' ' + attrs[j].name +  '=' + '"' + attrs[j].value + '"';
            }

            if(this.voidElt.indexOf(node.tagName.toLowerCase()) === -1){
                out += '>';
            }

            // get the text of the child nodes
            if(node.childNodes && node.childNodes.length > 0){
                
                for (j = 0; j < node.childNodes.length; j++) {
                    var text = this.walkTreeForHtml( dom, node.childNodes[j] );
                    if(text !== undefined){
                        out += text;
                    }
                }
            }

            // end tag
            if(this.voidElt.indexOf(node.tagName.toLowerCase()) > -1){
                out += ' />'; 
            }else{
                out += '</' + node.tagName.toLowerCase() + '>'; 
            }
        } 
        
        return (out === '')? undefined : out;
    },    


    // get the text from a node in the dom
    getElementText: function( node ){
        if(node.data){
            return node.data;
        }else{
            return '';
        }
    },
    
    
    // gets the attributes of a node - ordered as they are used in the node
    getOrderedAttributes: function( node ){
        var nodeStr = node.outerHTML,
            attrs = [];
            
        for (var i = 0; i < node.attributes.length; i++) {
            var attr = node.attributes[i];
                attr.indexNum = nodeStr.indexOf(attr.name);
                
            attrs.push( attr );
        }
        return attrs.sort( this.sortObjects( 'indexNum' ) );
    },
    

   
    // sort objects in an array by given property
    sortObjects: function(property, reverse) {
        reverse = (reverse) ? -1 : 1;
        return function (a, b) {
            a = a[property];
            b = b[property];
            if (a < b) {
                return reverse * -1;
            }
            if (a > b) {
                return reverse * 1;
            }
            return 0;
        };
    }


};


microformats.parser.html = new Html();


//microformats.parser.html.parse = function(dom, node, textFormat){
//    var html = new Html();
//    return html.parse(dom, node, textFormat);
//}; 
