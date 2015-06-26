/*
    HTML Parser 
    extracts HTML from DOM nodes
    Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-node/master/license.txt

    Used to create a HTML string from DOM, rather than .outerHTML or .html().
    Was created to get around issue of not been able to remove nodes with 'data-include' attr

*/


function Html(){
    this.voidElt = ['area', 'base', 'br', 'col', 'hr', 'img', 'input', 'link', 'meta', 'param', 'command', 'keygen', 'source'];
} 


Html.prototype = {
    
    utils:  microformats.parser.utils,
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
            out += this.domUtils.getElementText( node ); 
        }

    
        // exclude text which has been added with uf include pattern  - 
        if(node.nodeType && node.nodeType === 1 && this.domUtils.hasAttribute(dom, node, 'data-include') === false){

            // begin tag
            out += '<' + node.tagName.toLowerCase();  

            // add attributes
            var attrs = this.domUtils.getOrderedAttributes(node);
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


};


microformats.parser.html = new Html();


//microformats.parser.html.parse = function(dom, node, textFormat){
//    var html = new Html();
//    return html.parse(dom, node, textFormat);
//}; 
