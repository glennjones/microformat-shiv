/*
   DOM Utilities
   Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt 
*/


microformats.parser.domUtils = {
	
	utils:  microformats.parser.utils,

	innerHTML: function(dom, node){
		return node.innerHTML;
	},


	// returns whether attribute exists
	hasAttribute: function(dom, node, attributeName) {
		return (node.attributes[attributeName]) ? true : false;
	},
	

	// returns the string value of an attribute
	getAttribute: function(dom, node, attributeName) {
		return node.getAttribute(attributeName);
	},
	
	
	// set the attribute value
	setAttribute: function(dom, node, name, value){
		node.setAttribute(name, value);
	},

	// removes an attribute
	removeAttribute: function(dom, node, attributeName) {
		node.removeAttribute(attributeName);
	},


	// returns the an array of string value of an attribute
	getAttributeList: function(dom, node, attributeName) {
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


	// returns whether an attribute has an item of the given value
	hasAttributeValue: function(dom, node, attributeName, value) {
		var attList = this.getAttributeList(dom, node, attributeName);
		return (attList.indexOf(value) > -1);
	},


	// return an array of elements that match an attribute
	getNodesByAttribute: function(dom, node, name) {
		var selector = '[' + name + ']';
		return node.querySelectorAll(selector);
	},


	// return an arry of elements that match an attribute/value
	getNodesByAttributeValue: function(dom, rootNode, name, value) {
		var arr = [],
			x = 0,
			i,
			out = [];

		arr = this.getNodesByAttribute(dom, rootNode, name);
		if(arr) {
			i = arr.length;
			while(x < i) {
				if(this.hasAttributeValue(dom, arr[x], name, value)) {
					out.push(arr[x]);
				}
				x++;
			}
		}
		return out;
	},



	// returns the attribute value only if the node tagName is in the tagNames list
	getAttrValFromTagList: function(dom, node, tagNames, attributeName) {
		var i = tagNames.length;

		while(i--) {
			if(node.tagName.toLowerCase() === tagNames[i]) {
				var attr = this.getAttribute(dom, node, attributeName);
				if(attr && attr !== '') {
					return attr;
				}
			}
		}
		return null;
	},


	// return a node if it is the only descendant AND of a type ie CSS :only-node
	isSingleDescendant: function(dom, rootNode, tagNames){
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
				if(tagNames && this.hasTagName(child, tagNames)){
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



	// return a node if it is the only descendant of a type ie CSS :only-of-type 
	isOnlySingleDescendantOfType: function(dom, rootNode, tagNames) {
		var i = rootNode.children.length,
			count = 0,
			child,
			out = null;

		while(i--) {
			child = rootNode.children[i];
			if(child.nodeType === 1) {
				if(this.hasTagName(child, tagNames)){
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


	hasTagName: function(node, tagNames){
		var i = tagNames.length;
		while(i--) {
			if(node.tagName.toLowerCase() === tagNames[i]) {
				return true;
			}
		}
		return false;
	},


	// append a child node
	appendChild: function(dom, node, childNode){
		node.appendChild(childNode);
	},


	// removes child node
	removeChild: function(dom, node){
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	},


	// simple dom node cloning function 
	clone: function(dom, node) {
		var newNode = node.cloneNode(true);
		newNode.removeAttribute('id');
		return newNode;
	},


	// where possible resolves url to absolute version ie test.png to http://example.com/test.png
	resolveUrl: function(dom, url, baseUrl) {
		// its not empty or null and we have no protocal separator
		if(url && url !== '' && url.indexOf(':') === -1){
			var dp = new DOMParser();
			var doc = dp.parseFromString('<html><head><base href="' + baseUrl+ '"><head><body><a href="' + url+ '"></a></body></html>', 'text/html');
			return doc.getElementsByTagName('a')[0].href;
		}
		return url;
	},
	
	
	// get the text from a node in the dom
    getElementText: function( node ){
        if(node && node.data){
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
        return attrs.sort( this.utils.sortObjects( 'indexNum' ) );
    },
    
	
    // use dom to resolve any entity encoding issues
    decodeEntities: function( dom, str ){
        return dom.createTextNode( str ).nodeValue;
    },

	/*
	resolveUrliFrame: function(dom, url, baseUrl){
		var iframe = dom.createElement('iframe');
		iframe.innerHTML('<html><head><base href="' + baseUrl+ '"><head><body><a href="' + url + '"></a></body></html>');
		return iframe.document.getElementsByTagName('a')[0].href;
	}
	*/


};   


