/*!
	Parser implied
	All the functions that deal with microformats implied rules
	Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
	MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
	
	Dependencies  dates.js, domutils.js, html.js, isodate,js, text.js utilities.js
*/


var Modules = (function (m) {
	
	// check parser module is loaded
	if(m.Parser){
	
		/**
		 * applies "implied rules" microformat output structure ie name, photo, url and date 
		 *
		 * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @param  {Object} uf (microformat output structure)
		 * @param  {Object} parentClasses (classes structure)
		 */
		 m.Parser.prototype.impliedRules = function(dom, node, uf, parentClasses) {
			var context = this,
				value,
				newDate;
	
	
			if(uf && uf.properties) {
				
				// implied name rule
				/*
					img.h-x[alt]
					abbr.h-x[title] 
					.h-x>img:only-node[alt] 
					.h-x>abbr:only-node[title] 
					.h-x>:only-node>img:only-node[alt]
					.h-x>:only-node>abbr:only-node[title] 
				*/
				if(!uf.properties.name) {
					value = this.getImpliedProperty(dom, node, ['img', 'area', 'abbr'], this.getNameAttr);
					var textFormat = this.options.textFormat;
					if(this.options.textFormat === 'impliednametrimmed'){
						textFormat = 'whitespacetrimmed';
					}
					if(!value) {
						uf.properties.name = [m.text.parse(dom, node, textFormat)];
					}else{
						uf.properties.name = [m.text.parseText(dom, value, textFormat)];
					}
				}
				
				
				// intersection of implied name and implied value rules
				if(uf.properties.name) {	
					if(uf.value && parentClasses.root.length > 0 && parentClasses.properties.length === 1){
						uf = context.impliedValueRule(uf, parentClasses.properties[0], 'p-name', uf.properties.name[0]);
					}
				}
	
	
				// implied photo rule
				/*
					img.h-x[src] 
					object.h-x[data] 
					.h-x>img[src]:only-of-type
					.h-x>object[data]:only-of-type 
					.h-x>:only-child>img[src]:only-of-type 
					.h-x>:only-child>object[data]:only-of-type 
				*/
				if(!uf.properties.photo) {
					value = this.getImpliedProperty(dom, node, ['img', 'object'], this.getPhotoAttr);
					if(value) {
						// relative to absolute URL
						if(value && value !== '' && this.options.baseUrl !== '' && value.indexOf(':') === -1) {
							value = m.domUtils.resolveUrl(dom, value, this.options.baseUrl);
						}
						uf.properties.photo = [m.utils.trim(value)];
					}
				}
				
				
				// implied url rule
				/*
				a.h-x[href] 
				area.h-x[href] 
				.h-x>a[href]:only-of-type:not[.h-*] 
				.h-x>area[href]:only-of-type:not[.h-*] 
				*/
				if(!uf.properties.url) {
					value = this.getImpliedProperty(dom, node, ['a', 'area'], this.getURLAttr);
					if(value) {
						// relative to absolute URL
						if(value && value !== '' && this.options.baseUrl !== '' && value.indexOf(':') === -1) {
							value = m.domUtils.resolveUrl(dom, value, this.options.baseUrl);
						}
						uf.properties.url = [m.utils.trim(value)];
					}
				}
			
				// intersection of implied url and implied value rules
				if(uf.properties.url) {
					if(parentClasses && parentClasses.root.length === 1 && parentClasses.properties.length === 1){
						uf = context.impliedValueRule(uf, parentClasses.properties[0], 'u-url', uf.properties.url[0]);
					}
				}
			
			}
	
			// implied date rule
			// only applied to first date and time match
			if(uf.times.length > 0 && uf.dates.length > 0) {
				newDate = m.dates.dateTimeUnion(uf.dates[0][1], uf.times[0][1], this.options.dateFormat);
				uf.properties[this.removePropPrefix(uf.times[0][0])][0] = newDate.toString(this.options.dateFormat);
			}
			delete uf.times;
			delete uf.dates;
			
			if(uf.altValue !== null){
				uf.value = uf.altValue.value;
			}
			delete uf.altValue;
	
		};
		
			
			
		/**
		 * get an implied property value from predefinded tag/attriubte combinations
		 *
		 * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @param  {String} tagList (Array of tags from which an implied value can be pull)
		 * @param  {String} getAttrFunction (Function which can extract implied value)
		 * @return {String || null}
		 */
		m.Parser.prototype.getImpliedProperty = function(dom, node, tagList, getAttrFunction) {
			var value = getAttrFunction(dom, node),
				descendant,
				child;
					
			if(!value) {
				descendant = m.domUtils.isSingleDescendant(dom, node, tagList);
				if(descendant && this.hasHClass(dom, descendant) === false){
					value = getAttrFunction(dom, descendant);
				}
				if(node.children.length > 0){
					child = m.domUtils.isSingleDescendant(dom, node);
					if(child){
						descendant = this.
		
						domUtils.isSingleDescendant(dom, child, tagList);
						if(descendant && this.hasHClass(dom, descendant) === false){
							value = getAttrFunction(dom, descendant);
						}
					}
				}
			}
					
			return value;
		}
			
			
		/**
		 * get an implied name value
		 *
		 * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @return {String || null}
		 */		
		m.Parser.prototype.getNameAttr = function(dom, node) {
			var value = m.domUtils.getAttrValFromTagList(dom, node, ['img','area'], 'alt');
			if(!value) {
				value = m.domUtils.getAttrValFromTagList(dom, node, ['abbr'], 'title');
			}
			return value;
		};
	
	
		/**
		 * get an implied photo value
		 *
		 * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @return {String || null}
		 */	
		m.Parser.prototype.getPhotoAttr = function(dom, node) {
			var value = m.domUtils.getAttrValFromTagList(dom, node, ['img'], 'src');
			if(!value && m.domUtils.hasAttributeValue(dom, node, 'class', 'include') === false) {
				value = m.domUtils.getAttrValFromTagList(dom, node, ['object'], 'data');
			}
			return value;
		};
			
			
		/**
		 * get an implied photo value
		 *
		 * @param  {DOM Document} doc
		 * @param  {DOM Node} node
		 * @return {String || null}
		 */		
		m.Parser.prototype.getURLAttr = function(dom, node) {
			var value = null;
			if(m.domUtils.hasAttributeValue(dom, node, 'class', 'include') === false){
				value = m.domUtils.getAttrValFromTagList(dom, node, ['a'], 'href');
				if(!value) {
					value = m.domUtils.getAttrValFromTagList(dom, node, ['area'], 'href');
				}
				
			}
			return value;
		};
			
		
		/**
		 * changes the value property based on rules about parent property prefix
		 *
		 * @param  {Object} uf
		 * @param  {String} parentPropertyName
		 * @param  {String} propertyName
		 * @param  {String} value
		 * @return {Object}
		 */	
		m.Parser.prototype.impliedValueRule = function(uf, parentPropertyName, propertyName, value){
			if(uf.value){
				// first p-name of the h-* child
				if(m.utils.startWith(parentPropertyName,'p-') && propertyName === 'p-name'){
					uf.altValue = {name: propertyName, value: value};
				}
				// if it's an e-* property element
				if(m.utils.startWith(parentPropertyName,'e-')){
					uf.altValue = {name: propertyName, value: value};
				}
				//f it's a u-* property element
				if(m.utils.startWith(parentPropertyName,'u-')){
					uf.altValue = {name: propertyName, value: value};
				}
			}
			return uf;
		};
	
	}

    return m;

} (Modules || {}));