/*!
	Parser
	Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
	MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
*/
'use strict';

 /*jshint -W079 */
var microformats = {}; 



// The module pattern
microformats.Parser = function () {
    this.version = '0.3.4';
	this.rootPrefix = 'h-';
	this.propertyPrefixes = ['p-', 'dt-', 'u-', 'e-'];
	this.options = {
		'baseUrl': '',
		'filters': [],
		'version1': true,
		'children': true,
		'childrenRel': false,
		'rel': true,
		'includes': true,
		'textFormat': 'whitespacetrimmed',
		'dateFormat': 'auto'
	};
	this.maps = {};
	this.rels = {};
};


microformats.Parser.prototype = {

	// internal parse function 
	get: function(dom, rootNode, options) {
		var errors = null,
			out = {},
			data = [],
			rels,
			baseTag,
			href;

		this.mergeOptions(options);
		this.rootID = 0;

		if(!dom || !rootNode){
			errors = [{'error': 'No DOM or rootNode given'}];
			return {'errors': errors, 'data': {}};
		}else{

			// add includes
			if(this.options.includes){
				this.addIncludes(dom, rootNode);
			}
			
			// find base tag to set baseUrl
 			baseTag = rootNode.querySelector('base');
			if(baseTag) {
				href = this.domUtils.getAttribute(dom, baseTag, 'href');
				if(href){
					this.options.baseUrl = href;
				}
			}
			
			if(this.options.filters.length > 0){
				// parse flat list of items
				var struct = this.findFilterNodes(dom, rootNode, this.options.filters);
				data = this.walkRoot(struct[0], struct[1]);
			}else{
				// parse whole document from root
				data = this.walkRoot(dom, rootNode);
			}
			//out = {'errors': errors, 'data': {'items': data}};


			out.items = data;
			// find any rel
			if(this.options.rel){
				rels = this.findRels(dom, rootNode);
				out.rels = rels.rels;
				out['rel-urls'] = rels['rel-urls'];
				if(rels.alternate){
					out.alternates = rels.alternate;
				}
			}

		}
		this.clearUpDom(dom);
		return out;
	},
	
	
	
	/*
	// find uf's of a given type and return a dom and node structure of just that type of ufs
	findFilterNodes: function(dom, rootNode, filters) {
		
		var newDom = cheerio.load('<div></div>', {xmlMode: true}),
			newRootNode = dom.root(),
			items = this.findRootNodes(dom, rootNode),
			i = 0,
			x = 0,
			y = 0;

		newRootNode.html('');

		if(items){
			i = items.length;		
			while(x < i) {
				var y = filters.length;
				while (y--) {
					if(domUtils.hasAttributeValue(dom, items[x], 'class', filters[y])){
						var clone = domUtils.clone(dom, items[x]);
						domUtils.appendChild(newDom, newRootNode, clone);
					}
				}
				x++;
			}
		}	

		return [newDom, newRootNode];
	},
	*/
	
	findFilterNodes: function(){
		return [null, null];
	},




	// get the count of items
	count: function(dom, rootNode) {
		var out = {},
			items,
			classItems,
			x,
			i;
			
		function append(name, count){
			if(out[name]){
				out[name] = out[name] + count;
			}else{
				out[name] = count;
			}
		}		
			
		items = this.findRootNodes(dom, rootNode);	
		i = items.length;
		while(i--) {
			classItems = this.domUtils.getAttributeList(dom, items[i], 'class');
			x = classItems.length;
			while(x--) {
				// find v2 names
				if(this.utils.startWith( classItems[x], 'h-' )){
					append(classItems[x], 1);
				}
				// find v1 names
				for(var key in this.maps) {
					// has v1 root but not also a v2 root so we dont double count
					if(this.maps[key].root === classItems[x] && classItems.indexOf(key) === -1) {
						append(key, 1);
					}
				}
			}
		}
	
		return out;
	},


	// is the uf type in the filter list
	shouldInclude: function(uf, filters) {
		var i;

		if(this.utils.isArray(filters) && filters.length > 0) {
			i = filters.length;
			while(i--) {
				if(uf.type[0] === filters[i]) {
					return true;
				}
			}
			return false;
		} else {
			return true;
		}
	},


	// finds uf within the tree of a parent uf but where they have on property
	findChildItems: function(dom, rootNode, ufName) {
		var items, 
			out = [],
			ufs = [],
			x,
			i,
			z,			
			y;

		items = this.findRootNodes(dom, rootNode, true);
		if(items.length > 0) {
			i = items.length;
			x = 0; // 1 excludes parent
			while(x < i) {
				var classes = this.getUfClassNames(dom, items[x], ufName);
				if(classes.root.length > 0 && classes.properties.length === 0) {
					ufs = this.walkTree(dom, items[x], true);
					y = ufs.length;
					z = 0;
					while(z < y) {
						// make sure its a valid structure 
						if(ufs[z] && this.utils.hasProperties(ufs[z].properties)) {
							out.push(ufs[z]);
						}
						z++;
					}
				}
				x++;
			}
		}

		return out;
	},





	// returns all the root nodes in a document
	findRootNodes: function(dom, rootNode, fromChildren) {
		var arr = null,			
			out = [], 
			classList = [],
			items,
			x,
			i,
			y,
			key;


		// build any array of v1 root names    
		for(key in this.maps) {
			classList.push(this.maps[key].root);
		}

		// get all elements that have a class attribute  
		fromChildren = (fromChildren) ? fromChildren : false;
		if(fromChildren) {
			//var nodes;
			//if(this.utils.isArray(rootNode.children)){
			//	nodes = rootNode.children;
			//}else{
			//	nodes = rootNode.children();
			//}
			//arr = this.domUtils.getNodesByAttribute(dom, nodes, 'class');
			arr = this.domUtils.getNodesByAttribute(dom, rootNode, 'class');
		} else {
			arr = this.domUtils.getNodesByAttribute(dom, rootNode, 'class');
		}


		// loop elements that have a class attribute
		x = 0;    
		i = arr.length;
		while(x < i) {

			items = this.domUtils.getAttributeList(dom, arr[x], 'class');

			// loop classes on an element
			y = items.length;
			while(y--) {
				// match v1 root names 
				if(classList.indexOf(items[y]) > -1) {
					out.push(arr[x]);
					break;
				}

				// match v2 root name prefix
				if(this.utils.startWith(items[y], 'h-')) {
					out.push(arr[x]);
					break;
				}
			}

			x++;
		}
		return out;
	},
	
	
	// starts the tree walk to find microformats
	walkRoot: function(dom, node){
		var context = this,
			classes,
			items = [],
			out = [];

		classes = this.getUfClassNames(dom, node);
		// if a root uf node
		if(classes && classes.root.length > 0){
			items = this.walkTree(dom, node);

			if(items.length > 0){
				out = out.concat(items);
			}
		}else{
			// check if there are children and one of the children has a root uf
			if(node && node.children && node.children.length > 0 && this.findRootNodes(dom, node, true).length > -1){
				for (var i = 0; i < node.children.length; i++) {
					var child = node.children[i];
					items = context.walkRoot(dom, child);
					if(items.length > 0){
						out = out.concat(items);
					}
				}
			}
		}
		return out;
	},


	// starts the tree walking for a single microformat
	walkTree: function(dom, node) {
		var classes,
			out = [],
			obj,
			itemRootID;

		// loop roots found on one element
		classes = this.getUfClassNames(dom, node);
		if(classes && classes.root.length && classes.root.length > 0){

			this.rootID++;
			itemRootID = this.rootID;
			obj = this.createUfObject(classes.root);

			this.walkChildren(dom, node, obj, classes.root, itemRootID, classes);
			this.impliedRules(dom, node, obj, classes);
			out.push(obj);
		
			
		}
		return out;
	},


	// test for the need to apply the "implied rules" for name, photo and url
	impliedRules: function(dom, node, uf, parentClasses) {
		var context = this,
			value,
			descendant,
			child,
			newDate;


		function getNameAttr(dom, node) {
			var value = context.domUtils.getAttrValFromTagList(dom, node, ['img','area'], 'alt');
			if(!value) {
				value = context.domUtils.getAttrValFromTagList(dom, node, ['abbr'], 'title');
			}
			return value;
		}

		function getPhotoAttr(dom, node) {
			var value = context.domUtils.getAttrValFromTagList(dom, node, ['img'], 'src');
			if(!value) {
				value = context.domUtils.getAttrValFromTagList(dom, node, ['object'], 'data');
			}
			return value;
		}
		
		function getURLAttr(dom, node) {
			var value = null;
			if(context.domUtils.hasAttributeValue(dom, node, 'class', 'include') === false){
				value = context.domUtils.getAttrValFromTagList(dom, node, ['a'], 'href');
				if(!value) {
					value = context.domUtils.getAttrValFromTagList(dom, node, ['area'], 'href');
				}
				
			}
			return value;
		}



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
				// img.h-x[alt] or abbr.h-x[title]
				value = getNameAttr(dom, node);
				
				if(!value) {
					descendant = this.domUtils.isSingleDescendant(dom, node, ['img', 'area', 'abbr']);
					if(descendant && this.hasHClass(dom, descendant) === false){
						value = getNameAttr(dom, descendant);
					}
					if(node.children.length > 0){
						child = this.domUtils.isSingleDescendant(dom, node);
						if(child){
							descendant = this.

							domUtils.isSingleDescendant(dom, child, ['img', 'area', 'abbr']);
							if(descendant && this.hasHClass(dom, descendant) === false){
								value = getNameAttr(dom, descendant);
							}
						}
					}
				}
				var textFormat = this.options.textFormat;
				if(this.options.textFormat === 'impliednametrimmed'){
					textFormat = 'whitespacetrimmed';
				}
				if(!value) {
					uf.properties.name = [this.text.parse(dom, node, textFormat)];
				}else{
					uf.properties.name = [this.text.textContent(dom, value, textFormat)];
				}
			}
			
			
			// once implied name rule is applied
			if(uf.properties.name) {	
				// intersection of implied name and implied value rules
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
				value = getPhotoAttr(dom, node);
				if(!value) {
					descendant = this.domUtils.isOnlySingleDescendantOfType(dom, node, ['img', 'object']);
					if(descendant && this.hasHClass(dom, descendant) === false){
						value = getPhotoAttr(dom, descendant);
					}

					// single child that has a single descendant that is a img or object i.e. .h-x>:only-child>img[src]:only-of-type
					if(node.children.length > 0){
						child = this.domUtils.isSingleDescendant(dom, node);
						if(child && this.hasHClass(dom, child) === false){
							descendant = this.domUtils.isOnlySingleDescendantOfType(dom, child, ['img', 'object']);
							if(descendant && this.hasHClass(dom, descendant) === false){
								value = getPhotoAttr(dom, descendant);
							}
						}
					}
				}
				if(value) {
					// relative to absolute URL
					if(value && value !== '' && this.options.baseUrl !== '' && value.indexOf(':') === -1) {
						value = this.domUtils.resolveUrl(dom, value, this.options.baseUrl);
					}
					uf.properties.photo = [this.utils.trim(value)];
				}
			}
			
			
			// implied url rule
			/*
			
			a.h-x[href] 
			area.h-x[href] 
			
			The :only-of-type CSS pseudo-class represents any element that has no siblings of the given type.
			The pseudo-class, :not(X), matches an element that is not represented by the argument. X must not contain another negation selector.

			.h-x>a[href]:only-of-type:not[.h-*] 
			.h-x>area[href]:only-of-type:not[.h-*] 
			
			*/
			if(!uf.properties.url) {
				value = getURLAttr(dom, node);
				if(!value) {
					descendant = this.domUtils.isOnlySingleDescendantOfType(dom, node, ['a', 'area']);
					if(descendant && this.hasHClass(dom, descendant) === false){
						value = getURLAttr(dom, descendant);
					}
					if(node.children.length > 0){
						child = this.domUtils.isSingleDescendant(dom, node);
						if(child && this.hasHClass(dom, child) === false){
							descendant = this.domUtils.isOnlySingleDescendantOfType(dom, child, ['a', 'area']);
							if(descendant && this.hasHClass(dom, descendant) === false){
								value = getURLAttr(dom, descendant);
							}
						}
					}

				}
				if(value) {
					// relative to absolute URL
					if(value && value !== '' && this.options.baseUrl !== '' && value.indexOf(':') === -1) {
						value = this.domUtils.resolveUrl(dom, value, this.options.baseUrl);
					}
					uf.properties.url = [this.utils.trim(value)];
				}
			}
		
			// once implied name rule is applied
			if(uf.properties.url) {
				// intersection of implied url and implied value rules
				if(parentClasses && parentClasses.root.length === 1 && parentClasses.properties.length === 1){
					uf = context.impliedValueRule(uf, parentClasses.properties[0], 'u-url', uf.properties.url[0]);
				}
			}
		
		}

		// implied date rule - temp fix
		// only apply to first date and time match
		if(uf.times.length > 0 && uf.dates.length > 0) {
			newDate = this.dates.dateTimeUnion(uf.dates[0][1], uf.times[0][1], this.options.dateFormat);
			uf.properties[this.removePropPrefix(uf.times[0][0])][0] = newDate.toString(this.options.dateFormat);
		}
		delete uf.times;
		delete uf.dates;
		
		if(uf.altValue !== null){
			uf.value = uf.altValue.value;
		}
		delete uf.altValue;

	},
	
	
	// changes the value property based on rules about parent property prefix
	impliedValueRule: function(uf, parentPropertyName, propertyName, value){
		if(uf.value){
			// first p-name of the h-* child
			if(this.utils.startWith(parentPropertyName,'p-') && propertyName === 'p-name'){
				uf.altValue = {name: propertyName, value: value};
			}
			// if it's an e-* property element
			if(this.utils.startWith(parentPropertyName,'e-')){
				uf.altValue = {name: propertyName, value: value};
			}
			//f it's a u-* property element
			if(this.utils.startWith(parentPropertyName,'u-')){
				uf.altValue = {name: propertyName, value: value};
			}
		}
		return uf;
	},

	
	// find child properties of microformat
	walkChildren: function(dom, node, out, ufName, rootID, parentClasses) {
		var context = this,
			rootItem,
			itemRootID,
			value,
			propertyName,
			i,
			x,
			y,
			z, 
			child;

		y = 0;
		z = node.children.length;
		while(y < z) {
			child = node.children[y];
	
			// get uf classes for this single element
			var classes = context.getUfClassNames(dom, child, ufName);

			// a property which is a microformat
			if(classes.root.length > 0 && classes.properties.length > 0 && !child.addedAsRoot) {
				// create object with type, property and value
				rootItem = context.createUfObject(
					classes.root, 
					this.text.parse(dom, child, context.options.textFormat)
				);
				
				// modifies value with "implied value rule"
				if(parentClasses && parentClasses.root.length === 1 && parentClasses.properties.length === 1){
					out = context.impliedValueRule(out, parentClasses.properties[0], classes.properties[0], value);
				}

				// add the microformat as an array of properties
				propertyName = context.removePropPrefix(classes.properties[0]);
				if(out.properties[propertyName]) {
					out.properties[propertyName].push(rootItem);
				} else {
					out.properties[propertyName] = [rootItem];
				}
				context.rootID++;
				// used to stop duplication in heavily nested structures
				child.addedAsRoot = true;
				

				x = 0;
				i = rootItem.type.length;
				itemRootID = context.rootID;
				while(x < i) {
					context.walkChildren(dom, child, rootItem, rootItem.type, itemRootID, classes);
					x++;
				}
				context.impliedRules(dom, child, rootItem, classes);

			}

			// a property which is NOT a microformat and has not been use for a given root element
			if(classes.root.length === 0 && classes.properties.length > 0) {
				
				x = 0;
				i = classes.properties.length;
				while(x < i) {

					value = context.getValue(dom, child, classes.properties[x], out);
					propertyName = context.removePropPrefix(classes.properties[x]);
					
					// modifies value with "implied value rule"
					if(parentClasses && parentClasses.root.length === 1 && parentClasses.properties.length === 1){
						out = context.impliedValueRule(out, parentClasses.properties[0], classes.properties[x], value);
					}

					// if the value is not empty 
					// and we have not added this value into a property with the same name already
					if(value !== '' && !context.hasRootID(dom, child, rootID, propertyName)) {
					//if(value !== '') {
						// add the property as a an array of properties 
						if(out.properties[propertyName]) {
							out.properties[propertyName].push(value);
						} else {
							out.properties[propertyName] = [value];
						}
						// add rootid to node so we track it use
						context.appendRootID(dom, child, rootID, propertyName);
					}
					x++;
				}

				context.walkChildren(dom, child, out, ufName, rootID, classes);
			}

			// if the node has no uf classes, see if its children have
			if(classes.root.length === 0 && classes.properties.length === 0) {
				context.walkChildren(dom, child, out, ufName, rootID, classes);
			}
			
			
			// if the node is child root that should be add to children tree
			if(context.options.children){
				if(classes.root.length > 0 && classes.properties.length === 0) {
		
					// create object with type, property and value
					rootItem = context.createUfObject(
						classes.root, 
						context.text.parse(dom, child, context.options.textFormat)
					);

					// add the microformat as an array of properties
					if(!out.children){
						out.children =  [];
					}

					if(!context.hasRootID(dom, child, rootID, 'child-root')) {
						out.children.push(rootItem);
						context.appendRootID(dom, child, rootID, 'child-root');
						context.rootID++;
					}

					x = 0;
					i = rootItem.type.length;
					itemRootID = context.rootID;
					while(x < i) {
						context.walkChildren(dom, child, rootItem, rootItem.type, itemRootID, classes);
						x++;
					}
					context.impliedRules(dom, child, rootItem, classes);
				}
			}


			y++;
		}

	},



	// gets the value of a property
	getValue: function(dom, node, className, uf) {
		var value = '';

		if(this.utils.startWith(className, 'p-')) {
			value = this.getPValue(dom, node, true);
		}

		if(this.utils.startWith(className, 'e-')) {
			value = this.getEValue(dom, node);
		}

		if(this.utils.startWith(className, 'u-')) {
			value = this.getUValue(dom, node, true);
		}

		if(this.utils.startWith(className, 'dt-')) {
			value = this.getDTValue(dom, node, className, uf, true);
		}
		return value;
	},


	// gets the value of node which contain 'p-' property
	getPValue: function(dom, node, valueParse) {
		var out = '';
		if(valueParse) {
			out = this.getValueClass(dom, node, 'p');
		}

		if(!out && valueParse) {
			out = this.getValueTitle(dom, node);
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['abbr'], 'title');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['data'], 'value');
		}

		if(node.name === 'br' || node.name === 'hr') {
			out = '';
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['img', 'area'], 'alt');
		}

		if(!out) {
			out = this.text.parse(dom, node, this.options.textFormat);
		}

		return(out) ? out : '';
	},


	// get the value of node which contain 'e-' property
	getEValue: function(dom, node) {
				
		var context = this,
			out = {value: '', html: ''};

		// replace all relative links with absolute ones where it can
		function expandUrls(dom, node, attrName, baseUrl){
			var i,
				nodes,
				attr;

			nodes = context.domUtils.getNodesByAttribute(dom, node, attrName);
			i = nodes.length;
			while (i--) {
				try{
					// the url parser can blow up if the format is not right
					attr = context.domUtils.getAttribute(dom, nodes[i], attrName);
					if(attr && attr !== '' && baseUrl !== '' && attr.indexOf(':') === -1) {
						//attr = urlParser.resolve(baseUrl, attr);
						attr = context.domUtils.resolveUrl(dom, attr, baseUrl);
						context.domUtils.setAttribute(dom, nodes[i], attrName, attr);
					}	
				}catch(err){
					// do nothing convert only the urls we can leave the rest as they where
				}
			}
		}
		
		expandUrls(dom, node, 'src', this.options.baseUrl);
		expandUrls(dom, node, 'href', this.options.baseUrl);

		out.value = this.text.parse(dom, node, this.options.textFormat);
		out.html = this.html.parse(dom, node);

		return out;
	
		
		//node = this.expandURLs(dom, node, this.options.baseUrl)
		//return this.domUtils.innerHTML(dom, node);
	},


	// get the value of node which contain 'u-' property
	getUValue: function(dom, node, valueParse) {
		// not sure this should be used for u property
		var out = '';
		if(valueParse) {
			out = this.getValueClass(dom, node, 'u');
		}

		if(!out && valueParse) {
			out = this.getValueTitle(dom, node);
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['a', 'area'], 'href');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['img'], 'src');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['object'], 'data');
		}

		// if we have no protocal separator, turn relative url to absolute ones
		if(out && out !== '' && out.indexOf(':') === -1) {
			out = this.domUtils.resolveUrl(dom, out, this.options.baseUrl);
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['abbr'], 'title');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['data'], 'value');
		}

		if(!out) {
			out = this.text.parse(dom, node, this.options.textFormat);
		}

		return(out) ? out : '';
	},


	// get the value of node which contain 'dt-' property
	getDTValue: function(dom, node, className, uf, valueParse) {
		var out = '';

		if(valueParse) {
			out = this.getValueClass(dom, node, 'dt');
		}

		if(!out && valueParse) {
			out = this.getValueTitle(dom, node);
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['time', 'ins', 'del'], 'datetime');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['abbr'], 'title');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['data'], 'value');
		}

		if(!out) {
			out = this.text.parse(dom, node, this.options.textFormat);
		}

		if(out) {
			if(this.dates.isDuration(out)) {
				// just duration
				return out;
			} else if(this.dates.isTime(out)) {
				// just time or time+timezone
				if(uf) {
					uf.times.push([className, this.dates.parseAmPmTime(out, this.options.dateFormat)]);
				}
				return this.dates.parseAmPmTime(out, this.options.dateFormat);
			} else {
				// returns a date - uf profile 
				if(uf) {
					uf.dates.push([className, new ISODate(out).toString( this.options.dateFormat )]);
				}
				return new ISODate(out).toString( this.options.dateFormat );
			}
		} else {
			return '';
		}
	},


	// appends a new rootid to a given node
	appendRootID: function(dom, node, id, propertyName) {
		if(this.hasRootID(dom, node, id, propertyName) === false){
			var rootids = [];
			if(this.domUtils.hasAttribute(dom, node,'rootids')){
				rootids = this.domUtils.getAttributeList(dom, node,'rootids');
			}
			rootids.push('id' + id + '-' + propertyName);
			this.domUtils.setAttribute(dom, node, 'rootids', rootids.join(' '));
		}
	},


	// does a given node already have a rootid
	hasRootID: function(dom, node, id, propertyName) {
		var rootids = [];
		if(!this.domUtils.hasAttribute(dom, node,'rootids')){
			return false;
		} else {
			rootids = this.domUtils.getAttributeList(dom, node, 'rootids');
			return (rootids.indexOf('id' + id + '-' + propertyName) > -1);
		}
	},


	// gets the text of any child nodes with the class value
	getValueClass: function(dom, node, propertyType) {
		var context = this,
			out = [],
			child,
			x,
			i;

		x = 0;
		i = node.children.length;
		while(x < i) {
			child = node.children[x];
			var value = null;
			if(this.domUtils.hasAttributeValue(dom, child, 'class', 'value')) {
				switch(propertyType) {
				case 'p':
					value = context.getPValue(dom, child, false);
					break;
				case 'u':
					value = context.getUValue(dom, child, false);
					break;
				case 'dt':
					value = context.getDTValue(dom, child, '', null, false);
					break;
				}
				if(value) {
					out.push(this.utils.trim(value));
				}
			}
			x++;
		}
		if(out.length > 0) {
			if(propertyType === 'p') {
				return out.join(' ').replace(/[\t\n\r ]+/g, ' ');
			}
			if(propertyType === 'u') {
				return out.join('');
			}
			if(propertyType === 'dt') {
				return this.dates.concatFragments(out).toString(this.options.dateFormat);
			}
		} else {
			return null;
		}
	},
	
	
	// returns a single string of the 'title' attr from all 
	// the child nodes with the class 'value-title' 
	getValueTitle: function(dom, node) {
		var out = [],
			items,
			i,
			x;

		items = this.domUtils.getNodesByAttributeValue(dom, node, 'class', 'value-title');
		x = 0;
		i = items.length;		
		while(x < i) {
			if(this.domUtils.hasAttribute(dom, items[x], 'title')) {
				out.push(this.domUtils.getAttribute(dom, items[x], 'title'));
			}
			x++;
		}
		return out.join('');
	},
	
	
	// finds out weather a node has h-* class v1 and v2
	hasHClass: function(dom, node){
		var classes = this.getUfClassNames(dom, node);
		if(classes.root && classes.root.length > 0){
			return true;
		}else{
			return false;
		}
	},



	getUfClassNames: function(dom, node, ufNameArr) {
		var context = this,
			out = {
				'root': [],
				'properties': []
			},
			classNames,
			key,
			items,
			item,
			i,
			x,
			z,
			y,
			map,
			prop,
			propName,
			v2Name,
			impiedRel,
			ufName;


		classNames = this.domUtils.getAttribute(dom, node, 'class');
		if(classNames) {
			items = classNames.split(' ');
			x = 0;
			i = items.length;
			while(x < i) {

				item = context.utils.trim(items[x]);

				// test for root prefix - v2
				if(context.utils.startWith(item, context.rootPrefix)) {
					out.root.push(item);
				}

				// test for property prefix - v2
				z = context.propertyPrefixes.length;
				while(z--) {
					if(context.utils.startWith(item, context.propertyPrefixes[z])) {
						out.properties.push(item);
					}
				}

				if(context.options.version1){

					// test for mapped root classnames v1
					for(key in context.maps) {
						if(context.maps.hasOwnProperty(key)) {
							// only add a root once
							if(context.maps[key].root === item && out.root.indexOf(key) === -1) {
								// if root map has subTree set to true
								// test to see if we should create a property or root
								if(context.maps[key].subTree && context.isSubTreeRoot(dom, node, context.maps[key], items) === false) {
									out.properties.push('p-' + context.maps[key].root);
								} else {
									out.root.push(key);
								}
							}
						}
					}

					if(ufNameArr){
						for (var a = 0; a < ufNameArr.length; a++) {
							ufName = ufNameArr[a];
							// test for mapped property classnames v1
							map = context.getMapping(ufName);
							if(map) {
								for(key in map.properties) {
									prop = map.properties[key];
									propName = (prop.map) ? prop.map : 'p-' + key;

									if(key === item) {
										if(prop.uf) {
											// loop all the classList make sure 
											//   1. this property is a root
											//   2. that there is not already a equivalent v2 property ie url and u-url on the same element
											y = 0;
											while(y < i) {
												v2Name = context.getV2RootName(items[y]);
												// add new root
												if(prop.uf.indexOf(v2Name) > -1 && out.root.indexOf(v2Name) === -1) {
													out.root.push(v2Name);
												}
												y++;
											}
											//only add property once
											if(out.properties.indexOf(propName) === -1) {
												out.properties.push(propName);
											}
										} else {
											if(out.properties.indexOf(propName) === -1) {
												out.properties.push(propName);
											}
										}
									}

								}
							}
						}
					}
				}
				x++;

			}
		}

		if(ufNameArr){
			for (var b = 0; b < ufNameArr.length; b++) {
				ufName = ufNameArr[b];
				impiedRel = this.findRelImpied(dom, node, ufName);
				if(impiedRel && out.properties.indexOf(impiedRel) === -1) {
					out.properties.push(impiedRel);
				}
			}
		}

		return out;
	},


	// given a V1 or V2 root name return mapping object
	getMapping: function(name) {
		var key;
		for(key in this.maps) {
			if(this.maps[key].root === name || key === name) {
				return this.maps[key];
			}
		}
		return null;
	},


	// given a V1 root name returns a V2 root name ie vcard >>> h-card
	getV2RootName: function(name) {
		var key;
		for(key in this.maps) {
			if(this.maps[key].root === name) {
				return key;
			}
		}
		return null;
	},


	// use to find if a subTree mapping should be a property or root
	isSubTreeRoot: function(dom, node, map, classList) {
		var out,
			hasSecondRoot,
			i,
			x;

		out = this.createUfObject(map.name);
		hasSecondRoot = false;	

		// loop the classList to see if there is a second root
		x = 0;
		i = classList.length;	
		while(x < i) {
			var item = this.utils.trim(classList[x]);
			for(var key in this.maps) {
				if(this.maps.hasOwnProperty(key)) {
					if(this.maps[key].root === item && this.maps[key].root !== map.root) {
						hasSecondRoot = true;
						break;
					}
				}
			}
			x++;
		}

		// walk the sub tree for properties that match this subTree
		this.walkChildren(dom, node, out, map.name, null, null);

		if(this.utils.hasProperties(out.properties) && hasSecondRoot === false) {
			return true;
		} else {
			return false;
		}
	},


	// finds any alt rel=* mappings for a given node/microformat
	findRelImpied: function(dom, node, ufName) {
		var out,
			map,
			i;

		map = this.getMapping(ufName);
		if(map) {
			for(var key in map.properties) {
				var prop = map.properties[key],
					propName = (prop.map) ? prop.map : 'p-' + key,
					relCount = 0;

				// if property as an alt rel=* mapping run test
				if(prop.relAlt && this.domUtils.hasAttribute(dom, node, 'rel')) {
					i = prop.relAlt.length;
					while(i--) {
						if(this.domUtils.hasAttributeValue(dom, node, 'rel', prop.relAlt[i])) {
							relCount++;
						}
					}
					if(relCount === prop.relAlt.length) {
						out = propName;
					}
				}
			}
		}
		return out;
	},


	// creates a blank uf object
	createUfObject: function(names, value) {
		var out = {};

		// is more than just whitespace
		if(value && this.utils.isOnlyWhiteSpace(value) === false) {
			out.value = value;
		}
		// add type ie ["h-card", "h-org"]
		if(this.utils.isArray(names)) {
			out.type = names;
		} else {
			out.type = [names];
		}
		out.properties = {};
		out.times = [];
		out.dates = [];
		out.altValue = null;
		return out;
	},




	// removes uf property prefixs from a string
	removePropPrefix: function(str) {
		var i;

		i = this.propertyPrefixes.length;
		while(i--) {
			var prefix = this.propertyPrefixes[i];
			if(this.utils.startWith(str, prefix)) {
				str = str.substr(prefix.length);
			}
		}
		return str;
	},



	/*
	findRels: function(dom, rootNode, fromChildren) {
		var uf,
			out = {},
			x,
			i,
			y,
			z,
			relList,
			items,
			item,
			key,
			value,
			arr;


		// get all elements that have a rel attribute
		fromChildren = (fromChildren) ? fromChildren : false; 
		if(fromChildren) {
			arr = this.domUtils.getNodesByAttribute(dom, rootNode, 'rel');
		} else {
			arr = this.domUtils.getNodesByAttribute(dom, rootNode, 'rel');
		}

		x = 0;
		i = arr.length;
		while(x < i) {
			relList = this.domUtils.getAttribute(dom, arr[x], 'rel');

			if(relList) {
				items = relList.split(' ');

				z = 0;
				y = items.length;
				while(z < y) {
					item = this.utils.trim(items[z]);
					for(key in this.rels) {
						if(key === item) {
							value = this.domUtils.getAttrValFromTagList(dom, arr[x], ['a', 'area'], 'href');
							if(!value) {
								value = this.domUtils.getAttrValFromTagList(dom, arr[x], ['link'], 'href');
							}
							if(!out[key]) {
								out[key] = [];
							}
							// turn relative to abosulte urls
							if(value && value !== '' && value.indexOf(':') === -1) {
								value = this.domUtils.resolveUrl(dom, value, this.options.baseUrl);
							}
							out[key].push(value);
						}
					}
					z++;
				}
			}
			x++;
		}

		if(this.utils.hasProperties(out)) {
			uf = this.createUfObject('rel');
			delete uf.times;
			delete uf.dates;
			uf.properties = out;
		}
		return uf;
	},
	
	*/
	
	findRels: function(dom, rootNode, fromChildren) {
		var out = {
				'items': [],
				'rels': {},
				'rel-urls': {}
			},
			x,
			i,
			y,
			z,
			relList,
			items,
			item,
			value,
			arr;


		// get all elements that have a rel attribute
		fromChildren = (fromChildren) ? fromChildren : false; 
		if(fromChildren) {
			arr = this.domUtils.getNodesByAttribute(dom, rootNode.children, 'rel');
		} else {
			arr = this.domUtils.getNodesByAttribute(dom, rootNode, 'rel');
		}

		x = 0;
		i = arr.length;
		while(x < i) {
			relList = this.domUtils.getAttribute(dom, arr[x], 'rel');

			if(relList) {
				items = relList.split(' ');
				
				
				// add rels
				z = 0;
				y = items.length;
				while(z < y) {
					item = this.utils.trim(items[z]);

					// get rel value
					value = this.domUtils.getAttrValFromTagList(dom, arr[x], ['a', 'area'], 'href');
					if(!value) {
						value = this.domUtils.getAttrValFromTagList(dom, arr[x], ['link'], 'href');
					}

					// create the key
					if(!out.rels[item]) {
						out.rels[item] = [];
					}

					if(typeof this.options.baseUrl === 'string' && typeof value === 'string') {
				
						var resolved = this.domUtils.resolveUrl(dom, value, this.options.baseUrl);
						// do not add duplicate rels - based on resolved URLs
						if(out.rels[item].indexOf(resolved) === -1){
							out.rels[item].push( resolved );
						}
					}
					z++;
				}
				
				
				var url = null;
				if(this.domUtils.hasAttribute(dom, arr[x], 'href')){
					url = this.domUtils.getAttribute(dom, arr[x], 'href');
					if(url){
						url = this.domUtils.resolveUrl(dom, url, this.options.baseUrl );
					}
				}

				
				// add to rel-urls
				var relUrl = this.getRelProperties(dom, arr[x]);
				relUrl.rels = items;
				// // do not add duplicate rel-urls - based on resolved URLs
				if(url && out['rel-urls'][url] === undefined){
					out['rel-urls'][url] = relUrl;
				}
				
				if(relList.toLowerCase().indexOf('alternate') > -1){	
					// if its an alternate add 
					var obj = this.getRelProperties(dom, arr[x]);
					if(url){
						obj.url = url;
					}

					if(items.length > 1){
						if(this.domUtils.hasAttribute(dom, arr[x], 'rel')){
							var clonedRelList = relList;
							obj.rel = this.utils.trim( clonedRelList.toLowerCase().replace('alternate','') );
						}
					}
					// create the key
					if(!out.alternate) {
						out.alternate = [];
					}
					out.alternate.push( obj );
				}
					

				
		
			}
			x++;
		}
		return out;
	},
	
	
	// get property values form a link
	getRelProperties: function(dom, node){
		var obj = {};
		
		if(this.domUtils.hasAttribute(dom, node, 'media')){
			obj.media = this.domUtils.getAttribute(dom, node, 'media');
		}
		if(this.domUtils.hasAttribute(dom, node, 'type')){
			obj.type = this.domUtils.getAttribute(dom, node, 'type');
		}
		if(this.domUtils.hasAttribute(dom, node, 'hreflang')){
			obj.hreflang = this.domUtils.getAttribute(dom, node, 'hreflang');
		}
		if(this.domUtils.hasAttribute(dom, node, 'title')){
			obj.title = this.domUtils.getAttribute(dom, node, 'title');
		}
		if(this.utils.trim(this.getPValue(dom, node, false)) !== ''){
			obj.text = this.getPValue(dom, node, false);
		}	
		
		return obj;
	},
	
	
	


	// add all the includes ino the dom structure
	addIncludes: function(dom, rootNode) {
		this.addAttributeIncludes(dom, rootNode, 'itemref');
		this.addAttributeIncludes(dom, rootNode, 'headers');
		this.addClassIncludes(dom, rootNode);
	},


	// add attribute based includes ie 'itemref' and 'headers'
	addAttributeIncludes: function(dom, rootNode, attributeName) {
		var arr,
			idList,
			i,
			x,
			z,
			y;

		arr = this.domUtils.getNodesByAttribute(dom, rootNode, attributeName);
		x = 0;
		i = arr.length;
		while(x < i) {
			idList = this.domUtils.getAttributeList(dom, arr[x], attributeName);
			if(idList) {
				z = 0;
				y = idList.length;
				while(z < y) {
					this.apppendInclude(dom, arr[x], idList[z]);
					z++;
				}
			}
			x++;
		}
	},


	// add class based includes
	addClassIncludes: function(dom, rootNode) {
		var id,
			arr,
			x = 0,
			i;

		arr = this.domUtils.getNodesByAttributeValue(dom, rootNode, 'class', 'include');
		i = arr.length;
		while(x < i) {
			id = this.domUtils.getAttrValFromTagList(dom, arr[x], ['a'], 'href');
			if(!id) {
				id = this.domUtils.getAttrValFromTagList(dom, arr[x], ['object'], 'data');
			}
			this.apppendInclude(dom, arr[x], id);
			x++;
		}
	},


	// appends a clone of an element into another node
	apppendInclude: function(dom, node, id){
		var include,
			clone;

		id = this.utils.trim(id.replace('#', ''));
		include = dom.getElementById(id);
		if(include === null){
			include = this.options.node.querySelector('#' + id);
		}
		if(include) {
			clone = this.domUtils.clone(dom, include);
			this.markIncludeChildren(dom, clone);
			this.domUtils.appendChild(dom, node, clone);
		}
	},


	// add a attribute to all the child microformats roots  
	markIncludeChildren: function(dom, rootNode) {
		var arr,
			x,
			i;

		// loop the array and add the attribute
		arr = this.findRootNodes(dom, rootNode);
		x = 0;
		i = arr.length;
		this.domUtils.setAttribute(dom, rootNode, 'data-include', 'true');
		this.domUtils.setAttribute(dom, rootNode, 'style', 'display:none');
		while(x < i) {
			this.domUtils.setAttribute(dom, arr[x], 'data-include', 'true');
			x++;
		}
	},


	// looks at nodes in DOM structures find href and src and expandes relative URLs
	expandURLs: function(dom, node, baseUrl){
		var context = this;
		node = this.domUtils.clone(dom, node);

		function expand( nodeList, attrName ){
			if(nodeList && nodeList.length){
				var i = nodeList.length;
				while (i--) {
					// this gives the orginal text
				    var href =  nodeList[i].getAttribute(attrName);
				    if(href.toLowerCase().indexOf('http') !== 0){
				    	nodeList[i].setAttribute(attrName, context.domUtils.resolveUrl(dom, href, baseUrl));
				    }
				}
			}
		}
		
		expand( this.domUtils.getNodesByAttribute(dom, node, 'href'), 'href' );
		expand( this.domUtils.getNodesByAttribute(dom, node, 'src'), 'src' );
		
		return node;
	},


	// merges passed and default options -single level clone of properties
	mergeOptions: function(options) {
		var key;
		for(key in options) {
			if(options.hasOwnProperty(key)) {
				this.options[key] = options[key];
			}
		}
	},

	// removes an changes made to dom during parse process
	clearUpDom: function(dom){
		var arr,
			i;

		// remove all the items that where added as includes
		arr = this.domUtils.getNodesByAttribute(dom, dom, 'data-include');
		i = arr.length;
		while(i--) {
			this.domUtils.removeChild(dom,arr[i]);
		}
		// remove additional attibutes
		arr = this.domUtils.getNodesByAttribute(dom, dom, 'rootids');
		i = arr.length;
		while(i--) {
			this.domUtils.removeAttribute(dom, arr[i],'rootids');
		}
	}

};


microformats.parser = new microformats.Parser();
microformats.getItems = function(options){
	var dom,
		node;

	dom = (options && options.document)? options.document : document;
	node = (options && options.node)? options.node : dom;

	options = (options)? options : {};
	if(!options.baseUrl && dom && dom.location){
		options.baseUrl = dom.location.href;
	}

	return this.parser.get(dom, node, options);
};

microformats.getCounts = function(options) {
	var dom,
		node;

	dom = (options && options.document)? options.document : document;
	node = (options && options.node)? options.node : dom;
	options = (options)? options : {};

	return this.parser.count(dom, node, options);
};


// Simple support for CommonJS
if (typeof exports !== 'undefined') {
	exports.microformats = microformats;
}
	








