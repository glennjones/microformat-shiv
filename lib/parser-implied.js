/*!
	Parser implied
	All the functions that deal with microformats implied rules
	
	Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
	MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
	Dependencies  dates.js, domutils.js, html.js, isodate,js, text.js, utilities.js, url.js
*/

var Modules = (function (modules) {
	
	// check parser module is loaded
	if(modules.Parser){
	
		/**
		 * applies "implied rules" microformat output structure ie name, photo, url and date 
		 *
		 * @param  {DOM Node} node
		 * @param  {Object} uf (microformat output structure)
		 * @param  {Object} parentClasses (classes structure)
		 */
		 modules.Parser.prototype.impliedRules = function(node, uf, parentClasses) {
			var context = this,
				value,
				newDate;
	
	
			if(uf && uf.properties) {
				
				uf = this.impliedhFeedTitle(node, uf);
				
				// implied name rule
				/*
					img.h-x[alt]										<img class="h-card" src="glenn.htm" alt="Glenn Jones"></a>
					area.h-x[alt] 										<area class="h-card" href="glenn.htm" alt="Glenn Jones"></area>
					abbr.h-x[title]										<abbr class="h-card" title="Glenn Jones"GJ</abbr>

					.h-x>img:only-child[alt]:not[.h-*]					<div class="h-card"><a src="glenn.htm" alt="Glenn Jones"></a></div>
					.h-x>area:only-child[alt]:not[.h-*] 				<div class="h-card"><area href="glenn.htm" alt="Glenn Jones"></area></div>
					.h-x>abbr:only-child[title] 						<div class="h-card"><abbr title="Glenn Jones">GJ</abbr></div>

					.h-x>:only-child>img:only-child[alt]:not[.h-*] 		<div class="h-card"><span><img src="jane.html" alt="Jane Doe"/></span></div>
					.h-x>:only-child>area:only-child[alt]:not[.h-*] 	<div class="h-card"><span><area href="jane.html" alt="Jane Doe"></area></span></div>
					.h-x>:only-child>abbr:only-child[title]				<div class="h-card"><span><abbr title="Jane Doe">JD</abbr></span></div>
				*/
				if(!uf.properties.name) {
					value = this.getImpliedProperty(node, ['img', 'area', 'abbr'], this.getNameAttr);
					var textFormat = this.options.textFormat;
					if(!value) {
						uf.properties.name = [modules.text.parse(this.document, node, textFormat)];
					}else{
						uf.properties.name = [modules.text.parseText(this.document, value, textFormat)];
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
					img.h-x[src] 												<img class="h-card" alt="Jane Doe" src="jane.jpeg"/>
					object.h-x[data] 											<object class="h-card" data="jane.jpeg"/>Jane Doe</object>
					.h-x>img[src]:only-of-type:not[.h-*]						<div class="h-card"><img alt="Jane Doe" src="jane.jpeg"/></div> 
					.h-x>object[data]:only-of-type:not[.h-*] 					<div class="h-card"><object data="jane.jpeg"/>Jane Doe</object></div> 
					.h-x>:only-child>img[src]:only-of-type:not[.h-*] 			<div class="h-card"><span><img alt="Jane Doe" src="jane.jpeg"/></span></div> 
					.h-x>:only-child>object[data]:only-of-type:not[.h-*] 		<div class="h-card"><span><object data="jane.jpeg"/>Jane Doe</object></span></div> 
				*/
				if(!uf.properties.photo) {
					value = this.getImpliedProperty(node, ['img', 'object'], this.getPhotoAttr);
					if(value) {
						// relative to absolute URL
						if(value && value !== '' && this.options.baseUrl !== '' && value.indexOf(':') === -1) {
							value = modules.url.resolve(value, this.options.baseUrl);
						}
						uf.properties.photo = [modules.utils.trim(value)];
					}
				}
				
				
				// implied url rule
				/*
					a.h-x[href]  							<a class="h-card" href="glenn.html">Glenn</a>
					area.h-x[href]  						<area class="h-card" href="glenn.html">Glenn</area>
					.h-x>a[href]:only-of-type:not[.h-*]  	<div class="h-card" ><a href="glenn.html">Glenn</a><p>...</p></div> 
					.h-x>area[href]:only-of-type:not[.h-*]  <div class="h-card" ><area href="glenn.html">Glenn</area><p>...</p></div>
				*/
				if(!uf.properties.url) {
					value = this.getImpliedProperty(node, ['a', 'area'], this.getURLAttr);
					if(value) {
						// relative to absolute URL
						if(value && value !== '' && this.options.baseUrl !== '' && value.indexOf(':') === -1) {
							value = modules.url.resolve(value, this.options.baseUrl);
						}
						uf.properties.url = [modules.utils.trim(value)];
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
				newDate = modules.dates.dateTimeUnion(uf.dates[0][1], uf.times[0][1], this.options.dateFormat);
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
		 * @param  {DOM Node} node
		 * @param  {String} tagList (Array of tags from which an implied value can be pull)
		 * @param  {String} getAttrFunction (Function which can extract implied value)
		 * @return {String || null}
		 */
		modules.Parser.prototype.getImpliedProperty = function(node, tagList, getAttrFunction) {
			// ie img.h-card
			var value = getAttrFunction(node), 
				descendant,
				child;
					
			if(!value) {
				// ie .h-card>img:only-of-type:not(.h-card)
				descendant = modules.domUtils.getSingleDescendantOfType( node, tagList);
				if(descendant && this.hasHClass(descendant) === false){
					value = getAttrFunction(descendant);
				}
				if(node.children.length > 0 ){
					// ie  .h-card>:only-child>img:only-of-type:not(.h-card)
					child = modules.domUtils.getSingleDescendant(node);
					if(child && this.hasHClass(child) === false){
						descendant = modules.domUtils.getSingleDescendantOfType(child, tagList);
						if(descendant && this.hasHClass(descendant) === false){
							value = getAttrFunction(descendant);
						}
					}
				}
			}
					
			return value;
		};
			
			
		/**
		 * get an implied name value from a node
		 *
		 * @param  {DOM Node} node
		 * @return {String || null}
		 */		
		modules.Parser.prototype.getNameAttr = function(node) {
			var value = modules.domUtils.getAttrValFromTagList(node, ['img','area'], 'alt');
			if(!value) {
				value = modules.domUtils.getAttrValFromTagList(node, ['abbr'], 'title');
			}
			return value;
		};
	
	
		/**
		 * get an implied photo value from a node
		 *
		 * @param  {DOM Node} node
		 * @return {String || null}
		 */	
		modules.Parser.prototype.getPhotoAttr = function(node) {
			var value = modules.domUtils.getAttrValFromTagList(node, ['img'], 'src');
			if(!value && modules.domUtils.hasAttributeValue(node, 'class', 'include') === false) {
				value = modules.domUtils.getAttrValFromTagList(node, ['object'], 'data');
			}
			return value;
		};
			
			
		/**
		 * get an implied photo value from a node
		 *
		 * @param  {DOM Node} node
		 * @return {String || null}
		 */		
		modules.Parser.prototype.getURLAttr = function(node) {
			var value = null;
			if(modules.domUtils.hasAttributeValue(node, 'class', 'include') === false){
				
				value = modules.domUtils.getAttrValFromTagList(node, ['a'], 'href');
				if(!value) {
					value = modules.domUtils.getAttrValFromTagList(node, ['area'], 'href');
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
		modules.Parser.prototype.impliedValueRule = function(uf, parentPropertyName, propertyName, value){
			if(uf.value){
				// first p-name of the h-* child
				if(modules.utils.startWith(parentPropertyName,'p-') && propertyName === 'p-name'){
					uf.altValue = {name: propertyName, value: value};
				}
				// if it's an e-* property element
				if(modules.utils.startWith(parentPropertyName,'e-')){
					uf.altValue = {name: propertyName, value: value};
				}
				//f it's a u-* property element
				if(modules.utils.startWith(parentPropertyName,'u-')){
					uf.altValue = {name: propertyName, value: value};
				}
			}
			return uf;
		};
		
		
		/**
		 * if a h-feed does not have a title use the title tag of a page
		 *
		 * @param  {DOM Node} node
		 * @param  {Object} uf
		 * @return {Object}
		 */	
		modules.Parser.prototype.impliedhFeedTitle = function(node, uf){
			if(uf.type && uf.type.indexOf('h-feed') > -1){
				// has no name property
				if(uf.properties.name === undefined || uf.properties.name[0] === '' ){
					// use the text from title tag
					var title = modules.domUtils.querySelector(this.document, 'title');
					if(title){
						uf.properties.name = [modules.domUtils.textContent(title)];
					}
				}
			}
			return uf;
		};
		
		
	
	}

	return modules;

} (Modules || {}));