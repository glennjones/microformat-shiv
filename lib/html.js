/*
	HTML Parser 
	Extracts HTML from DOM nodes
	Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
	MIT License: https://raw.github.com/glennjones/microformat-node/master/license.txt
	
	Dependencies  utilities.js, domutils.js

	Used to create a HTML string from DOM, rather than .outerHTML or .html().
	Was created to get around issue of not been able to remove nodes with 'data-include' attr

*/


var Modules = (function (modules) {
	
	modules.html = {
		
		// elements which are self closing
		selfClosingElt: ['area', 'base', 'br', 'col', 'hr', 'img', 'input', 'link', 'meta', 'param', 'command', 'keygen', 'source'],
	

		/**
		 * parse the html string from DOM Node
		 *
		 * @param  {DOM Node} node
		 * @return {String}
		 */ 
		parse: function( node ){
			var out = '',
				j = 0;
	
			// we don not want the outer container
			if(node.childNodes && node.childNodes.length > 0){
				for (j = 0; j < node.childNodes.length; j++) {
					var text = this.walkTreeForHtml( node.childNodes[j] );
					if(text !== undefined){
						out += text;
					}
				}
			}
	
			return out;
		},
	
  
		/**
		 * walks DOM tree parsing the html string from DOM Nodes
		 *
		 * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @return {String}
		 */ 
		walkTreeForHtml: function( node ) {
			var out = '',
				j = 0;
	
			// if node is a text node get its text
			if(node.nodeType && node.nodeType === 3){
				out += modules.domUtils.getElementText( node ); 
			}
	
		
			// exclude text which has been added with uf include pattern  - 
			if(node.nodeType && node.nodeType === 1 && modules.domUtils.hasAttribute(node, 'data-include') === false){
	
				// begin tag
				out += '<' + node.tagName.toLowerCase();  
	
				// add attributes
				var attrs = modules.domUtils.getOrderedAttributes(node);
				for (j = 0; j < attrs.length; j++) {
					out += ' ' + attrs[j].name +  '=' + '"' + attrs[j].value + '"';
				}
	
				if(this.selfClosingElt.indexOf(node.tagName.toLowerCase()) === -1){
					out += '>';
				}
	
				// get the text of the child nodes
				if(node.childNodes && node.childNodes.length > 0){
					
					for (j = 0; j < node.childNodes.length; j++) {
						var text = this.walkTreeForHtml( node.childNodes[j] );
						if(text !== undefined){
							out += text;
						}
					}
				}
	
				// end tag
				if(this.selfClosingElt.indexOf(node.tagName.toLowerCase()) > -1){
					out += ' />'; 
				}else{
					out += '</' + node.tagName.toLowerCase() + '>'; 
				}
			} 
			
			return (out === '')? undefined : out;
		}    
	
	
	};
	

	return modules;

} (Modules || {}));

