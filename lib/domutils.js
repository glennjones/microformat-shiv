/*
   dom utilities
   the main purpose of this module is abstract DOM functions so that different types of light weight DOM can be used in node.js
   Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt 
   
   Dependencies  utilities.js, docparser.js
*/


var Modules = (function (modules) {
    
    modules.domUtils = {
	
	    /**
         * abstracts DOM innerHTML
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} node
         * @return {String}
         */
		innerHTML: function(doc, node){
			return node.innerHTML;
		},
	

		/**
         * abstracts DOM hasAttribute
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
         * @return {Boolean}
         */
		hasAttribute: function(doc, node, attributeName) {
			if(node.hasAttribute){
				return node.hasAttribute(attributeName)
			}
		},
		
	
		/**
         * abstracts DOM getAttribute
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
         * @return {String || null}
         */
		getAttribute: function(doc, node, attributeName) {
			if(node.getAttribute){
				return node.getAttribute(attributeName);
			}
		},
		
		
		/**
         * abstracts DOM setAttribute
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @param  {String} attributeValue
         */
		setAttribute: function(doc, node, attributeName, attributeValue){
			node.setAttribute(attributeName, attributeValue);
		},
	
	
		/**
         * abstracts DOM removeAttribute
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
         */
		removeAttribute: function(doc, node, attributeName) {
			node.removeAttribute(attributeName);
		},
	
	
		/**
         * get value of an Node attribute as an Array
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {Array}
         */
		getAttributeList: function(doc, node, attributeName) {
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
         * does an attribute contain a value
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @param  {String} value
		 * @return {Boolean}
         */
		hasAttributeValue: function(doc, node, attributeName, value) {
			var attList = this.getAttributeList(doc, node, attributeName);
			return (attList.indexOf(value) > -1);
		},
	
	
		/**
         * gets all child nodes with a given attribute
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {NodeList}
         */
		getNodesByAttribute: function(doc, node, attributeName) {
			var selector = '[' + attributeName + ']';
			return node.querySelectorAll(selector);
		},
	
	
		// gets all child nodes with a given attribute containing a given value
		/**
         * does an attribute contain a value
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {NodeList}
         */
		getNodesByAttributeValue: function(doc, rootNode, name, value) {
			var arr = [],
				x = 0,
				i,
				out = [];
	
			arr = this.getNodesByAttribute(doc, rootNode, name);
			if(arr) {
				i = arr.length;
				while(x < i) {
					if(this.hasAttributeValue(doc, arr[x], name, value)) {
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
         * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @param  {Array} tagNames
		 * @param  {String} attributeName
		 * @return {String || null}
         */
		getAttrValFromTagList: function(doc, node, tagNames, attributeName) {
			var i = tagNames.length;
	
			while(i--) {
				if(node.tagName.toLowerCase() === tagNames[i]) {
					var attrValue = this.getAttribute(doc, node, attributeName);
					if(attrValue && attrValue !== '') {
						return attrValue;
					}
				}
			}
			return null;
		},
	

		
	   /**
         * is a node the only descendant of a type i.e. CSS :only-of-type 
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} rootNode
		 * @param  {Array} tagNames
		 * @return {DOM Node || null}
         */
		isSingleDescendant: function(doc, rootNode, tagNames){
			var count = 0,
				out = null,
				child,
				x,
				y;
	
			x = 0;
			y = rootNode.children.length;
			while(x < y) {
				child = rootNode.children[x];
				if(child.tagName) {
					// can filter or not by tagNames array
					if(tagNames && this.hasTagName(doc, child, tagNames)){
						out = child;
					}
					// count all tag/element nodes
					count ++;
				}
				x++;
			}
			if(count === 1 && out) {
				return out;
			} else {
				return null;
			}
		},
	
	
	
   		/**
         * is a node the only descendant of a type i.e. CSS :only-of-type 
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} rootNode
		 * @param  {Array} tagNames
		 * @return {DOM Node || null}
         */
		isOnlySingleDescendantOfType: function(doc, rootNode, tagNames) {
			var i = rootNode.children.length,
				count = 0,
				child,
				out = null;
	
			while(i--) {
				child = rootNode.children[i];
				if(child.nodeType === 1) {
					if(this.hasTagName(doc, child, tagNames)){
						out = child;
						count++;
					}
				}
			}
			if(count === 1 && out){
				return out;
			}else{
				return null;
			}
		},
	
	
   	   /**
         * is a node one of a list of tags
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} rootNode
		 * @param  {Array} tagNames
		 * @return {Boolean}
         */	
		hasTagName: function(doc, node, tagNames){
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
         * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @param  {DOM Node} childNode
         * @return {DOM Node}
         */
		appendChild: function(doc, node, childNode){
			return node.appendChild(childNode);
		},
	
	
	   /**
         * abstracts DOM removeChild 
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @param  {DOM Node} childNode
         * @return {DOM Node}
         */
		removeChild: function(doc, childNode){
			if (childNode.parentNode) {
				return childNode.parentNode.removeChild(childNode);
			}
		},
	
	
		/**
         * abstracts DOM cloneNode
         *
         * @param  {DOM Document} doc
		 * @param  {DOM Node} node
         * @return {DOM Node}
         */
		clone: function(doc, node) {
			var newNode = node.cloneNode(true);
			newNode.removeAttribute('id');
			return newNode;
		},
		
		
		/**
         * resolves url to absolute version using baseUrl
         *
         * @param  {DOM Document} doc
		 * @param  {String} url
		 * @param  {String} baseUrl
         * @return {String}
         */
		resolveUrl: function(doc, url, baseUrl) {
			if(modules.utils.isString(url)){
				if( url !== '' && url.indexOf(':') === -1 && modules.utils.isString(baseUrl) ){
					var dp = new DOMParser();
					var newDoc = dp.parseFromString('<html><head><base href="' + baseUrl+ '"><head><body><a href="' + url+ '"></a></body></html>', 'text/html');
					return newDoc.getElementsByTagName('a')[0].href;
				}else{
					return url;
				}	
			}else{
				return '';
			}
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
		 * @param  {DOM Node} node
		 * @param  String} text
         * @return {String}
         */
	    decodeEntities: function( doc, text ){
	        return doc.createTextNode( text ).nodeValue;
	    },
	

	};

    return modules;

} (Modules || {}));

