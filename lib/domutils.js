/*
   dom utilities
   The purpose of this module is abstract DOM functions away from the main parsing modules of the libraray.
   It was created so the file can be replaced in node.js enviroment to make use different types of light weight node.js DOM's 
   such as 'cherrio.js' It also contains a number dom utilities which are used throughout the parser such as: 'getDescendant'
  
   Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt 
   Dependencies  utilities.js
    
*/


var Modules = (function (modules) {
	
	modules.domUtils = {
		
		
		 /**
		 * abstracts DOM ownerDocument
		 *
		 * @param  {DOM Node} node
		 * @return {Dom Document}
		 */
		ownerDocument: function(node){
			return node.ownerDocument;
		},
		
	
		/**
		 * abstracts DOM textContent
		 *
		 * @param  {DOM Node} node
		 * @return {String}
		 */
		textContent: function(node){
			if(node.textContent){
				return node.textContent;
			}else if(node.innerText){
				return node.innerText;
			}
			return '';
		},
		
	
		/**
		 * abstracts DOM innerHTML
		 *
		 * @param  {DOM Node} node
		 * @return {String}
		 */
		innerHTML: function(node){
			return node.innerHTML;
		},
	

		/**
		 * abstracts DOM hasAttribute
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {Boolean}
		 */
		hasAttribute: function(node, attributeName) {
			return node.hasAttribute(attributeName);
		},
		
		
		/**
		 * does an attribute contain a value
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @param  {String} value
		 * @return {Boolean}
		 */
		hasAttributeValue: function(node, attributeName, value) {
			return (this.getAttributeList(node, attributeName).indexOf(value) > -1);
		},
		
	
		/**
		 * abstracts DOM getAttribute
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {String || null}
		 */
		getAttribute: function(node, attributeName) {
			return node.getAttribute(attributeName);
		},
		
		
		/**
		 * abstracts DOM setAttribute
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @param  {String} attributeValue
		 */
		setAttribute: function(node, attributeName, attributeValue){
			node.setAttribute(attributeName, attributeValue);
		},
	
	
		/**
		 * abstracts DOM removeAttribute
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 */
		removeAttribute: function(node, attributeName) {
			node.removeAttribute(attributeName);
		},
		
		
		/**
		 * abstracts DOM getElementById
		 *
		 * @param  {DOM Node || DOM Document} node
		 * @param  {String} id
		 * @return {DOM Node} 
		 */
		getElementById: function(docNode, id) {
			return docNode.querySelector( '#' + id );
		},
		
		
		/**
		 * abstracts DOM querySelector
		 *
		 * @param  {DOM Node || DOM Document} node
		 * @param  {String} selector
		 * @return {DOM Node} 
		 */
		querySelector: function(docNode, selector) {
			return docNode.querySelector( selector );
		},
	
	
		/**
		 * get value of an Node attribute as an Array
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {Array}
		 */
		getAttributeList: function(node, attributeName) {
			var out = [],
				attList;
	
			attList = node.getAttribute(attributeName);
			if(attList && attList !== '') {
				if(attList.indexOf(' ') > -1) {
					out = attList.split(' ');
				} else {
					out.push(attList);
				}
			}
			return out;
		},
	
	
		/**
		 * gets all child nodes with a given attribute
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {NodeList}
		 */
		getNodesByAttribute: function(node, attributeName) {
			var selector = '[' + attributeName + ']';
			return node.querySelectorAll(selector);
		},
	
	
		// gets all child nodes with a given attribute containing a given value
		/**
		 * does an attribute contain a value
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {DOM NodeList}
		 */
		getNodesByAttributeValue: function(rootNode, name, value) {
			var arr = [],
				x = 0,
				i,
				out = [];
	
			arr = this.getNodesByAttribute(rootNode, name);
			if(arr) {
				i = arr.length;
				while(x < i) {
					if(this.hasAttributeValue(arr[x], name, value)) {
						out.push(arr[x]);
					}
					x++;
				}
			}
			return out;
		},
	
	
		/**
		 * gets attribute value from controlled list of tags
		 *
		 * @param  {Array} tagNames
		 * @param  {String} attributeName
		 * @return {String || null}
		 */
		getAttrValFromTagList: function(node, tagNames, attributeName) {
			var i = tagNames.length;
	
			while(i--) {
				if(node.tagName.toLowerCase() === tagNames[i]) {
					var attrValue = this.getAttribute(node, attributeName);
					if(attrValue && attrValue !== '') {
						return attrValue;
					}
				}
			}
			return null;
		},
	
		
	   /**
		 * get node if has no siblings CSS :only-child 
		 *
		 * @param  {DOM Node} rootNode
		 * @param  {Array} tagNames
		 * @return {DOM Node || null}
		 */
		getSingleDescendant: function(node){
			return this.getDescendant( node, null, false );
		},
		
		
        /**
		 * get node if has no siblings of the same type  i.e. CSS :only-of-type
		 * 
		 * @param  {DOM Node} rootNode
		 * @param  {Array} tagNames
		 * @return {DOM Node || null}
		 */
		getSingleDescendantOfType: function(node, tagNames){
			return this.getDescendant( node, tagNames, true );
		},
	
	
	    /**
		 * get child node limited by presents of siblings - either CSS :only-of-type || :only-child 
		 *
		 * @param  {DOM Node} rootNode
		 * @param  {Array} tagNames
		 * @return {DOM Node || null}
		 */
		getDescendant: function( node, tagNames, onlyOfType ){
			var i = node.children.length,
				countAll = 0,
				countOfType = 0,
				child,
				out = null;
	
			while(i--) {
				child = node.children[i];
				if(child.nodeType === 1) {
					if(tagNames){
						// count just only-of-type
						if(this.hasTagName(child, tagNames)){
							out = child;
							countOfType++;
						}	
					}else{
						// count all elements
						out = child;
						countAll++;
					}
				}
			}
			if(onlyOfType === true){
				return (countOfType === 1)? out : null;
			}else{
				return (countAll === 1)? out : null;
			}
		},
	

	   /**
		 * is a node one of a list of tags
		 *
		 * @param  {DOM Node} rootNode
		 * @param  {Array} tagNames
		 * @return {Boolean}
		 */	
		hasTagName: function(node, tagNames){
			var i = tagNames.length;
			while(i--) {
				if(node.tagName.toLowerCase() === tagNames[i]) {
					return true;
				}
			}
			return false;
		},
	
	
	   /**
		 * abstracts DOM appendChild 
		 *
		 * @param  {DOM Node} node
		 * @param  {DOM Node} childNode
		 * @return {DOM Node}
		 */
		appendChild: function(node, childNode){
			return node.appendChild(childNode);
		},
	
	
	   /**
		 * abstracts DOM removeChild 
		 *
		 * @param  {DOM Node} childNode
		 * @return {DOM Node || null}
		 */
		removeChild: function(childNode){
			if (childNode.parentNode) {
				return childNode.parentNode.removeChild(childNode);
			}else{
				return null;
			}
		},
	
	
		/**
		 * abstracts DOM cloneNode
		 *
		 * @param  {DOM Node} node
		 * @return {DOM Node}
		 */
		clone: function(node) {
			var newNode = node.cloneNode(true);
			newNode.removeAttribute('id');
			return newNode;
		},
		
		
		/**
		 * gets the text of a node
		 *
		 * @param  {DOM Node} node
		 * @return {String}
		 */
		getElementText: function( node ){
			if(node && node.data){
				return node.data;
			}else{
				return '';
			}
		},
		
		
		/**
		 * gets the attributes of a node - ordered by sequence in html
		 *
		 * @param  {DOM Node} node
		 * @return {Array}
		 */
		getOrderedAttributes: function( node ){
			var nodeStr = node.outerHTML,
				attrs = [];
				
			for (var i = 0; i < node.attributes.length; i++) {
				var attr = node.attributes[i];
					attr.indexNum = nodeStr.indexOf(attr.name);
					
				attrs.push( attr );
			}
			return attrs.sort( modules.utils.sortObjects( 'indexNum' ) );
		},
		
		
		/**
		 * decodes html entities in given text
		 *
		 * @param  {DOM Document} doc
		 * @param  String} text
		 * @return {String}
		 */
		decodeEntities: function( doc, text ){
			//return text;
			return doc.createTextNode( text ).nodeValue;
		},
		
		
		/**
		 * clones a DOM document
		 *
		 * @param  {DOM Document} document 
		 * @return {DOM Document}
		 */
		cloneDocument: function( document ){
			var newNode,
				newDocument = null;
				
			if( document.importNode && document.implementation && document.implementation.createHTMLDocument){
				newDocument = document.implementation.createHTMLDocument('');
				newNode = newDocument.importNode( document.documentElement, true );
				newDocument.replaceChild(newNode, newDocument.querySelector('html'));	
			}
			return (newNode && newNode.nodeType && newNode.nodeType === 1)? newDocument : document;
		},
		
		
	
		/**
		 * get a node's child index used to create node path 
		 *
		 *   @param  {DOM Node} node
		 *   @return {Int}
		 */
		getChildIndex: function (node) {
		  	var parent = node.parentNode, 
		  		i = -1, 
		  		child;
	  		while (parent && (child = parent.childNodes[++i])){
				 if (child === node){
					 return i;
				 } 
			} 
	  		return -1;
		},
		

		/**
		 * get a node's path
		 *
		 *   @param  {DOM Node} node
		 *   @return {Array}
		 */
		getNodePath: function  (node) {
		  	var parent = node.parentNode, 
			  	path = [], 
			  	index = this.getChildIndex(node);
				  
		  if(parent && (path = this.getNodePath(parent))){
			   if(index > -1){
				   path.push(index);
			   }
		  }
		  return path;
		},
		
		
		/**
		 * get a node from a path.
		 *
		 *   @param  {Array} path
		 *   @return {DOM Node}
		 */
		getNodeByPath: function (document, path) {
		  	var node = document.documentElement, 
		  		i = 0, 
		  		index;
		  while ((index = path[++i]) > -1){
			  node = node.childNodes[index];
		  } 
		  return node;
		}
		

	};

	return modules;

} (Modules || {}));





