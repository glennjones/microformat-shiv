/*!
	Parser includes
	All the functions that deal with microformats v1 includes rules
	Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
	MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
	
	Dependencies  dates.js, domutils.js, html.js, isodate,js, text.js utilities.js
*/


var Modules = (function (m) {
	
	// check parser module is loaded
	if(m.Parser){
	
		
		/**
		 * appends clones of includes Nodes into the DOM structure
		 *
		 * @param  {DOM node} rootNode
		 */	
		m.Parser.prototype.addIncludes = function(rootNode) {
			this.addAttributeIncludes(rootNode, 'itemref');
			this.addAttributeIncludes(rootNode, 'headers');
			this.addClassIncludes(rootNode);
		};
	
		
		/**
		 * appends clones of includes Nodes into the DOM structure for attribute based includes
		 *
		 * @param  {DOM node} rootNode
		 * @param  {String} attributeName
		 */
		m.Parser.prototype.addAttributeIncludes = function(rootNode, attributeName) {
			var arr,
				idList,
				i,
				x,
				z,
				y;
	
			arr = m.domUtils.getNodesByAttribute(rootNode, attributeName);
			x = 0;
			i = arr.length;
			while(x < i) {
				idList = m.domUtils.getAttributeList(arr[x], attributeName);
				if(idList) {
					z = 0;
					y = idList.length;
					while(z < y) {
						this.apppendInclude(arr[x], idList[z]);
						z++;
					}
				}
				x++;
			}
		};
	
		
		/**
		 * appends clones of includes Nodes into the DOM structure for class based includes
		 *
		 * @param  {DOM node} rootNode
		 */
		m.Parser.prototype.addClassIncludes = function(rootNode) {
			var id,
				arr,
				x = 0,
				i;
	
			arr = m.domUtils.getNodesByAttributeValue(rootNode, 'class', 'include');
			i = arr.length;
			while(x < i) {
				id = m.domUtils.getAttrValFromTagList(arr[x], ['a'], 'href');
				if(!id) {
					id = m.domUtils.getAttrValFromTagList(arr[x], ['object'], 'data');
				}
				this.apppendInclude(arr[x], id);
				x++;
			}
		};
	
	
		/**
		 * appends a clone of an include into another Node using Id
		 *
		 * @param  {DOM node} rootNode
		 * @param  {Stringe} id
		 */
		m.Parser.prototype.apppendInclude = function(node, id){
			var include,
				clone;
	
			id = m.utils.trim(id.replace('#', ''));
			include = m.domUtils.getElementById(this.document, id);
			if(include === null){
				include = this.options.node.querySelector('#' + id);
			}
			if(include) {
				clone = m.domUtils.clone(include);
				this.markIncludeChildren(clone);
				m.domUtils.appendChild(node, clone);
			}
		};
	
		
		/**
		 * adds a attribute marker to all the child microformats roots 
		 *
		 * @param  {DOM node} rootNode
		 */ 
		m.Parser.prototype.markIncludeChildren = function(rootNode) {
			var arr,
				x,
				i;
	
			// loop the array and add the attribute
			arr = this.findRootNodes(rootNode);
			x = 0;
			i = arr.length;
			m.domUtils.setAttribute(rootNode, 'data-include', 'true');
			m.domUtils.setAttribute(rootNode, 'style', 'display:none');
			while(x < i) {
				m.domUtils.setAttribute(arr[x], 'data-include', 'true');
				x++;
			}
		};
		
		
		/**
		 * removes all appended includes clones from DOM 
		 *
		 * @param  {DOM node} rootNode
		 */ 
		m.Parser.prototype.removeIncludes = function(rootNode){
			var arr,
				i;
	
			// remove all the items that where added as includes
			arr = m.domUtils.getNodesByAttribute(rootNode, 'data-include');
			i = arr.length;
			while(i--) {
				m.domUtils.removeChild(rootNode,arr[i]);
			}
		};
	
		
	}

    return m;

} (Modules || {}));