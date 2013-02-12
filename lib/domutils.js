/*
   DOM Utilities
   Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
   
   */


microformats.parser.domUtils = {

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



	// returns whether an attribute has an item that start with the given value
	hasAttributeValueByPrefix: function(dom, node, attributeName, value) {
		var attList = [],
			x = 0,
			i;

		attList = this.getAttributeList(dom, node, attributeName);
		i = attList.length;
		while(x < i) {
			if(utils.startWith(utils.trim(attList[x]), value)) {
				return true;
			}
			x++;
		}
		return false;
	},


	// return an array of elements that match an attribute/value
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


	// set the attribute value
	setAttribute: function(dom, node, name, value){
		node.setAttribute(name, value);
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


	// return a node if it is the only descendant and its is also in the tagNames list
	isSingleDescendant: function(dom, rootNode, tagNames) {
		var count = 0,
			out = null,
			child,
			x,
			i,
			y;

		x = 0;
		y = rootNode.children.length;
		while(x < y) {
			child = rootNode.children[x];
			if(child.tagName) {
				i = tagNames.length;
				while(i--) {
					if(child.tagName.toLowerCase() === tagNames[i]) {
						out = child;
					}
				}
				count++;
			}
			x++;
		}
		if(count === 1 && out) {
			return out;
		} else {
			return null;
		}
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
		var link,
			head, 
			base,
			resolved = '',
			myBase;

		// its not empty or null and we have no protocal separator
		if(url && url !== '' && url.indexOf(':')){

			head = dom.getElementsByTagName('head')[0];
			base = dom.getElementsByTagName('base')[0];	

			// add head and base if needed
			if(baseUrl && baseUrl !== '' && !base){
				if(!head){
					head = dom.appendChild(dom.createElement('head'));
				}
				if(!base){
					base = myBase = dom.head.appendChild(dom.createElement('base'));
				}
				base.href = baseUrl;
			}  

			// use browser to resolve link 
			link = dom.createElement('a');
			link.href = url;
			resolved = link.href;

			// remove any base node we added
			if(myBase){
				head.removeChild(myBase);
			}
		}
		return resolved;
	}

};   


